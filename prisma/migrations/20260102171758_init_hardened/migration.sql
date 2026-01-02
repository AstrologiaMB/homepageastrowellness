-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "birthDate" TIMESTAMP(3),
    "birthCity" TEXT,
    "birthCountry" TEXT,
    "birthHour" INTEGER,
    "birthMinute" INTEGER,
    "knowsBirthTime" BOOLEAN NOT NULL DEFAULT true,
    "birthDataChangeCount" INTEGER NOT NULL DEFAULT 0,
    "gender" TEXT,
    "residenceCity" TEXT,
    "residenceCountry" TEXT,
    "timezone" TEXT,
    "rectificationRequested" BOOLEAN NOT NULL DEFAULT false,
    "rectificationAcceptedUncertainty" BOOLEAN NOT NULL DEFAULT false,
    "rectificationStatus" TEXT,
    "rectificationRequestDate" TIMESTAMP(3),
    "stripeCustomerId" TEXT,
    "hasDraconicAccess" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripeCurrentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "stripePriceId" TEXT,
    "hasBaseBundle" BOOLEAN NOT NULL DEFAULT false,
    "hasLunarCalendar" BOOLEAN NOT NULL DEFAULT false,
    "hasAstrogematria" BOOLEAN NOT NULL DEFAULT false,
    "hasElectiveChart" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RectificationEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RectificationEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartaNatal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataCompleta" TEXT NOT NULL,
    "dataReducida" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartaNatal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterpretacionCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "interpretacionNarrativa" TEXT,
    "interpretacionesIndividuales" TEXT,
    "tiempoGeneracion" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterpretacionCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AstrogematriaCache" (
    "id" TEXT NOT NULL,
    "palabra" TEXT NOT NULL,
    "palabraProcesada" TEXT NOT NULL,
    "valorTotal" INTEGER NOT NULL,
    "reduccionZodiacal" INTEGER NOT NULL,
    "signo" TEXT NOT NULL,
    "grados" INTEGER NOT NULL,
    "posicionCompleta" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AstrogematriaCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorariaRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "acceptSingleQuestion" TEXT NOT NULL,
    "isFirstTime" TEXT NOT NULL,
    "questionCategory" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "context" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "response" TEXT,
    "responseDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HorariaRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalCalendarCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "events" TEXT NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalCalendarCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LunarPhasesCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "events" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LunarPhasesCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LunarJournal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "eventType" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LunarJournal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_userId_key" ON "UserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripeSubscriptionId_key" ON "UserSubscription"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "CartaNatal_userId_tipo_fechaNacimiento_lugarNacimiento_key" ON "CartaNatal"("userId", "tipo", "fechaNacimiento", "lugarNacimiento");

-- CreateIndex
CREATE UNIQUE INDEX "InterpretacionCache_userId_fechaNacimiento_lugarNacimiento__key" ON "InterpretacionCache"("userId", "fechaNacimiento", "lugarNacimiento", "gender", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "AstrogematriaCache_palabra_key" ON "AstrogematriaCache"("palabra");

-- CreateIndex
CREATE INDEX "PersonalCalendarCache_expiresAt_idx" ON "PersonalCalendarCache"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalCalendarCache_userId_year_key" ON "PersonalCalendarCache"("userId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "LunarPhasesCache_userId_year_key" ON "LunarPhasesCache"("userId", "year");

-- CreateIndex
CREATE INDEX "LunarJournal_userId_date_idx" ON "LunarJournal"("userId", "date");

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RectificationEvent" ADD CONSTRAINT "RectificationEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartaNatal" ADD CONSTRAINT "CartaNatal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpretacionCache" ADD CONSTRAINT "InterpretacionCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorariaRequest" ADD CONSTRAINT "HorariaRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalCalendarCache" ADD CONSTRAINT "PersonalCalendarCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunarPhasesCache" ADD CONSTRAINT "LunarPhasesCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunarJournal" ADD CONSTRAINT "LunarJournal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
