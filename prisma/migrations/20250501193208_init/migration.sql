-- CreateTable
CREATE TABLE "User" (
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
    "timezone" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
