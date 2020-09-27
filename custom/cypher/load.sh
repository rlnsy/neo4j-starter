#!/usr/bin/sh

echo "Waiting for neo4j database to start up..."
sleep 15
echo "Opening shell connection to DB and performing queries..."
cat load-movies.cypher | sh ./connect.sh
echo "Done."