### Launch Tracker Page with PEAN Stack Backend
### Diagram
<img src= "https://github.com/idrisskacou/GameWord/blob/775873469afb233956867ba5d0af393629d620f1/public/images/Launch%20Website%20Diagram.png">


The **Launch Tracker Page** is a web application built using the PEAN stack, which integrates an API backend connected to a PostgreSQL server. This document explains the architecture and components of the application.
<img src="https://raw.githubusercontent.com/idrisskacou/GameWord/main/public/images/seach-on-launch-tracker.png">

<img src="https://raw.githubusercontent.com/idrisskacou/GameWord/main/public/images/new_4.png">

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


#### Docker-Compose.yml
```console
# version: '3.7'
services:
  # Frontend : Angular Setup 
  angular:
    container_name: angular-frontend
    build:
      context: ./admin  # Points to the Angular project directory
      dockerfile: Dockerfile  # Explicitly specifies the Dockerfile
    restart: always
    ports:
      - "4200:4200"  #Angular (Nginx) to port 4200
    networks:
      - frontend

  # Backend: ExpressJs Setup 
  backendexpress:
    container_name: express-backend
    restart: always
    build: .
    ports:
      - '3000:3000'
      - '3002:3002' #API for the frontend server listening on PORT: 3002
    networks:
      - frontend
    environment:
      MONGO_URI: mongodb://mongodb:27017/launch
    links:
      - mongo

  # Database: MongoDB 
  mongo:
    container_name: door-mongo-db
    image: 'mongo:7'
    restart: always
    volumes:
      - mongodata:/data/db
    # environment:
    # - MONGO_INITDB_ROOT_USERNAME={{}} # standard password
    # - MONGO_INITDB_ROOT_PASSWORD={{}} # standard password
    ports:
      - '27017:27017'
    networks:
      - frontend
      - backend

  # Monitor: Grafana
  grafana:
    container_name: monitor-grafana
    image: 'grafana/grafana'
    restart: always
    ports:
      - "3001:3001"  # Expose Grafana on host port 3001
    networks:
      - frontend
    volumes:
      - ./grafana/config/grafana.ini:/etc/grafana/grafana.ini  # Load custom config
      - grafana-data:/var/lib/grafana  # Persist Grafana data

  # Message Queue: RabbitMQ
  rabbitmq:
    container_name: rabbitmq
    image: "rabbitmq:3-management"
    restart: always
    ports:
      - "5672:5672"   # RabbitMQ messaging port
      - "15672:15672" # Management UI
    networks:
      - backend

# Create a network to attach to external network containers
networks:
  frontend:
  backend:
 
 # Define the named volume explicitly
# Volumes
volumes:
  mongodata:
    driver: local
  grafana-data:
    driver: local  # Persistent storage for Grafana
```