-- CreateTable
CREATE TABLE "PersonalCalendarCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "events" TEXT NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalCalendarCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PersonalCalendarCache_expiresAt_idx" ON "PersonalCalendarCache"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalCalendarCache_userId_year_key" ON "PersonalCalendarCache"("userId", "year");

-- AddForeignKey
ALTER TABLE "PersonalCalendarCache" ADD CONSTRAINT "PersonalCalendarCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
