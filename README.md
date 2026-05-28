# Smart Task Manager

A premium, modern, and dynamic Full-Stack Task Management application built to demonstrate enterprise-level architecture.
## 🛠️ Technology Stack

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## 🚀 Features

- **User Authentication:** Secure JWT-based login and registration system. 🔒
- **Task Management:** Create, update, and delete tasks seamlessly.
- **Real-Time Analytics:** Dynamic dashboard calculating completion rates and filtering high-priority pending tasks.
- **Premium UI/UX:** A stunning dark-mode interface built with React, styled-components, and modern glassmorphism design principles.
- **Data Isolation:** User-specific task tracking ensuring complete data privacy.

## 💻 Tech Stack Details

**Frontend:**
- React (Vite)
- React Router DOM (Navigation)
- Styled-Components & React Bootstrap (Styling)
- Axios (API Communication)

**Backend:**
- Java 17
- Spring Boot 3
- Spring Security (JWT Authentication)
- Spring Data JPA (Hibernate)
- H2 In-Memory Database

## 🏃‍♂️ How to Run Locally

### 1. Start the Backend (Spring Boot)
Open your terminal in the root project folder and run:
```bash
mvn spring-boot:run
```
*The backend will start on `http://localhost:8080`*

### 2. Start the Frontend (React)
Open a separate terminal, navigate to the `frontend` folder, and run:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173`*

---
## 🔮 Future Enhancements
- Switch from H2 to a permanent database (MySQL) 🗄️
- Add Docker support 🐳

## 📄 License
This project is licensed under the MIT License - feel free to use it for your own portfolio or learning purposes.

**Status:** Active Development 🚀✨

## 🧠 What I Learned
Building this project taught me how to properly integrate a Java Spring Boot backend with a modern React frontend, and how to secure API endpoints using JWT authentication.

**Note:** Because this project uses an H2 in-memory database, all data will be reset when the backend server is restarted. This is intended for demonstration purposes.
