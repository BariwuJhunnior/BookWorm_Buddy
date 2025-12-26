# BookWorm Buddy

A modern, responsive web application for book enthusiasts to discover, organize, and track their reading journey. Built with React and powered by the Open Library API, BookWorm Buddy provides an intuitive interface for searching books, managing reading lists, and accessing detailed book information.

## Features

### Book Discovery

- **Intelligent Search**: Real-time book search with debounced input for optimal performance
- **Rich Book Cards**: Display book covers, titles, authors, publication dates, and summaries
- **Detailed Information**: Comprehensive book details including publishers, subjects, and page counts

### Reading Management

- **Reading List**: Save books for future reading
- **Favorites**: Mark and organize your favorite books
- **Books Read**: Track your completed readings
- **Reading Status**: Visual indicators for different reading states

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with Tailwind CSS
- **Loading States**: Smooth loading indicators and error handling
- **Persistent Search**: Maintains search results when clearing input

### External Integration

- **Direct Reading Access**: Open books directly in Internet Archive for available titles
- **Open Library Integration**: Comprehensive access to Open Library's vast collection

## Technology Stack

- **Frontend Framework**: React 19 with Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Utilities**: Lodash
- **Build Tool**: Vite
- **Linting**: ESLint

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bookworm-buddy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   The application uses Open Library API endpoints. The configuration is already set up in the `.env` file with the following variables:

   - `VITE_OPEN_LIBRARY_BOOK_SEARCH_URL`
   - `VITE_OPEN_LIBRARY_BOOKCOVER_URL`
   - `VITE_OPEN_LIBRARY_BOOK_DETAILS_URL`
   - `VITE_OPEN_LIBRARY_BOOK_SUMMARY_URL`
   - `VITE_OPEN_LIBRARY_RANDOM_BOOKS_ENDPOINT`

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Layout.jsx          # Main layout with navigation
│   │   ├── NavBar.jsx          # Navigation component
│   │   ├── Footer.jsx          # Footer component
│   │   └── ErrorBoundary.jsx   # Error handling
│   ├── BookCard.jsx            # Individual book display card
│   ├── BookDetailsModal.jsx    # Detailed book information modal
│   ├── BookDisplay.jsx         # Books grid/list display
│   └── SearchBar.jsx           # Search input component
├── pages/
│   ├── HomePage.jsx            # Main search and discovery page
│   ├── FavoritesPage.jsx       # User's favorite books
│   ├── ReadingListPage.jsx     # Books to read
│   ├── BooksReadPage.jsx       # Completed books
│   └── BookDetails.jsx         # Individual book detail page
├── services/
│   ├── books.js                # Book API services
│   └── bookCover.js            # Cover image utilities
├── store/
│   └── books/
│       └── useBooksStore.js    # Zustand state management
├── config/
│   └── index.js                # API configuration
├── utils/                      # Utility functions
└── assets/                     # Static assets
```

## Key Components

### BookCard Component

- Displays book information in an attractive card format
- Shows cover image with loading states
- Provides action buttons for favorites, reading list, and reading access
- Conditionally displays "Read" button for available books

### SearchBar Component

- Debounced search input for performance
- Maintains search results when input is cleared
- Integrates with book discovery service

### Book Store (Zustand)

- Centralized state management for books
- Actions for search, favorites, reading lists, and completion tracking
- Persistent state across navigation

## API Integration

The application integrates with Open Library's public APIs:

- **Search API**: `https://openlibrary.org/search.json`
- **Works API**: `https://openlibrary.org/works/{id}.json`
- **Cover Images**: `https://covers.openlibrary.org/b/id/{cover_id}-L.jpg`
- **Internet Archive**: Direct links to readable content

## Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Preview the build**

   ```bash
   npm run preview
   ```

3. **Deploy to your preferred hosting service**
   - The `dist/` folder contains the production build
   - Compatible with static hosting services like Vercel, Netlify, or GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the comprehensive book database
- [Internet Archive](https://archive.org/) for hosting public domain books
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the excellent development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## Support

For questions, issues, or contributions, please open an issue on GitHub or contact the maintainers.


**Happy Reading!**
