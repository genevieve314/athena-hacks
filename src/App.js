import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor() {
    super();

    this.state = {
      quotes: [{}],
    }
    this.addQuote = this.addQuote.bind(this);
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.getQuotes()
      .then(res => {
        console.info('HNY -- res = ', res);
        this.setState({ quotes: res.quotes });
      })
      .catch(err => {
        console.info('HNY -- its an error');
        console.log(err)
      });
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  getQuotes = async () => {
    console.info('HNY -- Hiii!');
    const response = await fetch('/quotes');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  // POSTs data to our endpoint
  postNewQuote = async (quotePayload) => {
    console.info('HNY -- POST attemp 1 - ', quotePayload);
    const response = await fetch('/addQuotes', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quotePayload),
    });

    console.info('HNY -- response = ', response);
    const body = await response.json();


    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  addQuote() {
    const quote = this.quoteInput.value;
    const author = this.authorInput.value;
    const quotePayload = {
      quote,
      author,
    };

    this.postNewQuote(quotePayload)
    .then(res => {
      console.info('HNY -- Post Response');
      console.info('HNY -- res = ', res);
      this.setState({ quotes: res.quotes });
    });
  }


  render() {
    const { quotes } = this.state;

    const quotesList = quotes.map(({quote, author}, i) => {
        return (
          <div key={ `quote-${i}` }>
            <p>
              {quote} -- <strong>{author}</strong>
            </p>
          </div>
        );
      });



    return (
      <div className="App">
        <header className="App-header">
          <input
            id="quoteAdder"
            value="Add A Quote"
            type="button"
            onClick={ this.addQuote }
          />
          <div>
           <span>Quote:</span> <input id="quoteInput" ref={ (c) => { this.quoteInput = c; }} type="text"/>
          </div>
          <div>
           <span>Author:</span> <input id="authorInput" ref={ (c) => { this.authorInput = c; }} type="text"/>
          </div>

          {quotesList}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
