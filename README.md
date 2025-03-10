### Launch Tracker Page with PEAN Stack Backend
### Frontend Page (Launch Dashboard)

**Dashboard (Angular => API)**
<img src="https://github.com/idrisskacou/GameWord/blob/0ea4d50b2dc3153327627a8431604e2a131aff43/public/images/Screenshot%202024-11-04%20at%204.57.19%E2%80%AFPM.png">
<img src="https://github.com/idrisskacou/GameWord/blob/0ea4d50b2dc3153327627a8431604e2a131aff43/public/images/Screenshot%202024-11-04%20at%204.57.32%E2%80%AFPM.png">

**Launch Details**
<img src="https://github.com/idrisskacou/GameWord/blob/0ea4d50b2dc3153327627a8431604e2a131aff43/public/images/Screenshot%202024-11-04%20at%205.07.11%E2%80%AFPM.png">

### Backend Page (Launch Details)
**Backend (Express + Node => Database)**
<img src="https://raw.githubusercontent.com/idrisskacou/GameWord/main/public/images/seach-on-launch-tracker.png">


The **Launch Tracker Page** is a web application built using the PEAN stack, which integrates an API backend connected to a PostgreSQL server. This document explains the architecture and components of the application.
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

### Diagram
<img src= "https://github.com/idrisskacou/GameWord/blob/775873469afb233956867ba5d0af393629d620f1/public/images/Launch%20Website%20Diagram.png">

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

```
CREATE TABLE launch (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    upcoming_launch_image TEXT,
    upcoming_launch_title TEXT NOT NULL,
    upcoming_launch_date DATE,
    upcoming_launch_time TIME WITHOUT TIME ZONE,
    upcoming_launch_base TEXT,
    upcoming_launch_location TEXT,
    upcoming_launch_rocket TEXT,
    upcoming_launch_description TEXT,
    upcoming_launch_company TEXT,
    url TEXT
);
```

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
<img src="https://raw.githubusercontent.com/idrisskacou/GameWord/main/public/images/contact-page-inage.png">


#### Docker-Compose.yml
```console
# This docker-composer build the FullStack 
# Frontend: Angular 
# Backend: ExpressJS and NodeJS 
# MessageQ: RabbitMQ
# Database: Postgres & MongoDB
# Monitor real-time performance: Grafana( Loki & Prometheus, Cadvisor)
# Search engine : Elasticsearch
# version: '3.7'
services:
  # Frontend : Angular Setup 
  angular:
    container_name: angular-frontend
    build:
      context: ./admin  # Angular project directory
      dockerfile: Dockerfile  # Explicitly specifies the Dockerfile
    restart: always # Always running
    environment:
      - API_URL=http://express-backend:3002/api # Api URL path 
    ports:
      - "4200:4200"  #Angular (Nginx) to port 4200
    networks:
      - frontend # Networks mapping 

  # Backend: ExpressJs Setup 
  backendexpress:
    container_name: express-backend # Name of Backend Container Name 
    restart: always # Restart is always in case it fail 
    build: . # Build the dockerfile 
    ports:
      - '3000:3000'
      - '3002:3002' #API for the frontend server listening on PORT: 3002
    networks: 
      - backend # Backend network service 
      - frontend # Frontend network serive
    env_file: # Environement variable 
      - .env
    environment:
      MONGO_URI: mongodb://mongodb:27017/launch
      DB_HOST: ${POSTGRES_HOST} # DB host name 
      DB_USER: ${POSTGRES_USER} # DB user name 
      DB_PASSWORD: ${POSTGRES_PASSWORD} # DB password
      DB_NAME: ${POSTGRES_DATABASE} # DB name 
    depends_on: # Service depend on
      - mongo # DB
      - postgres # DB


  # Database: MongoDB 1
  mongo:
    container_name: door-mongo-db
    image: 'mongo:8.0-rc'
    restart: always
    volumes:
      - mongodata:/data/db
    ports:
      - '27017:27017'
    networks:
      - frontend
      - backend

  # Database: Postgres
  postgres:
    container_name: door-postgres-db
    image: 'postgres:latest'
    restart: always
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DATABASE}
    volumes:
      - postgresdb:/var/lib/postgresql/data
      - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
      - ./postgres/launch_database.sql:/docker-entrypoint-initdb.d/launch_database.sql
      - ./postgres/account.sql:/docker-entrypoint-initdb.d/account.sql
      - ./postgres/weather_database.sql:/docker-entrypoint-initdb.d/weather_database.sql
    networks:
      - backend
    ports:
      - '5432:5432'

  # Monitor: Grafana
  grafana:
    container_name: grafana
    image: 'grafana/grafana:latest'
    restart: always
    ports:
      - "3001:3001"  # Expose Grafana on host port 3001
    networks:
      - frontend
      - backend
    environment:
      - GF_PATHS_PROVISIONING=/etc/grafana/provisioning
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_FEATURE_TOGGLES_ENABLE=alertingSimplifiedRouting,alertingQueryAndExpressionsStepMode
    volumes:
      - ./grafana/config/grafana.ini:/etc/grafana/grafana.ini  # Load custom config
      - grafana-data:/var/lib/grafana  # Persist Grafana data
      - ./grafana/provisioning:/etc/grafana/provisioning  # Provisioning directory
      - ./grafana/provisioning/dashboards/nginx.json:/etc/grafana/provisioning/dashboards/nginx.json
    entrypoint:
      - sh
      - -euc
      - |
        mkdir -p /etc/grafana/provisioning/datasources
        mkdir -p /etc/grafana/provisioning/dashboards
        cat <<EOF > /etc/grafana/provisioning/datasources/ds.yaml
        apiVersion: 1
        datasources:
        - name: Prometheus
          type: prometheus
          access: proxy
          url: http://prometheus:9090
          isDefault: false
          editable: true
        - name: Loki
          type: loki
          access: proxy
          url: http://loki:3100
          isDefault: true
          editable: false
        EOF

        cat <<EOF > /etc/grafana/provisioning/dashboards/dashboards.yaml
        apiVersion: 1
        providers:
        - name: 'default'
          orgId: 1
          folder: ''
          type: file
          disableDeletion: false
          editable: true
          options:
            path: /etc/grafana/provisioning/dashboards
        EOF
        
        /run.sh

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

  loki:
    image: grafana/loki:3.4
    container_name: grafana-loki
    volumes:
      - ./loki-config.yaml:/etc/loki/local-config.yaml
      # - ./loki_data:/loki
    # restart: unless-stopped
    command: -config.file=/etc/loki/local-config.yaml
    ports:
      - "3100:3100"
    networks:
      - backend  #depending on your needs
    healthcheck:
      test: ["CMD", "curl", "-f", "http://0.0.0.0:3100/ready"]
      interval: 30s
      timeout: 10s
      retries: 5

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.47.2
    container_name: cadvisor
    restart: always
    ports:
      - "8080:8080"  # cAdvisor UI
    networks:
      - backend
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "/sys:/sys:ro"
      - "/:/rootfs:ro"
      - "/var/lib/docker/:/var/lib/docker:ro"

  promtail:
    image: grafana/promtail:latest
    container_name: promtail
    volumes:
      # - ../myapp/logs:/var/log/nginx_myapp # Here we tell Promtail where the logs are
      # In case more app logs are needed
      # - ../app_name/logs:/var/log/nginx_app_name
      - /var/log:/var/log
      - ./promtail-config.yaml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml
    restart: unless-stopped
    networks:
      - backend  #depending on your needs

  prometheus:
    image: prom/prometheus
    container_name: prometheus
    ports:
      - "9090:9090"
    networks:
      - backend  #depending on your needs
      - frontend
    volumes:
      - prometheus_data:/prometheus
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9090/-/healthy"]
      interval: 30s
      retries: 3

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.10.0
    environment:
      - discovery.type=single-node
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"

  # logstash:
  #   image: docker.elastic.co/logstash/logstash:7.10.0
  #   volumes:
  #     - ./logging/logstash.conf:/usr/share/logstash/pipeline/logstash.conf

  # kibana:
  #   image: docker.elastic.co/kibana/kibana:7.10.0
  #   ports:
  #     - "5601:5601"

  kong:
    image: kong
    ports:
      - "8000:8000"  # Public API
      - "8001:8001"  # Admin API
    environment:
      - KONG_DATABASE=off
      - KONG_PROXY_LISTEN=0.0.0.0:8000
      - KONG_ADMIN_LISTEN=0.0.0.0:8001


# Create a network to attach to external network containers
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
 
# Define the named volume explicitly
# Volumes
volumes:
  mongodata:
    driver: local
  grafana-data:
    driver: local
  prometheus_data:
    driver: local
  elasticsearch-data:
  postgresdb:
    driver: local
  
```