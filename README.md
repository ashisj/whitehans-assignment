# Job Board Application

A modern job board application built with React, TypeScript, and Tailwind CSS. This application allows users to browse job listings, post new jobs, and apply for positions with a responsive design that works across all devices.

## Features

- 🔍 Real-time job search with debouncing
- 📍 Location-based filtering
- 💼 Job type filtering (Full-time, Part-time, Contract)
- 📱 Responsive design with mobile-first approach
- ♾️ Infinite scroll for job listings
- 🎯 Active filters display on Mobile  view
- 📝 Job posting functionality
- 📄 Detailed job view with application form
- 🎨 Modern UI with Tailwind CSS
- 🔄 Loading states and error handling

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Context API for state management
- Custom hooks for debouncing


## Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/ashisj/whitehans-assignment.git
cd whitehans-assignment
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server** 

```bash
npm run dev
```

4. **Build the production version**

```bash
npm run build
```


## Technical Approach

### State Management
- Used React Context API for global state management
- Implemented optimized filtering with debouncing

### Performance Optimizations
1. **Search Debouncing**
   - Implemented 500ms delay for search inputs
   - Reduces unnecessary API calls and re-renders

2. **Infinite Scroll**
   - Loads jobs in batches of 10
   - Uses Intersection Observer API
   - Improves initial load time and performance

3. **Responsive Design**
   - Mobile-first approach
   - Optimized filters for different screen sizes
   - Floating action button for mobile filters

### Filter System
- Real-time search across job titles and companies
- Location-based filtering
- Job type filtering (Full-time, Part-time, Contract)
- Mobile-optimized filter modal
- Active filters display for better UX

### Job Management
- New jobs appear at the top of the list
- Date-based sorting
- Comprehensive job details modal


