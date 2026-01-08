FROM node:18-alpine

WORKDIR /app

# Copy all files
COPY . .

# Build the frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Setup backend
WORKDIR /app/backend
RUN npm install
RUN npm run build

# Go back to root
WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]
