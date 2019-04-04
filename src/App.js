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
        // Update the State to refresh the UI
        this.setState({ quotes: res.quotes });
      })
      .catch(err => {
        console.error(err)
      });
  }

  // Fetches our GET route from the Express server
  getQuotes = async () => {
    const response = await fetch('/quotes');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  // POSTs data to our endpoint
  postNewQuote = async (quotePayload) => {
    const response = await fetch('/addQuotes', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quotePayload),
    });

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
      this.setState({ quotes: res.quotes });
    });
  }


  render() {
    const { quotes } = this.state;

    const quotesList = quotes.map(({quote, author}, i) => {
        return (
          <div class="Full-Container">
            <div key={ `quote-${(quote || '').replace(' ', '-')}` } class="Quote-Container">
              <p>
                {quote}
              </p>
              <div class="arrow bottom right"></div>
            </div>
            <div class="Author-Container">
              <strong>{author}</strong>
            </div>
          </div>
        );
      });



    return (
      <div className="App">
        <header className="App-header">
          <h1> Honey Hacks Athena Demo </h1>
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
