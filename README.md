# Neo4j Development Starter
## How To Use
1. Clone the repo
2. Install Docker if you haven't already
3. In the root project directory, run `docker-compose up`. This will set up containers for the **neo4j** database and an interactive **Cypher** shell. 
It will also load and execute a sequence of Cypher queries that set up the example "movies" data.
4. Access the cypher shell by [attaching](https://docs.docker.com/engine/reference/commandline/attach/) to the shell docker container. Note that exiting this shell will
also trigger the container to close. Alternatively, you can install `cypher-shell` from your system package manager and access the database locally on the appropriate port.
5. Try running some queries. For example, to see all nodes, execute
```
MATCH (n) RETURN n;
```
6. That's it for now! Check back later for Javascript driver instructions.
