# Sunset Detector Backend

Backend application for an IoT project that collects sensor data from an ESP32 device via MQTT, stores the information in MongoDB, and exposes a REST API for frontend applications.

The project is built with Node.js, Express, MongoDB, Mongoose, and MQTT.

---

# Table of Contents

* [About the Project](#about-the-project)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Running the Project](#running-the-project)
* [MQTT Flow](#mqtt-flow)
* [Data Model](#data-model)
* [Sunset Detection](#sunset-detection)
* [API Documentation](#api-documentation)
* [Data Processing](#data-processing)
* [Error Handling](#error-handling)
* [Development](#development)
* [Future Improvements](#future-improvements)
* [License](#license)

---

# About the Project

This backend system acts as the data storage and integration layer for an IoT-based sunset detection system.

The system receives sensor data from an ESP32 device via MQTT. The data includes:

* Lux values
* Color temperature (CCT)
* RGB values
* Timestamps

When data is received:

1. The payload is validated
2. The data is stored in MongoDB
3. The data is processed before being sent to frontend clients through the REST API

The backend is used to:

* visualize historical sensor data
* identify potential sunsets
* generate color data for sky visualization
* handle large amounts of time-series data

---

# Features

## MQTT Integration

* Connects to an MQTT broker
* Subscribes to configured topics
* Receives sensor data in real time
* Handles reconnects automatically using MQTT.js

## MongoDB Storage

* Stores historical measurements
* Supports filtering and sorting
* Optimized for time-series style sensor data

## REST API

* Retrieve historical data
* Retrieve individual records
* JSON-based API responses

## Sunset Detection

The system contains logic for identifying potential sunset conditions based on incoming sensor values.

## Data Processing

* API response formatting
* Sampling large datasets
* RGB to CSS color conversion

---

# Tech Stack

| Technology | Description                     |
| ---------- | ------------------------------- |
| Node.js    | Backend runtime                 |
| Express    | Web framework                   |
| MongoDB    | Database                        |
| Mongoose   | ODM for MongoDB                 |
| MQTT.js    | MQTT client                     |
| dotenv     | Environment variable management |

---

# Architecture

The backend follows a simple event-driven architecture:

ESP32 Sensor → MQTT Broker → Node.js Backend → MongoDB → REST API → Frontend

The ESP32 publishes sensor readings to MQTT topics. The backend subscribes to these topics, processes incoming data, stores it in MongoDB, and exposes the processed data through REST endpoints.

---

# Project Structure

```bash
src/
├── config/
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
├── mqtt/
└── server.js
```

| Folder      | Purpose                                |
| ----------- | -------------------------------------- |
| config      | Database and environment configuration |
| controllers | API logic                              |
| models      | MongoDB schemas                        |
| routes      | Express routes                         |
| services    | Business logic                         |
| utils       | Helper functions                       |
| mqtt        | MQTT client and subscriptions          |

---

# Installation

## Clone the repository

```bash
git clone <repository-url>
cd sunset-detector-backend
```

## Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sunset-detector
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_TOPIC=sensors/light
```

| Variable        | Description               |
| --------------- | ------------------------- |
| PORT            | Backend server port       |
| MONGODB_URI     | MongoDB connection string |
| MQTT_BROKER_URL | MQTT broker URL           |
| MQTT_TOPIC      | MQTT topic subscription   |

---

# Running the Project

## Development mode

```bash
npm run dev
```

## Production mode

```bash
npm start
```

---

# MQTT Flow

1. ESP32 collects environmental sensor data
2. Data is published to the MQTT broker
3. Backend subscribes to the configured topic
4. Incoming payloads are validated
5. Data is stored in MongoDB
6. Frontend applications retrieve data via REST API

Example MQTT payload:

```json
{
  "lux": 320,
  "cct": 4200,
  "rgb": {
    "r": 255,
    "g": 180,
    "b": 120
  },
  "timestamp": "2026-05-29T18:30:00Z"
}
```

---

# Data Model

Example MongoDB schema:

```js
{
  lux: Number,
  cct: Number,
  rgb: {
    r: Number,
    g: Number,
    b: Number
  },
  timestamp: Date
}
```

---

# Sunset Detection

The backend can classify potential sunset events based on:

* decreasing lux values
* warmer color temperatures
* RGB shifts toward orange/red tones

This logic can be expanded with:

* threshold-based detection
* moving averages
* machine learning models
* weather integration APIs

---

# API Documentation

## Base URL

```bash
http://localhost:3000/api
```

## Get all sensor data

```http
GET /sensor-data
```

Response:

```json
[
  {
    "_id": "6657f7f7c1234567890",
    "lux": 320,
    "cct": 4200,
    "rgb": {
      "r": 255,
      "g": 180,
      "b": 120
    },
    "timestamp": "2026-05-29T18:30:00Z"
  }
]
```

## Get single sensor entry

```http
GET /sensor-data/:id
```

## Health check

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

# Data Processing

The backend may process data before returning it to the frontend.

Possible processing includes:

* downsampling large datasets
* converting RGB values to CSS strings
* filtering invalid measurements
* sorting by timestamp

---

# Error Handling

The application includes basic error handling for:

* MongoDB connection failures
* Invalid MQTT payloads
* Missing API routes
* Validation errors
* Internal server errors

Example error response:

```json
{
  "error": "Invalid payload"
}
```

---

# Development

Recommended development tools:

* Nodemon
* MongoDB Compass
* Postman
* MQTT Explorer

Useful commands:

```bash
npm run dev
npm test
npm run lint
```

---

# Future Improvements

Potential improvements for the project:

* Authentication and authorization
* Advanced sunset detection algorithms
* Docker support
* Unit and integration tests
* Grafana/InfluxDB integration

---

# License

This project is licensed under the MIT License.

You are free to use, modify, and distribute the project.
