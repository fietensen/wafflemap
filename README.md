# wafflemap

## Overview

### Goal + Technologies

This Project's goal is to showcase the development of a fully fledged web application utilizing:

- A multi-page React Frontend
- A Spring Boot Backend
- Geospatial Data Storage in a Postgres Database + PostGIS extension

### Services

This repository comes with a pre-configured orchistration of Docker containers that can be deployed using `docker compose`. These Services currently include:

- `postgres_db`: A Postgres + PostGIS Database + Custom initialization Script for pulling Data from Open-Street-Maps
- `postgres_pgadmin4`: A web service allowing you to maintain / explore the postgres database
- `wafflemap`: Our application

## Getting started

### Configuration

In order to configure the services, you can modify the `.development.env` file located in the root of the repository. If you are just configuring the project for personal use and not for development, please only work with the environment variables that are marked as `Configurable`:

|         Name          |                                        Description                                         |    Configurable    |
| :-------------------: | :----------------------------------------------------------------------------------------: | :----------------: |
|     POSTGRES_USER     |                            The username for the Postgres Login                             | :heavy_check_mark: |
|   POSTGRES_PASSWORD   |                            The password for the Postgres Login                             | :heavy_check_mark: |
|      POSTGRES_DB      |                         The name of the default Postgres database                          | :heavy_check_mark: |
| PGADMIN_DEFAULT_EMAIL |                The email (doesn't have to exist) for the PgAdmin WebService                | :heavy_check_mark: |
| PGADMIN_DEFAULT_EMAIL |                          The password for the PgAdming Webservice                          | :heavy_check_mark: |
|   WM_POSTGRES_HOST    |                              Hostname of the Postgres Service                              |        :x:         |
|   WM_POSTGRES_PORT    |                            Port number of the Postgres Service                             |        :x:         |
|        WM_HOST        |                           Host to bind the WaffleMap Service to                            |        :x:         |
|        WM_PORT        |                        Port number to bind the WaffleMap Service to                        |        :x:         |
|   WM_FLYWAY_ENABLED   |                       Wether to use Flyway for automatic migrations                        |        :x:         |
|     WM_POSTGRES_*     |               Copies of the Postgres configuration for the WaffleMap Service               |        :x:         |
|  OSM_INIT_TARGET_URI  | URI for the OSM initialization Script to connect to the Postgres Database via Unix Sockets |        :x:         |
|    OSM_INIT_PLACE     |                     The Location to download from OSM for the Database                     | :heavy_check_mark: |
| OSM_INIT_NETWORK_TYPE |               The network type e.g. Car-Network (drive) to download from OSM               |        :x:         |
|   OSM_INIT_TABLE_*    |                    The tables to add the downloaded OSM street data to                     |        :x:         |

### Deployment

In order to deploy application, I recommend using docker-compose since it includes all the nessecarry Services required for the application to run. If you are a developer, you might want to skip to [Development](#development) since you should deploy differently if you have previously made modifications to the source code or are actively developing. Otherwise, you can keep reading.

To do this, you can simply execute the following command in the repositories root directory:
```bash
docker compose up -d
```

Upon first execution, this will build the services before starting to run them in the background. You can then reach the services at the ports specified in [Service Ports](#service-ports).

#### Development

If you are developing and redeploying the application, you should make sure to re-build the Docker images each time you want to deploy. You can build and deploy by executing the following command in the repositories root directory:
```bash
docker compose up --build -d
```

If you do not want to do a full-deploy, but rather run frontend and backend seperately and not containerized, you can exclude the building of the WaffleMap Service by running the application like this:
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```

You can then run the frontend buy running the following command in the `/frontend` directory:
```bash
npm run dev
```

Make sure to have the Backend, located at `/backend` running, to make the api available to the frontend.

#### Service Ports

Currently the deployed Services are listening on the following ports:

- Postgres: `5432`
- PgAdmin4: `5000`
- WaffleApp: `8080`

When running in development
- Frontend: `5173`
- Backend: `8080`

Modification: To-Do