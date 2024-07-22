# Sales Order Statistics API

This project is a Django-based API for retrieving sales order statistics, specifically calculating total and average sales amounts with and without including freight and tax, filtered by employee ID.

## Features

- Retrieve total and average sales amounts with and without freight and tax.
- Filter sales orders by employee ID.
- API documentation using Swagger.

## Requirements

- Python 3.12.4
- Django 5.0.7 or higher
- Django REST Framework
- django-filter
- drf-yasg (for Swagger documentation)
- Microsoft ODBC Driver for SQL Server
- pyodbc

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/moomensaleem135/specsources.git
    cd backend
    ```

2. **Download the AdventureWorks2022.bak file:**

    ```sh
    https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2022.bak

    Save the file in backend/scripts/
    ```

3. **Run the development server:**

    ```sh
    docker-compose up -d
    ```

## Swagger Documentation

Swagger documentation is available at `/swagger/`. This provides an interactive interface to test the API endpoints.


## Fron End

you can use yarn / npx too, it's up to you

#### Installation

```
cd frontend
yarn install
```

#### .env files

Make sure you already create `.env` files on the root of the repo, you can use everything inside `.env.example` as starter

#### Running

First, run the development server:

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:7035](http://localhost:7035) with your browser to see the result.
