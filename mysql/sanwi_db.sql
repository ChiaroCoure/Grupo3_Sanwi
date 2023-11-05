-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 05-11-2023 a las 02:09:47
-- Versión del servidor: 8.2.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sanwi_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Carne'),
(2, 'Pescado'),
(3, 'Vegetarianos'),
(4, 'Internacionales'),
(5, 'Desayuno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `categories_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `categories_id`, `name`, `price`, `description`, `stock`, `discount`, `image`) VALUES
(3, 5, 'Tostado de jamón y queso', 3600, 'Pan de semillas de masa madre, jamón cocido Las Dinas, queso gruyère y aceite de oliva Zuelo Orgánico.', 10, 500, 'sandwich1699148413397.jpg'),
(4, 1, 'Sándwich de pollo grillado', 6900, 'Pan de semillas de masa madre, pollo grillado, gruyère, panceta crispy, cebolla caramelizada, palta pisada, tomate perita, lechuga morada hidropónica y alioli de jalapeños.', 20, 600, 'sandwich1699148693450.jpg'),
(5, 5, 'Sándwich de jamón crudo y burrata', 6950, 'Pan de semillas de masa madre, jamón crudo tipo Parma, burrata, aceitunas negras, rúcula hidropónica, pesto de tomates secos y aceite de oliva Zuelo Orgánico.', 10, 500, 'sandwich1699148823827.jpg'),
(6, 3, 'Sándwich vegetariano', 5950, 'Pan de semillas de masa madre, zanahoria, zucchini y berenjenas asadas, cebolla caramelizada, parmesano, espinaca hidropónica y hummus.', 5, 0, 'sandwich1699149034929.png'),
(7, 1, 'Sándwich de roast beef casero', 7250, 'Ciabatta de harina orgánica, roast beef casero de bife de chorizo, pickles de cebolla colorada, morrón asado, hojas de cilantro y mostaza dijon.', 5, 0, 'sandwich1699149186353.png'),
(8, 2, 'Sándwich de salmón ahumado', 7750, 'Pan brioche de harina orgánica, salmón ahumado, ralladura de lima, palta, rúcula hidropónica y aderezo de mascarpone y eneldo.', 10, 0, 'sandwich1699149307218.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'customer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `role_id` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `role_id`, `email`, `password`, `username`, `image`) VALUES
(6, 2, 'koko@gmail.com', '$2a$10$ExqPjZEDny6q.nNGzdsmK.OUtqGnKPwSUb69fVHEj7GwS9rIh2YN6', 'gabaktech', 'user-default.png'),
(7, 1, 'admin@gmail.com', '$2a$10$LAaGBIKgbpf4edLSBSo1yOCpPUyW9odijM12/LOZvMhHHtQ4bq3vG', 'admin', 'user-default.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1bf60eb0-35fb-49ce-9cda-27dbcf584cb9` (`categories_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e6cda8a5-eb63-410f-81df-f0372b0bed53` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_1bf60eb0-35fb-49ce-9cda-27dbcf584cb9` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_e6cda8a5-eb63-410f-81df-f0372b0bed53` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
