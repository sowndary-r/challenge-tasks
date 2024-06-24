# Dockerfile for Node.js Backend
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 4000

# Start the app
CMD ["node", "server.js"]