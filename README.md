# 🐾 PetCare - Full Stack Web Application

PetCare is a full-featured, role-based web application designed to streamline pet grooming, veterinary appointments, and pet adoption services. Built using the MERN stack, this responsive application supports Admin, Vet, Groomer, Adoption Manager, and User roles with secure authentication and dynamic dashboards.

---

## 🌐 Live Demo
> _Coming Soon_

---

## 🚀 Features

- 🔐 **User Roles**: Admin, Vet, Groomer, Adoption Manager, and General Users
- 📱 **Fully Responsive UI**: Built with React, MUI, and Bootstrap
- 🐶 **Pet Adoption Dashboard**:
  - View pets from internal uploads and the Petfinder API
  - Apply for adoption with filters (zip, age, gender)
- ✂️ **Grooming Appointments**:
  - Book, edit, and cancel grooming slots
  - Real-time updates with user-specific access
- 🩺 **Vet Booking System**
  - Users can schedule vet visits and view history
- 📬 **Contact Form with EmailJS**:
  - Sends messages directly to the admin inbox
- 📍 **Google Maps Integration**:
  - Embedded location view for the clinic

---

## 🛠️ Tech Stack

### Frontend:
- React
- React Router
- Material UI (MUI)
- Bootstrap 5
- EmailJS (for contact form)
- Petfinder API

### Backend:
- Node.js
- Express.js
- MongoDB & Mongoose

---

## 📁 Folder Structure

```
PetCare/
├── client/             # React Frontend
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── ...
├── server/             # Express Backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── ...
└── README.md
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone git@github.com:rahulmanohar14/Petcare_Website.git
cd PetCare

# Setup server
cd server
npm install
npm start

# Setup client
cd ../client
npm install
npm start
```

---

## 📦 APIs Used

- ✅ **EmailJS** – Send contact messages to your inbox
- ✅ **Petfinder API** – Pulls real-time adoptable pets by zip code

---

## 🔐 Authentication

- Passwords encrypted with **bcrypt**
- Role-based routing and dashboard access
- JWT can be integrated for future enhancement

---

## 📊 Features by Role

| Role             | Features                                                               |
|------------------|------------------------------------------------------------------------|
| Admin            | Manage all data (coming soon)                                          |
| Vet              | View appointments from users                                           |
| Groomer          | Approve/cancel grooming appointments                                   |
| Adoption Manager | Upload pets, manage adoption applications                              |
| User             | Book vet/grooming, apply for adoption, contact clinic, see dashboard  |

---