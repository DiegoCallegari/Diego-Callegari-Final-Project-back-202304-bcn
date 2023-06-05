# README - Barcelona Events App (Backend)

## Description

The backend of the "Què Fem" application provides an API for managing events in the city of Barcelona. It allows registered users to create, edit, and delete events, and allows unregistered users to access the event list and view event details.

## Main Features

CREATE: Registered users can create events.
READ: Any user (registered or unregistered) can view the event list sorted by "most recent" and filter by neighborhood.
UPDATE: Registered users who create events can edit their own events.
DELETE: Registered users can delete the events they have created.

## Technologies Used

The backend of the application utilizes the following technologies:

Node.js: JavaScript runtime environment.
Express: Node.js web application framework for creating RESTful APIs.
MongoDB: NoSQL database used to store event information.
Prerequisites
Before running the backend, make sure you have the following installed:

Node.js: JavaScript runtime environment.
MongoDB: NoSQL database.
Installation
Clone this repository to your local machine.
bash
Copy code
git clone <https://github.com/isdi-coders-2023/Diego-Callegari-Final-Project-back-202304-bcn.git>
Navigate to the project directory.
bash
Copy code
cd app-name
Install the project dependencies.
Copy code
npm install
Configuration
Before running the backend, make sure to configure the MongoDB database connection. Follow these steps:

Open the config.js file in a text editor.
Replace the value of DB_URL with the URL of your MongoDB database.
javascript
Copy code
const config = {
DB_URL: 'mongodb+srv://diego:didi1010@cluster0.7chq4jl.mongodb.net',
};
module.exports = config;
Usage
Start the backend server.
sql
Copy code
npm start
Contribution
If you would like to contribute to this project, follow these steps:

## Fork this repository.

Create a branch for your new feature.
Make the necessary changes in your branch.
Submit a pull request with your changes.
License
This project is licensed under the [License Name]. See the LICENSE file for more details.

## Contact

If you have any questions or suggestions regarding this project, please contact us via email at callcallegari@gmail.com.
