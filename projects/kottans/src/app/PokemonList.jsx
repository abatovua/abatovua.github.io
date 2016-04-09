var React = require('react');

var PokemonCard = require('./PokemonCard.jsx')

var PokemonList = React.createClass({

  render: function() {
    var self = this;
    var markup;
    var filteredList;

    if(this.props.filter === 'all') {
      filteredList = this.props.list;
    } else {
      filteredList = this.props.list.filter(function(listItem){
        var types = listItem.types.map(function(type){
            return type.name;
        });

        if(types.indexOf(self.props.filter) >= 0) {
            return listItem;
        }
      });
    }

    if(!filteredList.length) {
      
      markup = (
        <div className="col s12">
          <p>There are no matches in uploaded pokemons. Try to load more.</p>
        </div>
      );

    } else {
      markup = filteredList.map(function(pokemon) {
        return <PokemonCard data={pokemon} key={pokemon.national_id} selection={self.props.handleSelection} />
      });
    }

    return (
      <div className="col s12 m8">
        <div className="row">
          {markup}
        </div>
      </div>
    );
  }
});

module.exports = PokemonList;