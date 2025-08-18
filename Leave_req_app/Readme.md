# Leave Request Management System 📝

A full-stack web application designed to streamline and digitize the process of academic leave requests. This platform provides a seamless interface for students to submit leave applications and for teachers to review and manage them efficiently.

---

## ✨ Features

This application is built with two distinct user roles in mind, each with its own set of functionalities.

### For Students 🧑‍🎓
* **Secure Authentication:** Students can sign up and log in to their personal accounts.
* **Profile Management:** Students can create and manage their personal profiles.
* **Add Teachers:** A unique feature allowing students to connect with their teachers.
    * To add a teacher, a student must enter the **teacher's unique ID and password**.
    * Students can add **multiple teachers**, creating a network of academic contacts.
* **Submit Leave Requests:** Students can fill out a simple form to request leave, specifying dates and the reason for absence.
* **Targeted Requests:** When submitting a request, students can select the specific teacher (from their added list) to whom the request should be sent.
* **Dashboard View:** A personal dashboard to track the status of all submitted leave requests (Pending, Approved, or Rejected).

### For Teachers 👩‍🏫
* **Unique Credential Creation:** During sign-up, each teacher creates a **globally unique ID and a private password**. This pair of credentials is then shared with their students.
* **Secure Authentication:** Teachers can log in to their dedicated portal using their standard email/password.
* **Centralized Dashboard:** A comprehensive dashboard that displays all incoming leave requests from students who have added them.
* **Request Management:** Teachers can view the details of each request and **approve or reject** it with a single click.
* **Request History:** Access to a complete history of all past leave requests and the actions taken on them.

---

## ⚙️ How It Works (User Flow)

The core logic of the application revolves around the unique ID system that connects students and teachers.

1.  **Teacher Registration:** A teacher signs up for the platform. During this process, they create their standard login credentials (email/password) AND a special **Unique Teacher ID** (e.g., `JOHN-DOE-MATH-7`) and a **Sharing Password**.

2.  **Sharing Credentials:** The teacher securely shares their **Unique Teacher ID** and **Sharing Password** with the students in their class.

3.  **Student Registration:** A student signs up for their own account on the platform.

4.  **Connecting with Teachers:** Inside their dashboard, the student navigates to an "Add a Teacher" section. They enter the Unique Teacher ID and Sharing Password provided by their teacher. Upon successful validation, that teacher is added to the student's personal list.

5.  **Sending a Request:** When the student needs to apply for leave, they fill out the request form and select the intended teacher from their dropdown list of added teachers.

6.  **Teacher Notification & Action:** The leave request instantly appears on the selected teacher's dashboard, where they can review the details and make a decision. The student's dashboard is updated in real-time with the teacher's response.



---

## 💻 Tech Stack

* **Frontend:** React, React Router, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JSON Web Tokens (JWT)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* Node.js & npm
* MongoDB installed and running
* Git

### Installation
1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  **Install Backend Dependencies**
    ```sh
    cd your-repo-name/server
    npm install
    ```
3.  **Install Frontend Dependencies**
    ```sh
    cd ../client
    npm install
    ```
4.  **Set Up Environment Variables**
    * In the `/server` directory, create a `.env` file.
    * Add the following variables:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        ```
5.  **Run the Application**
    * From the root directory, you can run both the client and server concurrently (if you have a script for it in `package.json`).
    ```sh
    npm run dev
    ```