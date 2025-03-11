# Nuxt 3 E-Commerce Application

This is a Nuxt 3 e-commerce application designed to showcase product listings with filters, search, and pagination. The application fetches product data from an external API ([DummyJSON](https://dummyjson.com/docs/products)) and is optimized for performance and responsiveness.

---

## Features

### 1. **Product Listing Page**
   - Fetches products from the [DummyJSON API](https://dummyjson.com/docs/products).
   - Displays products in a responsive grid layout.
   - Supports **pagination** with a page limit of 16 products per page.
   - Includes a **global search** bar to search for products by title.
   - Provides **category filters** to filter products by category.

### 2. **Optimized API Calls**
   - **Server-Side Fetching**: API calls are made server-side using Nuxt 3's `$fetch` utilities to improve performance.
   - **Caching**: Product categories are cached for **1 day** to reduce redundant API calls.
   - **Skeleton Loaders**: Placeholder loaders are displayed while fetching data to enhance the user experience.

### 3. **Responsive Design**
   - The UI is fully responsive and works seamlessly across devices (desktop, tablet, and mobile).
   - Uses **Vuetify** components for a consistent and modern design.

### 4. **Filters and Search**
   - **Global Search**: Users can search for products by typing in the search bar.
   - **Category Filters**: Users can filter products by category using a dropdown menu.
   - **Reset Filters**: A "Reset" button clears all applied filters.

### 5. **Pagination**
   - Pagination is implemented to navigate through the product listings.
   - Each page displays a maximum of 16 products.

---

## Optimizations

### 1. **Server-Side Rendering (SSR)**
   - Product data is fetched server-side using Nuxt 3's `$fetch` to improve performance and SEO.

### 2. **Caching**
   - Product categories are cached for **1 day** using `node-cache` to reduce the number of API calls.

### 3. **Skeleton Loaders**
   - Skeleton loaders are displayed while fetching product data to provide a seamless user experience.

### 4. **Debounced Search**
   - The search functionality is debounced to reduce the number of API calls while typing.

### 5. **Error Handling**
   - Proper error handling is implemented to display user-friendly messages in case of API failures.

---

## Technologies Used

- **Nuxt 3**: For server-side rendering and routing.
- **Vuetify**: For UI components and responsive design.
- **Axios**: For making API requests.
- **Node-Cache**: For caching product categories.
- **Vue Composition API**: For reactive state management.

---

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/nuxt3-ecommerce.git
   cd nuxt3-ecommerce

2. **Install dependecies**
   ```bash
   npm install

3. **Run Dev Server**
   ```bash
   npm run dev