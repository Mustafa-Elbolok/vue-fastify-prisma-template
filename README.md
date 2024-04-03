# Fastify-Vue-App Setup (Production)

## Setup (Production)

1. Add Secret files (sent in mail)

2. Create SSL/TLS certificate for localhost:
```bash mkcert localhost ::1 ```

3. Build Docker image for Fastify-Vue-App:
```bash docker build -t fastify-vue-app . ```

4. Run Docker container for Fastify-Vue-App:
```bash docker run --rm -it -p 3000:3000 -v $(pwd):/usr/src/app fastify-vue-app:latest ```

### Known Issues
- Fastify can't run inside Docker unless exposed on port 0.0.0.0 and on HTTPS, which was unplanned for and resulted in an unknown error in the test environment.
- Database is slow (using a free plan).

## Fastify-Vue-App Setup (Development)

Add Secret files (sent in mail)

### Vue App Setup

1. Install npm packages:
```bash npm install ```

2. Run app:
```bash npm run dev ```

### Fastify Server Setup

1. Install npm packages:
```bash npm install ```

2. Create SSL/TLS certificate for localhost:
```bash mkcert localhost ::1 ```

3. Format database:
```bash npm run db:format ```

4. Migrate database:
```bash npm run db:migrate ```

5. Seed database:
```bash npm run db:seed ```

2. Run app:
```bash npm run dev ```

## About the App

This is a scalable template that enforces a strict environment to ensure no issues occur.
The server contains a database layer, model repository layer, hosting and configuration layer, routes, and controllers layer.
In this structure, you can switch to GraphQL, Express, Nest, etc., without changing repositories, middlewares, database, or hosting configuration, focusing only on GraphQL setup and services with minimal changes.

The app is simple creating, updating, deleting and viewing categories and products
with required types and schema and validations and response handling.
Server store categories and products iamges locally in ignored folder named storage using storage helper
Server have simple auth with login/logout and me (get my data) and confirm (action needed before deleting category) which store token in cookies and use it for verification

For database I am using prisma and prisma/client

The server running vue app rendered as static html files in public

For vue I am using vue3 and vue-router and balm UI for easy ready ui components
the app is simple showing all categories and products and specific category page and dashboard which require login and add category or product and categories list (with actions) and products list.