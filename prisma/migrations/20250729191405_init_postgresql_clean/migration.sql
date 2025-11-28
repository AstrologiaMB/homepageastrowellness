-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "birthDate" TIMESTAMP(3),
    "birthCity" TEXT,
    "birthCountry" TEXT,
    "birthHour" INTEGER,
    "birthMinute" INTEGER,
    "knowsBirthTime" BOOLEAN NOT NULL DEFAULT true,
    "gender" TEXT,
    "residenceCity" TEXT,
    "residenceCountry" TEXT,
    "timezone" TEXT,
    "rectificationRequested" BOOLEAN NOT NULL DEFAULT false,
    "rectificationAcceptedUncertainty" BOOLEAN NOT NULL DEFAULT false,
    "rectificationStatus" TEXT,
    "rectificationRequestDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
    "interpretacionNarrativa" TEXT NOT NULL,
    "interpretacionesIndividuales" TEXT NOT NULL,
    "tiempoGeneracion" DOUBLE PRECISION NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CartaNatal_userId_tipo_fechaNacimiento_lugarNacimiento_key" ON "CartaNatal"("userId", "tipo", "fechaNacimiento", "lugarNacimiento");

-- CreateIndex
CREATE UNIQUE INDEX "InterpretacionCache_userId_fechaNacimiento_lugarNacimiento__key" ON "InterpretacionCache"("userId", "fechaNacimiento", "lugarNacimiento", "gender", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "AstrogematriaCache_palabra_key" ON "AstrogematriaCache"("palabra");

-- AddForeignKey
ALTER TABLE "RectificationEvent" ADD CONSTRAINT "RectificationEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartaNatal" ADD CONSTRAINT "CartaNatal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpretacionCache" ADD CONSTRAINT "InterpretacionCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
