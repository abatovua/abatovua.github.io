var React = require('react');

var InitialLoadLayer = React.createClass({

  render: function() {
    var initialLayerClass = 'initial-load-layer';
    
    if(this.props.loadFinished) {
      initialLayerClass += ' disact';
    }
    
    return (
      <div className={initialLayerClass}>
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
      </div>
    );
  }
});

module.exports = InitialLoadLayer;