# wafflemap

## Overview

### Preview

A preview of this project is currently deployed to https://wafflemap.fietensen.de

### Goal + Technologies

The Project's goal is to showcase the development process and structure of a fully fledged web application.

This includes:
- A multi-page React Frontend
- A Spring Boot Backend
- Geospatial Data Storage in a Postgres Database + PostGIS extension
- Dockerization
- CI/CD Pipeline

### Practical applications / Idea

During a conversation with a coworker about free waffles and "Time is Money", we came up with the following idea:

Since every now and then there is a free-waffles event at our organization, we want to find a way of measuring the economic incentive of leaving home office, driving to work in order to partake in the waffles event.

This incentive is based off of following criteria:
- The fuel-cost of a drive to work
- The hourly wage projected onto the estimated travel time to work
- The cost of the waffle's ingredients (flour, eggs, milk etc.)

Based on this, we want a way to calculate the amount of waffles that have to be consumed in order to achieve a positive net profit.

### Services

This repository comes with a pre-configured orchistration of Docker containers that can be deployed using `docker-compose`. These Services currently include:

- `postgres_db`: A Postgres + PostGIS Database + Custom initialization Script for pulling Data from Open-Street-Maps
- `postgres_pgadmin4`: A web service allowing you to maintain / explore the postgres database
- `wafflemap`: Our application

## Getting started

### Configuration

In order to configure the services, you can copy and modify the file `config/development.env` to fit your needs. If you are deploying using `docker-compose`, you should also modify the `.env` file in the repository's root directory to point to the configuration file. If you are manually deploying, you should ensure that the environment variables contained in the `config/{your-configuration-name}.env` file are available to the application.

Here is an overview of the environment variables for `docker-compose`:

| Name                         | Description                                                                                                       |    Configurable    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | :----------------: |
| `WM_DOCKER_CONFIG`           | The relative path to the application's configuration. Change this from `./config/development.env` when deploying. | :heavy_check_mark: |
| `WM_DOCKER_EXPOSE_PGADMIN4`  | The Port of the `pgadmin4`-service that will be exposed by Docker when deploying                                  | :heavy_check_mark: |
| `WM_DOCKER_EXPOSE_WAFFLEMAP` | The Port of the `wafflemap`-service that will be exposed by Docker when deploying                                 | :heavy_check_mark: |

---

Here is an overview of the environment variables contained in the `config/development.env` and whether you should (or probably shouldn't) modify them (marked as `Configurable`):

| Name                       | Description                                                                                                                                 |                        Configurable                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------: |
| `POSTGRES_USER`            | The username for the `postgres`-service                                                                                                     |                     :heavy_check_mark:                     |
| `POSTGRES_PASSWORD`        | The password for the `postgres`-service                                                                                                     |                     :heavy_check_mark:                     |
| `POSTGRES_DB`              | The database that should be created/used in the `postgres`-service                                                                          |                     :heavy_check_mark:                     |
| `PGADMIN_DEFAULT_EMAIL`    | The default admin mail address used to authenticate to the `pgadmin4`-service                                                               |                     :heavy_check_mark:                     |
| `PGADMIN_DEFAULT_PASSWORD` | The default admin password for the `pgadmin4`-service                                                                                       |                     :heavy_check_mark:                     |
| `WM_POSTGRES_HOST`         | The hostname/address of the postgres service                                                                                                | :x: (modify only when not deploying as a Docker container) |
| `WM_POSTGRES_PORT`         | The port of the postgres service                                                                                                            |                    :x: (same as above)                     |
| `WM_HOST`                  | The host the wafflemap should bind to                                                                                                       |                    :x: (same as above)                     |
| `WM_PORT`                  | The port the wafflemap should bind to (internally for `docker-compose`)                                                                     |                    :x: (same as above)                     |
| `WM_FLYWAY_ENABLED`        | Whether Flyway should be enabled for `wafflemap`                                                                                            |                    :x: (same as above)                     |
| `WM_POSTGRES_DB`           | The database that should be used by the `wafflemap`-service                                                                                 |                            :x:                             |
| `WM_POSTGRES_USER`         | (again) username for the `postgres`-service                                                                                                 |                            :x:                             |
| `WM_POSTGRES_PASSWORD`     | (again) password for the `postgres`-service                                                                                                 |                            :x:                             |
| `OSM_INIT_TARGET_URI`      | The unix-socket connection URI for the OSM-Init script                                                                                      |                            :x:                             |
| `OSM_INIT_PLACE`           | The place that should be downloaded from OpenStreetMap / inserted into the database                                                         |                     :heavy_check_mark:                     |
| `OSM_INIT_NETWORK_TYPE`    | The network type (see [documentation](https://osmnx.readthedocs.io/en/stable/user-reference.html#osmnx.graph.graph_from_address) for types) |                            :x:                             |
| `OSM_INIT_TABLE_VERTICES`  | The name of the street vertices table to be initialized                                                                                     |                            :x:                             |
| `OSM_INIT_TABLE_EDGES`     | The name of the street edges table to be initialized                                                                                        |                            :x:                             |


### Deployment

In order to deploy application, I recommend using `docker-compose` since it will deal with the setting-up and configuring of the services required for the application to operate.
If you are a developer, after configuration, you may want to head to [Development](#development) to see how you can deploy in development mode in order to easily work on the front- or backend without having to re-build the docker containers each time which takes quite some time. If you are just looking to deploy the service yourself, you can just continue reading on. Here are the steps to setting up and deploying the project:

1. Download / Clone this repository
2. Create a copy of `config/development.env` and name it something like `config/production.env`
3. Modify the configuration as you wish. You can see what the environment variables control and which you should better not touch in the [Configuration](#configuration) section.
4. Modify the `.env` file located at the root of this repository
   1. Set `WM_DOCKER_CONFIG` to point to your configuration
   2. Set `WM_DOCKER_EXPOSE_PGADMIN4` to the port you want the control panel to be listening on
   3. Set `WM_DOCKER_EXPOSE_WAFFLEMAP` to the port you want the application to be listening on
5. Run `docker compose up -d --build` in the repository's root directory
6. Enjoy

Upon first execution, `docker-compose` will build the services before starting to run them in the background. Additionally, a script will automatically download the street
information for the configured region from OpenStreetMap for use, so this might take a while.

#### Development

If you are a developer I still recommend you to follow the configuration steps described in [Deployment](#deployment). You should still run using `docker-compose`, but also specify
that you wish to develop, causing `docker-compose` to not run the `wafflemap`-service and also exposing the `postgres`-service for use outside the container. Obviously this should
not be done this way in production.

If you want to disable building the `wafflemap` component and also expose the database service, you can run using the following command instead:
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```

You can then run the frontend by running the following command in the `/frontend` directory:
```bash
npm run dev
```

Make sure to have the Backend, located at `/backend` running, to make the api available to the frontend.

## License

This repository is licensed under a MIT-license. Feel free to use parts of- or even the whole code and do whatever you want with it, though i am not liable for anything that happens. The complete, formal license can be viewed in the `LICENSE` file in the repositories root directory. Please credit my work if you decide to use it.