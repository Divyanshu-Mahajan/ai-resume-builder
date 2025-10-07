# 🧠 AI Resume Builder

A full-stack **AI-powered Resume Builder** that helps users create professional, ATS-friendly resumes in minutes.  
Built with the **MERN stack**, it leverages AI to automatically generate **summaries, project descriptions, and job responsibilities** based on user input — saving time and improving quality.

---

## 🚀 Features

### 🔹 Core Functionality
- Create, edit, and preview resumes in real-time  
- Multiple **modern, responsive templates** (grid, sidebar, timeline, etc.)  
- Dynamic data binding via **Redux Toolkit**  
- **PDF export** using `html2pdf.js`  
- **Light/Dark mode** toggle with persistent theme storage  

### 🤖 AI Integration
- Generate **professional summaries**
- Auto-generate **experience responsibilities**
- AI-powered **education and project descriptions**
- Custom backend routes to handle AI responses (Node.js + Express)

### 🔒 Authentication
- Secure user authentication with **JWT** and **bcrypt**
- **Forgot password** and **reset password** functionality via email
- Persistent login using localStorage

---

## 🏗️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React 19, Redux Toolkit, React Router DOM 7, Vite |
| **Styling & UI** | CSS Modules, React Icons, FontAwesome |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Security** | JWT Authentication, bcrypt Encryption |
| **Utilities** | Nodemailer, dotenv, html2pdf.js |
| **State Management** | Redux Toolkit |
| **Data Visualization** | Recharts |

---

### ScreenShot

 ![AI Suggestion](./client/src/assets/screenshot/AI%20Suggestion.png)

 ![Dashboard](./client/src/assets/screenshot/Dashboard.png)

 ![Forgot Password](./client/src/assets/screenshot/Forgot%20Password.png)

 ![Home](./client/src/assets/screenshot/Home.png)

 ![Landing Page](./client/src/assets/screenshot/Landing%20Page.png)

 ![Login Page](./client/src/assets/screenshot/Login%20Page.png)

 ![My Resume](./client/src/assets/screenshot/My%20Resume.png)

 ![Resume Form](./client/src/assets/screenshot/Resume%20Form.png)

 ![Signup Page](./client/src/assets/screenshot/Signup%20Page.png)

 ![Statistics](./client/src/assets/screenshot/Statistics.png)

 ![Template Page](./client/src/assets/screenshot/Template%20Page.png)

 ![Clean Modern Template](./client/src/assets/screenshot/templates/Clean%20Modern%20Template.png)

 ![Compact Grid Template](./client/src/assets/screenshot/templates/Compact%20Grid%20Template.png)

 ![Elegant SideBar Template](./client/src/assets/screenshot/templates/Elegant%20Sidebar%20Template.png)

 ![Elegant TImeline Template](./client/src/assets/screenshot/templates/Elegant%20TImeline%20Template.png)

 ![Minimalist Template](./client/src/assets/screenshot/templates/Minimalist%20Template.png)

 ![Minimalist TwoColumn Template](./client/src/assets/screenshot/templates/Minimalist%20TwoColumn%20Template.png)

 ![Monochrome Template](./client/src/assets/screenshot/templates/MonoChrome%20Template.png)

 ![Sidebar Accent Template](./client/src/assets/screenshot/templates/Sidebar%20Accent%20Template.png)

 ![Sidebar Template](./client/src/assets/screenshot/templates/Sidebar%20Template.png)

 ![Smart Template](./client/src/assets/screenshot/templates/Smart%20Template.png)


 ---

## 📁 Folder Structure

```bash

ai-resume-builder/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── Layout/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── templates/
│   │   ├── UI/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── env
│   ├── .gitignore
│   └── package.json
│
├── server/
│   ├── node_modules/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── constants.js
│   ├── package-lock.json
│   ├── package.json
│   └── sample.env
│
└── README.md

```

---

## ⚙️ Environment Variables

You can copy these from `.env.sample` and configure them for your environment.

### 🧩 Server `.env`
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
REFRESH_TOKEN_SECRET=your_REFRESH_TOKEN_EXPIRY_secret
REFRESH_TOKEN_EXPIRY=your_REFRESH_TOKEN_EXPIRY_time
ACCESS_TOKEN_SECRET=your_ACCESS_TOKEN_EXPIRY_secret
ACCESS_TOKEN_EXPIRY=your_ACCESS_TOKEN_EXPIRY_time
CORS_ORIGIN=*


```
### 🧩 Client `.env`

```bash

CLIENT_URL=http://localhost:5173

```
### Clone Repository

```bash

git clone  https://github.com/Divyanshu-Mahajan/ai-resume-builder.git
cd ai-resume-builder


```

# Frontend

```bash

cd client
npm install

```

# Backend

```bash
cd server
npm install


```

### Run the project

# Backend

```bash
npm run start

```
# Frontend (in another terminal)

```bash
npm run dev

```


## 📜 License

This project is licensed under the **MIT License** — you’re free to use, modify, and distribute it with attribution.

---

**👨‍💻 Divyanshu Mahajan**  
📧 [divyanshumahajan9191@gmail.com]  
🔗 [LinkedIn](https://linkedin.com/in/your-profile) | [GitHub](https://github.com/Divyanshu-Mahajan)

---