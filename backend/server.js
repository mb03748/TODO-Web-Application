const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var cors = require('cors')


app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


let items = [
  {
    username: "abc@abc.com",
    data: [{name: "Do homework",done: true},  {name: "Call Bank", done: false}]
  }
  ]; 

let deleteItem = [
    {
      username: "abc@abc.com",
      data: [{name: "Pay Fees", done: false}]
    }
  ];


let users = [
    {
      username: "abc@abc.com",
      password: "123456abc",
      online: false
    }
  ]; 



app.get('/get-users/:tem', (req, res) => {
    let temp = req.params.tem;
    var i;
    var val;
    for (i = 0; i < items.length; i++)
    {
      if (items[i].username == temp)
      {
        val = i;
      }
    }
    res.send(items[val].data);
  })

app.get('/get-accounts/:u/:p', (req, res) => {
    let uname = req.params.u;
    let pass = req.params.p;
    let out = false;
    for (let i = 0; i < users.length; i++)
    {
      if (users[i].username == uname)
      {
        if (users[i].password == pass)
        {
          out = true;
        }
      }
    }
    res.send({out});
  })

app.get('/get-history/:tem', (req, res) => {
    let temp = req.params.tem;
    var i;
    var val;
    for (i = 0; i < deleteItem.length; i++)
    {
      if (deleteItem[i].username == temp)
      {
        val = i;
      }
    }
    res.send(deleteItem[val].data);
  })

app.get('/get-online/:tem', (req, res) => {
   let i;
   let temp = req.params.tem;
   let num;
   for (i = 0; i < users.length; i++)
   {
      if (users[i].username == temp)
      {
        num = i;
      } 
   }
    res.send(users[num].online);
  })


app.post('/post-user/:tem', (req, res) => {
    let data = req.body;
    let temp = req.params.tem;
    let i;
    let val;
    for (i = 0; i < items.length; i++)
    {
      if (items[i].username == temp)
      {
        val = i;
      }
    }
    console.log('req data',data);
    items[val].data.push(data);
    res.send({message:'success'});
})

app.put('/put-online', (req, res) => {
    let data = req.body.user;
    let i;
    let temp;
    for (i = 0; i < items.length; i++)
    {
      if (items[i].username == data)
      {
        temp = i;
      }
    }
    users[temp].online = true;
    res.send({message:'success'});
})

app.put('/put-offline', (req, res) => {
  let i;
  let val;
  let temp = req.body.user;
  for (i = 0; i < items.length; i++)
  {
    if (items[i].username == temp)
    {
      val = i;
    }
  }
  users[val].online = false;
  res.send({message:'success'});
})

app.post('/post-new', (req, res) => {
    let info = req.body.username;
    let usr = req.body;
    let temp = {username: info, data: []};
    let temp2 = {username: info, data: []};
    items.push(temp);
    deleteItem.push(temp2);
    users.push(usr);
  res.send({message:'success'});
})

app.put('/put-change', (req, res) => {
    let uname = req.body.username;
    let oldPass = req.body.password;
    let newPass = req.body.password2;
    let out = 1;
    for (var i = 0; i < users.length; i++)
    {
      if (users[i].username == uname)
      {
        out = 2;
        if (users[i].password == oldPass)
        {
          users[i].password = newPass;
          out = 3;
        }
      }
    }

    res.send({out});
})


app.put('/put-complete', (req, res) => {
    let id = req.body.id;
    let nam = req.body.user;
    let val;
    for (let i = 0; i < items.length; i++)
    {
      if (items[i].username == nam)
      {
        val = i;
      }
    }
    let temp = items[val].data[id].done;
    items[val].data[id].done = !temp;
    res.send({message:'success'});
})

app.delete('/delete-task/:tem/:id', (req, res) => {
  let id = req.params.id;
  let temp = req.params.tem;
  let val;
  for (let i = 0; i < items.length; i++)
  {
    if (items[i].username == temp)
    {
      val = i;
    }
  }
  deleteItem[val].data.push(items[val].data[id]);
  items[val].data.splice(id, 1); 
  res.send({message:'success'});
})

app.delete('/delete-task2/:tem/:id', (req, res) => {
  let id = req.params.id;
  let temp = req.params.tem;
  let val;
  for (let i = 0; i < deleteItem.length; i++)
  {
    if (deleteItem[i].username == temp)
    {
      val = i;
    }
  }
  deleteItem[val].data.splice(id, 1); 
  res.send({message:'success'});
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })