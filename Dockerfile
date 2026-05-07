# Use an official Node.js runtime as a parent image
FROM node:24-alpine

# Set the working directory in the container
WORKDIR '/app'

# Copy the package.json file to the working directory and install dependencies
COPY package.json .
RUN npm install
COPY . .

# Expose the port that the application will run on
CMD ["npm","start"]