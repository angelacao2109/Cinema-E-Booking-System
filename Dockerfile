FROM eclipse-temurin:17

COPY
ENTRYPOINT ["java", "-jar","moviebooking.jar"]
EXPOSE 8080