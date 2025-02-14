# Event Ticketing App

## 📌 Project Description
This project is a mobile-friendly event ticketing application built with **React Native** and **Expo**.

## 🚀 Features
- **User Selection & Creation**: Users can either select an existing account or create a new one.
- **Event Browsing**: Users can view all available events, see ticket availability, and check event details.
- **Ticket Purchase**: Users can purchase tickets for an event and receive confirmation.
- **Navigation Flow**: Users seamlessly transition from selecting a user → choosing an event → purchasing a ticket.


## 🛠 Setup Instructions

#### Prerequisites
Ensure you have the following installed on your system:
- **Node.js (v20 or later)**
- **Yarn**

### 1️⃣ **Clone the repository**
```sh
git clone https://github.com/your-repo/event-ticketing-app.git
cd event-ticketing-app/frontend
```

### 2️⃣ **Install dependencies**
```sh
yarn
```

### 3️⃣ **Configure Environment Variables**
This project uses **`expo-constants`** to store API configuration. The API URL should be defined in `app.config.js`.

The API URL is set to http://localhost:3000/graphql by default. If you need to change it, update the extra.API_URL field in app.config.js:

---

### 4️⃣ **Run the app**
Use **Expo CLI** to start the application:
```sh
yarn start
```
Or run on a specific platform:
```sh
yarn android  # Run on Android emulator/device
yarn ios      # Run on iOS simulator/device
yarn web      # Run in the browser
```

## 📌 Notes
- The **backend API** is expected to be running at the provided `API_URL`.
- The app follows a **User → Event → Ticket Purchase** flow.
- The **User Selection** step is required before accessing events.
- **GraphQL Codegen** is used to generate TypeScript types for API responses.

---
