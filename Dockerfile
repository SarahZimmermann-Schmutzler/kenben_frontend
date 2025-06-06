# 1: Build the Angular application
# Base image for the build step
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only dependency files first
COPY package.json package-lock.json $WORKDIR

# Install dependencies with npm
RUN npm install --legacy-peer-deps --prefer-offline --no-audit

# Copy all project files into the container
COPY . $WORKDIR

# Build Angular frontend
RUN npm run build
    

# 2: Serve the application using Nginx
# Lightweight Nginx image for serving the application
FROM nginx:1.26.2-alpine

# Copy the built Angular application from the previous stage into the Nginx HTML directory
COPY --from=build /app/dist/kenben_frontend /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx
# standard command in ngnix:1.26.2-alpine image is CMD ["nginx", "-g", "daemon off;"]