
# Node.js Calendar API

This project is a Node.js RESTful API that communicates with the Calendarific API to retrieve holiday information for specific countries and years. It uses caching to minimize API calls and improve performance.

## Project Usage

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mian-ali/node-calendar-api.git
   cd node-calendar-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project and add the following variables:
   ```plaintext
   CALENDARIFIC_API_KEY=your_calendarific_api_key
   CACHE_TTL=3600
   PORT=3000
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

   The API will be running at `http://localhost:3000`.

### Running Redis with Docker

To run Redis using Docker, follow these steps:


3. **Pull Redis Image**: Run Redis Stack with Web UI (for exploring data):
   ```bash
   docker run -d --name redis-stack-server -p 6379:6379 -p 8001:8001 redis/redis-stack-server:latest
   ```

   Access the Redis Stack Web UI at `http://localhost:8001`.

## API Endpoints

### GET /api/holidays

Retrieve holidays for a specific country and year.

#### Request

```http
GET /api/holidays?country=PK&year=2024
```

#### Query Parameters

- `country`: The ISO 3166-1 alpha-3 country code (e.g., `PK` for Pakistan).
- `year`: The year for which to retrieve holidays (e.g., `2024`).

#### Response

```json
[
  {
    "name": "Eid ul-Fitr",
    "date": "2024-04-10",
    "observed": "2024-04-10"
  },
  ...
]
```

### GET /api/countries

Retrieve the list of supported countries.

#### Request

```http
GET /api/countries
```

#### Response

```json
[
  {
    "iso": "PAK",
    "name": "Pakistan"
  },
  ...
]
```

## Tools Required

- **Node.js**: Ensure Node.js is installed on your machine.
- **Docker**: For running Redis in a container.
- **Redis**: Used for caching API responses to improve performance.

## Notes

- Ensure Redis is running before starting the application to avoid connectivity issues.
- Use the `.env` file to securely manage environment variables, especially the Calendarific API key.
