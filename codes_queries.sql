-- Categories table (Movies, Series, Documentaries, etc.)
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Content table (individual shows/movies)
CREATE TABLE content (
    content_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    views_in_millions DECIMAL(10,2),
    release_year INTEGER,
    category_id BIGINT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
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



-- Query 1: Basic JOIN - Show All Content with Categories
SELECT
	c.content_id,
    c.title,
    cat.category_name
FROM content c
JOIN category cat
	ON c.category_id = cat.category_id 
ORDER BY c.content_id ASC;
    
    
    
-- Query 2: Top Performers - Sorted by Popularity
SELECT
	title,
    rating,
    views_in_millions
FROM content
ORDER BY views_in_millions DESC;



-- Query 3: Category Analytics - Average Rating per Category
SELECT 
    cat.category_name,
    AVG(c.rating) AS average_rating
FROM content c
JOIN category cat
    ON c.category_id = cat.category_id
GROUP BY cat.category_name
ORDER BY average_rating DESC;



-- Query 4: High-Rated & Highly-Viewed Content
SELECT
	c.title,
    c.rating,
    c.views_in_millions,
    cat.category_name
FROM content c
JOIN category cat
	ON c.category_id = cat.category_id
WHERE c.rating > 8.5 AND c.views_in_millions >100
ORDER BY c.rating DESC;



-- Query 5: Index Demonstration
EXPLAIN ANALYZE
SELECT 
    c.content_id,
    c.title,
    cat.category_name
FROM content c
JOIN category cat
    ON c.category_id = cat.category_id
ORDER BY c.content_id ASC;

CREATE INDEX idx_category_id 
ON content(category_id);

EXPLAIN ANALYZE
SELECT 
    c.content_id,
    c.title,
    cat.category_name
FROM content c
JOIN category cat
    ON c.category_id = cat.category_id
ORDER BY c.content_id ASC;

/* Using an index on content(category_id) helps MySQL quicly locate 
   matching category rows during the JOIN instead of scanning the entire table.
   With the index, MySQL performs faster lookups, reducing execution time,
   especially as the table grows larger.
   Before the index: 0.42
   After the index: 0.129
*/



/* Why #1: Why do we use the Foreign Keys ?
	Ans: Foreign keys are used to link two tables together and maintain data integrity
		 in a relational database. A foreign key ensures that a value in one table
         must exist in another referenced table, preventing invalid data and keeping 
         relationships consistent.
*/



/* Why #2: Why is ACID important for this database?
	Ans: 'A' stands for ATOMICITY. It prevents incomplete operations. This ensures that
		 the database is never left in a hal-updated or corrupted state.
         
         'C' stands for CONSISTENCY. It keeps the database rules intact. Consistency ensures 
         that every transaction maintains these rules, so no invalid category_id or impossible
         rating enters the system.
         
         'I' stands for ISOLATION. It prevents conflicts during simultaneous operations. Multiple
         users may be streaming, updating views, inserting shows or adding analytics queries. 
         Isoltaion ensures these actions don't interfere with each other, preventing dirty reads
         or incorrect results.
         
         'D' stands for DURABILITY. It means the data survives crashes or failures. If a power cut or
         server crash happens right after insering a new show or updating views, durability ensures
         that changes are permanently saved.
         
         ACID ensures that all transactions in the StreamFlix database are processed reliably. It maintains
         data accuracy, prevents partial or conflicting updates, and guarantees that data remains safe even
         during failures. This is essential for a platform where content, categories, and user interactions
         must always remain consistent
*/


/* Why #3: Why would we create an index on category_id?
	Ans: 1. Index on category_id makes JOIN operations faster
		 2. It speeds up queries that filer using WHERE category_id = ....
         3. It avoids full table scans by enabling quick lookups
         4. Performance improves significantly as the content table grows larger.
         5. It helps analytics queries run faster.
*/