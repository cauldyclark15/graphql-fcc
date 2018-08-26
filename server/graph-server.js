var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fetch = require('node-fetch');
var { ApolloServer, gql } = require('apollo-server-express');

var app = express();

app.use(cors());
app.use(bodyParser.json());

var typeDefs = gql`
  type Query {
    posts: [Post]
  }

  type Post {
    userID: ID
    id: ID
    title: String
    body: String
    comments: [Comment]
  }

  type Comment {
    postID: ID
    id: ID
    name: String
    email: String
    body: String
  }
`;

var resolvers = {
  Query: {
    posts: () => {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          return data;
        });
    },
  },

  Post: {
    comments: post => {
      return fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
      )
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          return data;
        });
    },
  },
};

var server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(3010, function() {
  console.log(
    `GraphQL server is up at http://localhost:3010${server.graphqlPath}`,
  );
});
