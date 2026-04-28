# Backend Unit Tests for Karim Industries API

This document describes the unit tests implemented for the backend API of the Karim Industries website.

## Overview

The backend is an Express.js API with MongoDB integration that provides endpoints for:
- Product management (CRUD operations)
- User authentication and management
- Database statistics
- Health checks

## Test Setup

### Dependencies Added

- **Jest**: Testing framework
- **Supertest**: HTTP endpoint testing
- **MongoDB Mock**: Mocked database operations
- **bcryptjs Mock**: Mocked password hashing
- **fs/path Mocks**: Mocked file system operations

### Mocks

To isolate tests from external dependencies:

- **MongoDB**: All database operations are mocked
- **File System**: File reading operations are mocked
- **bcrypt**: Password hashing is mocked
- **Environment Variables**: dotenv is mocked

## Test Structure

### tests/api.test.js
Tests all API endpoints:

- **Health Check**: `/api/health`
- **Products**: CRUD operations (`/api/products`)
- **Users**: User management (`/api/users`)
- **Authentication**: Login/Register (`/api/auth`)
- **Statistics**: Database stats (`/api/stats`)

### tests/utils.test.js
Tests utility functions:

- **loadProductsFromFiles**: File loading functionality
- Error handling for file operations
- JSON parsing and filtering

## Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## Test Coverage

### API Endpoints Tested

- ✅ GET `/api/health` - Health check
- ✅ GET `/api/products` - List all products
- ✅ POST `/api/products` - Create product
- ✅ GET `/api/products/:id` - Get product by ID
- ✅ PUT `/api/products/:id` - Update product
- ✅ DELETE `/api/products/:id` - Delete product
- ✅ GET `/api/users` - List users
- ✅ POST `/api/auth/register` - User registration
- ✅ POST `/api/auth/login` - User login
- ✅ GET `/api/stats` - Database statistics

### Utility Functions Tested

- ✅ `loadProductsFromFiles` - Product file loading
- ✅ Error handling for file operations
- ✅ JSON file filtering

## Mock Strategy

### Database Mocking
```javascript
const mockCollection = {
  countDocuments: jest.fn().mockResolvedValue(10),
  find: jest.fn(() => ({
    sort: jest.fn(() => ({
      toArray: jest.fn().mockResolvedValue([]),
      next: jest.fn().mockResolvedValue(null)
    }))
  }))
};
```

### File System Mocking
```javascript
fs.readdirSync.mockReturnValue(['product1.json', 'product2.json']);
fs.readFileSync.mockReturnValue('{"id": 1, "name": "Test Product"}');
```

## Test Organization

All tests are organized in the `tests/` folder:
```
backend/
├── tests/
│   ├── api.test.js      # API endpoint tests
│   └── utils.test.js    # Utility function tests
├── server.js
├── package.json
└── ...
```

## Notes

- Tests run in isolation with mocked dependencies
- No actual database connections are made
- File system operations are mocked to avoid real file access
- Authentication tests use mocked bcrypt operations
- All tests are designed to be fast and reliable

## Configuration

Jest is configured in `package.json`:
```json
{
  "jest": {
    "testEnvironment": "node",
    "testMatch": ["**/tests/**/*.test.js"],
    "collectCoverageFrom": [
      "**/*.js",
      "!**/node_modules/**",
      "!**/tests/**"
    ]
  }
}
```