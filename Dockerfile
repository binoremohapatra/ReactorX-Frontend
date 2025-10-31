# --- Stage 1: Build the application using Maven ---
FROM maven:3.9-eclipse-temurin-17 AS builder

# Set the working directory
WORKDIR /app

# Copy only the pom.xml first to leverage Docker cache for dependencies
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Package the application
RUN mvn package -DskipTests

# --- Stage 2: Create the final, smaller image ---
FROM openjdk:17-slim

# Set the working directory
WORKDIR /app

# Copy the packaged JAR file from the builder stage
# Adjust the path if your artifactId/version is different
COPY --from=builder /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application when the container starts
ENTRYPOINT ["java","-jar","/app/app.jar"]