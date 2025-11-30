# Pre-KDU-2026
## STEP-1: CREATING DATABASE
```sql
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
```

## QUERY 1: Basic JOIN - Show All Content with Categories
```sql
SELECT
	c.content_id,
    c.title,
    cat.category_name
FROM content c
JOIN category cat
	ON c.category_id = cat.category_id 
ORDER BY c.content_id ASC;
```
<img width="351" height="195" alt="image" src="https://github.com/user-attachments/assets/e102083e-5218-49c4-a82b-063612db46be" />

## QUERY 2: Top Performers - Sorted by Popularity
```sql
SELECT
	title,
    rating,
    views_in_millions
FROM content
ORDER BY views_in_millions DESC;
```
<img width="331" height="198" alt="image" src="https://github.com/user-attachments/assets/8d78d956-020e-46d0-b1d8-0dbe05c112c8" />

## QUERY 3: Category Analytics - Average Rating per Category
```sql
SELECT 
    cat.category_name,
    AVG(c.rating) AS average_rating
FROM content c
JOIN category cat
    ON c.category_id = cat.category_id
GROUP BY cat.category_name
ORDER BY average_rating DESC;
```
<img width="230" height="114" alt="image" src="https://github.com/user-attachments/assets/d1ec1844-d9be-4682-971d-d496a0db5c36" />

## QUERY 4: High-Rated & Highly-Viewed Content
```sql
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
```
<img width="443" height="113" alt="image" src="https://github.com/user-attachments/assets/8364550c-55cb-48bb-93ec-07d0742e0c98" />


## QUERY 5: Index Demonstration
```sql
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

/*   Using an index on content(category_id) helps MySQL quicly locate 
     matching category rows during the JOIN instead of scanning the entire table.
     With the index, MySQL performs faster lookups, reducing execution time,
     especially as the table grows larger.
     Before the index: 0.42
     After the index: 0.129
*/
```

## 🧠 6. Theoretical Concepts (The "Why?")

This section addresses key database principles applied in this exercise.

---

### Why #1: Why Do We Use Foreign Keys?

**Answer:** Foreign keys are used to link two tables together and maintain **data integrity** in a relational database. A foreign key ensures that a value in one table must exist in another referenced table, preventing invalid data and keeping relationships consistent.

---

### Why #2: Why is ACID Important for this Database?

**ACID** properties ensures that all transactions in the StreamFlix database are processed reliably. It maintains data accuracy, prevents partial or conflicting updates, and guarantees that data remains safe even during failures. This is essential for a platform where content, categories, and user interactions must always remain consistent

| Property | Stands For | Importance to StreamFlix |
| :--- | :--- | :--- |
| **A** | **A**tomicity | It prevents incomplete operations. This ensures that the database is never left in a hal-updated or corrupted state. |
| **C** | **C**onsistency |It prevents conflicts during simultaneous operations. Multiple users may be streaming, updating views, inserting shows or adding analytics queries. Isoltaion ensures these actions don't interfere with each other, preventing dirty reads or incorrect results. |
| **I** | **I**solation | Prevents conflicts when multiple operations occur simultaneously (e.g., users inserting new content while analysts query view counts). |
| **D** | **D**urability |It means the data survives crashes or failures. If a power cut or server crash happens right after insering a new show or updating views, durability ensures that changes are permanently saved. |

---

### Why #3: Why Would We Create an Index on `category_id`?

Creating an index on the `category_id` column significantly improves query performance, particularly for large tables.

1.  **Faster JOINs:** Speeds up lookups when joining the `Content` table back to the `Category` table.
2.  **Faster Filtering:** Accelerates queries that use `WHERE category_id = ...`.
3.  **Avoids Full Table Scans:** Enables the database to quickly locate data using the index structure instead of scanning every row in the table.
4.  **Improved Scalability:** Performance improves significantly and remains fast even as the `Content` table grows larger.



