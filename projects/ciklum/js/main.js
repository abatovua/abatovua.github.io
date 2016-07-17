if (Element && !Element.prototype.matches) {
  var proto = Element.prototype;
  proto.matches = proto.matchesSelector ||
    proto.mozMatchesSelector || proto.msMatchesSelector ||
    proto.oMatchesSelector || proto.webkitMatchesSelector;
}

var Navigation = (function() {

  var nav = {
    mainNavigation: document.getElementsByClassName('main-navigation')[0],
    mainNavigationDropdowns: document.getElementsByClassName('main-navigation-dropdown'),
    activeTab: null,
    activeTabDropdownContent: null,
    activeTabHeightCompensator: null,
    activeInnerTab: null,
    handleHighLevelTabs: function() {
      
      this.mainNavigation.addEventListener('click', function(e) {
        var isDropdown;
        var target = e.target;
        if(target.matches('.navigation-link')) {
          isDropdown = target.parentElement.matches('.main-navigation-dropdown');                 
          
          if (isDropdown) {
            if(this.activeTab) {
              if(e.target === this.activeTab) {
                this.activeTab.classList.remove('active');
                this.activeTab = null;
              } else {
                this.activeTab.classList.remove('active');
                this.activeTab = e.target;
                this.activeTab.classList.add('active');
              }
            } else {
                this.activeTab = target;
                this.activeTab.classList.add('active');
            }
          }
        }
      }.bind(this));
    },
    handleInnerLevelTabs: function() {
      var self = this;
      function handleMouseOver(e) {
        var isContainable = e.target.matches('.tab-capture.containable');
        var currentTab;
        var activeTabDropdownContentHeight;
        var currentInnerContent;
        var currentInnerContentHeight;
        
        if(isContainable) {
          currentTab = e.target;
          this.activeTabDropdownContent = currentTab.offsetParent;

          if(this.activeTabHeightCompensator) {
            this.activeTabHeightCompensator.style.height = 'auto';
            this.activeTabHeightCompensator = null;
          }

          
          this.activeTabHeightCompensator = this.activeTabDropdownContent.getElementsByClassName('height-compensator')[0];
          currentInnerContent = currentTab.nextElementSibling;

          if(this.activeInnerTab) {
            this.activeInnerTab.classList.remove('active');
          }
          
          this.activeInnerTab = e.target;
          this.activeInnerTab.classList.add('active');

          currentInnerContentHeight = currentInnerContent.scrollHeight;
          activeTabDropdownContentHeight = this.activeTabDropdownContent.clientHeight;

          if( currentInnerContentHeight > activeTabDropdownContentHeight ) {
            var diff = currentInnerContentHeight - activeTabDropdownContentHeight;
            this.activeTabHeightCompensator.style.height = diff + 'px';
          } else {
            this.activeTabHeightCompensator.style.height = 'auto';
          }

        } else if(this.activeTabHeightCompensator && e.target.matches('.tab-capture') && !e.target.matches('.containable')) {

          this.activeTabHeightCompensator.style.height = 'auto';
          this.activeTabHeightCompensator = null;

        } else {
          if( this.activeInnerTab && e.target.matches('.tab-capture') ) {
            this.activeInnerTab.classList.remove('active');
            this.activeInnerTab = null;
          } 
        }
      }

      [].forEach.call(this.mainNavigationDropdowns, function(elem, index, array) {
        elem.addEventListener('mouseover', handleMouseOver.bind(self));
      });
    },
    handleDropdownClose: function() {
      document.addEventListener('click', function(e) {
        var path;
        //ie and ff
        function makePath(e) {
          var path = [];
          var node = e.target;
          while(node != document.body) {
             path.push(node);
             node = node.parentNode;
          }

          return path;
        }

        e.path ? path = e.path : path = makePath(e);
         

        path = path.map(function(item) {
          if(item.className) return item.className;
        });

        if(path.indexOf('main-navigation-dropdown') < 0 && path.indexOf('high-level-toogle') < 0) {
          
          if(this.activeTab) {
            this.activeTab.classList.remove('active');
            this.activeTab = null;
          }
        }
      }.bind(this));
    }
  };

  nav.handleHighLevelTabs();
  nav.handleInnerLevelTabs();
  nav.handleDropdownClose(); 
})();