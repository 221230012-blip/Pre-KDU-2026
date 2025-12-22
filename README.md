# Pre-KDU-2026

# Exercise 1: Java Basics – Concert Ticket System

## 📌 Overview
This exercise introduces fundamental Java programming concepts through a simple **Concert Ticket System**.  
It covers string handling, collections, file handling, and basic data processing using Java.

The exercise is divided into **three parts**, each implemented as a separate Java program.

---

## 🧩 Part 1: Username Checker
### Description
A fan registers for tickets by entering their username twice.  
The program verifies:
- Length of both usernames
- Whether lengths match
- Whether both usernames are exactly the same

### Concepts Used
- `String`
- `.length()`
- `.equals()`
- `Scanner`

### File
- `UsernameChecker.java`

### Sample Input
<img width="355" height="56" alt="image" src="https://github.com/user-attachments/assets/b0388285-3728-4384-bb6c-cbfdabc28d4b" />

### Output
<img width="342" height="122" alt="image" src="https://github.com/user-attachments/assets/6005e0cb-8986-4eee-b186-188ca86fd82c" />



---

## 🧩 Part 2: Ticket Categories
### Description
10 fans select ticket categories (e.g., VIP, General, Standing).  
The program:
- Stores all selections
- Identifies unique categories
- Counts how many times each category is selected

### Concepts Used
- `ArrayList`
- `HashSet`
- `HashMap`
- Loops
- User input handling

### File
- `TicketCategories.java`

### Sample Input
<img width="382" height="321" alt="image" src="https://github.com/user-attachments/assets/e578a73a-a5b3-4a3e-ab4a-bdb284c0145f" />


### Output
<img width="916" height="113" alt="image" src="https://github.com/user-attachments/assets/8304ddb6-eeb6-479b-a3c8-45a0ccd8d496" />



---

## 🧩 Part 3: Popular Merchandise
### Description
Merchandise data is read from a CSV file.  
The program:
- Reads comma-separated items from a file
- Counts item frequency
- Displays the **top 3 most popular items**

### Concepts Used
- File handling using `Scanner`
- `HashMap` for frequency counting
- Sorting using `List` and `Map.Entry`
- Exception handling

### Files
- `PopularMerchandise.java`
- `items.csv`

### Sample CSV (`items.csv`)
<img width="895" height="25" alt="image" src="https://github.com/user-attachments/assets/546e404d-b3a4-4a2d-b218-0135d5d7cbcf" />

### Output
<img width="325" height="122" alt="image" src="https://github.com/user-attachments/assets/49ff47db-3acd-4326-b955-112729cebb4a" />
