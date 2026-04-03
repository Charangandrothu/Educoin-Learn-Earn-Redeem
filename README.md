# 🪙 EduCoin – Learn, Earn & Redeem

A web application prototype for a Community Service Project called "Quality Education". Students can log in, complete tasks, earn coins (Silver, Gold, Platinum), and redeem them for rewards.

## 🚀 Features:

### For Students:
- **Login System**: Secure login using Roll Number and Password
- **Dashboard**: View coin balances and task progress
- **Task Management**: Browse available tasks, start tasks, and mark them as completed
- **Coin System**: Earn Silver, Gold, and Platinum coins for completing tasks
- **Redemption**: Redeem coins for rewards like canteen coupons, bookstore credits, and school kits
- **Progress Tracking**: Visual progress bar showing completed tasks

### For Admins:
- **Admin Panel**: Complete admin dashboard for managing the system
- **Student Management**: Add, edit, and delete students
- **Task Management**: Create, edit, and delete tasks
- **Redemption History**: View all redemption requests
- **Leaderboard**: See top 10 students ranked by total coins

## 🛠️ Tech Stack

- **React.js** - Frontend framework
- **React Router** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **Context API** - State management
- **localStorage** - Data persistence (simulating Google Sheets API)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Demo Credentials

### Student Login:
- **Roll Number**: `xx` (or any from 2024001 to 2024005)
- **Password**: `xxxx`


## 📁 Project Structure

```
educoin/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   │   └── TaskModal.js
│   ├── context/
│   │   └── AppContext.js
│   ├── data/
│   │   └── mockData.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── Tasks.js
│   │   ├── Redeem.js
│   │   └── Admin.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design Features

- **School-themed UI**: Light blue, white, and pastel gradients
- **Card-based Layout**: Clean, modern card design with rounded corners
- **Responsive Design**: Works on both desktop and mobile devices
- **Gamified Elements**: Coin icons and progress indicators
- **Smooth Animations**: Transitions and hover effects

## 📝 Mock Data

The application uses mock data stored in `src/data/mockData.js` that simulates a Google Sheets database. This includes:
- Student records with coin balances
- Available tasks with rewards
- Redemption options

## 🔄 Google Sheets Integration

Currently, the app uses localStorage to persist data. To integrate with Google Sheets API:

1. Set up Google Sheets API credentials
2. Replace localStorage operations in `AppContext.js` with API calls
3. Update the authentication logic in the `login` function
4. Modify data update functions to sync with Google Sheets

## 🎯 Future Enhancements

- Real-time notifications for new tasks
- Email/SMS notifications for redemptions
- Advanced analytics and reporting
- Mobile app version
- Integration with school management systems
- Multi-language support

## 📄 License

This project is created for educational purposes as part of a Community Service Project.

## 👥 Contributing

This is a prototype project. Feel free to fork and enhance it for your own use!

---

**Built with ❤️ for Quality Education**

