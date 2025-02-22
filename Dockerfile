# Base Image with Bun pre-installed
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the Source Code
COPY . /app/

# Install the dependencies
RUN bun install

# Copy the rest of the source code
COPY . .

# Build the application
RUN bun run build

# Expose the port
EXPOSE 4000

# Start the Application
CMD ["bun", "src/app.ts"]