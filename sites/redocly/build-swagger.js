const fs = require('fs');
const path = require('path');

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy Swagger UI files
// Check both local and root node_modules due to workspace setup
let swaggerUiPath = path.join(__dirname, 'node_modules', 'swagger-ui-dist');
if (!fs.existsSync(swaggerUiPath)) {
  swaggerUiPath = path.join(__dirname, '..', '..', 'node_modules', 'swagger-ui-dist');
}

const filesToCopy = [
  'swagger-ui.css',
  'swagger-ui-bundle.js',
  'swagger-ui-standalone-preset.js',
  'favicon-16x16.png',
  'favicon-32x32.png'
];

filesToCopy.forEach(file => {
  const src = path.join(swaggerUiPath, file);
  const dest = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file}`);
  } else {
    console.warn(`Warning: ${file} not found at ${src}`);
  }
});

// Copy openapi.yaml
fs.copyFileSync(
  path.join(__dirname, 'openapi.yaml'),
  path.join(publicDir, 'openapi.yaml')
);
console.log('Copied openapi.yaml');

// Create index.html
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Instagram Hashtag Feed API Documentation" />
  <title>Instagram Hashtag Feed API</title>
  <link rel="stylesheet" href="./swagger-ui.css" />
  <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
</head>
<body>
<div id="swagger-ui"></div>
<script src="./swagger-ui-bundle.js"></script>
<script src="./swagger-ui-standalone-preset.js"></script>
<script>
  window.onload = () => {
    window.ui = SwaggerUIBundle({
      url: './openapi.yaml',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout",
      tryItOutEnabled: true
    });
  };
</script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'index.html'), html);
console.log('Created index.html');

console.log('\n✅ Build completed successfully!');
console.log('📁 Output directory: public/');
console.log('🌐 Open public/index.html in a browser to view the API documentation');
