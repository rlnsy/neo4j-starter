LOAD CSV WITH HEADERS FROM "https://www.dropbox.com/s/ci3cjwy91dp3a7e/movies_setup.csv?dl=0" AS row
MERGE (m:Movie {title:row.title}) ON CREATE SET m.released = toInteger(row.released), m.tagline = row.tagline
MERGE (p:Person  {name:row.name}) ON CREATE SET p.born     = toInteger(row.born)
WITH   m,p,row WHERE row.type = "ACTED_IN"
MERGE (p)-[r:ACTED_IN]->(m) ON CREATE SET r.roles = split(row.roles,";")[0..-1];
