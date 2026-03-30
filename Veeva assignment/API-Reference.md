# API Reference

## Overview
This document provides a detailed reference for the API, including request formats, responses, and error codes.

## Endpoint
```
GET /api/v1/resource
```

## cURL Example
```bash
curl -X GET "https://api.example.com/api/v1/resource" -H "accept: application/json"
```

## JSON Response
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Sample Data"
    }
  }
}
```

## Parameters
| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| id        | string | Unique identifier  |
| include   | string | Related resource(s) |

## Error Codes
| Code | Message              |
|------|----------------------|
| 404  | Not Found            |
| 500  | Internal Server Error |
