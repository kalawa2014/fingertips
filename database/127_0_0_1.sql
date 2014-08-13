-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 12 Août 2014 à 23:27
-- Version du serveur :  5.6.16
-- Version de PHP :  5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `dbkeaboard`
--
CREATE DATABASE IF NOT EXISTS `dbkeaboard` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `dbkeaboard`;

-- --------------------------------------------------------

--
-- Structure de la table `activities`
--

CREATE TABLE IF NOT EXISTS `activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `details` text,
  `id_user` char(50) DEFAULT NULL,
  `keyboard` varchar(20) DEFAULT 'A',
  `more` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=86 ;

--
-- Contenu de la table `activities`
--

INSERT INTO `activities` (`id`, `name`, `details`, `id_user`, `keyboard`, `more`) VALUES
(1, 'Restaurant Kapi', 'Petit frère du Kika situé dans le centre-ville, Kaki propose une alimentation saine et équilibrée faite d''aliments frais crûs ou cuits vapeurs. Parfaites pour le lunch ou pour une restauration éclectique en soirée, les préparations se déclinent en petites portions coûtant entre 2,5 et 6 €. Dans un cadre d''un blanc éclatant, on s''installe sur de longs bancs, accentuant la convivialité de l''endroit. Devenu un must dans le quartier, il n''est pas rare d''y croiser des personnalités issues de tous les milieux. Bref, un endroit tendance à la cuisine plus que sympathique !', 'andre.kalawa@gmail.com', 'R', NULL),
(2, 'Golf club de Mougin', 'Royal Mougins Golf Club\nBienvenue au cœur d’une forêt provençale, à seulement 10 minutes de Cannes, loin de l’agitation quotidienne… Un monde de golf et de bien-être où chacun respecte le parcours et la nature environnante', 'alain.tixier@soft.biz', 'O', 'http://www.golfcannesmougins.com/fr/'),
(3, 'Restaurant du Lys', 'bla vladasdfq\nfdqf\nsd\nfsd\nfqfq', '1', 'R', NULL),
(4, 'Golf club de Biot', 'sdfsdfdsf', '2', 'O', NULL),
(5, 'Restaurant Chinois', 'Le chinoios du coin', 'andre.kalawa@gmail.com', 'R', NULL),
(6, 'Restaurant Indien ', 'Le Taj Mahal de Nice', 'andre.kalawa@gmail.com', 'R', NULL),
(7, 'Restaurant Le marseillais', 'Le marseillaisfzefzefzef\r\nsdhgdjgh,\r\nsfqghfghfsg', 'andre.kalawa@gmail.com', 'R', NULL),
(84, 'MakoumBA', 'Illud tamen clausos vehementer angebat quod captis navigiis, quae frumenta vehebant per flumen, Isauri quidem alimentorum copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo inediae propinquantis aerumnas exitialis horrebant.', '0', 'A', 'ddd'),
(85, 'Nice Club', 'uploader.progress Illud tamen clausos vehementer angebat quod captis navigiis, quae frumenta vehebant per flumen, Isauri quidem alimentorum copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo inediae propinquantis aerumnas exitialis horrebant.', '0', 'A', 'rrr');

-- --------------------------------------------------------

--
-- Structure de la table `appointements`
--

CREATE TABLE IF NOT EXISTS `appointements` (
  `dateofapp` date NOT NULL,
  `id_customer` varchar(255) NOT NULL,
  `id_products` int(11) NOT NULL,
  `id_hour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `appointements`
--

INSERT INTO `appointements` (`dateofapp`, `id_customer`, `id_products`, `id_hour`) VALUES
('2014-04-23', 'toto@ici.fr', 3, 2),
('2014-04-23', 'toto@ici.fr', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `chart`
--

CREATE TABLE IF NOT EXISTS `chart` (
  `id_customer` varchar(50) NOT NULL,
  `id_product` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `email` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  `surname` varchar(250) NOT NULL,
  `phone` varchar(12) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `hours`
--

CREATE TABLE IF NOT EXISTS `hours` (
  `id` int(11) NOT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `hours`
--

INSERT INTO `hours` (`id`, `start`, `end`) VALUES
(1, '08:00:00', '08:30:00'),
(2, '08:30:00', '09:00:00'),
(3, '09:00:00', '09:30:00');

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
  `path` varchar(255) NOT NULL,
  `id_activity` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `type_activity` varchar(50) DEFAULT NULL,
  `extension` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `photos`
--

INSERT INTO `photos` (`path`, `id_activity`, `id_product`, `type_activity`, `extension`) VALUES
('img/activities/img_a_1_1', 1, NULL, NULL, 'jpg'),
('img/activities/img_a_1_2', 1, NULL, NULL, 'jpg'),
('img/activities/img_a_2_1', 2, NULL, NULL, 'jpg'),
('img/activities/img_a_2_2', 2, NULL, NULL, 'jpg'),
('img/activities/img_a_2_3', 2, NULL, NULL, 'jpg'),
('img/activities/img_a_84_1', 84, NULL, NULL, 'jpg'),
('img/activities/img_a_84_2', 84, NULL, NULL, 'jpg'),
('img/activities/img_a_84_3', 84, NULL, NULL, 'jpg'),
('img/activities/img_a_85_1', 85, NULL, NULL, 'jpg'),
('img/activities/img_a_85_2', 85, NULL, NULL, 'jpg'),
('img/activities/img_a_85_3', 85, NULL, NULL, 'jpg'),
('img/activities/img_a_85_4', 85, NULL, NULL, 'jpg'),
('img/activities/img_p_1_1', NULL, 1, NULL, 'jpg'),
('img/activities/img_p_1_2', NULL, 1, NULL, 'jpg'),
('img/activities/qrcode_a_1', 1, NULL, NULL, 'png'),
('img/activities/qrcode_a_2', 2, NULL, NULL, 'png'),
('img/activities/qrcode_a_84', 84, NULL, NULL, 'jpg'),
('img/activities/qrcode_a_85', 85, NULL, NULL, 'png'),
('img/activities/qrcode_p_1', NULL, 1, NULL, 'png'),
('img/activities/qrcode_p_2', NULL, 2, NULL, 'png'),
('img/activities/qrcode_p_3', NULL, 3, NULL, 'png'),
('img/activities/qrcode_p_4', NULL, 4, NULL, 'png'),
('img/activities/qrcode_p_5', 1, 5, NULL, 'png'),
('img/activities/qrcode_p_6', 1, 6, NULL, 'png');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `details` text,
  `price` float DEFAULT '0',
  `number` bigint(20) DEFAULT NULL,
  `id_activity` int(11) DEFAULT NULL,
  `type` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `products`
--

INSERT INTO `products` (`id`, `name`, `details`, `price`, `number`, `id_activity`, `type`) VALUES
(1, 'Repas de Midi', 'Menu à 10€', 10, 100, 1, 0),
(2, 'Buffet', 'Repas du soir et les week end à 25€', 25, 100, 1, 1),
(3, 'Cours de golf pour débutant', 'Inier vous aux golf', 40, 50, 2, 1),
(4, 'Promotions de 50% sur les clubs', 'Inier vous aux golf\r\nBeneficier d''une promotion sur les produits sur les clubssur les clubssur les clubssur les clubssur les clubssur les clubssur les clubssur les clubssur les clubssur les clubs', 400, 50, 2, 0),
(5, 'Menu du Soir', 'Menu à 20€', 20, 100, 1, 0),
(6, 'Menu du Diner', 'Menu à 50€', 20, 100, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `slides`
--

CREATE TABLE IF NOT EXISTS `slides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=69 ;

--
-- Contenu de la table `slides`
--

INSERT INTO `slides` (`id`, `path`) VALUES
(63, 'img/slides/vitrine/img2.jpg'),
(64, 'img/slides/vitrine/img3.jpg'),
(65, 'img/slides/vitrine/img4.jpg'),
(66, 'img/slides/vitrine/img5.jpg'),
(67, 'img/slides/vitrine/Chrysanthemum.jpg'),
(68, 'img/slides/vitrine/Desert.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `typeactivity`
--

CREATE TABLE IF NOT EXISTS `typeactivity` (
  `nom` varchar(50) NOT NULL,
  `raccourci` char(50) DEFAULT NULL,
  `clavier` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `typeactivity`
--

INSERT INTO `typeactivity` (`nom`, `raccourci`, `clavier`) VALUES
('Ambiance', 'A', 'Simple'),
('Beauty', 'B', 'Simple'),
('Change', 'C', 'Simple'),
('Charter Yacht', 'Y', 'Simple'),
('Divertissement', 'D', 'Simple'),
('Events', 'E', 'Simple'),
('Fashion', 'F', 'Simple'),
('Golf', 'O', 'Simple'),
('Guide', 'G', 'Simple'),
('Helicopter', 'H', 'Simple'),
('Information', 'I', 'Simple'),
('Jewellery', 'J', 'Simple'),
('Kulture', 'K', 'Simple'),
('Luxury', 'L', 'Simple'),
('Musee', 'M', 'Simple'),
('Nature', 'N', 'Simple'),
('Plages', 'P', 'Simple'),
('Quad', 'Q', 'Simple'),
('Restaurants', 'R', 'Simple'),
('Shoping', 'S', 'Simple'),
('Taxi', 'T', 'Simple'),
('University', 'U', 'Simple'),
('Visites', 'V', 'Simple'),
('Weather', 'W', 'Simple'),
('Xtreme', 'X', 'Simple'),
('Zoo', 'Z', 'Simple');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `mail` varchar(30) NOT NULL,
  `login` varchar(50) DEFAULT NULL,
  `passwd` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`mail`, `login`, `passwd`, `type`) VALUES
('alain.tixier@show.biz', 'alain', 'd68e896f43f0f046c18419e40e11dedd', 1),
('andre.kalawa@gmail.com', 'andre', '19984dcaea13176bbb694f62ba6b5b35', 1),
('toto@gmail.com', 'toto', 'f71dbe52628a3f83a77ab494817525c6', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
