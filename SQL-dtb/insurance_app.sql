-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Čtv 10. lis 2022, 07:18
-- Verze serveru: 8.0.26
-- Verze PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `insurance_app`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `insurance`
--

CREATE TABLE `insurance` (
  `id` int NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `amount` int NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `validFrom` date NOT NULL,
  `validUntil` date NOT NULL,
  `insuredPersonID` int NOT NULL,
  `insurerID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `insurance`
--

INSERT INTO `insurance` (`id`, `type`, `amount`, `subject`, `validFrom`, `validUntil`, `insuredPersonID`, `insurerID`) VALUES
(1, 'Pojištění vozidla', 650000, 'Škoda Fabia iV', '2022-11-03', '2024-10-25', 1, 1),
(4, 'Pojištění vozidla', 400000, 'Skoda Rapid', '2022-11-03', '2025-10-22', 3, 1),
(5, 'Pojištění vozidla', 1200000, 'Volvo V90', '2022-11-03', '2024-06-27', 3, 1),
(6, 'Životní pojištění', 2000000, 'Vlastník', '2022-11-03', '2023-09-27', 4, 1),
(7, 'Životní pojištění', 2000000, 'Lenka Jelínková', '2022-11-03', '2025-10-04', 4, 1),
(8, 'Cestovní pojištění', 500000, 'Itálie', '2022-11-03', '2022-10-14', 4, 1),
(11, 'Pojištění vozidla', 600000, 'Škoda Fabia iV', '2022-11-03', '2024-11-21', 4, 2),
(12, 'Životní pojištění', 1000000, 'Vlastník', '2022-11-03', '2026-10-15', 8, 1),
(13, 'Životní pojištění', 2000000, 'Vlastník', '2022-11-03', '2022-11-10', 1, 1),
(14, 'Cestovní pojištění', 11111, 'Rusko', '2022-11-03', '2022-10-27', 1, 1),
(15, 'Pojištění vozidla', 1250000, 'BMW M3', '2022-11-03', '2022-12-31', 3, 1),
(16, 'Cestovní pojištění', 200000, 'Kypr', '2022-11-03', '2022-12-30', 8, 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `insured_persons`
--

CREATE TABLE `insured_persons` (
  `id` int NOT NULL,
  `dateRegistration` date NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `lastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `birthdate` date NOT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `NIP` int NOT NULL,
  `phone` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `insurerID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `insured_persons`
--

INSERT INTO `insured_persons` (`id`, `dateRegistration`, `firstName`, `lastName`, `birthdate`, `city`, `address`, `NIP`, `phone`, `email`, `insurerID`) VALUES
(1, '2022-11-03', 'Karel', 'Novák', '1966-11-04', 'Brno', 'Loketová 26', 67500, 605667545, 'novak.karel@gmail.com', 1),
(2, '2022-11-03', 'Daniela', 'Svobodová', '1988-12-09', 'Plzeň', 'Polní 22', 60700, 605552342, 'svobodova.daniela@seznam.cz', 1),
(3, '2022-11-03', 'Petr', 'Černý', '1987-08-09', 'Havířov', 'Šramková 14', 77602, 606445233, 'cernypetr22@gmail.com', 1),
(4, '2022-11-03', 'Zita', 'Jelínková', '1992-12-06', 'Praha', 'Masaryková 12', 70001, 662505342, 'jelzita2@seznam.cz', 1),
(5, '2022-11-03', 'Petra', 'Benešová', '1990-03-07', 'Praha', 'Dlouhá třída 2', 70001, 702334767, 'benesova.petra@gmail.com', 1),
(6, '2022-11-03', 'Marta', 'Pospíšilová', '1960-03-09', 'Benešov', 'Národní třída 34', 60654, 556435706, 'pospisilova32@centrum.cz', 1),
(8, '2022-11-03', 'Marian', 'Modrý', '1989-10-08', 'Pardubice', 'Valentova 98', 67543, 654443221, 'modry@seznam.cz', 1),
(9, '2022-11-03', 'Tomáš', 'Martinek', '1987-06-17', 'Karviná', 'Modrá 11', 78900, 765434231, 'tomas22martinek@seznam.cz', 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `insurers`
--

CREATE TABLE `insurers` (
  `id` int NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `password` varchar(280) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `insurers`
--

INSERT INTO `insurers` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES
(1, 'Michal', 'Novák', 'novak@app.cz', '$2y$10$WqBRt5yFz2ibBMyE7hg96OC8pFvbfpFtCMBT6ACEjQOjLZpdzs/vy');

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `password` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `role` int NOT NULL,
  `insurer` int DEFAULT NULL,
  `person` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `insurer`, `person`) VALUES
(1, 'novak@app.cz', '$2y$10$WqBRt5yFz2ibBMyE7hg96OC8pFvbfpFtCMBT6ACEjQOjLZpdzs/vy', 1, 1, NULL),
(4, 'modry@seznam.cz', '$2y$10$pcMZZRTsS0oVSxX0FG8BX.nz7mNLLotmejJR.sJWVXYOiYjjL6lvO', 2, NULL, 8);

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `insurance`
--
ALTER TABLE `insurance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `insuredPersonID` (`insuredPersonID`);

--
-- Indexy pro tabulku `insured_persons`
--
ALTER TABLE `insured_persons`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `insurers`
--
ALTER TABLE `insurers`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person` (`person`),
  ADD KEY `insurer` (`insurer`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `insurance`
--
ALTER TABLE `insurance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pro tabulku `insured_persons`
--
ALTER TABLE `insured_persons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pro tabulku `insurers`
--
ALTER TABLE `insurers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `insurance`
--
ALTER TABLE `insurance`
  ADD CONSTRAINT `insurance_ibfk_1` FOREIGN KEY (`insuredPersonID`) REFERENCES `insured_persons` (`id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`person`) REFERENCES `insured_persons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`insurer`) REFERENCES `insurers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
