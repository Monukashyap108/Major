# Motel Reservation System 🏨

A comprehensive web application designed to seamlessly connect users with motel accommodations while providing property owners with a robust management dashboard. 

## 🚀 Features

### For Users 🧑‍💼
* **Authentication:** Secure Login and Signup functionality.
* **Browse & Search:** Explore available hotels and browse specific rooms.
* **Room Details:** View detailed information for a single room (`/single/:id`).
* **Booking Management:** Users can easily make reservations and track them in the "My Bookings" section.
* **Responsive Design:** A fully responsive interface that works on all screen sizes.

### For Property Owners 💼
* **Owner Dashboard:** A dedicated and secure dashboard for owners (`/owner`).
* **Hotel Management:**
  * Register new hotels (`/owner/register-hotel`).
  * View all owned hotels (`/owner`).
* **Room Management:**
  * Add new rooms to properties (`/owner/add-room`).
  * View and manage all rooms (`/owner/all-rooms`).
* **Booking Overview:** Track and manage customer reservations (`/owner/bookings`).

## 🛠️ Tech Stack

This project is built using modern web development technologies:

* **Frontend Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/) - For lightning-fast Hot Module Replacement (HMR).
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework.
* **Icons:** [Lucide React](https://lucide.dev/)
* **Animations:** [Framer Motion](https://motion.dev/)
* **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## 📂 Project Structure

```
src/
├── assets/        # Static files like images and SVGs
├── components/    # Reusable UI components (Navbar, Footer, etc.)
├── content/       # Context API files (e.g., AppContext)
├── pages/         # Main application pages
│   ├── owner/     # Owner dashboard specific pages
│   └── ...        # User-facing pages (Home, Login, Rooms, etc.)
├── App.jsx        # Main application routing
└── main.jsx       # React application entry point
```

## 💻 Running Locally

Follow these steps to set up the project on your local machine:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repository-url>
   cd Motel_Reservation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open your browser and navigate to the URL provided in your terminal (usually `http://localhost:5173`).

## 📜 Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Bundles the app into static files for production.
* `npm run preview`: Boot up a local static web server that serves the files from `dist`.
* `npm run lint`: Runs ESLint to find and fix problems in your code.
