Elevate - Posts Application
Project Overview
This project is a high-performance, post-style application built as part of the Elevate Frontend Advanced Bootcamp Task. The application simulates a real-world social feed where users can browse, filter, and view detailed information about blog posts, along with their associated comments.

The core focus of this project was achieving a pixel-perfect UI based on the provided Figma design, maintaining a clean and scalable codebase, and implementing robust form handling and validation.

Key Features
Dynamic Post Feed: Displays a list of posts fetched from the JSONPlaceholder API.


Advanced Filtering: Includes a title-based search and an author-based filter (fetching real users from the /users endpoint).


Post Details: A dedicated page for each post featuring a custom Hero Section with a Mount Everest mountain theme and integrated comments.

Pixel-Perfect UI: Implemented strictly according to Figma specifications, including Glassmorphism effects (75% opacity and 8px backdrop blur).

Custom Pagination: A manual pagination system to navigate through the post list smoothly.

Form Validation: (If implemented) Secure post creation using React Hook Form and Zod.

Tech Stack

Core: ReactJS (Vite).

Styling: Tailwind CSS & Shadcn UI.


Routing: React Router DOM.


Data Fetching: Axios.


Icons: Lucide Icons.


Validation: Zod & React Hook Form.

Folder Structure
The project follows a modular and scalable directory structure:

Plaintext
src/
 ├── assets/          # Static files (images, fonts)
 ├── components/      # Reusable UI components (Navbar, Pagination, etc.)
 ├── hooks/           # Custom React hooks for data logic
 ├── services/        # API service layer (Axios configurations) 
 ├── pages/           # Main application pages (Home, PostDetails)
 └── lib/             # Utility libraries and validation schemas
How to Run Locally
1. Clone the repository
Bash
git clone https://github.com/your-username/elevate-posts-task.git
cd elevate-posts-task
2. Install Dependencies
Bash
npm install
3. Run the Development Server
Bash
npm run dev
The app will be available at http://localhost:5173.


Additional Improvements 

State Management: While Axios was used for direct fetching, implementing React Query could enhance caching and server-state synchronization.



