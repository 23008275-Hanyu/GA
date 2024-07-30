-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2024 at 02:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventId` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `price` double(10,2) DEFAULT NULL,
  `phone_number` varchar(45) NOT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventId`, `title`, `description`, `date`, `price`, `phone_number`, `image`) VALUES
(14, 'Cotton Candy', 'Looking for people help to do Cotton Candy', '2024-07-18', 100.00, '22334455', 'https://hips.hearstapps.com/del.h-cdn.co/assets/16/04/1454021018-6171344221-a226f8a045-o-1.jpg?crop=1.0xw:1xh;center,top&resize=640:*'),
(15, 'Popcorn', 'Looking for popcorn machine', '2024-07-24', 250.00, '12345678', 'https://www.browneyedbaker.com/wp-content/uploads/2021/03/how-to-make-popcorn-10-square.jpg'),
(16, 'Muah Chee', 'Looking for muah chee company', '2026-08-01', 50.00, '56789012', 'https://woonheng.com/wp-content/uploads/2021/06/Boiled-Muah-Chee-Mochi-4569-scaled-e1622910414394.jpg'),
(17, 'Corn Cup', 'Looking for event company that can help me do corn cup ', '2024-07-23', 300.00, '98765432', 'https://www.tastysnack.asia/cdn/shop/files/CupCorn1_1000x1000.png?v=1684721949'),
(18, 'Bubble tea', 'Looking for event company that can pre-make 500 cups of bubble tea for my event', '2024-07-18', 1350.00, '23454321', 'https://assets.epicurious.com/photos/5953ca064919e41593325d97/1:1/w_2560%2Cc_limit/bubble_tea_recipe_062817.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
