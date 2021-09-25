const express = require('express');
let axios = require('axios');
var app = express();
const ExpressError = require("./expressError");
const { request } = require('express');

//Send request to get developer object, which contains array of developer names.
//Send requests to each name to get developer object.

async function getDevs() {
  let response = await axios.get(`https://api.github.com/users`);
  let developers = response.data;
  

  
  
  let results = developers.map(function(d) {let dev = d.login; return dev})
  
  return results
}




app.post('/',  async function(req, res, next) {
  try {
    
    let results = await getDevs();
    
    let resultsArr = results.map(function(devs) {
    return axios.get(`https://api.github.com/users/${devs}`)} )

    console.log(resultsArr)


    
    

    let out = await Promise.all(resultsArr)
    
    let data = out.map(d => ({ name: d.data.name, bio: d.data.bio }));
    
    console.log(data)
    return res.json(data)
  } catch {
    next(err);
  }
});


// 404 handler
app.use(function(req, res) {
  return new ExpressError("Not Found", 404);
});


app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
})

app.listen(3000, function() {console.log("Server Is Running")});
