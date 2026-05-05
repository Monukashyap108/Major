# 🏨 VOYASTRA — Hotel Reservation System
### Full Project Presentation | Major Project

---

## 📋 TABLE OF CONTENTS

| Slide | Topic |
|-------|-------|
| 1 | Project Introduction & Overview |
| 2 | Problem Statement |
| 3 | Project Objectives |
| 4 | Technology Stack |
| 5 | System Architecture |
| 6 | Application Flow |
| 7 | Pages & Features (User Side) |
| 8 | Pages & Features (Owner Side) |
| 9 | Key Components |
| 10 | State Management (Context API) |
| 11 | Routing Structure |
| 12 | UI/UX Design Decisions |
| 13 | Data Structure |
| 14 | Future Scope |
| 15 | Conclusion |

---

---

## 🖥️ SLIDE 1 — PROJECT INTRODUCTION

### Project Name: **VOYASTRA**
> *"Where Luxury Becomes Legacy"*

**Type:** Full-Stack Frontend Web Application  
**Domain:** Hotel & Motel Reservation System  
**Project Level:** Major Project (BCA / B.Tech Final Year)

### What is VOYASTRA?
VOYASTRA is a **modern hotel reservation platform** that allows:
- 🏘️ **Users** to browse hotels, view rooms, and make bookings
- 🏢 **Hotel Owners** to register their hotels, manage rooms, and view bookings — all through a dedicated owner dashboard

---

---

## ❓ SLIDE 2 — PROBLEM STATEMENT

### The Problem
Traditional hotel booking systems are:
- Complex and confusing for users
- Difficult for small hotel owners to manage their listings
- Not visually appealing on mobile devices
- Lacking a **dual-role system** (user + owner in one app)

### Our Solution
VOYASTRA solves this by providing:
- ✅ A **beautiful, fast** user interface built with React
- ✅ A **dedicated Owner Dashboard** separate from the user area
- ✅ Real-time feedback with **toast notifications**
- ✅ Easy navigation with **React Router**
- ✅ A **responsive design** that works on all screen sizes

---

---

## 🎯 SLIDE 3 — PROJECT OBJECTIVES

1. **Build a functional hotel reservation frontend** with browse, search, and booking features
2. **Create a dual-role system** — separate experience for Users and Hotel Owners
3. **Implement smooth navigation** using client-side routing (React Router DOM)
4. **Use modern UI/UX practices** — glassmorphism, animations, dark navbar
5. **Apply React Context API** for global state management (no Redux needed)
6. **Design a scalable folder structure** — pages, components, content, assets
7. **Deliver a presentation-ready application** with clean code and clear architecture

---

---

## 🛠️ SLIDE 4 — TECHNOLOGY STACK

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | v19.2.5 | Core UI framework |
| **React DOM** | v19.2.5 | Rendering React to browser |
| **Vite** | v8.0.9 | Build tool & dev server |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | v4.2.4 | Utility-first CSS framework |
| **@tailwindcss/vite** | v4.2.4 | Vite plugin for Tailwind |

### Routing
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Router DOM** | v7.14.2 | Client-side page routing |

### UI & Animations
| Technology | Version | Purpose |
|------------|---------|---------|
| **Lucide React** | v1.11.0 | Beautiful icon library |
| **Motion (Framer)** | v12.38.0 | Smooth animations |
| **React Hot Toast** | v2.6.0 | Toast notification alerts |

### Dev Tools
| Technology | Purpose |
|------------|---------|
| **ESLint** | Code quality linting |
| **@vitejs/plugin-react** | React fast refresh support |

---

---

## 🏗️ SLIDE 5 — SYSTEM ARCHITECTURE

```
VOYASTRA Application Architecture
===================================

📦 Motel_Reservation/
│
├── 📄 index.html              ← Entry HTML file
├── 📄 package.json            ← Dependencies list
├── 📄 vite.config.js          ← Vite configuration
│
└── 📁 src/
    │
    ├── 📄 main.jsx            ← App entry point (ReactDOM render)
    ├── 📄 App.jsx             ← Root component with all ROUTES
    │
    ├── 📁 pages/              ← All application pages
    │   ├── Home.jsx           ← Landing page
    │   ├── Hotel.jsx          ← All hotels listing
    │   ├── Rooms.jsx          ← All rooms listing
    │   ├── SingleRoom.jsx     ← Room details + Booking form
    │   ├── MyBooking.jsx      ← User's booking history
    │   ├── Login.jsx          ← Login page (User + Owner)
    │   ├── Signup.jsx         ← Registration page
    │   ├── About.jsx          ← About page
    │   │
    │   └── 📁 owner/          ← Owner Dashboard Section
    │       ├── OwnerLayout.jsx    ← Owner sidebar + navbar
    │       ├── AllHotels.jsx      ← View all registered hotels
    │       ├── RegisteredHotel.jsx← Register a new hotel
    │       ├── AllRooms.jsx       ← View all rooms
    │       ├── AddRoom.jsx        ← Add new room
    │       └── Bookings.jsx       ← Manage bookings
    │
    ├── 📁 components/         ← Reusable UI components
    │   ├── Navbar.jsx         ← Top navigation bar
    │   ├── Footer.jsx         ← Page footer
    │   ├── Hero.jsx           ← Hero section + Search form
    │   ├── MostPicked.jsx     ← Featured rooms section
    │   ├── PopularRooms.jsx   ← Popular rooms grid
    │   ├── RoomCard.jsx       ← Single room card display
    │   └── Testimonials.jsx   ← Customer reviews section
    │
    ├── 📁 content/            ← State management
    │   └── AppContext.jsx     ← React Context (Global State)
    │
    └── 📁 assets/             ← Static data & images
        └── assets.js          ← Hotel data, Room data, Booking data
```

---

---

## 🔄 SLIDE 6 — APPLICATION FLOW

### User Journey (Customer)

```
[User Opens App]
       ↓
[Home Page - Hero Section]
       ↓
[Browse Hotels → /hotel]     [Browse Rooms → /rooms]
       ↓                              ↓
[Click a Room → /single/:id]
       ↓
[View Room Details, Gallery, Amenities]
       ↓
[Fill Booking Form: Check-In, Check-Out, Guests]
       ↓
[Click "Check Availability" → Toast Success]
       ↓
[My Bookings Page → /my-bookings]
       ↓
[See Booking Status: Confirmed / Pending / Cancelled / Completed]
```

### Owner Journey (Hotel Owner)

```
[Owner Clicks "Owner" Button in Navbar]
       ↓
[Login Page → /login]
       ↓
[Owner Dashboard → /owner]
       ↓
       ├── [View All Hotels → /owner (AllHotels)]
       ├── [Register New Hotel → /owner/register-hotel]
       ├── [View/Manage Rooms → /owner/all-rooms]
       ├── [Add New Room → /owner/add-room]
       └── [View Bookings → /owner/bookings]
```

---

---

## 📱 SLIDE 7 — PAGES & FEATURES (USER SIDE)

### 🏠 1. Home Page (`/`)
- **Hero Section** with tagline: *"Where Luxury Becomes Legacy"*
- **Destination Search Form**: Destination input, Check-in Date, Check-out Date, Number of Persons, Search Button
- City suggestions via `<datalist>` — e.g., Mumbai, Delhi, Goa, Jaipur
- **Most Picked Rooms** section
- **Popular Rooms** grid
- **Testimonials** (Customer Reviews)
- Footer

---

### 🏨 2. Hotels Page (`/hotel`)
- Grid display of **all hotels** from data
- Each hotel card shows: Hotel Image, Hotel Name, Address, Price
- **Hover animation** — hotel details appear on image overlay (using Framer Motion)

---

### 🛏️ 3. Rooms Page (`/rooms`)
- Listing of all available rooms
- Room cards with key info

---

### 🔍 4. Single Room Page (`/single/:id`)
This is the most feature-rich page. It includes:

| Section | Details |
|---------|---------|
| **Header** | Room type, Address, Star rating, Availability badge (green/red), Price/night, Owner name, Contact |
| **Image Gallery** | Main image + clickable thumbnails (state: `selectedImage`) |
| **About Room** | Description text |
| **Room Amenities** | Icons mapped to amenity names (WiFi, Parking, Pool, Spa, etc.) |
| **Hotel Amenities** | Hotel-wide facilities with icons |
| **Booking Form** | Check-in, Check-out, Number of Guests, Price display, Book button |

**Booking Logic:**
- Validates that all fields are filled → shows error toast if not
- On success → shows success toast → navigates to My Bookings
- Button is disabled (`cursor-not-allowed`) if room is **not available**

---

### 📋 5. My Bookings Page (`/my-bookings`)
Displays all user bookings in a responsive table:

| Column | Info |
|--------|------|
| Hotel & Room | Image, hotel name, room type, address, guest count |
| Dates | Check-in and Check-out with formatted dates |
| Payment | Payment method, total price, Paid / Unpaid badge |
| Status | Confirmed / Pending / Cancelled / Completed (color-coded) |
| Actions | Cancel booking button (Trash icon) |

---

### 🔐 6. Login Page (`/login`)
- Email + Password fields
- "Don't have an account? Create one here" link → Signup
- On submit: sets `owner = true` → navigates to `/owner` dashboard
- Uses `react-hot-toast` for success message

---

### 📝 7. Signup Page (`/signup`)
- User registration form
- Name, Email, Password fields
- Link back to Login

---

---

## 👨‍💼 SLIDE 8 — PAGES & FEATURES (OWNER SIDE)

### 🔒 Owner Route Protection
```jsx
<Route path="/owner" element={owner ? <OwnerLayout/> : <Login/>}>
```
> If the user is NOT logged in as owner → they get redirected to Login page automatically.

---

### 🗂️ Owner Layout (`/owner`)
The owner has a **dedicated layout** separate from the user area:
- **Dark top navbar** with "VOYASTRA" branding + "Hi! Owner" text + Logout button
- **Left sidebar** with navigation links:
  - Dashboard (grid icon)
  - Rooms (Warehouse icon)
  - Bookings (CalendarArrowDown icon)
- `<Outlet/>` renders the active child page to the right of sidebar

---

### 🏨 All Hotels (`/owner` — index route)
- Table showing all registered hotels with:
  - Hotel image + name
  - Address (with MapPin icon)
  - Contact Number
  - Star Rating (yellow star icon)
  - Price per Night (green text)
  - Amenities (shown as blue badge chips)
  - Delete button (red)
- **"Register Hotel"** button → navigates to `/owner/register-hotel`

---

### ➕ Register Hotel (`/owner/register-hotel`)
- Form to add a new hotel to the system

---

### 🛏️ All Rooms (`/owner/all-rooms`)
- View all rooms linked to the owner's hotel

---

### ➕ Add Room (`/owner/add-room`)
- Form to add a new room with details

---

### 📅 Bookings (`/owner/bookings`)
- View all bookings made for the owner's hotels

---

---

## 🧩 SLIDE 9 — KEY COMPONENTS

### 1. `Navbar.jsx`
- **Fixed dark navbar** (`position: fixed, top: 0`)
- Logo: **VOYASTRA** in gold color (`#e8d5a3`)
- Nav Links: Home, Hotels, Rooms, About
- "Owner" button → access owner dashboard
- **User logged in?** → Shows profile icon with dropdown (My Bookings, Logout)
- **User NOT logged in?** → Shows gold "Login" button
- **Mobile responsive** — hamburger menu slides in from left

---

### 2. `Hero.jsx`
- Full-screen hero with tagline and CTA button
- Search form with dark background (`#1b1208`)
- Fields: Destination (with datalist cities), Check-in, Check-out, Persons
- "Search" button in gold color

---

### 3. `Testimonials.jsx`
- Customer review section
- Displays multiple reviews with star ratings and reviewer details

---

### 4. `RoomCard.jsx`
- Reusable card component for displaying individual rooms
- Used in room listing pages

---

### 5. `Footer.jsx`
- Site footer with links, branding info

---

### 6. `OwnerLayout.jsx`
- Shared layout for all `/owner` routes
- Contains sidebar + top navbar
- Uses React Router's `<Outlet/>` to render child pages

---

---

## 🌐 SLIDE 10 — STATE MANAGEMENT (CONTEXT API)

### Why Context API?
Instead of prop-drilling (passing props through many components) or using heavy tools like Redux, VOYASTRA uses React's built-in **Context API** — perfect for a medium-sized project.

### `AppContext.jsx` — Global State

```jsx
// States managed globally:
const [user, setUser] = useState(null);       // Logged-in user
const [owner, setOwner] = useState(null);     // Logged-in owner
const [hotelData, setHotelData] = useState([]);  // All hotels
const [roomData, setRoomData] = useState([]);    // All rooms
```

### What is shared via Context?
| Value | Type | Used For |
|-------|------|---------|
| `user` | state | Know if a user is logged in |
| `setUser` | function | Login / Logout user |
| `owner` | state | Know if owner is logged in |
| `setOwner` | function | Login / Logout owner |
| `hotelData` | array | All hotel data for display |
| `roomData` | array | All room data for display |
| `navigate` | function | Programmatic navigation |

### How Data is Loaded
```jsx
useEffect(() => {
  fetchHotelsData();  // Loads hotel data from assets.js
  fetchRoomsData();   // Loads room data from assets.js
}, []);
```
> Currently data is loaded from local `assets.js` file (static data). In the future, this will be replaced with API calls to a backend.

---

---

## 🗺️ SLIDE 11 — ROUTING STRUCTURE

All routes are defined in `App.jsx` using React Router DOM v7:

```
ROUTE                    COMPONENT          ACCESS
/                     →  Home              Public
/about                →  About             Public
/login                →  Login             Public
/signup               →  Signup            Public
/hotel                →  Hotel             Public
/rooms                →  Rooms             Public
/single/:id           →  SingleRoom        Public
/my-bookings          →  MyBooking         User
/owner                →  OwnerLayout       Owner (Protected)
  /owner (index)      →  AllHotels         Owner
  /owner/register-hotel → RegisteredHotel  Owner
  /owner/all-rooms    →  AllRooms          Owner
  /owner/add-room     →  AddRoom           Owner
  /owner/bookings     →  Bookings          Owner
```

### Smart Layout Logic in `App.jsx`
```jsx
const ownerPath = useLocation().pathname.includes('/owner')

// Navbar and Footer are HIDDEN on owner pages
{!ownerPath && <Navbar/>}
{!ownerPath && <Footer/>}
```
> This means the owner dashboard has its **own navbar and sidebar**, while user pages use the main Navbar and Footer.

---

---

## 🎨 SLIDE 12 — UI/UX DESIGN DECISIONS

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Dark Brown/Black | `#0f0a04` (rgba 0.92) | Navbar background |
| Gold | `#e8d5a3` | Logo text |
| Deep Gold | `#967528` | CTA buttons |
| Light Gold | `#b8943f` | Login button, accents |
| White | `#ffffff` | Cards, forms |
| Gray-50 | `#f9fafb` | Page backgrounds |

### Design Principles Used
1. **Glassmorphism** — `bg-white/50` with `shadow-xl` for frosted glass cards
2. **Fixed Navbar** — Always visible as user scrolls
3. **Smooth Transitions** — `transition-all duration-300` on hover states
4. **Framer Motion** — Used in Hotel listing for entrance animations
5. **Color-coded Status Badges** — Green (Confirmed), Red (Cancelled), Yellow (Pending), Blue (Completed)
6. **Responsive Design** — Mobile hamburger menu, responsive grid layouts
7. **Icon-driven UI** — Lucide React icons for visual communication (MapPin, Star, Wifi, Car, etc.)

### Typography
- Primary Font: System fonts via Tailwind
- Special Fonts: `Cormorant Garamond` (Login heading), `Jost` (form elements)
- Font weights: Thin (100) used deliberately for luxury feel

---

---

## 📊 SLIDE 13 — DATA STRUCTURE

### Hotel Object Structure
```js
{
  id: 1,
  name: "Hotel Name",
  image: "image_url",
  address: "City, Country",
  contactNumber: "+91 XXXXXXXXXX",
  rating: 4.5,
  price: "$120",
  amenities: ["Free WiFi", "Pool", "Spa", "Parking", "Restaurant"]
}
```

### Room Object Structure
```js
{
  _id: "unique_id",
  roomType: "Deluxe Suite",
  hotel: {
    name: "Hotel Name",
    address: "City",
    rating: 4.5,
    ownerName: "Owner Name",
    contactNumber: "+91 XXXXXXXXXX",
    amenities: ["Free WiFi", "Spa Access"]
  },
  images: ["img1.jpg", "img2.jpg", "img3.jpg"],
  description: "Room description text...",
  amenities: ["Ocean View", "Mini Bar", "Free Wifi"],
  pricePerNight: 150,
  isAvailable: true
}
```

### Booking Object Structure
```js
{
  _id: "booking_id",
  hotel: { name: "Hotel", address: "City" },
  room: { roomType: "Suite", images: ["img.jpg"] },
  checkInDate: "2024-12-25",
  checkOutDate: "2024-12-28",
  guest: 2,
  paymentMethod: "Credit Card",
  totalPrice: "$450",
  isPaid: true,
  status: "Confirmed"  // Confirmed | Pending | Cancelled | Completed
}
```

---

---

## 🚀 SLIDE 14 — FUTURE SCOPE

| Feature | Description |
|---------|-------------|
| 🔗 **Backend Integration** | Connect to Node.js + Express API instead of static data |
| 🗄️ **Database** | MongoDB to store hotels, rooms, users, bookings |
| 🔐 **JWT Authentication** | Real login/signup with token-based auth |
| 💳 **Payment Gateway** | Integrate Razorpay or Stripe for real payments |
| 🔍 **Search & Filter** | Filter rooms by price, amenities, availability |
| 📧 **Email Notifications** | Booking confirmation emails |
| ⭐ **Review System** | Let users leave reviews after checkout |
| 📱 **Mobile App** | React Native version for iOS/Android |
| 🗺️ **Maps Integration** | Google Maps for hotel location |
| 📊 **Analytics Dashboard** | Charts for bookings, revenue for owners |

---

---

## ✅ SLIDE 15 — CONCLUSION

### What We Built
VOYASTRA is a **complete hotel reservation web application** with:
- ✅ Beautiful, responsive UI using React + Tailwind CSS
- ✅ Dual-role system: **User** and **Hotel Owner** dashboards
- ✅ Complete booking flow from browsing → room detail → booking
- ✅ Global state management with React Context API
- ✅ Protected routes for the owner dashboard
- ✅ Real-time notifications with React Hot Toast
- ✅ Smooth animations with Framer Motion
- ✅ Client-side routing with React Router DOM v7
- ✅ Scalable, clean folder structure ready for backend integration

### Key Learnings
1. **React Component Architecture** — Breaking UI into reusable pieces
2. **State Management** — Context API for global state without Redux
3. **React Router DOM v7** — Nested routes, protected routes, `<Outlet/>`
4. **Tailwind CSS v4** — Rapid, utility-first styling
5. **Framer Motion** — Professional animations
6. **Role-based UI** — Different experiences for different user types

---

### 👨‍💻 Project By: Monu Kashyap
### 🏫 Major Project — 2026
### 🌐 Project Name: **VOYASTRA — Where Luxury Becomes Legacy**

---

> *"This project demonstrates a real-world hotel reservation system built entirely with modern frontend technologies, showcasing practical knowledge of React ecosystem, component design, state management, routing, and UI/UX principles."*

---
