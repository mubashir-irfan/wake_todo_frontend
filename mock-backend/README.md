# JSON Server Usage Guide

## Prerequisites
Make sure you have **Node.js** installed on your system. If you haven’t installed it yet, download and install it from [Node.js official website](https://nodejs.org/).

## Installation of dependencies
To install the dependencies, navigate to the `/api` directory and run the following command:

```sh
npm install
```

## Running the Server
Navigate to the `/api` directory and run the following command:

```sh
npm start
```

This will start a local server at `http://localhost:3001/` and expose the APIs based on the `db.json` file.

## Available API Endpoints

Please check the `postman_collection.json` for all available endpoints.

## Additional Features
- JSON Server supports filtering using query parameters:
  ```http
  GET /tasks?completed=true
  ```
- You can sort results:
  ```http
  GET /tasks?_sort=createdAt&_order=desc
  ```

## Stopping the Server
To stop the running JSON Server, press `CTRL + C` in the terminal.

---

Enjoy coding! 🚀

