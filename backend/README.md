# Buy My Tix - Backend

**Buy My Tix** is a ticket resale platform that connects buyers and sellers of movie and event tickets. The platform acts as a moderator, ensuring a smooth experience for users while fetching movie details from OMDb.

## Features

- 🏷 **Ticket Resale** – Users can list and purchase second-hand tickets.
- 🎬 **Movie Details Fetching** – Retrieves summaries, IMDb ratings, and certificate ratings from OMDb.
- 🔍 **Search & Filter** – Find tickets based on event, location, or price range.
- 📞 **Contact Sharing** – Buyers and sellers can only communicate externally, as the platform shares the seller's mobile number on the website.
- 🚫 **No Direct Messaging** – No built-in chat or direct communication within the platform.
- 🚫 **No Transaction Handling** – Transactions are managed externally between users.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **External API:** OMDb API for movie details

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/buy-my-tix.git
cd buy-my-tix
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the backend directory and configure:
```
MONGO_URI=your_mongodb_connection_string
OMDB_API_KEY=your_omdb_api_key
PORT=5000
```

### 4. Start the Application
```bash
npm start
```

## Contribution Guidelines

1. **Fork the Repository** and create a feature branch.
2. **Make changes** and test your code.
3. **Submit a Pull Request (PR)** with a descriptive commit message.

## License
This project is licensed under the MIT License.

---
### 📌 Connect
Have suggestions or found a bug? Open an issue or contribute to the project! 🚀

