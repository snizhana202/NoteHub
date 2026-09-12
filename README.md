# NoteHub
A note-taking web application with tagging, search, and pagination for organizing personal notes efficiently.

## 🛠 Tech Stack

* **Frontend**: Next.js, React, TypeScript, CSS Modules
* **State Management**: TanStack Query (server state), Zustand (client state)
* **Forms & Validation**: Formik, Yup
* **HTTP Client**: Axios
* **Icons**: React Icons
* **Deployment**: Vercel

## 🏗 Project Structure

* `/app`: Next.js App Router pages, layouts, and API routes (proxying requests to the backend).
* `/components`: Reusable UI components (forms, note cards, modal, pagination, etc.).
* `/lib`: API client functions and Zustand stores.
* `/types`: Shared TypeScript types.

## 🚀 Key Features

* **Authentication**: Sign up and sign in with session persisted via cookies.
* **Notes CRUD**: Create, view, and delete notes.
* **Tags & Filtering**: Organize notes by tag and filter the list accordingly.
* **Search & Pagination**: Debounced search and paginated notes list.
* **Note Preview**: Notes open in a modal when navigating from the list, and as a full page when accessed via a direct link (Next.js Intercepting Routes).
* **User Profile**: View and edit profile information.
* **Themed UI**: Custom chocolate/cream color palette applied consistently across the app.

## 📦 Quick Start

1. Clone: `git clone https://github.com/snizhana202/NoteHub.git`
2. Install: Navigate to the project folder and run `npm install`.
3. Env: Create a `.env` file in the project root and set `NEXT_PUBLIC_API_URL`.
4. Run: Start the development server using `npm run dev`.

## 👤 Author
Snizhana

* GitHub: [snizhana202](https://github.com/snizhana202)
* Live Demo: [https://notehub-snizhana202s-projects.vercel.app](https://notehub-snizhana202s-projects.vercel.app)