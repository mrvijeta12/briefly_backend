# Brifly Backend

Backend API for Brifly — a MERN stack story scraping and bookmarking platform. It provides authentication, story scraping, pagination, and bookmark features. It uses **Node.js, Express, MongoDB, Mongoose, and Cheerio for web scraping**.

---

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Story Scraping using Cheerio
- Story Listing with Pagination
- Bookmark Stories
- RESTful API Structure
- MongoDB Database Integration

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Cheerio (Web Scraping)
- Axios
- CORS

---

## Project Structure

```txt
src/
│
├── controllers/
├── routes/
├── models/
├── services/
├── middleware/
├── config/
└── server.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/mrvijeta12/brifly-backend.git
```

Move into project folder:

```bash
cd brifly-backend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

---

### Story Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/stories?page=1&limit=10 | Get paginated stories |
| POST | /api/stories/:id/bookmark | Bookmark a story |

---

### Scraper Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/scrape | Scrape new stories using Cheerio |

---

## Scraping

This backend uses **Cheerio** to scrape story data from web pages and extract:

- Title
- Author
- Points/Score
- Timestamp
- Content/URL

---

## Database

MongoDB stores:

- Users
- Stories


---

## Build For Production

```bash
npm run build
```

---

## Deployment

Backend deployed on:

- Vercel / Render

---

## CORS Setup

Make sure frontend is allowed:

```js
cors({
  origin: [
    "https://briefly-frontend-i2ds.vercel.app",
    "http://localhost:5173",
  ],
})
```

---

## Author

Vijeta Varma

---

## License

MIT
