# Pass-Pilot: Your Own Password Manager

Welcome to **Pass-Pilot**, your secure and intuitive password manager.
This document will guide you through setting up, building, and running the application using **Docker and Docker Compose.**

## Table of Contents

- Overview
- Prerequisites
- Project Structure
- Setup Instructions
- Running the Application
- Using Docker Compose (Recommended)
- Using Docker Directly
- Stopping the Application
- Troubleshooting
- Contributing

## Overview

**Pass-Pilot** is a full-stack password manager application. It consists of:

- A React-based frontend for user interaction

- A Node.js + Express backend providing secure REST APIs

- Integration with MongoDB Atlas for persistent data storage

The app is fully containerized using Docker, and managed with Docker Compose for easy orchestration of services.

---

## Prerequisites

Ensure the following are installed on your system:

- Docker

- Docker Compose

✅ Verify Installation:

```bash
docker --version
docker compose version
```

## Project Structure

*project-root/*
- frontend/ # React frontend source code
- backend/ # Node.js backend source code
- compose.yaml # Multi-service orchestration file
- README.Docker.md # This documentation
- README.md # Basic Documentation

## Setup Instructions

- Clone the Repository

```bash
git clone https://github.com/mr-dev-prince/pass-pilot.git
```

- Create a .env file in both the frontend/ and backend/ directories as needed.

- Use .env.sample given in both directories to populate your .env file

## Running the Application

### Using Docker Compose (Recommended)

This method spins up both frontend and backend together.

```bash
docker compose up --build
```

**Access the app:**

- Frontend: http://localhost:5173

- Backend API: http://localhost:3000/api

### Using Docker Directly

To build and run containers individually:

- Build the Backend:

```bash
docker build -t backend ./backend
docker run -p 3000:3000 backend
```

- Build the Frontend:

```bash
docker build -t frontend ./frontend
docker run -p 5173:5173 frontend
```

### Stopping the Application

- Using Docker Compose:

```bash
docker compose down
```

- Using Docker CLI:

```bash
docker container stop $(docker container ls --quiet --filter ancestor=pass-pilot-backend)
docker container stop $(docker container ls --quiet --filter ancestor=pass-pilot-frontend)
```

### Troubleshooting

Problem Solution

- **Port Already in Use** : Change port in docker-compose.yml or .env
- **Build Fails** : Check Dockerfile, .dockerignore, or rebuild with --no-cache
- **MongoDB Fails** : Ensure correct Atlas URI and whitelist IPs in MongoDB Atlas
- **Container Crashes** : View logs: **docker container logs <container_id>**

### Contributing

**I welcome your contributions!**

- Fork the repository

- Create a new branch: **git checkout -b feature/my-feature**

- Make changes and commit: **git commit -m "Add my feature"**

- Push to GitHub: **git push origin feature/my-feature**

- Open a Pull Request 🎉

# Thank You : Keep Coding
