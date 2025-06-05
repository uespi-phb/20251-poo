BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "bank" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "account" (
    "id" INTEGER NOT NULL,
    "agency" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "holder" INTEGER NOT NULL,
    "bank_id" INTEGER NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    CONSTRAINT "account_bank_FK" FOREIGN KEY("bank_id") REFERENCES "bank"("id")
);

CREATE TABLE IF NOT EXISTS "transaction" (
    "id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "value" NUMERIC NOT NULL,
    "type" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    CONSTRAINT "transaction_account_FK" FOREIGN KEY("account_id") REFERENCES "account"("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "account_agency_number_idx" ON "account" ("agency", "number");

COMMIT;