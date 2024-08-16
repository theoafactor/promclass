const express = require("express");
const promclient = require("prom-client");

// create a new server app
const server = express();

// port 
const PORT = 1222

// host
const HOSTNAME = "0.0.0.0"

const metric = new promclient.Counter({
    name: "visitation_counter", 
    help: "This metric measures the number of times the about us page was visited"
})



// define routes 
server.get("/", (request, response) => {

    response.send({
        message: "This works fine"
    })

});

server.get("/about-us", (request, response) => {

    metric.inc(1)

    response.send({
        message: "This is about us page"
    })

})

server.get("/metrics", async(request, response) => {
    response.set("Content-Type", metric.register.contentType)

    response.end(await metric.register.metrics("visitation_counter"))
})


// server listening
server.listen(PORT , () => console.log(`Server is listening on http://${HOSTNAME}:${PORT}`))


