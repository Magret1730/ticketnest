## Push to Docker Hub
build:
	docker buildx build --platform linux/amd64,linux/arm64 -t magret1/ticketnest:latest --push .

## Run the container
run:
	docker compose up

## Build JAR using Maven
package:
	mvn clean package -DskipTests

## Show container logs
logs:
	docker compose logs -f

# Stop the container
stop:
	docker compose down

# Remove all old docker container and image
cleanall:
	docker compose down --rmi all

# Remove docker container and image
clean:
	docker system prune -f

# Run and Build
runbuild:
	docker compose up --build

