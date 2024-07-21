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

2. **Create and activate a virtual environment:**

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

4. **Set up your database configuration:**

    Update the `DATABASES` setting in `settings.py` to match your SQL Server configuration.

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'mssql',
            'NAME': 'AdventureWorks2022',
            'USER': 'your_db_username',
            'PASSWORD': 'your_db_password',
            'HOST': 'your_db_host',
            'PORT': '',  # Set to your DB port if necessary
            'OPTIONS': {
                'driver': 'ODBC Driver 17 for SQL Server',
            },
        }
    }
    ```

5. **Apply migrations:**

    ```sh
    python manage.py migrate
    ```

6. **Run the development server:**

    ```sh
    python manage.py runserver
    ```

## Swagger Documentation

Swagger documentation is available at `/swagger/`. This provides an interactive interface to test the API endpoints.

