-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 15, 2025 at 03:50 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `folklore_sem`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comment` (`comment_id`, `recipe_id`, `user_id`, `comment_text`, `created_at`) VALUES
(1, 1, 1, 'This is now my go-to spaghetti recipe!', '2025-06-10 10:25:00'),
(2, 1, 2, 'Easy to follow and tastes amazing.', '2025-06-11 12:40:00'),
(3, 2, 3, 'The sauce was delicious!', '2025-06-11 14:10:00'),
(4, 2, 4, 'My family loved it.', '2025-06-12 09:55:00'),
(5, 3, 5, 'Perfect quick meal for busy nights.', '2025-06-12 16:30:00'),
(6, 3, 6, 'I will definitely make this again.', '2025-06-13 08:20:00'),
(7, 4, 7, 'The salmon was so tender.', '2025-06-13 16:00:00'),
(8, 4, 8, 'Simple but elegant dish.', '2025-06-14 11:15:00'),
(9, 5, 9, 'Cookies came out perfect!', '2025-06-14 12:40:00'),
(10, 5, 10, 'My kids couldnt get enough.', '2025-06-14 13:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `note_id` int NOT NULL,
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `note_text` text NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `note` (`note_id`, `user_id`, `recipe_id`, `note_text`, `updated_at`) VALUES
(1, 1, 1, 'Added extra garlic for stronger flavor.', '2025-06-10 10:20:00'),
(2, 2, 2, 'Used chicken breast instead of thighs.', '2025-06-11 12:35:00'),
(3, 3, 3, 'Reduced the soy sauce to make it less salty.', '2025-06-11 14:05:00'),
(4, 4, 4, 'Grilled for a bit longer for crispier skin.', '2025-06-12 09:50:00'),
(5, 5, 5, 'Added more chocolate chips, turned out great!', '2025-06-12 16:25:00'),
(6, 6, 1, 'Used whole wheat spaghetti.', '2025-06-13 08:15:00'),
(7, 7, 2, 'Added extra mirin for more sweetness.', '2025-06-13 15:55:00'),
(8, 8, 3, 'Stir-fried veggies longer for better texture.', '2025-06-14 11:10:00'),
(9, 9, 4, 'Added lemon zest for extra flavor.', '2025-06-14 12:35:00'),
(10, 10, 5, 'Chilled dough before baking.', '2025-06-14 13:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rating_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating_value` int NOT NULL,
  `rated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `rating` (`rating_id`, `recipe_id`, `user_id`, `rating_value`, `rated_at`) VALUES
(1, 1, 1, 5, '2025-06-10 10:15:00'),
(2, 1, 2, 4, '2025-06-11 12:30:00'),
(3, 2, 3, 5, '2025-06-11 14:00:00'),
(4, 2, 4, 4, '2025-06-12 09:45:00'),
(5, 3, 5, 3, '2025-06-12 16:20:00'),
(6, 3, 6, 4, '2025-06-13 08:10:00'),
(7, 4, 7, 5, '2025-06-13 15:50:00'),
(8, 4, 8, 4, '2025-06-14 11:05:00'),
(9, 5, 9, 5, '2025-06-14 12:30:00'),
(10, 5, 10, 4, '2025-06-14 13:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `recipe_id` int NOT NULL,
  `recipe_name` varchar(100) NOT NULL,
  `recipe_preptime` int NOT NULL,
  `recipe_cookingtime` int NOT NULL,
  `recipe_ingredient` varchar(255) NOT NULL,
  `recipe_cookstep` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `description` text DEFAULT NULL,
  `servings` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` 
(`recipe_id`, `recipe_name`, `recipe_preptime`, `recipe_cookingtime`, `recipe_ingredient`, `recipe_cookstep`, `image_url`, `user_id`, `description`, `servings`) 
VALUES 
(1, 'Spaghetti Bolognese', 20, 60, 'Spaghetti, Ground Beef, Onion, Garlic, Tomato Sauce, Basil, Olive Oil, Salt, Pepper', '1. Sauté onion & garlic. 2. Add beef. 3. Pour sauce. 4. Simmer & serve.', 'https://example.com/images/spaghetti_bolognese.jpg', 101, 'A hearty Italian classic perfect for family dinners.', 4),

(2, 'Teriyaki Chicken', 15, 25, 'Chicken Thighs, Soy Sauce, Mirin, Sugar, Garlic, Ginger, Sesame Seeds', '1. Marinate chicken. 2. Pan-fry chicken. 3. Simmer sauce. 4. Glaze chicken with sauce.', 'https://example.com/images/teriyaki_chicken.jpg', 102, 'Sweet and savory Japanese teriyaki chicken.', 3),

(3, 'Vegetable Fried Rice', 10, 15, 'Rice, Carrots, Peas, Corn, Onion, Eggs, Soy Sauce, Sesame Oil, Green Onions', '1. Stir-fry veggies. 2. Add rice & eggs. 3. Season with soy sauce.', 'https://example.com/images/vegetable_fried_rice.jpg', 103, 'Quick and easy fried rice with colorful veggies.', 2),

(4, 'Lemon Butter Salmon', 5, 15, 'Salmon Fillet, Lemon, Butter, Garlic, Parsley, Salt, Pepper', '1. Season salmon. 2. Pan-sear salmon. 3. Drizzle with lemon butter sauce.', 'https://example.com/images/lemon_butter_salmon.jpg', 104, 'Delicate salmon with rich lemon butter sauce.', 2),

(5, 'Chocolate Chip Cookies', 20, 12, 'Flour, Sugar, Brown Sugar, Butter, Eggs, Vanilla, Baking Soda, Salt, Chocolate Chips', '1. Mix dough. 2. Scoop onto tray. 3. Bake until golden.', 'https://example.com/images/chocolate_chip_cookies.jpg', 105, 'Soft and chewy homemade cookies loaded with chocolate chips.', 24);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `user_fullname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` 
(`user_id`, `username`, `user_email`, `user_password`, `user_fullname`) 
VALUES
(1, 'benny88', 'benny88@example.com', 'passBenny123', 'Benjamin Tan'),
(2, 'jesslyn_09', 'jesslyn09@example.com', 'jessPass09', 'Jesslyn Wong'),
(3, 'kevinM', 'kevin.m@example.com', 'mKevin@321', 'Kevin Mah'),
(4, 'serenaC', 'serena.c@example.com', 'SerenaC#pw', 'Serena Chan'),
(5, 'danielLee', 'daniel.lee@example.com', 'daniel789', 'Daniel Lee'),
(6, 'amiraY', 'amira.yusof@example.com', 'amiraY2023', 'Amira Yusof'),
(7, 'aaronX', 'aaronx@example.com', 'Xaaron007', 'Aaron Xavier'),
(8, 'lim_hui', 'lim.hui@example.com', 'LimhuiPass', 'Lim Hui Ying'),
(9, 'hafiz_r', 'hafiz.r@example.com', 'hafizRpw', 'Mohd Hafiz Ramli'),
(10, 'melissaW', 'melissa.w@example.com', 'melissaW456', 'Melissa Wong');


CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  `question_text` varchar(255) NOT NULL,
  `is_required` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `display_name`, `question_text`, `is_required`) VALUES
(1, 'spice_level', 'Spice Level', 'How spicy do you like your food?', 1),
(2, 'meal_type', 'Meal Type', 'What type of meal are you looking for?', 1),
(3, 'dietary', 'Dietary Preference', 'Do you have any dietary preferences?', 1),
(4, 'protein_type', 'Protein Type', 'What kind of protein do you prefer?', 1),
(5, 'cuisine', 'Cuisine', 'Which cuisine do you prefer?', 1);

CREATE TABLE `category_options` (
  `option_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `display_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category_options`
--

INSERT INTO `category_options` (`option_id`, `category_id`, `name`, `display_name`) VALUES
(1, 1, 'mild', 'Mild'),
(2, 1, 'medium', 'Medium'),
(3, 1, 'hot', 'Hot'),
(4, 2, 'breakfast', 'Breakfast'),
(5, 2, 'dinner', 'Dinner'),
(6, 3, 'vegetarian', 'Vegetarian'),
(7, 3, 'non_vegetarian', 'Non-Vegetarian'),
(8, 4, 'chicken', 'Chicken'),
(9, 4, 'beef', 'Beef'),
(10, 4, 'seafood', 'Seafood'),
(11, 5, 'italian', 'Italian'),
(12, 5, 'japanese', 'Japanese'),
(13, 5, 'chinese', 'Chinese'),
(14, 5, 'american', 'American');

CREATE TABLE `default_recommendations` (
  `recommendation_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `option_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`option_ids`)),
  `priority` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `default_recommendations`
--
INSERT INTO `default_recommendations` (`recommendation_id`, `recipe_id`, `option_ids`, `priority`) VALUES
(1, 1, '[2,5,7,9,11]', 1), -- Spaghetti Bolognese: medium spice, dinner, non-veg, beef, italian
(2, 2, '[3,5,7,8,12]', 1), -- Teriyaki Chicken: hot spice, dinner, non-veg, chicken, japanese
(3, 3, '[1,5,6,7,13]', 1), -- Vegetable Fried Rice: mild spice, dinner, vegetarian, chinese
(4, 4, '[1,5,7,10,12]', 1), -- Lemon Butter Salmon: mild spice, dinner, non-veg, seafood, japanese
(5, 5, '[1,4,7,8,14]', 1); -- Cookies: mild spice, breakfast, non-veg, chicken (proxy), american


CREATE TABLE `recipe_options` (
  `recipe_option_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_options`
--

INSERT INTO `recipe_options` (`recipe_option_id`, `recipe_id`, `option_id`) VALUES
(1, 1, 2), -- Spaghetti Bolognese - medium
(2, 1, 5), -- dinner
(3, 1, 7), -- non-veg
(4, 1, 9), -- beef
(5, 1, 11), -- italian
(6, 2, 3),
(7, 2, 5),
(8, 2, 7),
(9, 2, 8),
(10, 2, 12),
(11, 3, 1),
(12, 3, 5),
(13, 3, 6),
(14, 3, 7),
(15, 3, 13),
(16, 4, 1),
(17, 4, 5),
(18, 4, 7),
(19, 4, 10),
(20, 4, 12),
(21, 5, 1),
(22, 5, 4),
(23, 5, 7),
(24, 5, 8),
(25, 5, 14);



--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`note_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `note_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `recipe_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE;
COMMIT;


--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `category_options`
--
ALTER TABLE `category_options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `default_recommendations`
--
ALTER TABLE `default_recommendations`
  ADD PRIMARY KEY (`recommendation_id`),
  ADD KEY `recipe_id` (`recipe_id`);


--
-- Indexes for table `recipe_options`
--
ALTER TABLE `recipe_options`
  ADD PRIMARY KEY (`recipe_option_id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `option_id` (`option_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category_options`
--
ALTER TABLE `category_options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `default_recommendations`
--
ALTER TABLE `default_recommendations`
  MODIFY `recommendation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recipe_options`
--
ALTER TABLE `recipe_options`
  MODIFY `recipe_option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category_options`
--
ALTER TABLE `category_options`
  ADD CONSTRAINT `category_options_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `default_recommendations`
--
ALTER TABLE `default_recommendations`
  ADD CONSTRAINT `default_recommendations_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);

--
-- Constraints for table `recipe_options`
--
ALTER TABLE `recipe_options`
  ADD CONSTRAINT `recipe_options_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`),
  ADD CONSTRAINT `recipe_options_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `category_options` (`option_id`);
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
