const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();

const client = redis.createClient({
    url: 'redis://redis-server:6379'
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect()
    .then(() => {
        client.set('visits', 0);
    })
    .catch(console.error);

app.get('/', async (req, res) => {
    process.exit(0);
    try {
        const visits = await client.get('visits');
        res.send('Number of visits is ' + visits);
        
        await client.set('visits', parseInt(visits) + 1);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});