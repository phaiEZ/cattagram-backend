# Cattagram

Cattagram is a social media platform for sharing cat photos and updates. This repository contains both the frontend and backend for the Cattagram application.

## Stacks

- **Frontend**: Next.js
- **Backend**: Nest.js
- **Database**: PostgreSQL

## Repository

- **Frontend**: [cattagram-frontend-v2](https://github.com/phaiEZ/cattagram-frontend-v2)
- **Backend**: [cattagram-backend](https://github.com/phaiEZ/cattagram-backend)

## Table of Contents

- [Getting Started](#getting-started)
- [Backend](#backend)
- [Frontend](#frontend)
- [Learn More](#learn-more)

## Getting Started

To get started with Cattagram, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm
- PostgreSQL (for the backend database)

## backend

### Setting Up the Backend

1. Clone the backend repository:

```bash
git clone https://github.com/phaiEZ/cattagram-backend
cd cattagram-backend
```

2. Install the dependencies:

```bash
   npm install
```

3. create .env.stage.dev in the root directory of the backend project with the following content:

```bash
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    DB_DATABASE=your_database_name
    JWT_SECRET=your_jwt_secret
```

4. Run the backend server:

```bash
    npm run start:dev
```

The backend server will start on http://localhost:8000.

## Frontend

### Setting Up the Frontend

1. Clone the frontend repository:

```bash
    git clone https://github.com/phaiEZ/cattagram-frontend-v2
    cd cattagram-frontend
```

2. Install the dependencies:

```bash
    npm install
```

3. Create a .env.local file in the root directory of the frontend project with the following content:

```bash
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

4. Run the frontend server:

```bash
    npm run dev
```

The frontend server will start on http://localhost:3000.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [NestJS Documentation](https://docs.nestjs.com/) - learn about NestJS framework.
- [Ant Design Documentation](https://ant.design/docs/react/introduce) - learn about Ant Design components.
- [TypeORM Documentation](https://typeorm.io/#/) - learn about TypeORM for database management.

## Contributing

Contributions are welcome! If you have any improvements or suggestions, feel free to open a pull request or issue.
