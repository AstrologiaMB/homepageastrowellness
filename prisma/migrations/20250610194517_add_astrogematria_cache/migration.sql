-- CreateTable
CREATE TABLE "AstrogematriaCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "palabra" TEXT NOT NULL,
    "palabraProcesada" TEXT NOT NULL,
    "valorTotal" INTEGER NOT NULL,
    "reduccionZodiacal" INTEGER NOT NULL,
    "signo" TEXT NOT NULL,
    "grados" INTEGER NOT NULL,
    "posicionCompleta" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AstrogematriaCache_palabra_key" ON "AstrogematriaCache"("palabra");
