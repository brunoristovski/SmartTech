FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src ./src

# Додади executable
RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests
RUN cp target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]