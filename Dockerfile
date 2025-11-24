FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

COPY src src

RUN chmod +x ./gradlew

RUN ./gradlew build -x test --no-daemon

RUN cp build/libs/*-SNAPSHOT.jar app.jar || cp build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]