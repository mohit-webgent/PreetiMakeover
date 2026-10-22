const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Preeti Makeover Database Seed ---');

  // 1. Initial Admin User (if not already existing)
  const defaultAdminEmail = (process.env.INITIAL_ADMIN_EMAIL || 'admin@preetimakeover.com').trim().toLowerCase();
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: defaultAdminEmail } });
  
  if (!existingAdmin) {
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    if (!adminPassword && process.env.NODE_ENV === 'production') {
      console.warn('⚠️ WARNING: INITIAL_ADMIN_PASSWORD not provided in production. Skipping admin user creation.');
      console.warn('Run "npm run admin:setup" to set up administrator credentials securely.');
    } else {
      const passToUse = adminPassword || 'PreetiMakeover@2026'; // development fallback only
      const passwordHash = await bcrypt.hash(passToUse, 12);
      await prisma.adminUser.create({
        data: {
          email: defaultAdminEmail,
          passwordHash,
          name: 'Preeti Mandal',
          role: 'admin'
        }
      });
      console.log(`Seeded Initial Admin User: ${defaultAdminEmail}`);
    }
  } else {
    console.log(`Admin User ${defaultAdminEmail} already exists.`);
  }

  // 2. Business Settings
  const settings = await prisma.businessSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      businessName: 'Preeti Makeover',
      tagline: 'Your Beauty Is Our Duty.',
      ownerName: 'Preeti Mandal',
      phone: '+918810359438',
      whatsapp: '+918810359438',
      email: 'preetimakeoverpm@gmail.com',
      address: 'D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044',
      openingHour: '10:00 AM',
      closingHour: '09:00 PM',
      weeklyOffDay: 'Tuesday',
      googleMapsUrl: 'https://maps.google.com/?q=D/109+Prince+Colony+Harinagar+Jaitpur+Badarpur+New+Delhi+110044'
    }
  });
  console.log('Seeded Business Settings:', settings.businessName);

  // 2. Service Categories & Services
  const categoriesData = [
    {
      name: 'Hair Care & Treatments',
      slug: 'hair-care-treatments',
      description: 'Advanced hair transformations, smoothing, clinical rejuvenation and styling using L’Oréal, Matrix, Streax, and Schwarzkopf.',
      displayOrder: 1,
      services: [
        { name: 'Haircuts & Styling', slug: 'haircuts-styling', startingPrice: null, durationMinutes: 45, isFeatured: true },
        { name: 'Hair Spa Rejuvenation', slug: 'hair-spa-rejuvenation', startingPrice: null, durationMinutes: 60, isFeatured: true },
        { name: 'Hair Straightening', slug: 'hair-straightening', startingPrice: null, durationMinutes: 180, isFeatured: false },
        { name: 'Hair Smoothing', slug: 'hair-smoothing', startingPrice: null, durationMinutes: 180, isFeatured: true },
        { name: 'Keratin Protein Treatment', slug: 'keratin-treatment', startingPrice: null, durationMinutes: 150, isFeatured: true },
        { name: 'Hair Botox Restoration', slug: 'hair-botox', startingPrice: null, durationMinutes: 150, isFeatured: true },
        { name: 'Nanoplastia Treatment', slug: 'nanoplastia-treatment', startingPrice: null, durationMinutes: 180, isFeatured: true },
        { name: 'Global Hair Colour', slug: 'global-hair-colour', startingPrice: null, durationMinutes: 120, isFeatured: false },
        { name: 'Highlights & Balayage', slug: 'highlights-balayage', startingPrice: null, durationMinutes: 150, isFeatured: true }
      ]
    },
    {
      name: 'Skin Care & Luxury Facials',
      slug: 'skin-care-facials',
      description: 'Medical-grade and herbal facials for glowing, healthy skin using Casmara, Kanpeki, O3+ Professional, Lotus, VLCC, Aroma Magic, Oxylife, Sara, and Shills.',
      displayOrder: 2,
      services: [
        { name: 'Casmara Luxury Algae Facial', slug: 'casmara-luxury-facial', startingPrice: null, durationMinutes: 75, isFeatured: true },
        { name: 'Kanpeki Professional Skin Treatment', slug: 'kanpeki-skin-treatment', startingPrice: null, durationMinutes: 75, isFeatured: true },
        { name: 'O3+ Professional Brightening Facial', slug: 'o3-plus-brightening-facial', startingPrice: null, durationMinutes: 60, isFeatured: true },
        { name: 'Herbal Deep Cleanse Facial (Lotus / VLCC)', slug: 'herbal-deep-cleanse', startingPrice: null, durationMinutes: 60, isFeatured: false },
        { name: 'Oxylife Oxygen Radiance Facial', slug: 'oxylife-oxygen-facial', startingPrice: null, durationMinutes: 60, isFeatured: false },
        { name: 'Skin Bleach & De-Tan Therapy', slug: 'bleach-detan-therapy', startingPrice: null, durationMinutes: 40, isFeatured: false }
      ]
    },
    {
      name: 'Bridal & Occasion Makeover',
      slug: 'bridal-occasion-makeover',
      description: 'Signature bridal and party transformations crafted by Preeti Mandal with premium national & international luxury makeup brands.',
      displayOrder: 3,
      services: [
        { name: 'Pre-Bridal Glow Care Package', slug: 'pre-bridal-care-package', startingPrice: null, durationMinutes: 240, isFeatured: true },
        { name: 'Signature Bridal HD Makeup', slug: 'signature-bridal-hd-makeup', startingPrice: null, durationMinutes: 180, isFeatured: true },
        { name: 'Party & Engagement Glam Makeup', slug: 'party-glam-makeup', startingPrice: null, durationMinutes: 90, isFeatured: true },
        { name: 'Designer Saree & Dupatta Draping', slug: 'designer-draping', startingPrice: null, durationMinutes: 30, isFeatured: false },
        { name: 'Bridal Hairstyling & Extensions', slug: 'bridal-hairstyling', startingPrice: null, durationMinutes: 60, isFeatured: false }
      ]
    },
    {
      name: 'Waxing & Grooming',
      slug: 'waxing-grooming',
      description: 'Gentle, hygienic hair removal using premium Rica, Raga, and Honeycare waxes.',
      displayOrder: 4,
      services: [
        { name: 'Rica Liposoluble Italian Waxing', slug: 'rica-waxing', startingPrice: null, durationMinutes: 45, isFeatured: true },
        { name: 'Honeycare Soft Waxing', slug: 'honeycare-waxing', startingPrice: null, durationMinutes: 45, isFeatured: false },
        { name: 'Precision Eyebrow & Face Threading', slug: 'precision-threading', startingPrice: null, durationMinutes: 20, isFeatured: false },
        { name: 'Full Body Polishing & Exfoliation', slug: 'body-polishing-exfoliation', startingPrice: null, durationMinutes: 90, isFeatured: true }
      ]
    },
    {
      name: 'Hands, Feet & Nails',
      slug: 'hands-feet-nails',
      description: 'Pampering manicure, pedicure, and bespoke nail artistry.',
      displayOrder: 5,
      services: [
        { name: 'Classic Spa Manicure', slug: 'classic-spa-manicure', startingPrice: null, durationMinutes: 45, isFeatured: false },
        { name: 'Relaxing Spa Pedicure', slug: 'relaxing-spa-pedicure', startingPrice: null, durationMinutes: 50, isFeatured: false },
        { name: 'Creative Nail Art & Gel Extensions', slug: 'creative-nail-art', startingPrice: null, durationMinutes: 60, isFeatured: true }
      ]
    }
  ];

  for (const catData of categoriesData) {
    const { services, ...categoryFields } = catData;
    const category = await prisma.serviceCategory.upsert({
      where: { slug: categoryFields.slug },
      update: categoryFields,
      create: categoryFields
    });

    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      await prisma.service.upsert({
        where: { slug: s.slug },
        update: {
          name: s.name,
          startingPrice: s.startingPrice,
          durationMinutes: s.durationMinutes,
          isFeatured: s.isFeatured,
          displayOrder: i + 1,
          categoryId: category.id
        },
        create: {
          name: s.name,
          slug: s.slug,
          startingPrice: s.startingPrice,
          durationMinutes: s.durationMinutes,
          isFeatured: s.isFeatured,
          displayOrder: i + 1,
          categoryId: category.id
        }
      });
    }
    console.log(`Seeded category: ${category.name} (${services.length} services)`);
  }

  console.log('--- Database Seed Configuration Prepared Successfully ---');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
