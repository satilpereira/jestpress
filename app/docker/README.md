# Makefile Usage Guide

This project includes a Makefile to simplify Docker management for development, production, and testing environments. You can use it to start, stop, and restart services efficiently.

## Installation

Ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/)

## Usage

The Makefile provides commands for different environments. Use the `ENV` flag to specify which environment to manage.

### Start Services

```sh
make up ENV=dev    # Start development environment
make up ENV=prod   # Start production environment
make up ENV=test   # Start test environment
```

### Stop Services

```sh
make down ENV=dev      # Stop development services
make down ENV=prod     # Stop production services
make down ENV=test     # Stop test services
```

To also remove volumes, use:

```sh
make down ENV=dev VOLUMES=1
```

### Restart Services

```sh
make restart ENV=dev    # Restart development environment
make restart ENV=prod   # Restart production environment
make restart ENV=test   # Restart test environment
```

### Access Database

You can access the PostgreSQL database for any environment using:

```sh
make db ENV=dev    # Access development database
make db ENV=prod   # Access production database
make db ENV=test   # Access test database
```

This runs:

```sh
psql -h localhost -p 5432 -U postgres -d jestpress-db
```

### Help Command

To see available commands:

```sh
make help
```

## Flags

- `ENV` – Specify the environment (`dev`, `prod`, `test`). Default is `dev`.
- `VOLUMES=1` – Remove volumes when stopping services.

## Example Workflows

1. **Start development services:**
   ```sh
   make up ENV=dev
   ```
2. **Restart production services:**
   ```sh
   make restart ENV=prod
   ```
3. **Stop and remove volumes in test environment:**
   ```sh
   make down ENV=test VOLUMES=1
   ```
4. **Access the test database:**
   ```sh
   make db ENV=test
   ```

This Makefile simplifies container management, making development smoother and more efficient!
