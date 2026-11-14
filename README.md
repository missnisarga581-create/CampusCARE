# CampusCARE – Campus Complaint Management System

CampusCARE is a web-based application designed to simplify the process of submitting and managing campus complaints.

## Features

- Student complaint submission
- Admin complaint management
- Complaint categories and priorities
- Automatic date and time recording
- Dashboard statistics
- Search and filter complaints
- Complaint status updates
- Serious issue identification

## Technologies Used

- Java 17
- Spring Boot
- Maven
- HTML
- CSS
- JavaScript
- Git and GitHub

## How to Run

1. Clone the repository.
2. Open the project in VS Code.
3. Run the application:

   `.\mvnw.cmd spring-boot:run`

4. Open `http://localhost:8080` in your browser.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/complaints` | Submit a complaint |
| GET | `/complaints` | View complaints |
| PATCH | `/complaints/{id}/status` | Update complaint status |

## Project Purpose

CampusCARE aims to make campus complaint handling more organized, accessible, and efficient.