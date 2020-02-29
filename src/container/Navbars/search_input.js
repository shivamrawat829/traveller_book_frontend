import React, { Component} from 'react';
import Autosuggest from 'react-autosuggest';
import './search_input.css';

var places = [
    // {
    //   name: 'Delhi',
    // },    
  ];
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return places.filter(places => regex.test(places.place));
  }
  
  function getSuggestionValue(suggestion) {
    return suggestion.place;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.place}</span>
    );
  }


  
  class Search extends Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: []
      };    
    }
  
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

    componentDidMount() {
                    console.log('this is cmd')
                    fetch('http://127.0.0.1:8000/api/places/', {
                    method: 'GET',
                    headers: {
                                // 'Content-Type': 'application/json',
                            },
                    // body: get_data[]
                    })
                    .then( data => data.json())
                    .then(
                    data => {
                        console.log('dataaaaaa2222222',data)
                        // this.state.re_data = data
                        places = data
                    }
                    )
                }
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Search",
        className:"form-control",
        value,
        onChange: this.onChange
      };
  
      return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      );
    }
  }
  
  export default Search;
  