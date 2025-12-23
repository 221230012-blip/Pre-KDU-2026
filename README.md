# Pre-KDU-2026

# 📚 Book Inventory API (Spring Boot)

A simple **Spring Boot REST API** for managing a book inventory.  
This project demonstrates **layered architecture**, **RESTful API design**, and **JUnit testing** using an **in-memory data store**.

---
## 🚀 Features

- Add a book to inventory (POST API)
- Retrieve a book by ID (GET API)
- In-memory storage using Java Collections
- Proper HTTP status codes using `ResponseEntity`
- Service layer unit tests using JUnit

---

---

## 📘 Book Data Model

Each book contains the following information:

| Field | Type | Description |
|-----|-----|-------------|
| id | Long | Auto-generated unique ID |
| title | String | Book title |
| author | String | Author name |
| price | BigDecimal | Price of the book |
| isbn | String | ISBN number |

`BigDecimal` is used for price to avoid precision errors in monetary values.

---

## 📁 Explanation of Each File

---

### BookInventoryAppApplication.java

- This is the **main entry point** of the application.
- It starts the Spring Boot application and embedded Tomcat server.
- It scans all components under the base package.

---

### Book.java (Model Layer)

- Represents the **Book entity**.
- Defines what data a book contains.
- Uses private fields with getters and setters for encapsulation.

---

### BookRepository.java (Repository Layer)

- Acts as a **mock database**.
- Stores books in a `HashMap`.
- Automatically generates a unique ID for each book.
- Retrieves books using their ID.

⚠️ Data is stored in memory, so it is lost when the application restarts.

---

### BookService.java (Service Layer)

- Contains the **business logic**.
- Acts as a bridge between controller and repository.
- Makes the application easier to test and maintain.

---

### BookController.java (Controller Layer)

- Exposes REST APIs to the outside world.
- Handles HTTP requests from clients like Postman.
- Uses:
  - `@PostMapping` to add a book
  - `@GetMapping` to retrieve a book by ID
- Returns proper HTTP status codes using `ResponseEntity`.

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/books` | Add a new book |
| GET | `/api/books/{id}` | Get a book by ID |

---

## 🌐 Using Postman to Test APIs

Postman is used as a **REST client** to test the APIs.

### ➕ Add a Book (POST)
- Method: `POST`
- URL: `http://localhost:8080/api/books`
- Header: `Content-Type: application/json`
- Body (JSON):

<img width="825" height="801" alt="image" src="https://github.com/user-attachments/assets/ed943bbb-133d-40c1-b706-897efa174791" />
<img width="1127" height="292" alt="image" src="https://github.com/user-attachments/assets/49b4c1be-efb2-48a8-99ba-cca2e6676ed3" />

###  🔍 Get Book by ID (GET)
- Method: GET
- URL: http://localhost:8080/api/books/{id}
- Response: 200 OK if book exists
            404 NOT FOUND if book does not exist
<img width="834" height="771" alt="image" src="https://github.com/user-attachments/assets/b1e8ef94-703e-4ff9-b026-9a705063bad7" />

---

## 🧪 JUnit Test Cases Summary

The following table summarizes the unit test cases written for the **Service Layer** of the application using **JUnit 5**.

| Test Case Name | Method Tested | Purpose | Assertion Used |
|---------------|--------------|---------|----------------|
| shouldAddBookSuccessfully | `addBook()` | Verifies that a book is saved successfully and a unique ID is generated | `assertNotNull(saved.getId())` |
| shouldFindBookById | `getBookById()` | Verifies that a saved book can be retrieved using its ID | `assertTrue(result.isPresent())` |
| shouldReturnEmptyWhenBookNotFound | `getBookById()` | Verifies safe handling when a book does not exist | `assertFalse(result.isPresent())` |
| shouldStoreCorrectPrice | `addBook()` | Verifies that the book price is stored accurately without precision loss | `assertEquals(expectedPrice, book.getPrice())` |

<img width="803" height="257" alt="image" src="https://github.com/user-attachments/assets/414f83d0-0041-44aa-bd46-04363a0b7c23" />


---

### 📌 Explanation

- All test cases focus on validating the **business logic** in the service layer.
- Tests ensure correct functionality, data integrity, and safe error handling.
- Using JUnit helps detect bugs early and improves code reliability.



