CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE "users" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(254) NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "readings" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "date" DATE NOT NULL,
  "slot" VARCHAR(32) NOT NULL,
  "value" INTEGER NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "readings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "readings_value_range" CHECK ("value" >= 40 AND "value" <= 600),
  CONSTRAINT "readings_slot_check" CHECK ("slot" IN ('morning','after_breakfast','after_lunch','after_dinner')),
  CONSTRAINT "readings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "readings_user_id_date_slot_key" ON "readings"("user_id", "date", "slot");
CREATE INDEX "readings_user_id_date_idx" ON "readings"("user_id", "date");
