# Instagram Hashtag Feed API

This is a small Next.js API application that returns a chronological feed of posts for given hashtags.
It supports a safe "mock" mode for demos and an optional "instagram" mode that uses the Instagram Graph API.

## Features

- **Mock Mode**: Returns sample data without requiring any credentials - perfect for demonstrations
- **Instagram Mode**: Fetches real data from Instagram Graph API (requires credentials)
- **OpenAPI Specification**: Full API documentation available in `openapi.yaml`
- **Caching**: Built-in memory cache to reduce API calls
- **Error Handling**: Comprehensive error responses with details

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run in Mock Mode (No Credentials Required)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The API endpoint is available at: `http://localhost:3000/api/feed`

### 3. Enable Instagram Mode (Optional)

To use real Instagram data:

1. Create a Facebook App and link an Instagram Business/Creator account to a Page
2. Obtain a user access token with required permissions
3. Copy `.env.example` to `.env` and add your credentials:

```bash
INSTAGRAM_ACCESS_TOKEN=your_instagram_graph_access_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id_here
```

4. Restart the dev server and use `mode=instagram`:
   ```
   http://localhost:3000/api/feed?mode=instagram&hashtags=family,kids,nyc&limit=10
   ```

## API Documentation

### GET /api/feed

Returns a chronological feed of posts for specified hashtags.

**Query Parameters:**

- `hashtags` (string, optional): Comma-separated list of hashtags. Default: `family,kids,nyc`
- `limit` (integer, optional): Maximum number of items to return (1-100). Default: `25`
- `mode` (string, optional): Data source - `mock` or `instagram`. Default: `mock`

**Response:**

```json
{
  "count": 3,
  "items": [
    {
      "id": "1789382918391234",
      "permalink": "https://instagram.com/p/ABC123",
      "media_url": "https://scontent.cdninstagram.com/...",
      "caption": "Fun family day in NYC #family #nyc",
      "username": "family_demo",
      "timestamp": "2025-11-11T16:00:00.000Z",
      "hashtags": ["family", "nyc"]
    }
  ]
}
```

**Error Responses:**

- `502 Bad Gateway`: Instagram API error or connection issue

```json
{
  "error": "failed_to_fetch_feed",
  "details": "Connection timeout"
}
```

## Pagination

The API supports simple limit-based pagination:

- Use the `limit` parameter to control the number of results (max 100)
- Results are always sorted newest-first
- For production use, consider implementing cursor-based pagination

## Error Handling

The API returns descriptive error messages:

| Status Code | Description |
|-------------|-------------|
| 200 | Success - feed returned |
| 502 | Upstream error (Instagram API failure or misconfiguration) |

All errors include an `error` field with a code and optional `details` field with additional information.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `INSTAGRAM_ACCESS_TOKEN` | For Instagram mode | Instagram Graph API access token |
| `INSTAGRAM_BUSINESS_ACCOUNT_ID` | For Instagram mode | Instagram Business Account ID |
| `PORT` | No | Server port (default: 3000) |
| `FEED_CACHE_TTL` | No | Cache time-to-live in seconds (default: 120) |

## Production Considerations

This is a proof-of-concept application. For production use, consider:

- Using Redis or another external cache instead of in-memory caching
- Implementing rate limiting
- Adding content moderation and safety checks
- Setting up proper monitoring and logging
- Using cursor-based pagination for large datasets
- Securing the Instagram credentials with a secrets manager

## Notes and Limitations

- **Instagram Mode Requirements**: Requires a Business/Creator Instagram account linked to a Facebook Page
- **Development Restrictions**: In development, hashtag endpoints can only be used by Instagram accounts that are admins/testers of your Facebook app
- **No Content Moderation**: This PoC does not perform any content filtering or moderation
- **Simple Caching**: Uses in-memory cache which is lost on restart

## OpenAPI Specification

The complete API specification is available in `openapi.yaml`. You can use it with:

- Swagger UI
- Redoc
- Postman
- Any OpenAPI-compatible tool

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## Links

- Main Portfolio Site: [https://anandiwrites.dev](https://anandiwrites.dev)
- API Documentation: See `openapi.yaml`
