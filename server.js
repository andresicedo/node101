const http = require("http");
const express = require("express");
const db = require("./db");
const es6Renderer = require("express-es6-template-engine");

const hostname = "127.0.0.1";
const port = 3000;

const app = express();

app.engine("html", es6Renderer); //register html template engine
app.set("views", "templates"); //look for templates in template folder
app.set("view engine", "html"); //user the html engine for view rendering


const server = http.createServer(app);

app.get("/", (req, res) => {
    res.render("home", {
        locals: {
            title: "Home"
        },
        partials: {
            head: "/partials/head"
        }
    });
});

app.get("/about", (req, res) => {
    res.render('about', {
        locals: {
            title: "About"
        },
        partials: {
            head: "/partials/head"
        }
    });
});


app.get("/contact", (req, res) => {
    res.render('contact', {
        locals: {
            title: "Contact"
        },
        partials: {
            head: "/partials/head"
        }
    });
});

app.get("/friends", (req, res) => {
    let html = ""
    db.forEach(friend => {
        html += `<li>${friend.name}</li>`
    })

    res.render("friends", {
        locals: {
            title: "Andres's Friends",
            friends: db
        },
        partials: {
            head: "/partials/head"
        }
    });
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
        res.render("friendSingle", {
            locals: {
                title: "Friends",
                friend: foundFriend
            },
            partials: {
                head: "/partials/head"
            }
        });
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