# Secrets - Secure Authentication Web Application

A robust web application demonstrating comprehensive authentication and security measures, designed to provide a secure environment for users to manage their confidential information.

## 🚀 Features

### User Registration
- **Secure Sign-Up Process**: Complete user registration with name, email, and password
- **Email Validation**: Real-time email format verification
- **Password Security**: Strong password requirements with visual feedback
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one number
  - 6-8 characters in length
- **Password Hashing**: Secure bcrypt hashing with 12 salt rounds
- **Show Password**: Toggle password visibility for better user experience

### Authentication & Login
- **Secure Login**: Email and password-based authentication
- **Input Validation**: Comprehensive client and server-side validation
- **Error Handling**: User-friendly error messages and validation feedback

### Session Management
- **JWT Tokens**: JSON Web Token-based authentication for stateless sessions
- **Secure Cookies**: HttpOnly, secure cookies with SameSite protection
- **Session Expiry**: 24-hour token expiration for enhanced security

### Security Features
- **Rate Limiting**: Protection against brute force attacks
- **Helmet.js**: Security headers and Content Security Policy
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Sanitization**: Request size limits and validation
- **Secure Headers**: Comprehensive security middleware

### User Dashboard
- **Protected Routes**: Authentication-required access to user information
- **User Profile**: Display account information and security status
- **Session Management**: Secure logout with cookie cleanup

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **bcryptjs**: Password hashing library
- **jsonwebtoken**: JWT implementation
- **cookie-parser**: Cookie parsing middleware
- **express-rate-limit**: Rate limiting middleware
- **helmet**: Security middleware
- **cors**: Cross-origin resource sharing

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with responsive design
- **Vanilla JavaScript**: ES6+ features and async/await
- **Font Awesome**: Icon library for enhanced UI

## 📁 Project Structure

```
secrets-web-app/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── config.env             # Environment configuration
├── README.md              # Project documentation
└── public/                # Frontend assets
    ├── index.html         # Main HTML file
    ├── styles.css         # CSS styles
    └── script.js          # Frontend JavaScript
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd secrets-web-app
   
   # Or simply extract the downloaded files
   cd secrets-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Edit config.env file
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - The application will automatically redirect to the registration page

## 🔐 Security Implementation

### Password Security
- **Hashing**: bcrypt with 12 salt rounds
- **Validation**: Strong password requirements enforced
- **Storage**: Never stored in plain text

### Session Security
- **JWT Tokens**: Stateless authentication
- **Secure Cookies**: HttpOnly, secure, SameSite attributes
- **Token Expiry**: Automatic session expiration

### API Security
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configurable cross-origin policies
- **Security Headers**: Comprehensive security middleware

### Data Protection
- **Request Limits**: 10KB limit on request bodies
- **Input Sanitization**: Validation and sanitization of all inputs
- **Error Handling**: Secure error messages without information leakage

## 📱 User Experience Features

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface elements

### Interactive Elements
- Real-time password validation
- Show/hide password functionality
- Loading states and feedback
- Toast notifications for user actions

### Form Management
- Client-side validation
- Server-side validation
- User-friendly error messages
- Form state management

## 🔧 Configuration Options

### Environment Variables
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### Security Settings
- Rate limiting: 100 requests per 15 minutes
- Session timeout: 24 hours
- Password requirements: Configurable in server.js
- CORS: Configurable based on environment

## 🚨 Production Considerations

### Security Enhancements
- Change the JWT secret to a strong, unique value
- Enable HTTPS in production
- Set `NODE_ENV=production`
- Configure proper CORS origins
- Use environment variables for sensitive data

### Database Integration
- Replace in-memory storage with a proper database
- Implement connection pooling
- Add database security measures
- Consider using ORM/ODM for data validation

### Monitoring & Logging
- Implement comprehensive logging
- Add monitoring and alerting
- Set up error tracking
- Monitor security events

## 🧪 Testing the Application

### Registration Flow
1. Navigate to the application
2. Fill out the registration form with valid data
3. Verify password requirements are met
4. Submit the form
5. Check for success message and redirect to login

### Login Flow
1. Use registered credentials to log in
2. Verify successful authentication
3. Check dashboard access
4. Verify user information display

### Security Testing
1. Test password requirements
2. Verify email validation
3. Test rate limiting
4. Check secure cookie attributes
5. Verify logout functionality

## 🤝 Contributing

This project demonstrates security best practices and can be extended with:
- Additional authentication methods (OAuth, 2FA)
- Enhanced password policies
- Audit logging
- User management features
- API rate limiting customization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This application is designed for educational and demonstration purposes. When implementing in production environments, ensure:
- Proper security audits
- Regular security updates
- Compliance with relevant regulations
- Professional security review

## 🆘 Support

For questions or issues:
1. Check the documentation above
2. Review the code comments
3. Test with different scenarios
4. Ensure all dependencies are properly installed

---

**Built with security in mind** 🔒
