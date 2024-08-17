-- CreateTable
CREATE TABLE `User` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `cpf` VARCHAR(14) NULL,
    `cnpj` VARCHAR(18) NULL,
    `phone` VARCHAR(15) NULL,
    `ong` VARCHAR(50) NULL,
    `socialMedia` VARCHAR(50) NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `User_cpf_key`(`cpf`),
    UNIQUE INDEX `User_cnpj_key`(`cnpj`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animal` (
    `idAnimal` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `gender` CHAR(1) NULL,
    `size` VARCHAR(10) NOT NULL,
    `age` INTEGER NOT NULL,
    `species` VARCHAR(10) NOT NULL,
    `breed` VARCHAR(50) NOT NULL,
    `information` VARCHAR(100) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `state` VARCHAR(50) NOT NULL,
    `adress` VARCHAR(50) NOT NULL,
    `neighborhood` VARCHAR(50) NOT NULL,
    `number` INTEGER NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`idAnimal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interest` (
    `idInterest` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `idAnimal` INTEGER NOT NULL,
    `interestedAt` DATETIME(3) NOT NULL,
    `confirmed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`idInterest`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interest` ADD CONSTRAINT `Interest_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interest` ADD CONSTRAINT `Interest_idAnimal_fkey` FOREIGN KEY (`idAnimal`) REFERENCES `Animal`(`idAnimal`) ON DELETE RESTRICT ON UPDATE CASCADE;
