🚀 Quiz Arena - Full-Stack Gaming Platform
Quiz Arena is a dynamic, full-stack quiz application featuring a futuristic "Cosmic Cyberpunk" theme. Built with Node.js, Express, and MongoDB on the backend, and powered by vanilla JavaScript on the frontend, it offers a complete, interactive experience. The platform includes secure user authentication, persistent scoring, and a variety of quiz topics fetched from a live API.

✨ Features
User Authentication: Secure Sign-Up and Login functionality using JSON Web Tokens (JWT).

Persistent Profiles: User scores and progress are saved to a MongoDB database.

Dynamic Content: All quiz questions and topic information are fetched from a live backend API.

Multiple Quiz Topics: A wide range of categories including Science, History, Coding, and more.

Real-time Countdown Timer: An engaging 15-minute timer for each quiz session.

Fully Responsive Design: A sleek, modern UI that works perfectly on desktops, tablets, and mobile devices.

Interactive UI/UX: Smooth animations, loading states, and a visually appealing "glassmorphism" design.

🛠️ Tech Stack
Backend
Node.js

Express.js

MongoDB (with Mongoose)

JSON Web Tokens (JWT) for authentication

bcrypt for password hashing

Frontend
HTML5

CSS3 (Flexbox, Grid, Animations)

Vanilla JavaScript (ES6+)

📂 Project Structure
The project is divided into two main parts:

Quiz_Arena/
├── backend/
│   ├── server.js         // Main server file
│   ├── auth.js           // Authentication routes
│   └── data.js           // Data and quiz routes
├── frontend/
│   ├── index.html
│   ├── TopicSelectionPage/
│   │   └── startPage1.html / .css / .js
│   ├── QuizMainPage/
│   │   └── Quiz_qns.html / .css / .js
│   └── ... (other feature folders)
