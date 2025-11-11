---
title: "Error Handling"
date: 2025-11-11
draft: false
weight: 4
---

# Error Handling

The Instagram Hashtag Feed API returns descriptive error messages with appropriate HTTP status codes.

## Error Response Format

All error responses follow this structure:

```json
{
  "error": "error_code_or_message",
  "details": "Additional information about the error"
}
```

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success - feed items returned |
| 400 | Bad request - invalid parameters |
| 502 | Upstream error - Instagram API failure or misconfiguration |

## Common Errors

### Instagram Mode Not Configured

When using `mode=instagram` without proper credentials:

```json
{
  "error": "failed_to_fetch_feed",
  "details": "INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID required"
}
```

**Solution**: Configure the required environment variables in your `.env` file.

### Rate Limiting

The API implements built-in caching (default TTL: 120 seconds) to reduce load on the Instagram Graph API. Identical requests within the cache window will return cached results automatically.

### Invalid Parameters

If you provide invalid query parameters (e.g., `limit` greater than 100), the API will clamp the values to valid ranges rather than returning an error.

## Error Handling Best Practices

1. **Always check the HTTP status code** before processing the response
2. **Parse the error response** to get detailed information
3. **Implement retry logic** for 502 errors (upstream failures)
4. **Cache responses** on the client side to reduce unnecessary API calls
5. **Handle network errors** gracefully in your application

## Example Error Handling

```javascript
async function fetchFeed(hashtags, limit = 25) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/feed?hashtags=${hashtags}&limit=${limit}`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', data.error, '-', data.details);
      throw new Error(data.details || data.error);
    }
    
    return data.items;
  } catch (error) {
    console.error('Failed to fetch feed:', error);
    // Handle error appropriately
    return [];
  }
}
```

## Links

- [Back to API Overview](../overview)
- [Main Portfolio Site](https://anandiwrites.dev)
