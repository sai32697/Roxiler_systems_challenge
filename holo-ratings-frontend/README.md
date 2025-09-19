# Holo Ratings Frontend

A modern, responsive Next.js frontend application for the Holo Ratings system. This application provides a beautiful user interface for rating and discovering stores.

## 🚀 Features

### ✨ **Modern UI/UX**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Custom CSS animations and transitions for enhanced user experience
- **Beautiful Components**: Modern card-based design with hover effects and gradients
- **Toast Notifications**: Real-time feedback for user actions

### 🔐 **Authentication System**
- **Secure Login/Logout**: JWT-based authentication with protected routes
- **User Registration**: Complete signup flow with validation
- **Role-based Access**: Different interfaces for Admin, Owner, and User roles
- **Demo Accounts**: Pre-configured accounts for testing

### 🏪 **Store Management**
- **Store Discovery**: Browse and search through stores with advanced filtering
- **Interactive Rating**: 5-star rating system with comments
- **Real-time Updates**: Instant rating updates and store statistics
- **Store Details**: Comprehensive store information display

### ⭐ **Rating System**
- **Interactive Rating Modal**: Beautiful modal with animated star selection
- **Rating History**: View and manage personal ratings
- **Rating Analytics**: Display average ratings and review counts
- **Comment System**: Detailed feedback with text comments

### 👑 **Admin Dashboard**
- **Statistics Overview**: Real-time dashboard with key metrics
- **User Management**: View and manage all registered users
- **Store Management**: Comprehensive store administration
- **Role Management**: Admin-only access controls

## 🛠️ **Technologies Used**

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful icon library
- **Context API** - State management for auth and notifications

## 📦 **Installation & Setup**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation Steps

1. **Clone and Install Dependencies**
   ```bash
   cd holo-ratings-frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # .env.local is already configured with:
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## 🔑 **Demo Accounts**

| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@holo.com | Admin@1234 |
| Owner | owner@holo.com | Owner@1234 |
| User  | user@holo.com | User@1234 |

## 📱 **Pages & Features**

### **Public Pages**
- **`/`** - Homepage with features overview and call-to-action
- **`/login`** - User authentication with demo account info
- **`/signup`** - User registration with validation

### **Protected Pages**
- **`/stores`** - Browse and rate stores with search functionality
- **`/my-ratings`** - View personal rating history
- **`/admin`** - Admin dashboard (admin only)

## 🎨 **Design Features**

### **Animations & Transitions**
- **Fade In**: Smooth page load animations
- **Slide Up**: Card entrance animations with staggered delays
- **Hover Effects**: Interactive button and card hover states
- **Loading States**: Beautiful loading spinners and skeleton screens

### **Responsive Design**
- **Mobile First**: Optimized for mobile devices
- **Flexible Grid**: Responsive store card layouts
- **Touch Friendly**: Large touch targets for mobile users
- **Adaptive Navigation**: Collapsible navigation for small screens

### **Visual Enhancements**
- **Gradient Backgrounds**: Modern gradient buttons and text
- **Custom Scrollbars**: Styled scrollbars for better aesthetics
- **Shadow Effects**: Layered shadows for depth
- **Color System**: Consistent blue-based color palette

## 🔧 **Component Architecture**

### **Layout Components**
- `Layout` - Main application wrapper
- `Navbar` - Navigation with user info and role-based links

### **Store Components**
- `StoreCard` - Individual store display with rating info
- `RatingModal` - Interactive rating submission modal

### **UI Components**
- `LoadingSpinner` - Reusable loading indicator
- `Toast` - Notification system for user feedback

### **Context Providers**
- `AuthContext` - Authentication state management
- `ToastContext` - Global notification system

## 🚀 **Performance Features**

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Optimized bundle sizes
- **Lazy Loading**: Components loaded on demand

## 🔒 **Security Features**

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Role-based route protection
- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs

## 📊 **State Management**

- **Authentication State**: Global user authentication state
- **Toast Notifications**: Global notification system
- **Form State**: Local component state management
- **API State**: Axios interceptors for global error handling

## 🎯 **User Experience**

- **Intuitive Navigation**: Clear navigation structure
- **Visual Feedback**: Immediate feedback for all actions
- **Error Handling**: Graceful error states and messages
- **Loading States**: Clear loading indicators
- **Accessibility**: Keyboard navigation and screen reader support

## 🔄 **API Integration**

- **RESTful API**: Clean API integration with Axios
- **Error Handling**: Comprehensive error handling and user feedback
- **Request Interceptors**: Automatic token attachment
- **Response Interceptors**: Global error handling

## 📈 **Future Enhancements**

- **Dark Mode**: Theme switching capability
- **Advanced Search**: More sophisticated search filters
- **Real-time Updates**: WebSocket integration for live updates
- **PWA Support**: Progressive Web App features
- **Offline Support**: Service worker implementation

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**