-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost
-- Vytvořeno: Stř 12. říj 2022, 11:14
-- Verze serveru: 10.4.22-MariaDB
-- Verze PHP: 8.1.1

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
-- Struktura tabulky `insured_persons`
--

CREATE TABLE `insured_persons` (
  `id` int(11) NOT NULL,
  `dateRegistration` date NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `birthdate` date NOT NULL,
  `city` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `NIP` int(11) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `insurerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `insured_persons`
--

INSERT INTO `insured_persons` (`id`, `dateRegistration`, `firstName`, `lastName`, `birthdate`, `city`, `address`, `NIP`, `phone`, `email`, `insurerID`) VALUES
(1, '2022-10-04', 'Karel', 'Novák', '1966-11-04', 'Brno', 'Loketová 26', 67500, 605667545, 'novak.karel@gmail.com', 1),
(2, '2022-10-13', 'Daniela', 'Svobodová', '1988-12-09', 'Plzeň', 'Polní 22', 60700, 605552342, 'svobodova.daniela@seznam.cz', 1),
(3, '2022-10-07', 'Petr', 'Černý', '1987-08-09', 'Havířov', 'Šramková 14', 77602, 606445233, 'cernypetr22@gmail.com', 1),
(4, '2022-10-22', 'Zita', 'Jelínková', '1992-12-06', 'Praha', 'Masaryková 12', 70001, 662505342, 'jelzita2@seznam.cz', 1),
(5, '2022-10-06', 'Petra', 'Benešová', '1990-03-07', 'Praha', 'Dlouhá třída 2', 70001, 702334767, 'benesova.petra@gmail.com', 1),
(6, '2022-10-04', 'Marta', 'Pospíšilová', '1960-03-09', 'Benešov', 'Národní třída 34', 60654, 556435706, 'pospisilova32@centrum.cz', 1),
(8, '2022-10-08', 'Marian', 'Modrý', '1989-10-08', 'Pardubice', 'Valentova 98', 67543, 654443221, 'modry@seznam.cz', 1),
(9, '2022-10-12', 'Tomáš', 'Martinek', '1987-06-17', 'Karviná', 'Modrá 11', 78900, 765434231, 'tomas22martinek@seznam.cz', 1);

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `insured_persons`
--
ALTER TABLE `insured_persons`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `insured_persons`
--
ALTER TABLE `insured_persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
