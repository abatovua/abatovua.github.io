// include fetch polyfill for ajax calls
require('whatwg-fetch');

var React = require('react');
var ReactDOM = require('react-dom');

var Header = require('./Header.jsx');
var InitialLoadLayer = require('./InitialLoadLayer.jsx');
var PokemonList = require('./PokemonList.jsx');
var LoadButton = require('./LoadButton.jsx');
var ViewedPokemon = require('./ViewedPokemon.jsx');

var App = React.createClass({

  getInitialState: function() {
    return {
      list: [],
      viewed: null,
      filterBy: 'all',
      loading: false,
      isInitialLoadFinished: false,
      showMobile: false
    };
  },

  componentDidMount: function() {
    fetch('http://pokeapi.co/api/v1/pokemon/?limit=12').then(function(response){
      return response.json();
    }).then(function(data){
      this.setState({
        list: data.objects,
        meta: data.meta,
        isInitialLoadFinished: true
      });
    }.bind(this));
  },

  loadMore: function() {
    this.setState({loading: true});
    fetch('http://pokeapi.co' + this.state.meta.next).then(function(response){
      return response.json();
    }).then(function(data){
      var newData = this.state.list.concat(data.objects);
      this.setState({
        list: newData,
        meta: data.meta,
        loading: false
      });
    }.bind(this));
  },

  selectPokemon: function(p) {
    this.setState({
      viewed: p,
      showMobile: true
    });
  },

  setFilter: function(f) {
    this.setState({
        filterBy: f
    });
  },

  toogleMobileVisibility: function() {
    this.setState({
        showMobile: false
    });
  },

  render: function() {
        
    return (
      <div>
        <Header handleChange={this.setFilter} />
        <InitialLoadLayer loadFinished={this.state.isInitialLoadFinished} />
        <div className="container">
          <div className="row">
            <PokemonList list={this.state.list} handleSelection={this.selectPokemon} filter={this.state.filterBy} />
            <ViewedPokemon data={this.state.viewed} mobile={false} />
            <ViewedPokemon data={this.state.viewed} mobile={true} show={this.state.showMobile} toogleHandler={this.toogleMobileVisibility} />
          </div>
          <div className="row">
            <LoadButton handleClick={this.loadMore} loading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));