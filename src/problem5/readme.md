# Express TypeScript CRUD API

This is a simple ExpressJS CRUD API built with TypeScript.

## Features

-   Create a resource
-   List resources with basic filters
-   Get details of a resource
-   Update resource details
-   Delete a resource

## Requirements

-   Node.js v20.14.0
-   npm

## Setup

1. Install dependencies:

    ```bash
    npm install

    ```

2. Initialize the database:
   Open SQLite command line tool and execute

    ```sql
    CREATE TABLE resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL
    );

    ```

3. Start the server:
    ```bash
    npm run start
    ```

The server will run on http://localhost:3000.

4. Use the API:
   Copy this JSON and import it in Postman to test the API
    ```json
    {
        "info": {
            "_postman_id": "4e3919ae-5c68-4776-b56c-c4f89ef151cd",
            "name": "Express TypeScript CRUD API",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
            "_exporter_id": "26503484"
        },
        "item": [
            {
                "name": "Create Resource",
                "request": {
                    "method": "POST",
                    "header": [],
                    "body": {
                        "mode": "raw",
                        "raw": "{\n  \"name\": \"Resource Name\",\n  \"description\": \"Resource Description\"\n}",
                        "options": {
                            "raw": {
                                "language": "json"
                            }
                        }
                    },
                    "url": {
                        "raw": "http://localhost:3000/resources",
                        "protocol": "http",
                        "host": ["localhost"],
                        "port": "3000",
                        "path": ["resources"]
                    }
                },
                "response": []
            },
            {
                "name": "List Resources",
                "request": {
                    "method": "GET",
                    "header": [],
                    "url": {
                        "raw": "http://localhost:3000/resources",
                        "protocol": "http",
                        "host": ["localhost"],
                        "port": "3000",
                        "path": ["resources"]
                    }
                },
                "response": []
            },
            {
                "name": "Get Resource by ID",
                "request": {
                    "method": "GET",
                    "header": [],
                    "url": {
                        "raw": "http://localhost:3000/resources/1",
                        "protocol": "http",
                        "host": ["localhost"],
                        "port": "3000",
                        "path": ["resources", "1"]
                    }
                },
                "response": []
            },
            {
                "name": "Update Resource",
                "request": {
                    "method": "PUT",
                    "header": [],
                    "body": {
                        "mode": "raw",
                        "raw": "{\n  \"name\": \"Updated Resource Name\",\n  \"description\": \"Updated Resource Description\"\n}",
                        "options": {
                            "raw": {
                                "language": "json"
                            }
                        }
                    },
                    "url": {
                        "raw": "http://localhost:3000/resources/1",
                        "protocol": "http",
                        "host": ["localhost"],
                        "port": "3000",
                        "path": ["resources", "1"]
                    }
                },
                "response": []
            },
            {
                "name": "Delete Resource",
                "request": {
                    "method": "DELETE",
                    "header": [],
                    "url": {
                        "raw": "http://localhost:3000/resources/1",
                        "protocol": "http",
                        "host": ["localhost"],
                        "port": "3000",
                        "path": ["resources", "1"]
                    }
                },
                "response": []
            }
        ]
    }
    ```
