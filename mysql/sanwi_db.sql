CREATE TABLE `users` (
   `id` INT AUTO_INCREMENT,
   `role_id` INT,
   `email` VARCHAR(255),
   `password` VARCHAR(255),
   `username` VARCHAR(255),
   `image` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT AUTO_INCREMENT,
   `categories_id` INT,
   `name` VARCHAR(255),
   `price` DECIMAL,
   `description` VARCHAR(255),
   `stock` INT,
   `discount` DECIMAL,
   `image` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(255),
   PRIMARY KEY (`id`)
);


ALTER TABLE `users` ADD CONSTRAINT `FK_e6cda8a5-eb63-410f-81df-f0372b0bed53` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_1bf60eb0-35fb-49ce-9cda-27dbcf584cb9` FOREIGN KEY (`categories_id`) REFERENCES `categories`(`id`)  ;
