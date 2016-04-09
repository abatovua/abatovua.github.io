var React = require('react');

var FilterBar = React.createClass({

  changeFilter: function() {
    this.props.handleChange(this.refs.filterValue.value);
  },

  render: function() {
    return (
      <div className="input-field">
          <span>By type </span>
          <select defaultValue="all" className="browser-default" ref="filterValue" onChange={this.changeFilter} >
            <option value="all">All</option>
            <option value="fire">Fire</option>
            <option value="flying">Flying</option>
            <option value="water">Water</option>
            <option value="bug">Bug</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            <option value="electric">Electric</option>
            <option value="ground">Ground</option>
            <option value="fairy">Fairy</option>
            <option value="grass">Grass</option>
            <option value="fighting">Fighting</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="steel">Steel</option>
            <option value="ice">Ice</option>
            <option value="ghost">Ghost</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
          </select>
      </div>
    );
  }
});

module.exports = FilterBar;