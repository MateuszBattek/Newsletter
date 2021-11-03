var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var path = require("path");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

let users = [
    {nick:"111", email:"111@w.pl"},
    {nick:"222", email:"222@w.pl"},
    {nick:"333", email:"333@w.pl"}
 ]

 function removeFromArray(value) {
    for( let i = 0; i < users.length; i++){ 
        console.log(value, users[i]);
        if(users[i] != undefined) {
            if(typeof value == "object") {
                for(let j = 0; j < value.length; j++) {
                    if(users[i]!= undefined) {
                    if ( users[i].email === value[j]) { 
                        users.splice(i, 1);
                        i--; 
                    }
                }
                }
            }
            else if ( users[i].email === value){
                users.splice(i, 1);
                i--; 
            }
        }
    }
 }

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/static/addUser.html"))   
 })

 app.get("/handleForm", function(req, res){
     for(let user of users)
     {
         if(user.email == req.query.email) {
            res.send("Taki mail jest już w bazie.");
            return;
         }
     }
     users.push({"nick":req.query.nick, "email": req.query.email});
    res.send(users);

})

app.get("/removeUserBySelect", function(req, res){
    let string = "<form method='get' action='getData'>"
    string += "<select name='user'>";
    for(let user of users) {
        string += `<option value="${user.email}">${user.email}</option>`;
    }
    string += "</select>";
    string += `<input type="submit" value="Usuń">`;
    string += '</form>';
    res.send(string);
})

app.get("/removeUserByRadio", function(req, res){
    let string = "<form method='get' action='getData'>"
    for(let user of users) {
        string += `<input type="radio" value="${user.email}" name="user">`;
        string += `<label for="${user.email}">${user.email}</label><br>`;
    }
    string += `<br><input type="submit" value="Usuń">`;
    string += '</form>';
    res.send(string);
 })

app.get("/removeUserByCheckbox", function(req, res){
    let string = "<form method='get' action='getData'>"
    for(let user of users) {
        string += `<input type="checkbox" value="${user.email}" name='user'>`;
        string += `<label for="${user.email}">${user.email}</label><br>`;
    }
    string += `<br><input type="submit" value="Usuń">`;
    string += '</form>';
    res.send(string);

})

app.get("/getData", function(req, res){
    removeFromArray(req.query.user);
    res.send(users);
 })

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})