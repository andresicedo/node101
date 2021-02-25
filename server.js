const http = require("http");
const express = require("express");
const db = require("./db");

const hostname = "127.0.0.1";
const port = 3000;

const app = express();


const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.get("/about", (req, res) => {
    res.send('About page');
});


app.get("/contact", (req, res) => {
    res.send('Contact page');
});

app.get("/friends", (req, res) => {
    let html = ""
    db.forEach(friend => {
        html += `<li>${friend.name}</li>`
    })

    res.send(html);
});

app.get("/friends/:handle", (req, res) => {
    const foundFriend = db.find((friend) => {
        if (friend.handle === req.params.handle) {
            return true
        } else {
            return false
        }
    })

    if (foundFriend) {
        let html = `<h1>${foundFriend.name}</h1>`
        html += `<h2>${foundFriend.handle}</h2>`
        html += `<p>${foundFriend.skill}</p>`
        res.send(html);
    } else {
        res.status(404);
        res.send("Could not find user with that handle")
    }
});

app.get("*", (req, res) => {
    res.status(404);
    res.send('Page not found');
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})