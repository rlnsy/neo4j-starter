const neo4j = require('neo4j-driver')
const express = require('express')

const app = express()
const port = 8888

const driver = neo4j.driver("bolt://db:7687", null)

const personName = 'John Goodman'

app.get('/', async (req, res) => {
    console.log(`Request from ${req.hostname}`)
    let session = driver.session()
    try {
        const result = await session.run(
            'MATCH (p: Person {name: $name}) -[a: ACTED_IN]-> (m) RETURN m,a;',
            { name: personName }
        )
        const singleRecord = result.records[0]
        const movie = singleRecord.get('m')
        const acted = singleRecord.get('a')
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
//driver.close().then(() => { console.log("Done") });
