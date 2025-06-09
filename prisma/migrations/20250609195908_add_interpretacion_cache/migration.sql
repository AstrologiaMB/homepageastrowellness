-- CreateTable
CREATE TABLE "InterpretacionCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "interpretacionNarrativa" TEXT NOT NULL,
    "interpretacionesIndividuales" TEXT NOT NULL,
    "tiempoGeneracion" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InterpretacionCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "InterpretacionCache_userId_fechaNacimiento_lugarNacimiento_gender_tipo_key" ON "InterpretacionCache"("userId", "fechaNacimiento", "lugarNacimiento", "gender", "tipo");
