# Gnealogic-tree-back

###  First Time Starter
When cloning the repository for the first time it is necessary to perform the following steps:


1-  Performing a docker structure construction
```bash
 docker compose --project-name gtree build
```
2-  For start the dockers development server:
```bash
  docker compose --project-name gtree up -d
```
3-  For down the dockers :
```bash
  docker compose --project-name gtree down
```

Note: Installation of all packages and dependencies node.It is not necessary because the docker performs the:
```bash
  npm install
```
at the time of initialization

#### Now just initialize the front to establish the connection.
