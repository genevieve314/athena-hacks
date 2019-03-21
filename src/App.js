import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor() {
    super();

    this.state = {
      quotes: [
        'A true friend stabs you in the front -- Oscar Wilde',
        'Second quote -- second author',
      ],
    }

    this.addQuote = this.addQuote.bind(this);
  }


  addQuote() {
    const {quotes} = this.state;
    quotes.push(this.quoteInput.value);
    this.setState({ quotes });
  }
  render() {


    const { quotes } = this.state;


    const quotesList = quotes.map((quote, i) => {
        return (
          <div key={ `quote-${i}` }>
            <p>
              {quote}
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
          <input
            id="quoteInput"
            ref={ (c) => { this.quoteInput = c; }}
            type="text"
          />

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
