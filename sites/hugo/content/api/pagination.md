---
title: "Pagination"
date: 2025-11-11
draft: false
weight: 5
---

# Pagination

The Instagram Hashtag Feed API uses simple limit-based pagination for controlling the number of results returned.

## How It Works

The API supports a `limit` parameter that controls the maximum number of items returned in a single request.

### Parameters

- **limit** (integer, optional): Maximum number of items to return
  - Minimum: 1
  - Maximum: 100
  - Default: 25

## Examples

### Get the first 10 items

```bash
curl http://localhost:3000/api/feed?hashtags=family,kids&limit=10
```

### Get maximum items (100)

```bash
curl http://localhost:3000/api/feed?hashtags=family,kids&limit=100
```

### Use default limit (25 items)

```bash
curl http://localhost:3000/api/feed?hashtags=family,kids
```

## Response Format

The response always includes a `count` field indicating the number of items returned:

```json
{
  "count": 10,
  "items": [
    // ... feed items
  ]
}
```

## Sorting

Results are always sorted **newest-first** by the `timestamp` field. This ensures the most recent posts appear at the top of the feed.

## Limitations

### Current Implementation

The current API uses simple limit-based pagination, which has some limitations:

- No cursor or offset support
- Cannot fetch items beyond the first result set
- Limited to 100 items per request

### For Production Use

For production applications, consider implementing:

1. **Cursor-based Pagination**: Use a cursor (timestamp or ID) to fetch the next set of results
2. **Offset Pagination**: Support `offset` parameter for skipping results
3. **Link Headers**: Include `next` and `prev` links in response headers
4. **Page Numbers**: Support page-based navigation

## Example: Fetching All Available Items

Since the API currently doesn't support cursor-based pagination, you can only retrieve up to 100 items per request:

```javascript
async function fetchMaxItems(hashtags) {
  const response = await fetch(
    `http://localhost:3000/api/feed?hashtags=${hashtags}&limit=100&mode=mock`
  );
  
  const data = await response.json();
  console.log(`Fetched ${data.count} items`);
  
  return data.items;
}
```

## Caching Considerations

The API implements caching with a default TTL of 120 seconds. When paginating through results:

- Identical requests within the cache window return cached data
- The cache key includes the hashtags and limit parameters
- Changing these parameters will result in a new cache entry

## Best Practices

1. **Request only what you need**: Use the `limit` parameter to fetch only the number of items you'll display
2. **Consider caching on the client**: Cache results to reduce unnecessary API calls
3. **Handle empty results**: Always check the `count` field to see if results were returned
4. **Monitor performance**: Large `limit` values may impact response time

## Links

- [Back to API Overview](../overview)
- [Error Handling](../errors)
- [Main Portfolio Site](https://anandiwrites.dev)
