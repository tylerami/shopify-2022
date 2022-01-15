# Shopify Backend Intern Challenge - Summer 2022

Check out the project [here](https://shopify-backend-2022.netlify.app/)!

This document contains documentation and recordings of all technologies and features implented within the project.

## Table of Contents

- [TL;DR](https://github.com/tylerami/shopify-2022#tldr)
- [Technologies](https://github.com/tylerami/shopify-2022#technologies)
- [Instructions](https://github.com/tylerami/shopify-2022#instructions)
- [Project Requirements](https://github.com/tylerami/shopify-2022#project-requirements)
- [Extra Features](https://github.com/tylerami/shopify-2022#extra-features)

## TL;DR

This application is a prototype called LogistX - an intuitive CRUD API for inventory management that allows for inventory items to be created, updated, and monitored using custom locations.

#### List of Extra Features

- Ability to create warehouses/locations and assign inventory to specific locations
- ER Diagram, designed with LucidChart
- MySQL Database ORM
- Unit testing with Jest and Supertest

## Technologies

Click on any of the following technologies to view relevant documentation:

- [MySQL](https://dev.mysql.com/doc/), for relational database management
- [Heroku](https://devcenter.heroku.com/categories/reference), for backend hosting
- [Sequelize](https://sequelize.org/), for Object-Relational mapping
- [Node.js](https://nodejs.org/en/docs/), for server-side programming
- [Express](https://expressjs.com/en/api.html), for API routing
- [Jest](https://jestjs.io/docs/getting-started) and [Supertest](https://www.npmjs.com/package/supertest), for unit testing
- [LucidChart](https://www.lucidchart.com/pages/), for ER diagram design - [See diagram](https://github.com/tylerami/shopify-2022/blob/master/static/ERDiagram.png)
- [Axios](https://axios-http.com/docs/intro), for API requests
- [React](https://reactjs.org/), for frontend design
- [Netlify](https://www.netlify.com/), for frontend hosting

## Instructions

To run this project locally instead of viewing the [live site](https://shopify-backend-2022.netlify.app/), follow these steps:

1. Clone this repository locally
2. Ensure node.js and npm are both installed and up to date on your machine
3. Open a terminal in the server folder and enter the command: `$ node index`
4. Open a new terminal in the client folder and enter the command: `$ npm start`

To run unit tests, simply open a terminal in the server folder and enter the command: `$ npm test`

## Project Requirements

Basic CRUD Functionality. This project enables you to:

### Create Inventory Items

![gid of Create Inventory Items](/static/CreateItem.gif)

### View a list of Inventory Items

![gif of View a list of Inventory Items](/static/ViewItems.gif)

### Edit Inventory Items

![gif of Edit Inventory Items](/static/EditItem.gif)

### Delete Inventory Items

![gif of Delete Inventory Items](/static/DeleteItem.gif)

## Extra Features

### Ability to create warehouses/locations and assign inventory to specific locations

Users can create custom warehouses/shipping centers/vehicles and save them as locations that can be assigned to any inventory item.

![gif of create warehouses](/static/CreateLocation.gif)

### MySQL Database ORM

This project uses sequelize for Object-Relational Mapping, as shown in the following Entity-Relationship model

![png of MySQL Database ORM](/static/ERDiagram.png)

### Unit testing

The testsuite for this project contains 7 tests using Supertest and Jest modules that verify expected responses for all 7 API endpoints.
These tests evaluate both the inventory CRUD service and location endpoint responses for proper status codes and deep object equality.

![gif of testsuite](/static/tests.gif)

## Reflections

Given more time, I would implement addition testing to verify responses to bad requests include the proper status codes.
In addition, the location/warehouse assignment functionality could be extended to allow for shipments to be tracked, warehouse capacity to be monitored, and items to be categorized.
