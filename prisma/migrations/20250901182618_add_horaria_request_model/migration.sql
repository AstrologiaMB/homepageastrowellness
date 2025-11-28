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

-- AddForeignKey
ALTER TABLE "HorariaRequest" ADD CONSTRAINT "HorariaRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
