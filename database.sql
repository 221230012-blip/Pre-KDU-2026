CREATE DATABASE IF NOT EXISTS Streamflix;
USE Streamflix;

CREATE TABLE content (
    content_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    views_in_millions DECIMAL(10,2),
    release_year INTEGER,
    category_id BIGINT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Insert categories
INSERT INTO category (category_name, description) VALUES
('Movies', 'Feature-length films'),
('Series', 'Multi-episode TV shows'),
('Documentaries', 'Non-fiction educational content'),
('Anime', 'Japanese animated content');

-- Insert content
INSERT INTO content (title, rating, views_in_millions, release_year, category_id) VALUES
('Stranger Adventures', 8.7, 142.50, 2023, 2),
('The Cosmic Heist', 7.9, 89.30, 2024, 1),
('Planet Earth: Oceans', 9.2, 201.75, 2023, 3),
('Code Warriors', 8.1, 67.20, 2024, 2),
('Attack on Mars', 9.0, 156.80, 2023, 4),
('The Algorithm', 7.5, 45.60, 2024, 1),
('Wildlife Mysteries', 8.8, 178.90, 2024, 3),
('Cyberpunk Chronicles', 8.4, 123.45, 2023, 4);


SELECT c.title,
		cat.category_name
FROM content c
JOIN category cat
	ON c.category_id = cat.category_id
WHERE cat.category_name = 'Documentaries' AND c.release_year = '2024' AND c.rating>8;

SELECT title,
	(rating + views_in_millions) AS success_score
FROM content
WHERE (rating+views_in_millions)>100
ORDER BY (rating+views_in_millions) DESC;