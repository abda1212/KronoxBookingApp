# KronoX Booking System

A modern, responsive React Native application for booking group rooms at Högskolan Väst. Built with a focus on user experience and clean design.

## Features

- 🔐 **Secure Authentication**
  - Email-based authentication
  - Secure user sessions
  - Protected routes

- 📱 **Responsive Design**
  - Optimized for both mobile and tablet devices
  - Adaptive layouts for different screen sizes
  - Landscape and portrait mode support

- 🏢 **Room Management**
  - View available rooms
  - Real-time room status updates
  - Detailed room information
  - Capacity indicators

- 📅 **Smart Booking System**
  - Intuitive time slot selection
  - Date-based availability
  - Real-time booking updates
  - Booking confirmation system

- 👤 **User Profile**
  - Personalized user dashboard
  - Profile customization
  - Booking history
  - Profile image support

## Tech Stack

- React Native
- Firebase Authentication
- Firebase Firestore
- Expo
- React Navigation
- Custom UI Components
- Vector Icons

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Firebase account
- iOS Simulator (for Mac) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kronox-booking-system.git
cd kronox-booking-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
kronox-booking-system/
├── src/
│   ├── components/
│   │   ├── AuthScreen.js
│   │   ├── Booking.js
│   │   ├── BookingCard.js
│   │   ├── HomeScreen.js
│   │   ├── NavBar.js
│   │   ├── Profile.js
│   │   ├── RoomCard.js
│   │   ├── RoomList.js
│   │   ├── TimeSlot.js
│   │   └── UIComponents.js
│   ├── config/
│   │   └── FireBaseConfig.js
│   └── App.js
├── .env
├── package.json
└── README.md
```

## Usage

1. **Authentication**
   - Sign up with your email and password
   - Log in to access the booking system

2. **Booking a Room**
   - Browse available rooms on the home screen
   - Select a room to view details
   - Choose a date and time slot
   - Confirm your booking

3. **Managing Bookings**
   - View your current bookings
   - Cancel bookings if needed
   - Check room availability

4. **Profile Management**
   - Update your profile information
   - Change profile picture
   - View booking history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Högskolan Väst for the inspiration
- React Native community for the amazing tools and libraries
- All contributors who have helped shape this project

## Support

For support, email support@kronoxbooking.com or create an issue in the repository.

---

Built with ❤️ for Högskolan Väst students
