# Unit Tests for Karim Industries Website

This document describes the unit tests implemented for the Karim Industries website project.

## Overview

The project is a React application with the following components tested:

- App: Main application component with routing
- Header: Navigation header with search functionality
- Footer: Footer with links and contact information
- Home: Home page with product slider and sections
- Products: Products page displaying product catalog

## Test Setup

### Mocks

To handle images and external dependencies, the following mocks are used:

- **Images**: All image imports are mocked to return string paths to avoid loading actual image files.
- **React Router**: Components using routing hooks are wrapped with `MemoryRouter` or mocked globally.
- **Fetch API**: Mocked for components making API calls.
- **FileReader and Image**: Mocked for image upload functionality.

### Global Setup

In `src/setupTests.js`, global mocks are configured for:
- `fetch` API
- `Image` constructor
- `FileReader` for image uploads
- `react-router-dom` components and hooks

## Running Tests

```bash
npm test
```

To run tests once without watch mode:
```bash
npm test -- --watchAll=false
```

## Test Coverage

### App.test.js
- Renders the main App component with Header and Footer
- Tests routing for unknown routes (404)

### Header.test.js
- Renders header with logo and navigation links
- Tests search functionality and product filtering
- Tests navigation on search suggestion clicks
- Tests mobile menu presence

### Footer.test.js
- Renders footer with quick links
- Tests factory and office address display
- Tests social media links

### Home.test.js
- Renders home page slider with product images
- Tests image-text sections
- Tests product categories display
- Tests contact section

### Products.test.js
- Renders products page with product list
- Tests product descriptions and features
- Tests usage information display

## Notes

- All image imports are mocked to prevent loading actual image files during tests.
- API calls are mocked using Jest's `fetch` mock.
- Components using React Router hooks are tested within `MemoryRouter` context.
- Tests focus on rendering correctness and user interactions.

## Error Resolution

The original error "Exceeded maximum number of images (50) allowed in the request" was resolved by:
- Mocking all image imports in test files
- Using global mocks for image-related constructors
- Avoiding actual image loading during test execution

This allows the test suite to run without hitting the image processing limit imposed by the development environment.