const express = require("express");

const client = require("prom-client")

const collectDefaultMetrics = client.collectDefaultMetrics;




// set the PORT 
const PORT = 1222
const HOSTNAME = "0.0.0.0"

// create metrics
const aboutus_counter = new client.Counter({
    name: "simple_app_counter_metric", 
    help: "This metric is responsible for counting the number of request made to our application"
})

const register_counter = new client.Counter({
    name: "simple_register_counter_metric",
    help: "This metric counts the number of times register page is visited"
})

collectDefaultMetrics({ aboutus_counter, register_counter });

// create the server
const server = express();


//set the endpoints
server.get("/contact-us", (request, response) => {

    aboutus_counter.inc(1)

    response.send({
        message: "Working fine"
    })

})

server.get("/register", (request, response) => {
    register_counter.inc(1);

    response.send({
        message: "Register page"
    });

})


// set the /metrics endpoint
server.get("/metrics", async (request, response) => {
    
    response.set("Content-Type", client.register.contentType)
    response.end(await client.register.metrics("simple_app_counter_metric"))
   
})

// start listening for connections
server.listen(PORT, HOSTNAME, () => console.log(`Server is listening on ${HOSTNAME}:${PORT}`));