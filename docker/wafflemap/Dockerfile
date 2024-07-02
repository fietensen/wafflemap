# building frontend
FROM node:21.5-alpine as frontend-build

WORKDIR /build
COPY ./frontend ./frontend
RUN cd frontend \
    && npm i \
    && npm run build


# building backend
FROM openjdk:17-alpine as backend-build

WORKDIR /build

COPY ./backend/mvnw ./mvnw
COPY ./backend/.mvn ./.mvn
COPY ./backend/pom.xml ./pom.xml

RUN ./mvnw dependency:go-offline

COPY ./backend/src ./src

COPY --from=frontend-build /build/frontend/dist ./src/main/resources/static

RUN ./mvnw package -DskipTests


# bundling final application
FROM openjdk:17-alpine

WORKDIR /wafflemap_app
COPY --from=backend-build /build/target/*.jar ./wafflemap.jar

CMD ["java", "-jar", "wafflemap.jar"]