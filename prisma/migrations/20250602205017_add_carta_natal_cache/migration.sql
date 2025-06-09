-- CreateTable
CREATE TABLE "CartaNatal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataCompleta" TEXT NOT NULL,
    "dataReducida" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CartaNatal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CartaNatal_userId_tipo_fechaNacimiento_lugarNacimiento_key" ON "CartaNatal"("userId", "tipo", "fechaNacimiento", "lugarNacimiento");
