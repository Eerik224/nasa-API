# NASA Data Explorer 🚀

A full-stack web application that showcases NASA's vast array of space data through an interactive and visually appealing interface. Built with React frontend and Node.js/Express backend.

## 🌟 Features

- **Astronomy Picture of the Day (APOD)**: View stunning daily space images with detailed descriptions
- **Mars Rover Photos**: Explore Mars through the eyes of NASA's rovers
- **Near Earth Objects (NEO)**: Track asteroids and comets near Earth
- **Interactive Data Visualization**: Charts, graphs, and dynamic displays
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Search & Filter**: Find specific data with advanced filtering options
- **Real-time Data**: Live data from NASA's APIs
- **Loading States**: Smooth user experience with proper loading indicators

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Interactive charts and graphs
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client for NASA API calls
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
nasa-data-explorer/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # CSS and styling
│   │   └── App.jsx         # Main App component
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js/Express backend
│   ├── routes/             # API route handlers
│   ├── services/           # NASA API service functions
│   ├── middleware/         # Express middleware
│   ├── server.js           # Main server file
│   └── package.json
├── NASA_API_KEY.txt        # NASA API key (keep private)
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- NASA API key (get one at https://api.nasa.gov/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nasa-data-explorer
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   NASA_API_KEY=your_nasa_api_key_here
   PORT=5000
   ```

5. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📖 Usage

### Navigation
- **Home**: Overview of available NASA data
- **APOD**: Astronomy Picture of the Day with date picker
- **Mars Rover**: Browse photos from Mars rovers with filtering options
- **NEO Tracker**: Near Earth Objects with interactive charts
- **About**: Information about the application and NASA APIs

### Features
- **Date Selection**: Choose specific dates for APOD and Mars rover photos
- **Filtering**: Filter Mars rover photos by camera and rover
- **Search**: Search through NEO data
- **Responsive**: Works on all device sizes
- **Loading States**: Visual feedback during data loading

## 🔧 API Endpoints

### Backend Routes
- `GET /api/apod` - Get Astronomy Picture of the Day
- `GET /api/apod/:date` - Get APOD for specific date
- `GET /api/mars-rover` - Get Mars rover photos
- `GET /api/neo` - Get Near Earth Objects data
- `GET /api/neo/feed` - Get NEO feed data

### NASA API Integration
The backend acts as a proxy to NASA's APIs, handling:
- API key management
- Rate limiting
- Error handling
- Data transformation
- CORS configuration

## 🎨 Design Features

- **Modern UI**: Clean, space-themed design
- **Dark Mode**: Easy on the eyes for space content
- **Animations**: Smooth transitions and loading states
- **Interactive Charts**: Dynamic data visualization
- **Responsive Layout**: Optimized for all screen sizes

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/dist`
4. Deploy!

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && npm start`
4. Add environment variables (NASA_API_KEY)
5. Deploy!

## 🔒 Environment Variables

### Backend (.env)
```env
NASA_API_KEY=your_nasa_api_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```