# API Overview

The Instagram Hashtag Feed API provides a simple way to retrieve social media posts filtered by hashtags.

## Features

- **Mock Mode**: Returns sample data without requiring any credentials - perfect for demonstrations
- **Instagram Mode**: Fetches real data from Instagram Graph API (requires credentials)
- **OpenAPI Specification**: Full API documentation available
- **Caching**: Built-in memory cache to reduce API calls
- **Error Handling**: Comprehensive error responses with details

## Quick Start

The API endpoint is available at: `http://localhost:3000/api/feed`

### Example Request

```bash
curl http://localhost:3000/api/feed?hashtags=family,kids&limit=5&mode=mock
```

### Example Response

```json
{
  "count": 2,
  "items": [
    {
      "id": "mock-family-1",
      "permalink": "https://instagram.com/p/mock-family-1",
      "media_url": "https://placehold.co/800x600?text=family",
      "caption": "Mock post for #family — kid-friendly example",
      "username": "family_demo",
      "timestamp": "2025-11-11T16:00:00.000Z",
      "hashtags": ["family"]
    }
  ]
}
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `hashtags` | string | `family,kids,nyc` | Comma-separated list of hashtags to search |
| `limit` | integer | `25` | Maximum number of items to return (1-100) |
| `mode` | string | `mock` | Data source: `mock` or `instagram` |

## Next Steps

- [View OpenAPI Specification](openapi-spec.md)
- [Error Handling](errors.md)
- [Pagination](pagination.md)

## Links

- [Main Portfolio Site](https://anandiwrites.dev)
- [API Source Code](https://github.com/anandileela/portfolio/tree/main/packages/api-app)
