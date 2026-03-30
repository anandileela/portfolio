# API Reference Documentation

## Overview
This document provides an overview of the API, methods to interact with it, along with cURL examples, JSON responses, parameters, and error codes.

## Authentication
All API requests require authentication. You can use the following method to authenticate:

### Example:
```bash
curl -X GET https://api.example.com/resource \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

## API Endpoints
### 1. Get Resource
- **Endpoint:** `/resource`
- **Method:** `GET`

#### Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id        | integer | Yes     | Resource ID |
| type      | string  | No      | Resource type |

#### cURL Example:
```bash
curl -X GET https://api.example.com/resource?id=1 \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

#### JSON Response:
```json
{
    "id": 1,
    "type": "example",
    "data": { ... }
}
```

### 2. Create Resource
- **Endpoint:** `/resource`
- **Method:** `POST`

#### Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name      | string | Yes     | Name of the resource |
| value     | string | Yes     | Value of the resource |

#### cURL Example:
```bash
curl -X POST https://api.example.com/resource \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
-H 'Content-Type: application/json' \
-d '{"name": "example", "value": "123"}'
```

#### JSON Response:
```json
{
    "id": 1,
    "message": "Resource created successfully."
}
```

## Error Codes
| Code | Description |
|------|-------------|
| 400  | Bad Request - Invalid parameters |
| 401  | Unauthorized - Authentication failed |
| 404  | Not Found - Resource not found |
| 500  | Internal Server Error - Try again later |

## Conclusion
This API enables developers to interact with our services seamlessly. Ensure that you follow the authentication procedures and refer to the specific endpoints as necessary.