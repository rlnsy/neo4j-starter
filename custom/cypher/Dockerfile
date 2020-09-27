FROM openjdk:8
WORKDIR /
RUN wget https://github.com/neo4j/cypher-shell/releases/download/4.1.1/cypher-shell.zip
RUN unzip cypher-shell.zip
RUN rm cypher-shell.zip
RUN mkdir home/cypher
RUN mv cypher-shell home/cypher/cypher-shell
WORKDIR /home/cypher
COPY . .