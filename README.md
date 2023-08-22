# Career Camp Web App Documentation

Welcome to the documentation for Career Camp, a web application built on Node.js that is designed to convert incoming student data into CSV format and allow users to download it. This documentation will provide an overview of the app's architecture, technologies used, and how to set it up and use it.

Live at: https://career-camp-jkir.onrender.com/


# Quick Start
1. Install all the dependent modules in package.json using:

```
npm install
```

2. Ensure mongo db is running on your system or go to (https://cloud.mongodb.com/) and log in to your account and setup your mongo db
3. Copy the connection string either of your local machine or the one you get from the website
(NOTE: Please mark your IP_ADDRESS in whitelist to continue using the db from your system)

4. Define environment variable either in .env file or editing your system environment variables and add these two

``` javascript
CONNECTION_STRING = "your_mongodb_connection_string"
SESSION_SECRET = "your_secret"
```

5.After Installing all the dependent modules. You can run the following command to run the project

```
npm start
```
6. Navigate to browser and open https://localhost:8000

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Technologies Used](#technologies-used)
5. [Setup](#setup)
6. [Usage](#usage)
7. [Data Storage](#data-storage)
8. [Session Management](#session-management)
9. [CSV Conversion](#csv-conversion)
10. [Contributing](#contributing)
11. [License](#license)

## 1. Introduction <a name="introduction"></a>

Career Camp is a web application built using Node.js that focuses on converting incoming student data into CSV format and allowing users to download the converted data. It employs various technologies to achieve this functionality, including Express.js for routing and handling requests, EJS as the template engine for building the frontend, Passport for authentication, MongoDB for data storage, and json2csv for data conversion.

## 2. Features <a name="features"></a>

- **Data Conversion:** Career Camp can convert incoming student data into CSV format, making it easier to process and analyze the data.
- **User Authentication:** The app uses Passport for user authentication, ensuring that only authorized users can access and download the converted data.
- **Session Management:** Express Session is employed to manage user sessions, and cookies are set in the user's browser to store session-related information.
- **Full Stack Development:** Career Camp is a full stack application, utilizing Node.js, Express.js, and EJS to create a seamless user experience.
- **MVC Architecture:** The app follows the Model-View-Controller (MVC) architectural pattern to separate concerns and make the codebase more maintainable.
- **Data Storage:** MongoDB is used to store student data, providing a reliable and scalable solution for data storage.

## 3. Architecture <a name="architecture"></a>

Career Camp follows the Model-View-Controller (MVC) architecture, which divides the app into three main components:

- **Model:** Responsible for managing data and interacting with the database (MongoDB in this case).
- **View:** Handles the presentation layer and is built using EJS templates for dynamic HTML generation.
- **Controller:** Manages the application logic, handles requests, and communicates between the model and view.

## 4. Technologies Used <a name="technologies-used"></a>

- **Node.js:** The runtime environment for executing JavaScript code on the server.
- **Express.js:** A web application framework for Node.js used to handle routing and requests.
- **EJS (Embedded JavaScript):** A template engine for generating dynamic HTML content.
- **Passport:** A middleware for user authentication.
- **MongoDB:** A NoSQL database for storing student data.
- **Express Session:** Middleware for managing user sessions.
- **json2csv:** A library for converting JSON data to CSV format.

## 5. Setup <a name="setup"></a>

To set up Career Camp on your local machine, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd career-camp`
3. Install dependencies: `npm install`
4. Configure MongoDB connection in `config/database.js`
5. Start the server: `npm start`

## 6. Usage <a name="usage"></a>

1. Access the app in your browser: `http://localhost:3000`
2. Log in using your credentials.
3. Upload student data.
4. Convert and download the data in CSV format.

## 7. Data Storage <a name="data-storage"></a>

Student data is stored in a MongoDB database. The model interacts with the database using Mongoose, a MongoDB object modeling tool.

## 8. Session Management <a name="session-management"></a>

The app uses Express Session to manage user sessions. Sessions are maintained on the server, and cookies are set in the user's browser to associate session information.

## 9. CSV Conversion <a name="csv-conversion"></a>

Incoming student data is converted to CSV format using the json2csv library. This CSV data can be downloaded by authorized users.

## 10. Contributing <a name="contributing"></a>

Contributions to Career Camp are welcome! If you find any issues or would like to add features, please submit a pull request to the GitHub repository.

## 11. License <a name="license"></a>

Career Camp is released under the [MIT License](https://opensource.org/licenses/MIT).

---

This concludes the documentation for the Career Camp web application. For any further assistance or inquiries, please refer to the GitHub repository or contact the maintainers.
