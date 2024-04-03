# Use Node.js as base image for building Vue app
FROM node:20 AS vue-builder
WORKDIR /app/web
COPY ./web/package*.json ./
RUN npm install
COPY ./web/ .
RUN npm run build

# Use Node.js as base image for Fastify server
FROM node:20 AS server-builder
WORKDIR /app/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server/ .

# Copy built Vue app from the Vue builder stage to the Fastify server's public folder
RUN mkdir -p /app/server/src/public
RUN mkdir -p /app/server/src/public/storage
COPY --from=vue-builder /app/web/dist /app/server/src/public

# migrate db and run tests
RUN npm run db:format
RUN npm run db:migrate
RUN npm run db:seed
RUN npm run build

EXPOSE 10000
CMD ["npm", "start"]