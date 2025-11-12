# API Documentation Site

This directory contains the API documentation for the Instagram Hashtag Feed API.

## Features

- **Interactive "Try It Out" Console**: Test API endpoints directly from the documentation
- **Swagger UI**: Modern, user-friendly interface for exploring the API
- **OpenAPI 3.0 Specification**: Standards-compliant API definition

## Building the Documentation

To build the documentation:

```bash
npm run build
```

This will:
1. Copy Swagger UI assets to the `public/` directory
2. Copy the OpenAPI specification
3. Generate an `index.html` file with the interactive documentation

## Viewing the Documentation

After building, open `public/index.html` in a web browser to view the interactive API documentation.

## Available Scripts

- `npm run build` - Build the documentation (uses Swagger UI)
- `npm run build:swagger` - Explicitly build with Swagger UI
- `npm run build:redocly` - Build with Redocly (static, no Try It Out)

## Why Swagger UI?

The documentation was switched from Redocly CLI to Swagger UI because:

- **Interactive Testing**: Swagger UI provides a free, built-in "Try It Out" console
- **Open Source**: Completely free with no commercial limitations
- **Standards Compliant**: Fully supports OpenAPI 3.0 specifications
- **Easy Integration**: Simple to set up and deploy

Redocly's free version (`build-docs`) only provides static documentation without interactive API testing capabilities.
