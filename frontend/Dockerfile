# Dockerfile for React Frontend
FROM node:22 AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
