-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-11-2026 a las 22:50:22
-- Versión del servidor: 13.0.2-MariaDB
-- Versión de PHP: 8.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `essence`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `total_carrito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_items`
--

CREATE TABLE `carrito_items` (
  `id_carrito` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_total_producto` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` int(50) NOT NULL,
  `correo` text NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `precio` decimal(15,0) NOT NULL,
  `categoria` text NOT NULL,
  `imagen` varchar(2048) DEFAULT NULL,
  `estado` tinyint(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `categoria`, `imagen`, `estado`) VALUES
(1, 'VERSACE WOMAN', 99899, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/2057811-320-auto/1003123-.webp?v=639287948092900000&quality=8', 0),
(2, 'CK IN2U Woman', 130680, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/1956824-320-auto/1002934-.webp?v=639288992315200000&quality=8', 1),
(3, 'D BY DIESEL', 49000, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/2057916-320-auto/1003377.webp?v=639287949370270000&quality=8', 1),
(4, 'CK ONE EDT', 173030, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/1511834-320-auto/1010099-01.webp?v=639289741714930000&quality=8', 1),
(5, 'AMOR AMOR', 69230, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/2054727-320-auto/1002514.webp?v=639287950299700000&quality=8', 1),
(6, 'HUGO ICED', 87648, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/1948841-320-auto/1010170.webp?v=639288992325970000&quality=8', 1),
(7, 'SOLO VULCAN', 312900, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/2059354-320-auto/1005895.webp?v=639287936679330000&quality=8', 1),
(8, 'I Love Love', 78988, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/2053608-320-auto/i-love-love-edt-8A34E7B571D20E4703F620A57BF695F1.webp?v=639287955418130000&quality=8', 1),
(9, 'CK IN2U Men', 130680, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/1956825-320-auto/1002935.webp?v=639288992316470000&quality=8', 1),
(10, 'THE DREAMER', 118860, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/2057815-1440-auto/1003122-02.webp?v=639287948129470000&quality=8', 1),
(11, 'Ange Ou Demon', 202000, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/1963587-1440-auto/ange-ou-demon-edp--FA463E95649132C8C70FB718B0BB0B26.webp?v=639288992340930000&quality=8', 1),
(12, 'COOL WATER WOMAN EDT', 99052, 'Perfumes', 'https://juleriaque.vtexassets.com/arquivos/ids/1948839-1440-auto/1010168.webp?v=639288992324570000&quality=8', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `correo` text NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `nombre`, `correo`, `contraseña`) VALUES
(1, 'TEST', 'juanadelosmilagrosavalos@gmail.com ', '111');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `carrito_items`
--
ALTER TABLE `carrito_items`
  ADD KEY `id_carrito` (`id_carrito`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo_cliente` (`correo`) USING HASH;

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`) USING HASH;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `carrito_items`
--
ALTER TABLE `carrito_items`
  ADD CONSTRAINT `1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id`),
  ADD CONSTRAINT `2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
