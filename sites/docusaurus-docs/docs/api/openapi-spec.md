---
sidebar_position: 2
title: OpenAPI Specification
---

# OpenAPI Specification

The complete API specification is available in OpenAPI 3.0.1 format.

## View the Specification

You can view and interact with the full API specification in several ways:

### 1. Source File

The OpenAPI specification is available in the API app repository:

📄 [openapi.yaml](https://github.com/anandileela/portfolio/blob/main/packages/api-app/openapi.yaml)

### 2. Redocly Documentation

For an interactive API documentation experience, visit our Redocly-powered documentation portal where you can:

- Browse all endpoints with detailed descriptions
- See request/response examples
- Try out API calls directly in your browser

🔗 [View Interactive API Docs](https://anandiwrites.dev/redocly)

### 3. Import into Tools

You can import the OpenAPI specification into various tools:

- **Swagger UI**: For interactive API exploration
- **Postman**: For API testing and development
- **Insomnia**: For REST API client
- **API Development Tools**: Any tool that supports OpenAPI 3.0+

## Specification Highlights

### Base Information

- **Title**: Instagram Hashtag Feed API
- **Version**: 0.1.0
- **OpenAPI Version**: 3.0.1

### Servers

- **Local Development**: `http://localhost:3000`

### Endpoints

#### GET /api/feed

Returns a chronological feed of posts for specified hashtags.

**Parameters:**
- `hashtags` (query, string): Comma-separated list of hashtags
- `limit` (query, integer): Maximum number of items (1-100)
- `mode` (query, string): Data source - "mock" or "instagram"

**Responses:**
- `200`: Success with feed items
- `400`: Bad request
- `502`: Upstream error

### Data Models

#### FeedItem

Represents a single social media post with:
- `id`: Unique identifier
- `permalink`: Link to the post
- `media_url`: URL of the media content
- `caption`: Post text
- `username`: Author username
- `timestamp`: ISO 8601 timestamp
- `hashtags`: Array of hashtags

#### Error

Error response with:
- `error`: Error code or message
- `details`: Additional information

## Using the Specification

### Download the Spec

```bash
# Download the OpenAPI specification
curl -O https://raw.githubusercontent.com/anandileela/portfolio/main/packages/api-app/openapi.yaml
```

### Generate Client Code

You can use the OpenAPI specification to generate client code in various languages:

```bash
# Using OpenAPI Generator
openapi-generator-cli generate -i openapi.yaml -g javascript -o ./client

# Other supported languages: python, java, go, typescript-fetch, etc.
```

### Validate API Responses

Use the specification to validate that API responses match the schema:

```javascript
// Example using a validation library
import { validate } from 'openapi-validator';

const response = await fetch('http://localhost:3000/api/feed');
const data = await response.json();

// Validate against the OpenAPI spec
const isValid = validate(data, openApiSpec, '/api/feed', 'get', '200');
```

## Links

- [Back to API Overview](./overview.md)
- [Error Handling](./errors.md)
- [Pagination](./pagination.md)
- [Main Portfolio Site](https://anandiwrites.dev)
