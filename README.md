Elevate - Blog Posts Application
Project Overview
This project is a pixel-perfect, post-style application built as part of the Elevate Frontend Advanced Bootcamp. The application allows users to explore blog posts, view detailed content with comments, and create new posts using a modern and responsive UI.

The design follows a unique Mount Everest theme, incorporating Glassmorphism effects with backdrop blurs and semi-transparent elements to provide a premium user experience.

Key Features
Dynamic Post Feed: Fetches and displays a list of posts from the JSONPlaceholder API.

Advanced Filtering: Users can filter posts by title (search) or by author using a dedicated dropdown.

Post Details: A dedicated page for each post featuring a custom Hero section with a mountain-themed gradient and full comments integration.

Create Post Form: A fully validated form using React Hook Form and Zod, featuring real-time error messages and success notifications via Toasts.

Custom Pagination: Smooth navigation through posts with a custom-built pagination component.

Pixel-Perfect UI: Strict adherence to the provided Figma design, ensuring precise spacing, typography, and layout.

Tech Stack

Framework: ReactJS.

Styling: Tailwind CSS & Shadcn UI.

Routing: React Router DOM.

Data Fetching: Axios.

Validation: Zod with React Hook Form.

Icons: Lucide Icons.

API: JSONPlaceholder.

Design Implementation Details
Layout: Centered 1200px max-width container with 120px horizontal padding.

Glassmorphism: White cards with 75% opacity and 8px backdrop blur.

Typography: Clean font system using the Inter family with varied weights.

Hero Section: Custom 412px height header with a professional blue gradient overlay.

How to Run the Project Locally

1. Clone the repository
   Bash
   git clone [your-repository-link]
   cd elevate-posts-task
2. Install dependencies
   Bash
   npm install
3. Start the development server
   Bash
   npm run dev
   Project Structure
   Plaintext
   src/
   ├── assets/ # Static assets (Mount Everest background)
   ├── components/ # Reusable UI components (Pagination, Layout, etc.)
   ├── hooks/ # Custom React hooks
   ├── services/ # API service layer (Axios instance) [cite: 34]
   ├── pages/ # Main application pages (Home, Detail, Create)
   └── lib/ # Utility functions and Zod schemas
   Future Improvements
   Implementation of real-time search using server-side filtering.

Adding Dark Mode support while maintaining the Glassmorphism effect.

Enhanced state management using React Query for better caching.
