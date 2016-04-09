var React = require('react');

var FilterBar = require('./FilterBar.jsx');

var Header = React.createClass({

  render: function() {
    return (
      <div className="navbar-fixed">
          <nav className="row">
            <FilterBar handleChange={this.props.handleChange} />
            <span className="logo">Pokedex</span>
          </nav>
      </div>
    );
  }
});

module.exports = Header;