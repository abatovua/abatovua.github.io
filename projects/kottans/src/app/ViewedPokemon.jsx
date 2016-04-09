var React = require('react');

var ViewedPokemon = React.createClass({

  render: function() {
    var markup = '';

    if(this.props.data) {
      var imgUrl = 'http://pokeapi.co/media/img/' + this.props.data.national_id + '.png';
      var types = this.props.data.types.map(function(type){
        return type.name;
      });
      
      markup = (
        <div className="card viewed">
          <div className="card-image">
            <img src={imgUrl} />
          </div>
          <div className="card-content">
            <p>{this.props.data.name}</p>
            <table className="striped centered">
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>{types.join(', ')}</td>
                </tr>
                <tr>
                  <td>Attack</td>
                  <td>{this.props.data.attack}</td>
                </tr>
                <tr>
                  <td>Defense</td>
                  <td>{this.props.data.defense}</td>
                </tr>
                <tr>
                  <td>HP</td>
                  <td>{this.props.data.hp}</td>
                </tr>
                <tr>
                  <td>SP Attack</td>
                  <td>{this.props.data.sp_atk}</td>
                </tr>
                <tr>
                  <td>SP Defense</td>
                  <td>{this.props.data.sp_def}</td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td>{this.props.data.speed}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{this.props.data.weight}</td>
                </tr>
                <tr>
                  <td>Total moves</td>
                  <td>{this.props.data.moves.length + 1}</td>
                </tr>
              </tbody> 
            </table>
          </div>
        </div>
      );
    }

    if(this.props.mobile) {

      var mobileLayerClass = 'mobile-layer hide-on-med-and-up';

      if(this.props.show) {
        mobileLayerClass += ' active'
      }

      return (
       <div className={mobileLayerClass} onClick={this.props.toogleHandler}>
          <span className="close">X</span>
          {markup}
       </div>
      );

    } else {
      
      return (
        <div className="col m4 l4 hide-on-small-only">
          {markup}
        </div>
      );

    }
  }
});

module.exports = ViewedPokemon;