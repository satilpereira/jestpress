# Define common variables
GROUP_ID := $(shell id -g docker)
DOCKER_COMPOSE := docker compose -f docker-compose.$(ENV).yml
DATABASE_NAME := jestpress-db

# Default environment
ENV ?= dev

# Declare all phony targets
.PHONY: up down restart help db

# Start services
up:
	GROUP_ID=$(GROUP_ID) $(DOCKER_COMPOSE) up --build --watch

# Stop services
down:
	GROUP_ID=$(GROUP_ID) $(DOCKER_COMPOSE) down $(if $(VOLUMES),--volumes,)

# Restart services
restart:
	GROUP_ID=$(GROUP_ID) $(DOCKER_COMPOSE) down $(if $(VOLUMES),--volumes,) && \
	GROUP_ID=$(GROUP_ID) $(DOCKER_COMPOSE) up --build --watch

# Access database
db:
	psql -h localhost -p 5432 -U postgres -d $(DATABASE_NAME)

# Help command
help:
	@echo "Usage: make [command] ENV=[dev|prod|test] VOLUMES=1 (optional)"
	@echo ""
	@echo "Commands:"
	@echo "  up       Start services"
	@echo "  down     Stop services"
	@echo "  restart  Restart services"
	@echo "  db       Access PostgreSQL database"
	@echo "  help     Show this help message"
	@echo ""
	@echo "Flags:"
	@echo "  ENV      Set the environment (default: dev)"
	@echo "  VOLUMES  Remove volumes when stopping services (use VOLUMES=1)"
