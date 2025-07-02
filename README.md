
# 🏗️ Construction Dashboard

A full-stack web application designed to manage construction tools and track their service lifecycle. It provides a user-friendly dashboard with real-time alerts, status charts, and data-driven insights to keep your equipment in top condition.

---

## 🔧 Key Features

- 🧰 Add, view, filter, and delete tools
- 📊 Dashboard with charts (tool status, service activity)
- 🚨 Alerts for tools needing service or nearing service
- 🗂️ Filter tools by status and sort by last serviced date
- 🔄 Increment tool usage with one click
- 📍 Location-wise summary of tool distribution
- 📆 Monthly service tracking via charts

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js  
- Axios  
- Chart.js (Doughnut & Bar charts)  
- React Icons  
- Bootstrap

### 🔹 Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- dotenv  

---

## 📁 Project Structure

construction-dashboard/
├── client/          # React frontend  
│   ├── public/  
│   ├── src/  
│   │   ├── components/  
│   │   └── pages/  
│   ├── package.json  
│   └── ...  
│  
├── server/          # Express backend  
│   ├── models/  
│   ├── routes/  
│   ├── index.js  
│   └── ...  
│  
├── .gitignore  
├── README.md  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gauravid/construction-dashboard.git
cd construction-dashboard
```
### 2. Set up the Backend

```bash
cd server
npm install
```
#### Create a .env file in the server/ directory with the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
⚙️ Replace your_mongodb_connection_string with your actual MongoDB URI
(e.g., from MongoDB Atlas)
#### Then start the backend server:
```bash
npm start
```
### 3. Set up the Frontend
```bash
cd ../client
npm install
npm start
```
The app will now run on http://localhost:3000 and connect to the backend on port 5000.
