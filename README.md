# Taski

A task management application with projects and tasks.

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Spring Boot 4 + Java 17
- **Database:** PostgreSQL

## Quick Start

```bash
git clone https://github.com/zakariaahrbil/Hahn.git
cd Hahn
docker-compose up -d --build
```

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:8080 |
| Adminer  | http://localhost:8888 |

## Default User Credentials

You can log in with the following default user credentials (auto-created on first run):

| Email           | Password |
| --------------- | -------- |
| admin@taski.com | admin123 |

## Run Locally

**Backend:**

```bash
cd taski_backend
./mvnw spring-boot:run
```

**Frontend:**

```bash
cd taski_frontend
npm install
npm run dev
```

Requires PostgreSQL running on `localhost:5432` with database `taski_db`.
