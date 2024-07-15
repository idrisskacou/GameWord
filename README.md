### Launch Tracker Page with PEAN Stack Backend
<img src="
https://raw.githubusercontent.com/idrisskacou/GameWord/main/public/images/new_1.png">


The **Launch Tracker Page** is a web application built using the PEAN stack, which integrates an API backend connected to a PostgreSQL server. This document explains the architecture and components of the application.
<img src="
https://raw.githubusercontent.com/idrisskacou/GameWord/main/public/images/new_4.png">

#### PEAN Stack Overview

The PEAN stack is a collection of technologies used to develop full-stack web applications. It consists of:
    P-- ProgreSQL.
    E-- Express.
    A-- Angular.
    N-- Node.
- **P - PostgreSQL**: A powerful, open-source object-relational database system that stores and manages data.
- **E - Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **A - Angular**: A platform and framework for building single-page client applications using HTML and TypeScript.
- **N - Node**: A JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript on the server side.

#### Application Components

1. **Frontend (Angular)**:
   - The frontend of the application is built using Angular, which provides a dynamic and interactive user interface.
   - It communicates with the backend API to fetch and display data related to launch events.

2. **Backend (Node and Express)**:
   - The backend is developed using Node.js and Express.
   - Express is used to create RESTful API endpoints that handle requests from the frontend.
   - The backend processes these requests, interacts with the PostgreSQL database, and sends the appropriate responses back to the frontend.

3. **Database (PostgreSQL)**:
   - PostgreSQL is used to store data about launch events.
   - The database schema includes tables and fields to store details such as launch ID, image, title, date, time, base, location, rocket, description, company, and a URL for more information.
   - SQL queries are used to interact with the database, allowing for the retrieval, insertion, updating, and deletion of data.

#### How It Works

1. **API Backend Connection**:
   - The application connects to the PostgreSQL server using the `pg` library in Node.js.
   - Database credentials and connection details are stored in environment variables to enhance security.

2. **Fetching Data**:
   - The backend defines a function to fetch launch data from the PostgreSQL database.
   - This function executes a SQL query to retrieve the necessary information from the database.

3. **Rendering Data**:
   - The fetched data is sent to the frontend through API responses.
   - Angular processes this data and dynamically updates the UI to display the information about upcoming launches.

4. **Toggle Dark/Light Mode**:
   - The frontend includes a button to toggle between dark and light modes, enhancing the user experience.
   - This functionality is implemented using simple JavaScript that adds or removes a CSS class to switch themes.

#### Example Code Snippets

**Backend Code to Fetch Data**:

```javascript
const express = require('express');
const pg = require('pg');
const app = express();

// Database connection setup
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Fetching Launch Data
const fetchLaunchDataQuery = `
    SELECT 
        id,
        upcoming_launch_image,
        upcoming_launch_title,
        upcoming_launch_date,
        upcoming_launch_time,
        upcoming_launch_base,
        upcoming_launch_location,
        upcoming_launch_rocket,
        upcoming_launch_description,
        upcoming_launch_company,
        url
    FROM launch;
`;

// Function to fetch data from the database
const fetchLaunchData = async () => {
    try {
        await db.connect();
        const res = await db.query(fetchLaunchDataQuery);
        return res.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err; // Throw the error to propagate it
    } finally {
        db.end(); // Close the database connection after fetching
    }
};

module.exports = {
    fetchLaunchData,
};
```

**Angular Service to Call Backend API**:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

```

**Angular Component to Display Data**:

```typescript
import { Component, OnInit } from '@angular/core';
import { LaunchService } from './launch.service';

```

**Template for Displaying Launch Data**:

```html
<div class="launch" *ngFor="let launch of launchData">
  <img [src]="launch.upcoming_launch_image" alt="Launch Image">
  <h2>{{ launch.upcoming_launch_title }}</h2>
  <p><strong>Date:</strong> {{ launch.upcoming_launch_date }}</p>
  <p><strong>Time:</strong> {{ launch.upcoming_launch_time }}</p>
  <p><strong>Base:</strong> {{ launch.upcoming_launch_base }}</p>
  <p><strong>Location:</strong> {{ launch.upcoming_launch_location }}</p>
  <p><strong>Rocket:</strong> {{ launch.upcoming_launch_rocket }}</p>
  <p><strong>Company:</strong> {{ launch.upcoming_launch_company }}</p>
  <p>{{ launch.upcoming_launch_description }}</p>
  <p><a [href]="launch.url" target="_blank">More info</a></p>
</div>
```