# Choose the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app is running on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
