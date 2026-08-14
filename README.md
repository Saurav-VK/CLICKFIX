# CLICKFIX

## Vehicle Service Management Platform

CLICKFIX is a full-stack vehicle service management platform developed as a team-based internship project. It provides separate user and administrator interfaces for managing vehicles, vehicle servicing, service centers, mechanics, service bookings, payments, and invoices.

The application uses a **React + TypeScript** frontend and a **Spring Boot microservices backend**, with **Netflix Eureka** for service discovery and **Spring Cloud Config** for centralized configuration.

---

## Features

### Customer Features

* User registration and login
* JWT-based authentication
* Protected user routes
* Profile management
* Add, view, update, and delete vehicles
* Upload vehicle images
* Browse service centers
* Browse service types
* Book vehicle services
* View booking history
* Manage bookings
* Track booking/service status
* Complete booking payments
* View invoice history
* View invoice details
* Generate invoice documents/PDFs

### Administrator Features

The application includes dedicated administrator functionality for managing:

* Users
* Vehicles
* Bookings
* Mechanics
* Service centers
* Service types
* Invoices

---

# Architecture

CLICKFIX is structured as a collection of Spring Boot applications.

```text
                         ┌──────────────────────────┐
                         │      React Frontend       │
                         │ React + TypeScript + Vite │
                         └────────────┬─────────────┘
                                      │
                                      │ REST / Axios
                                      ▼
                         ┌──────────────────────────┐
                         │       API Gateway        │
                         │  Spring Cloud Gateway    │
                         │         :9999             │
                         └────────────┬─────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼
   ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
   │ User Service │           │Vehicle Service│          │Booking Service│
   │    :9096     │           │    :9092     │           │    :9091     │
   └──────────────┘           └──────────────┘           └──────────────┘
          │                           │                           │
          └───────────────────────────┼───────────────────────────┘
                                      │
                 ┌────────────────────┼────────────────────┐
                 │                    │                    │
                 ▼                    ▼                    ▼
          ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
          │   Mechanic   │     │Service Center│     │ Service Type │
          │    :9876     │     │    :9085     │     │    :9093     │
          └──────────────┘     └──────────────┘     └──────────────┘
                                      │
                                      ▼
                              ┌──────────────┐
                              │Invoice Service│
                              │    :9090     │
                              └──────────────┘


                  ┌──────────────────────────────┐
                  │        Eureka Server         │
                  │       Service Discovery      │
                  │           :8761              │
                  └──────────────────────────────┘

                  ┌──────────────────────────────┐
                  │        Config Server         │
                  │  Centralized Configuration   │
                  │           :8000              │
                  └──────────────────────────────┘
```

---

# Technology Stack

## Frontend

The frontend is built using:

| Technology       | Version |
| ---------------- | ------- |
| React            | 19.1.0  |
| React DOM        | 19.1.0  |
| TypeScript       | ~5.8.3  |
| Vite             | 7.0.0   |
| React Router DOM | 7.6.3   |
| Axios            | 1.10.0  |
| Bootstrap        | 5.3.7   |
| React-Bootstrap  | 2.10.10 |
| React Icons      | 5.5.0   |
| React Toastify   | 11.0.5  |
| jwt-decode       | 4.0.0   |
| jsPDF            | 3.0.1   |
| html2canvas      | 1.4.1   |
| html2pdf.js      | 0.10.3  |

These versions are taken from the project's `package.json`.

## Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Spring Security
* JJWT
* Spring Cloud Config
* Spring Cloud Netflix Eureka
* Spring Cloud Gateway
* Spring Cloud OpenFeign
* MySQL
* ModelMapper
* Lombok
* Jakarta Validation
* Springdoc OpenAPI
* Maven

The exact Spring Boot patch version can vary between the individual services.

---

# Repository Structure

```text
CLICKFIX/
│
├── ClickFix_Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── context_providers/
│   │   ├── custom_hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── types/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── clickfix-backend/
│   ├── Booking-Service/
│   ├── Mechanic-Service/
│   ├── ServiceCenter-Service/
│   ├── ServiceType-Service/
│   ├── invoice-service/
│   ├── userservice/
│   ├── vehicle-service/
│   ├── gateway-api/
│   ├── eureka-server/
│   └── config-server/
│
└── config-server/
    └── config-server/
        ├── Booking-Service.properties
        ├── Mechanic-Service.properties
        ├── ServiceCenter-Service.properties
        ├── ServiceType-Service.properties
        ├── invoice-service.properties
        ├── userservice.properties
        └── vehicle-service.properties
```

The backend repository currently contains exactly the seven business services plus Gateway, Eureka, and Config Server.

---

# Backend Services

## User Service

**Directory**

```text
clickfix-backend/userservice/
```

**Port:** `9096`

**Application name:** `USERSERVICE`

The User Service handles authentication and user-management functionality.

### Main endpoints

```text
POST   /users/register
POST   /users/login

GET    /users/profile/{id}
PUT    /users/profile/{id}
DELETE /users/profile/{id}

GET    /users/bookings/user/{userId}

GET    /users/admin/users
GET    /users/admin/users/getuid/{email}
```

The service imports its configuration from the Config Server:

```properties
spring.config.import=optional:configserver:http://localhost:8000
```

and is configured to run on port `9096`.

---

## Vehicle Service

**Directory**

```text
clickfix-backend/vehicle-service/
```

**Port:** `9092`

**Application name:** `vehicle-service`

The Vehicle Service manages vehicles associated with users.

### Main endpoints

```text
POST   /vehicle-api/vehicle
GET    /vehicle-api/vehicle/{vehicleId}
GET    /vehicle-api/allvehicles/{userId}
PUT    /vehicle-api/vehicle
DELETE /vehicle-api/vehicle/{vehicleId}

POST   /vehicle-api/upload

GET    /vehicle-api/getvehicleid/{registration-number}

GET    /vehicle-api/admin/vehicle
```

The service is configured to obtain its database configuration from the Config Server rather than defining the datasource directly in its local `application.properties`.

The project also contains configuration for serving uploaded vehicle files from a local `uploads/` directory.

---

## Booking Service

**Directory**

```text
clickfix-backend/Booking-Service/
```

**Port:** `9091`

**Application name:** `Booking-Service`

The Booking Service manages vehicle-service bookings and related booking operations.

### Main endpoints

```text
POST   /booking-api/bookings

GET    /booking-api/bookings/{bookingId}
GET    /booking-api/bookings/user/{userId}

PUT    /booking-api/bookings/{bookingId}
DELETE /booking-api/bookings/{bookingId}

GET    /booking-api/bookings/status/{bookingId}

GET    /booking-api/bookings/getuser/{bookingId}
GET    /booking-api/bookings/autofill/{userId}
GET    /booking-api/bookings/displayvehicles/{userId}

GET    /booking-api/bookings/completeservice

GET    /booking-api/bookings/invoicehistory/{userId}

GET    /booking-api/bookings/service-centers
GET    /booking-api/bookings/service-types

GET    /booking-api/bookings/get-v-id/{registration-Number}
GET    /booking-api/bookings/get-sc-id/{centerName}

GET    /booking-api/bookings/getinvoiceId/{bookingId}

GET    /booking-api/bookings/getall

PUT    /booking-api/bookings/completepayment/{bookingId}
```

The service is configured for port `9091` and imports configuration from `localhost:8000`.

---

## Mechanic Service

**Directory**

```text
clickfix-backend/Mechanic-Service/
```

**Port:** `9876`

**Application name:** `Mechanic-Service`

The Mechanic Service manages mechanic information used by the service-management workflow.

Its configuration imports centralized properties from the Config Server and specifies port `9876`.

---

## Service Center Service

**Directory**

```text
clickfix-backend/ServiceCenter-Service/
```

**Port:** `9085`

**Application name:** `ServiceCenter-Service`

This service manages service-center information.

Its local configuration specifies port `9085` and imports its remaining configuration from the Config Server.

---

## Service Type Service

**Directory**

```text
clickfix-backend/ServiceType-Service/
```

**Port:** `9093`

**Application name:** `ServiceType-Service`

This service manages the types of vehicle services available through CLICKFIX.

Its local configuration specifies port `9093` and imports configuration from the Config Server.

---

## Invoice Service

**Directory**

```text
clickfix-backend/invoice-service/
```

**Port:** `9090`

**Application name:** `invoice-service`

The Invoice Service handles invoice-related functionality.

It also writes application logs to:

```text
logs/invoice-service.log
```

with:

```properties
logging.level.root=INFO
logging.level.com.cts.clickfix.controller=DEBUG
```

The service runs on port `9090` and imports centralized configuration from the Config Server.

---

# Infrastructure

## Eureka Server

**Port:** `8761`

The Eureka Server provides service discovery.

Configuration:

```properties
server.port=8761
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
```

This means the Eureka application acts as the registry rather than registering itself as an ordinary client.

### Dashboard

```text
http://localhost:8761
```

---

## Config Server

**Port:** `8000`

The Config Server provides centralized configuration to the business services.

```properties
server.port=8000
spring.cloud.config.server.git.uri=https://github.com/saurav-vk-sd/config-server.git
spring.cloud.config.server.git.clone-on-start=true
```

The server therefore retrieves configuration from the separate Git repository configured above.

The business services are configured to import their properties from:

```text
http://localhost:8000
```

For example:

```properties
spring.config.import=optional:configserver:http://localhost:8000
```

---

## API Gateway

**Port:** `9999`

The Gateway uses Spring Cloud Gateway.

Current configuration:

```yaml
server:
  port: 9999
```

The repository contains an example User Service route, but the complete gateway route configuration is currently **commented out**:

```yaml
# routes:
#   - id: USER-SERVICE
#     uri: lb://USER-SERVICE
#     predicates:
#       - Path=/user-api/**
```

Therefore, the Gateway is present as an infrastructure component, but its routes must be enabled/configured before using it as the active central API entry point.

---

# Service Port Reference

| Component              |   Port |
| ---------------------- | -----: |
| Eureka Server          | `8761` |
| Config Server          | `8000` |
| API Gateway            | `9999` |
| Invoice Service        | `9090` |
| Booking Service        | `9091` |
| Vehicle Service        | `9092` |
| Service Type Service   | `9093` |
| Service Center Service | `9085` |
| User Service           | `9096` |
| Mechanic Service       | `9876` |

The service ports are defined in the individual Spring Boot `application.properties` files.

---

# Database

CLICKFIX uses **MySQL**.

The database configuration is centralized through the Config Server. The local `application.properties` files contain commented datasource settings, while the active configuration is expected to come from the external Config Server repository.

The repository contains configuration for separate databases for the different services.

Typical database names in the project's configuration are:

```text
userdb
bookingservicedb
tempclickdb
Mechanicdb
ServiceCenterdb
ServiceTypedb
clickfix_invoicedb
```

Before running the application, ensure the databases required by the active Config Server configuration exist.

> The exact datasource configuration should be taken from the Config Server repository currently configured in `config-server/application.properties`.

---

# Prerequisites

## Backend

Install:

* JDK 17
* Maven
* MySQL
* Spring Tool Suite / IntelliJ IDEA / Eclipse

## Frontend

Install:

* Node.js
* npm
* Visual Studio Code or another TypeScript-compatible editor

---

# Configuration

The important configuration detail is that the business services **do not contain their active database configuration locally**.

Instead, they use:

```text
Business Service
      │
      ▼
Config Server :8000
      │
      ▼
Git configuration repository
```

The current Config Server points to:

```text
https://github.com/saurav-vk-sd/config-server.git
```

If you clone this project and want to use a different configuration repository, update:

```text
clickfix-backend/config-server/src/main/resources/application.properties
```

Specifically:

```properties
spring.cloud.config.server.git.uri=<YOUR_CONFIG_REPOSITORY>
```

The original repository README also notes that the configuration repository needs to be set up separately or its Git URL changed for local execution.

---

# Running the Application

Because CLICKFIX consists of multiple Spring Boot applications, they need to be started individually.

## 1. Start MySQL

Start your MySQL server.

Make sure the databases required by the Config Server configuration are available.

---

## 2. Start Eureka Server

Navigate to:

```text
clickfix-backend/eureka-server/
```

Run:

```bash
mvn spring-boot:run
```

Or run the Eureka application from STS/IntelliJ.

Verify:

```text
http://localhost:8761
```

---

## 3. Start Config Server

Navigate to:

```text
clickfix-backend/config-server/
```

Run:

```bash
mvn spring-boot:run
```

Verify that the Config Server is available on:

```text
http://localhost:8000
```

---

## 4. Start Business Services

Start:

```text
userservice
vehicle-service
Booking-Service
Mechanic-Service
ServiceCenter-Service
ServiceType-Service
invoice-service
```

For each service:

```bash
mvn spring-boot:run
```

Each service imports its configuration from:

```text
http://localhost:8000
```

and is configured to participate in Eureka-based service discovery.

---

## 5. Start API Gateway

Navigate to:

```text
clickfix-backend/gateway-api/
```

Run:

```bash
mvn spring-boot:run
```

The Gateway starts on:

```text
http://localhost:9999
```

However, remember that the committed Gateway routes are commented out.

---

# Running the Frontend

Navigate to:

```bash
cd ClickFix_Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

The project's actual npm scripts and frontend dependencies are defined in `package.json`.

---

# Frontend Structure

The frontend source is organized into:

```text
src/
├── assets/
├── components/
├── context/
├── context_providers/
├── custom_hooks/
├── pages/
├── routes/
├── types/
│
├── App.tsx
├── Layout.tsx
├── main.tsx
├── App.css
├── Layout.css
└── index.css
```

The repository structure confirms these directories and files.

### Components

Reusable UI components are separated from page-level components.

### Context / Providers

Application state that needs to be shared between components is handled through React context/provider structures.

### Custom Hooks

Reusable frontend logic is placed in the `custom_hooks` directory.

### Pages

Page-level components implement the application's user and administrator screens.

### Routes

Routing and protected-route behavior are separated into the `routes` directory.

---

# Authentication

The application uses JWT-based authentication.

The User Service provides:

```text
POST /users/register
POST /users/login
```

The backend includes Spring Security/JWT dependencies, while the frontend includes:

```text
jwt-decode
```

for decoding JWT information.

The general flow is:

```text
User
 │
 ▼
Login Page
 │
 ▼
User Service
 │
 ▼
Authentication
 │
 ▼
JWT
 │
 ▼
Frontend
 │
 ▼
Protected Application
```

---

# Inter-Service Communication

The backend uses the Spring Cloud ecosystem for microservice communication.

The architecture includes:

* Eureka Client for service discovery
* OpenFeign for declarative HTTP communication
* Spring Cloud Config for centralized configuration
* Spring Cloud Gateway for API routing

This separates the application into independently deployable business domains rather than implementing the entire backend as one monolithic service.

---

# Vehicle Image Uploads

The Vehicle Service exposes:

```text
POST /vehicle-api/upload
```

for vehicle-image uploads.

The project's configuration contains a local static-resource location:

```text
file:./uploads/
```

Therefore, when running locally, ensure the application has permission to create/write the upload directory.

For a production deployment, persistent object storage would be preferable to local filesystem storage.

---

# Invoice Generation

The frontend includes:

```text
jsPDF
html2canvas
html2pdf.js
```

These libraries are used for client-side document/PDF generation.

The backend also contains a dedicated Invoice Service.

---

# Logging

The Invoice Service writes logs to:

```text
logs/invoice-service.log
```

Configured logging includes:

```text
Root level: INFO
Controller package: DEBUG
```

This provides a dedicated application log file for invoice-service debugging.

---

# Typical Customer Workflow

```text
Register / Login
       │
       ▼
Customer Dashboard
       │
       ├── Manage Profile
       │
       ├── Manage Vehicles
       │
       ├── Browse Service Centers
       │
       └── Browse Service Types
                    │
                    ▼
               Book Service
                    │
                    ▼
              Booking History
                    │
              ┌─────┴─────┐
              ▼           ▼
       Service Status    Payment
                            │
                            ▼
                         Invoice
                            │
                            ▼
                    Invoice History
```

---

# Typical Administrator Workflow

```text
Admin Login
     │
     ▼
Admin Dashboard
     │
     ├── Users
     ├── Vehicles
     ├── Bookings
     ├── Mechanics
     ├── Service Centers
     ├── Service Types
     └── Invoices
```

---

# Backend Layering

The individual Spring Boot services follow a layered structure containing packages such as:

```text
src/main/java/
└── com/cts/<service>/
    ├── appconfig/
    ├── controller/
    ├── entity/
    ├── exception/
    ├── model/
    ├── repository/
    └── service/
```

### Controller

Handles HTTP requests and exposes REST endpoints.

### Service

Contains application/business logic.

### Repository

Provides persistence operations using Spring Data JPA.

### Entity

Represents database entities.

### Model

Contains DTOs/data-transfer models.

### Exception

Contains application-specific exception handling.

### AppConfig

Contains application configuration classes.

---

# Startup Order

For a local setup, the recommended order is:

```text
1. MySQL
      │
      ▼
2. Eureka Server :8761
      │
      ▼
3. Config Server :8000
      │
      ▼
4. Business Microservices
      │
      ├── User :9096
      ├── Vehicle :9092
      ├── Booking :9091
      ├── Mechanic :9876
      ├── Service Center :9085
      ├── Service Type :9093
      └── Invoice :9090
      │
      ▼
5. API Gateway :9999
      │
      ▼
6. React Frontend
```

---

# Important Setup Notes

### Config Server is required

The services import configuration from:

```text
http://localhost:8000
```

so the Config Server should be available before starting the business services.

### External configuration repository

The Config Server currently points to:

```text
https://github.com/saurav-vk-sd/config-server.git
```

If that repository is unavailable, the business services may not receive their datasource and other centralized settings.

### Gateway routes

The Gateway is present on port `9999`, but its current routes are commented out.

### Database credentials

Database credentials are intentionally not documented here because they belong in the external configuration repository and should not be exposed in project documentation.

For production, use environment variables or a secrets-management solution.

### Local uploads

Vehicle image uploads use local filesystem storage, so the `uploads/` directory must be writable.

---

# Team Project

CLICKFIX was developed as a **team-based internship project**.

The project provided hands-on experience with:

* Full-stack web development
* React
* TypeScript
* Spring Boot
* REST APIs
* Spring Data JPA
* MySQL
* Spring Security
* JWT authentication
* Microservices architecture
* Netflix Eureka
* Spring Cloud Config
* Spring Cloud Gateway
* OpenFeign
* DTO-based application design
* Frontend routing and protected routes
* File uploads
* Invoice/PDF generation
* Team-based software development

---

# Repository

**GitHub:**
https://github.com/Saurav-VK/CLICKFIX

---

# License

This project was developed as part of an internship team project. Refer to the repository for the applicable source-code and usage terms.
