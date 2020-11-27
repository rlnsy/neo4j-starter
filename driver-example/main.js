const neo4j = require('neo4j-driver')
const express = require('express')

const app = express()
const port = 8888

// connects to the locally-running database
// for simplicity, authentication is not used
const driver = neo4j.driver("bolt://db:7687", null)

const personName = 'John Goodman'

// A sample endpoint to get the acting roles for John goodman
app.get('/', async (req, res) => {
    console.log(`Request from ${req.hostname}`)
    let session = driver.session()
    try {
// execute the query using the driver
        const result = await session.run(
            'MATCH (p: Person {name: $name}) -[a: ACTED_IN]-> (m) RETURN m,a;',
            { name: personName }
        )
// here is the syntax for dealing with resulting records
// error handling is ommitted.
        const singleRecord = result.records[0]
        const movie = singleRecord.get('m')
        const acted = singleRecord.get('a')
// a basic response
        res.send(`${personName} acted in ` +
            `${movie.properties.title} as ${acted.properties.roles[0]}\n`)
    } catch (e) {
        console.log(e)
        res.send("An error occurred\n")
    } finally {
        await session.close()
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// on application exit:
// TODO should manage a sesion maintaining an ephemeral driver instance
//driver.close().then(() => { console.log("Done") });
