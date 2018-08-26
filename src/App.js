import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import './App.css';

class App extends Component {
  state = {
    posts: [],
    loading: false,
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <pre>
          <samp>
            {isEmpty(posts) ? (
              <h1>No data found</h1>
            ) : (
              JSON.stringify(posts, null, 2)
            )}
          </samp>
        </pre>
      </div>
    );
  }
}

export default App;
