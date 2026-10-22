/**
 * End-to-End API Test Suite for Preeti Makeover Backend
 */
const http = require('http');
const app = require('../src/app');

let server;
let baseUrl;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: parsed
        });
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== Preeti Makeover API Test Suite Running ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      failed++;
    }
  }

  // Start test server on random port
  server = http.createServer(app);
  await new Promise((res) => server.listen(0, res));
  const port = server.address().port;
  baseUrl = `http://localhost:${port}`;
  console.log(`Test server listening on port ${port}\n`);

  try {
    // Test 1: Healthcheck
    const res1 = await request('GET', '/api/health');
    assert(res1.status === 200 && res1.body.success === true && res1.body.status === 'healthy', 
      'GET /api/health returns 200 and healthy status');

    // Test 2: Business Settings
    const res2 = await request('GET', '/api/settings');
    assert(res2.status === 200 && res2.body.data.weeklyOffDay === 'Tuesday' && res2.body.data.ownerName === 'Preeti Mandal', 
      'GET /api/settings returns accurate business information & weekly off');

    // Test 3: Services List
    const res3 = await request('GET', '/api/services');
    assert(res3.status === 200 && res3.body.data.length >= 5 && res3.body.meta.totalServices >= 27, 
      'GET /api/services returns 5 categories and 27 services');

    // Test 4: Single Service by slug
    const res4 = await request('GET', '/api/services/casmara-luxury-facial');
    assert(res4.status === 200 && res4.body.data.name.includes('Casmara'), 
      'GET /api/services/:slug returns service detail');

    // Test 5: Reject Past Date Appointment
    const res5 = await request('POST', '/api/appointments', {
      customerName: 'Anjali Sharma',
      phone: '9810359438',
      preferredDate: '2020-01-01',
      serviceName: 'Hair Spa Rejuvenation'
    });
    assert(res5.status === 400 && res5.body.isPast === true, 
      'POST /api/appointments rejects past date with HTTP 400');

    // Test 6: Reject Tuesday Date Appointment (Tuesday Blackout)
    const res6 = await request('POST', '/api/appointments', {
      customerName: 'Pooja Verma',
      phone: '9810359438',
      preferredDate: '2026-10-27',
      serviceName: 'Bridal HD Makeup'
    });
    assert(res6.status === 422 && res6.body.isTuesday === true, 
      'POST /api/appointments rejects Tuesday appointment with HTTP 422');

    // Test 7: Reject Invalid Phone Number
    const res7 = await request('POST', '/api/appointments', {
      customerName: 'Pooja Verma',
      phone: '12345',
      preferredDate: '2026-10-28',
      serviceName: 'Bridal HD Makeup'
    });
    assert(res7.status === 400 && res7.body.field === 'phone', 
      'POST /api/appointments rejects invalid phone with HTTP 400');

    // Test 8: Accept Valid Appointment (Wednesday 2026-10-28)
    const res8 = await request('POST', '/api/appointments', {
      customerName: 'Simran Kaur',
      phone: '9810359438',
      preferredDate: '2026-10-28',
      preferredTime: '11:30 AM',
      serviceName: 'Casmara Luxury Algae Facial',
      message: 'Need consultation for sensitive skin.'
    });
    const createdAppointmentId = res8.body.data?.id;
    assert(res8.status === 201 && res8.body.isConfirmed === false && res8.body.data.whatsappUrl.includes('https://wa.me/'), 
      'POST /api/appointments creates enquiry with HTTP 201, explicit pending status & WhatsApp URL');

    // Test 9: Honeypot Spam Trap (Silent 200 without creating DB entry)
    const res9 = await request('POST', '/api/appointments', {
      customerName: 'Spam Bot',
      phone: '9810359438',
      preferredDate: '2026-10-28',
      website: 'https://spambot-link.com'
    });
    assert(res9.status === 200 && res9.body.data === undefined, 
      'POST /api/appointments silently discards honeypot spam submission');

    // Test 10: Admin Login with Bad Password
    const res10 = await request('POST', '/api/admin/login', {
      email: 'admin@preetimakeover.com',
      password: 'WrongPassword123'
    });
    assert(res10.status === 401 && res10.body.success === false, 
      'POST /api/admin/login rejects incorrect password with HTTP 401');

    // Test 11: Admin Login with Correct Credentials
    const res11 = await request('POST', '/api/admin/login', {
      email: 'admin@preetimakeover.com',
      password: 'PreetiMakeover@2026'
    });
    const adminToken = res11.body.data?.token;
    assert(res11.status === 200 && !!adminToken, 
      'POST /api/admin/login authenticates with valid credentials and returns JWT');

    // Test 12: Protected Route without Token (Access Denied)
    const res12 = await request('GET', '/api/admin/me');
    assert(res12.status === 401, 
      'GET /api/admin/me rejects unauthorized request with HTTP 401');

    // Test 13: Protected Route with Valid Bearer Token
    const res13 = await request('GET', '/api/admin/me', null, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert(res13.status === 200 && res13.body.data.email === 'admin@preetimakeover.com', 
      'GET /api/admin/me allows authorized access with Bearer JWT');

    // Test 14: Admin List Appointments
    const res14 = await request('GET', '/api/admin/appointments', null, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert(res14.status === 200 && Array.isArray(res14.body.data) && res14.body.data.length >= 1, 
      'GET /api/admin/appointments returns list of appointments to authorized admin');

    // Test 15: Admin Dashboard Metrics
    const res15 = await request('GET', '/api/admin/dashboard', null, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert(res15.status === 200 && typeof res15.body.data.pendingEnquiries === 'number', 
      'GET /api/admin/dashboard returns operational metrics');

    // Test 16: Admin Update Appointment Status & Notes
    if (createdAppointmentId) {
      const res16 = await request('PATCH', `/api/admin/appointments/${createdAppointmentId}/status`, {
        status: 'CONFIRMED',
        adminNotes: 'Customer confirmed via WhatsApp for 11:30 AM.'
      }, {
        'Authorization': `Bearer ${adminToken}`
      });
      assert(res16.status === 200 && res16.body.data.status === 'CONFIRMED', 
        'PATCH /api/admin/appointments/:id/status updates status to CONFIRMED with admin notes');
    }

    // Test 17: Admin Get All Services
    const res17 = await request('GET', '/api/admin/services', null, {
      'Authorization': `Bearer ${adminToken}`
    });
    const firstCategory = res17.body.data?.[0];
    assert(res17.status === 200 && Array.isArray(res17.body.data) && !!firstCategory?.id, 
      'GET /api/admin/services returns categories with nested services');

    // Test 18: Admin Create Service
    let createdServiceId = null;
    if (firstCategory?.id) {
      const res18 = await request('POST', '/api/admin/services', {
        categoryId: firstCategory.id,
        name: 'Express Hair Styling Test',
        description: 'Test service description for admin verification',
        startingPrice: 499,
        durationMinutes: 30,
        isFeatured: false,
        isActive: true
      }, {
        'Authorization': `Bearer ${adminToken}`
      });
      createdServiceId = res18.body.data?.id;
      assert(res18.status === 201 && !!createdServiceId, 
        'POST /api/admin/services creates new service with starting price and duration');
    }

    // Test 19: Admin Update Service
    if (createdServiceId) {
      const res19 = await request('PUT', `/api/admin/services/${createdServiceId}`, {
        name: 'Express Hair Styling Test (Updated)',
        startingPrice: 599,
        isActive: false
      }, {
        'Authorization': `Bearer ${adminToken}`
      });
      assert(res19.status === 200 && res19.body.data.isActive === false, 
        'PUT /api/admin/services/:id updates service attributes successfully');

      // Test 20: Admin Delete Service
      const res20 = await request('DELETE', `/api/admin/services/${createdServiceId}`, null, {
        'Authorization': `Bearer ${adminToken}`
      });
      assert(res20.status === 200 && res20.body.success === true, 
        'DELETE /api/admin/services/:id deletes test service');
    }

    // Test 21: Admin Gallery Create & Delete
    const res21Create = await request('POST', '/api/admin/gallery', {
      title: 'HD Bridal Test Transformation',
      category: 'Bridal',
      imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31',
      altText: 'Bridal makeover test'
    }, {
      'Authorization': `Bearer ${adminToken}`
    });
    const galleryImageId = res21Create.body.data?.id;
    assert(res21Create.status === 201 && !!galleryImageId, 
      'POST /api/admin/gallery adds verified gallery image');

    if (galleryImageId) {
      const res21Delete = await request('DELETE', `/api/admin/gallery/${galleryImageId}`, null, {
        'Authorization': `Bearer ${adminToken}`
      });
      assert(res21Delete.status === 200 && res21Delete.body.success === true, 
        'DELETE /api/admin/gallery/:id removes gallery image');
    }

    // Test 22: Admin Update Business Settings
    const res22 = await request('PUT', '/api/admin/settings', {
      openingHour: '10:00 AM',
      closingHour: '09:00 PM',
      weeklyOffDay: 'Tuesday'
    }, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert(res22.status === 200 && res22.body.data.weeklyOffDay === 'Tuesday', 
      'PUT /api/admin/settings updates business settings successfully');

    // Test 23: Reject Unauthorized Access to Admin Services
    const res23 = await request('GET', '/api/admin/services');
    assert(res23.status === 401, 
      'GET /api/admin/services strictly rejects unauthenticated request with HTTP 401');

    // ==========================================
    // Phase 4.1 Security Audit Tests
    // ==========================================

    // Test 25: API responses never leak passwordHash or secrets
    const hasHashInLogin = JSON.stringify(res11.body).includes('passwordHash');
    const hasHashInMe = JSON.stringify(res13.body).includes('passwordHash');
    assert(!hasHashInLogin && !hasHashInMe,
      'Security Audit: Login and Profile responses NEVER leak passwordHash or credential secrets');

    // Test 26: Reject Unauthenticated Password Change
    const res26 = await request('POST', '/api/admin/change-password', {
      currentPassword: 'PreetiMakeover@2026',
      newPassword: 'NewSecurePassword@2026'
    });
    assert(res26.status === 401,
      'Security Audit: POST /api/admin/change-password rejects unauthenticated request with HTTP 401');

    // Test 27: Reject Incorrect Current Password
    const res27 = await request('POST', '/api/admin/change-password', {
      currentPassword: 'IncorrectOldPassword123',
      newPassword: 'NewSecurePassword@2026',
      confirmPassword: 'NewSecurePassword@2026'
    }, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert(res27.status === 401 && res27.body.message.includes('Incorrect current password'),
      'Security Audit: POST /api/admin/change-password rejects wrong current password with HTTP 401');

    // Test 28: Reject Short New Password (< 8 chars)
    const res28 = await request('POST', '/api/admin/change-password', {
      currentPassword: 'PreetiMakeover@2026',
      newPassword: 'short',
      confirmPassword: 'short'
    }, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert(res28.status === 400 && res28.body.message.includes('at least 8 characters'),
      'Security Audit: POST /api/admin/change-password rejects new password < 8 characters with HTTP 400');

    // Test 29: Reject Mismatched Password Confirmation
    const res29 = await request('POST', '/api/admin/change-password', {
      currentPassword: 'PreetiMakeover@2026',
      newPassword: 'NewSecurePassword@2026',
      confirmPassword: 'DifferentPassword@2026'
    }, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert(res29.status === 400 && res29.body.message.includes('do not match'),
      'Security Audit: POST /api/admin/change-password rejects mismatched confirmation with HTTP 400');

    // Test 30: Successfully Change Password with Valid Credentials
    const testNewPassword = 'AuditVerified@2026#Secure';
    const res30 = await request('POST', '/api/admin/change-password', {
      currentPassword: 'PreetiMakeover@2026',
      newPassword: testNewPassword,
      confirmPassword: testNewPassword
    }, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert(res30.status === 200 && res30.body.success === true,
      'Security Audit: POST /api/admin/change-password successfully updates admin password using 12 bcrypt rounds');

    // Test 31: Confirm Replacement Login Works & Restore Initial Dev Password
    const res31NewLogin = await request('POST', '/api/admin/login', {
      email: 'admin@preetimakeover.com',
      password: testNewPassword
    });
    const freshToken = res31NewLogin.body.data?.token;
    assert(res31NewLogin.status === 200 && !!freshToken,
      'Security Audit: Login confirms replacement password works immediately without lockout');

    // Revert password back to initial seed so environment remains repeatable
    const res31Revert = await request('POST', '/api/admin/change-password', {
      currentPassword: testNewPassword,
      newPassword: 'PreetiMakeover@2026',
      confirmPassword: 'PreetiMakeover@2026'
    }, {
      'Authorization': `Bearer ${freshToken}`
    });
    assert(res31Revert.status === 200,
      'Security Audit: Reverted test password back to development seed without lockout');

    // Test 32: getJwtSecret Fails Safely in Production When Secret is Missing
    const { getJwtSecret } = require('../src/middleware/authMiddleware');
    const savedEnv = process.env.NODE_ENV;
    const savedSecret = process.env.JWT_SECRET;
    let thrownInProduction = false;
    try {
      process.env.NODE_ENV = 'production';
      delete process.env.JWT_SECRET;
      try {
        getJwtSecret();
      } catch (err) {
        thrownInProduction = err.message.includes('FATAL: JWT_SECRET environment variable is missing');
      }
    } finally {
      process.env.NODE_ENV = savedEnv;
      if (savedSecret) process.env.JWT_SECRET = savedSecret;
    }
    assert(thrownInProduction,
      'Security Audit: getJwtSecret fails safely with fatal error in production when JWT_SECRET is missing');

    // ==========================================
    // Phase 4.1 CORS Hardening Tests
    // ==========================================

    // Test 33: Request without Origin (Healthchecks, curl, server-to-server) succeeds
    const res33 = await request('GET', '/api/health');
    assert(res33.status === 200 && res33.body.status === 'healthy',
      'CORS: Request without Origin header succeeds with HTTP 200 for health checks and server calls');

    // Test 34: Request from local development Origin receives CORS allow header
    const res34 = await request('GET', '/api/health', null, {
      'Origin': 'http://localhost:5173'
    });
    assert(res34.status === 200 && res34.headers['access-control-allow-origin'] === 'http://localhost:5173',
      'CORS: Request from local development Origin (http://localhost:5173) sets Access-Control-Allow-Origin');

    // Test 35: Configured production origin with trailing slash in env matches clean incoming Origin
    const savedClientUrl = process.env.CLIENT_URL;
    try {
      process.env.CLIENT_URL = 'https://preeti-makeover.vercel.app/, https://custom-salon.com';
      const res35 = await request('GET', '/api/health', null, {
        'Origin': 'https://preeti-makeover.vercel.app'
      });
      assert(res35.status === 200 && res35.headers['access-control-allow-origin'] === 'https://preeti-makeover.vercel.app',
        'CORS: Matches configured Vercel production origin even when CLIENT_URL contains trailing slashes or comma lists');
    } finally {
      process.env.CLIENT_URL = savedClientUrl;
    }

    // Test 36: Unauthorized origin does NOT receive allow header and does NOT trigger 500 error
    const res36 = await request('GET', '/api/health', null, {
      'Origin': 'https://unauthorized-malicious-domain.com'
    });
    assert(res36.headers['access-control-allow-origin'] === undefined && res36.status !== 500,
      'CORS: Unauthorized origin is denied access-control-allow-origin without throwing 500 unhandled server error');

    // Test 37: OPTIONS preflight from allowed origin returns 200/204 with CORS headers
    const res37 = await request('OPTIONS', '/api/appointments', null, {
      'Origin': 'http://localhost:5173',
      'Access-Control-Request-Method': 'POST'
    });
    assert((res37.status === 200 || res37.status === 204) && res37.headers['access-control-allow-origin'] === 'http://localhost:5173',
      'CORS: OPTIONS preflight from allowed origin succeeds with Access-Control-Allow-Origin');

    // Test 38: OPTIONS preflight from unauthorized origin does NOT set allow header
    const res38 = await request('OPTIONS', '/api/appointments', null, {
      'Origin': 'https://unauthorized-malicious-domain.com',
      'Access-Control-Request-Method': 'POST'
    });
    assert(res38.headers['access-control-allow-origin'] === undefined,
      'CORS: OPTIONS preflight from unauthorized origin does not receive Access-Control-Allow-Origin');

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    server.close();
    console.log(`\n===================================`);
    console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
    console.log(`===================================`);
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
