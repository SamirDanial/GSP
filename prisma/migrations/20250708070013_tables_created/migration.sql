-- CreateTable
CREATE TABLE "restaurents" (
    "restaurent_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(500) NOT NULL,

    CONSTRAINT "restaurents_pkey" PRIMARY KEY ("restaurent_id")
);

-- CreateTable
CREATE TABLE "owners" (
    "owner_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "restaurentId" INTEGER NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("owner_id")
);

-- CreateTable
CREATE TABLE "employees" (
    "employee_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "restaurentId" INTEGER NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employee_id")
);

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_restaurentId_fkey" FOREIGN KEY ("restaurentId") REFERENCES "restaurents"("restaurent_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_restaurentId_fkey" FOREIGN KEY ("restaurentId") REFERENCES "restaurents"("restaurent_id") ON DELETE RESTRICT ON UPDATE CASCADE;
