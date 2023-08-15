CREATE SCHEMA IF NOT EXISTS `fashiondb` DEFAULT CHARACTER SET utf8mb3 ;
USE `fashiondb` ;

CREATE TABLE IF NOT EXISTS `fashiondb`.`admin` (
  `id_admin` INT NOT NULL AUTO_INCREMENT,
  `FullName` LONGTEXT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `Role` ENUM('manager_product', 'manager_users', 'Admin', 'user') NOT NULL DEFAULT 'user',
  `img_Profile` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_admin`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `admin` (`FullName`, `email`, `password`, `Role`,`img_Profile`) VALUES ('hamza sbiha', 'hamza@gmail.com','123456','Admin','https://www.adobe.com/express/create/media_1bcd514348a568faed99e65f5249895e38b06c947.jpeg?width=400&format=jpeg&optimize=medium');
CREATE TABLE IF NOT EXISTS `fashiondb`.`product` (
  `idproducts` INT NOT NULL AUTO_INCREMENT,
  `title` LONGTEXT NOT NULL,
  `details` LONGTEXT NOT NULL,
  `img` LONGTEXT NOT NULL,
  `img2` LONGTEXT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `color` VARCHAR(255) NOT NULL,
  `category` LONGTEXT NOT NULL,
  `genre` LONGTEXT NOT NULL,
  `brand` LONGTEXT NOT NULL,
  `rating` INT NOT NULL,
  `REF` INT NULL DEFAULT NULL,
  `size` VARCHAR(255) NOT NULL,
  `availability` INT NOT NULL,
  `discount_price` DECIMAL(10,2),
  `created_at` DATETIME,
  `updated_at` DATETIME,
  PRIMARY KEY (`idproducts`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 16
  DEFAULT CHARACTER SET = utf8mb4;
  
CREATE TABLE IF NOT EXISTS `fashiondb`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `FullName` VARCHAR(255) NOT NULL,
  `email` LONGTEXT NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `img_profile_user` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `token` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


CREATE TABLE IF NOT EXISTS `fashiondb`.`likes` (
  `id_like` INT NOT NULL AUTO_INCREMENT,
  `like_date` DATE NULL DEFAULT NULL,
  `product_idproducts` INT NOT NULL,
  `user_id_user` INT NOT NULL,
  PRIMARY KEY (`id_like`, `product_idproducts`, `user_id_user`),
  INDEX `fk_likes_product_idx` (`product_idproducts` ASC) VISIBLE,
  INDEX `fk_likes_user1_idx` (`user_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_likes_product`
    FOREIGN KEY (`product_idproducts`)
    REFERENCES `fashiondb`.`product` (`idproducts`),
  CONSTRAINT `fk_likes_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `fashiondb`.`user` (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

CREATE TABLE IF NOT EXISTS `fashiondb`.`order` (
  `id_order` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `date` DATE NULL DEFAULT NULL,
  `status` ENUM('pending', 'approved', 'delivered') NULL DEFAULT 'pending',
  `total` INT NULL,
  `user_id_user` INT NOT NULL,
  `product_idproducts` INT NOT NULL,
  PRIMARY KEY (`id_order`, `user_id_user`, `product_idproducts`),
  INDEX `fk_order_user1_idx` (`user_id_user` ASC) VISIBLE,
  INDEX `fk_order_product1_idx` (`product_idproducts` ASC) VISIBLE,
  CONSTRAINT `fk_order_product1`
    FOREIGN KEY (`product_idproducts`)
    REFERENCES `fashiondb`.`product` (`idproducts`),
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `fashiondb`.`user` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;
