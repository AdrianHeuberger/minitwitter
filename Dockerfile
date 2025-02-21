# Base Image with Bun pre-installed
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the Source Code
COPY . .

# Install the dependencies
RUN bun install

# Build the application
RUN bun run build

# Expose the port
EXPOSE 3000

# Start the Application
CMD ["bun", "run", "start"]