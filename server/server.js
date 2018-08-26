var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fetch = require('node-fetch');
var isEmpty = require('lodash').isEmpty;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', function(request, response) {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      return response.json({ data });
    })
    .catch(function() {
      return response.sendStatus(500);
    });
});

app.get('/posts/:postID', function(request, response) {
  const params = request.params;

  if (!isEmpty(params) && params.postID) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${params.postID}`)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        return response.json({ data });
      })
      .catch(function() {
        return response.sendStatus(500);
      });
  }

  return response.sendStatus(400);
});

app.get('/posts/:postID/comments', function(request, response) {
  const params = request.params;

  if (!isEmpty(params) && params.postID) {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.postID}/comments`,
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        return response.json({ data });
      })
      .catch(function() {
        return response.sendStatus(500);
      });
  }

  return response.sendStatus(400);
});

app.listen(3005, function() {
  console.log('We are up at port 3005');
});
