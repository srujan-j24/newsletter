const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

var apikey = "a2fb7acbc95923e72ba6183b22c0887d-us8";
var listid = "c490f2be38";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const f = req.body.fname;
    const l = req.body.lname;
    const e = req.body.email;

    const data = {
        members: [
            {
                email_address: e,
                status: "subscribed",
                merge_fields: {
                    FNAME: f,
                    LNAME: l
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = 'https://us8.api.mailchimp.com/3.0/lists/c490f2be38';
    const options = {
        method: "POST",
        auth: "secondkey:a2fb7acbc95923e72ba6183b22c0887d-us8"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.post("/fail", function(req, res){
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("running");
})