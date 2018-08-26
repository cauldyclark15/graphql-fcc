import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import './App.css';

const GET_POSTS = gql`
  query {
    posts {
      userId
      id
      title
      body
      comments {
        id
        name
        body
        email
      }
    }
  }
`;

class App extends Component {
  state = {
    posts: [],
    loading: false,
  };

  // componentDidMount() {
  //   fetch('http://localhost:3005/posts')
  //     .then(res => res.json())
  //     .then(({ data }) => {
  //       data.forEach(post => {
  //         fetch(`http://localhost:3005/posts/${post.id}/comments`)
  //           .then(res => res.json())
  //           .then(commentData => {
  //             this.setState({
  //               posts: [
  //                 ...this.state.posts,
  //                 { ...post, comments: commentData.data },
  //               ],
  //             });
  //           });
  //       });
  //     })
  //     .catch(error => console.log({ error: error.message }));
  // }

  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <pre>
          <samp>
            <Query query={GET_POSTS}>
              {({ loading, error, data }) => {
                if (loading) return <h1>Loading...</h1>;
                if (error)
                  return <h1 style={{ color: 'red' }}>{error.message}</h1>;

                return isEmpty(data) ? (
                  <h1>No data found</h1>
                ) : (
                  JSON.stringify(data, null, 2)
                );
              }}
            </Query>
          </samp>
        </pre>
      </div>
    );
  }
}

export default App;
