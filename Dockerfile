# Step 1: Use an official Node.js image as the base image
FROM node:22-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if present) to the container
COPY package*.json ./

# Step 4: Install the project dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Build the Next.js app for production
RUN npm run build

# Step 7: Expose the port that the app will run on
EXPOSE 3000

# Step 8: Start the Next.js app in production mode
CMD ["npm", "start"]
