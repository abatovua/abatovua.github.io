var React = require('react');

var LoadButton = React.createClass({

  render: function() {
    var markup, classes;

    if(this.props.loading) {
      classes = 'btn-large load-button disabled';
      
      markup = (
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      );

    } else {
      classes = 'btn-large load-button';
      markup = 'Load More';
    }

    return (
      <div className="col s12 m8 l8">
          <a className={classes} onClick={this.props.handleClick}>{markup}</a>
      </div>
    );
  }
});

module.exports = LoadButton;