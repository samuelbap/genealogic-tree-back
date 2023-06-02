# Gnealogic-tree-back

###  First Time Starter
When cloning the repository for the first time it is necessary to perform the following steps: 

1- Require the install of docker or any alternative application that runs Docker containers.

2- It is necessary to have in your local repository the environment variables that contain the username and password for the authentication of the database. Likewise, since the repository is configured to create a database based on the predefined Postgres image in Dockers, you could start the test by writing the desired username and password in /docker.compose.yml/services/db. However, don't forget to also include it in the configuration of Sequelize src/config/database.js.

Note: "In the Sequelize configuration for connecting to the database, there are several methods to consider if you want to maintain the changes in the database."
```java 
 sequelize.sync() // This creates the table if it doesn't exist (and does nothing if it already exists)
 sequelize.sync({ force: true }) // This creates the table, dropping it first if it already existed
 sequelize.sync({ alter: true }) // This checks what is the current state of the table in the database
```
### How Init the repo:

3-Performing a docker structure construction, 
```bash
 docker compose --project-name gtree build
```
3-  For start the dockers development server:
```bash
  docker compose --project-name gtree up -d  ||  docker compose --project-name gtree up -d --force-recreate
```
5-  For down the dockers :
```bash
  docker compose --project-name gtree down || docker compose --project-name gtree down -v
```

Note: Installation of all packages and dependencies node. It´s NOT necessary because the docker performs the:
```bash
  npm install
```
at the time of initialization

#### Now just initialize the front to establish the connection.
