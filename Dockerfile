# Build stage
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Make maven wrapper executable and build the application
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Run the application
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
