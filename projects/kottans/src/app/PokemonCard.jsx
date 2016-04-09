var React = require('react');

var PokemonCard = React.createClass({

  handleClick: function() {
    this.props.selection(this.props.data);
  },

  render: function() {
    var imgUrl = `http://pokeapi.co/media/img/${this.props.data.national_id}.png`;
    return (
      <div className="col s6 m6 l4">
        <div className="card hoverable" onClick={this.handleClick}>
          <div className="card-image">
            <img src={imgUrl} />
          </div>
          <div className="card-content">
            <p>{this.props.data.name}</p>
            <p>{this.props.data.types.map(function(type){
              var typeClass = `type ${type.name}`;
              return <span className={typeClass} key={type.resource_uri}>{type.name}</span>
            })}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PokemonCard;