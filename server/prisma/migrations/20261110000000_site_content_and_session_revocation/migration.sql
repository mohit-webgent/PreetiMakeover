-- Adds the CMS SiteContent table (previously created only via `prisma db push`)
-- and AdminUser.passwordChangedAt for revoking sessions after a password change.
-- Written idempotently so it is safe on databases that already have these objects.

CREATE TABLE IF NOT EXISTS "SiteContent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "label" TEXT,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "SiteContent_key_key" ON "SiteContent"("key");
CREATE INDEX IF NOT EXISTS "SiteContent_section_idx" ON "SiteContent"("section");

ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "passwordChangedAt" TIMESTAMP(3);
