-- CreateTable
CREATE TABLE "RectificationEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RectificationEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "birthDate" DATETIME,
    "birthCity" TEXT,
    "birthCountry" TEXT,
    "birthHour" INTEGER,
    "birthMinute" INTEGER,
    "knowsBirthTime" BOOLEAN NOT NULL DEFAULT true,
    "residenceCity" TEXT,
    "residenceCountry" TEXT,
    "timezone" TEXT,
    "rectificationRequested" BOOLEAN NOT NULL DEFAULT false,
    "rectificationAcceptedUncertainty" BOOLEAN NOT NULL DEFAULT false,
    "rectificationStatus" TEXT,
    "rectificationRequestDate" DATETIME
);
INSERT INTO "new_User" ("birthCity", "birthCountry", "birthDate", "birthHour", "birthMinute", "createdAt", "email", "id", "image", "knowsBirthTime", "name", "residenceCity", "residenceCountry", "timezone", "updatedAt") SELECT "birthCity", "birthCountry", "birthDate", "birthHour", "birthMinute", "createdAt", "email", "id", "image", "knowsBirthTime", "name", "residenceCity", "residenceCountry", "timezone", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
