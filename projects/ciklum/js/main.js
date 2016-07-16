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
        activeInnerTab: null,
        handleHighLevelTabs: function() {
            
            this.mainNavigation.addEventListener('click', function(e) {
                var isDropdown = e.target.parentElement.matches('.main-navigation-dropdown');
                if (isDropdown) {
                  if(this.activeTab) {
                    this.activeTab.classList.remove('active');
                  }
                  this.activeTab = e.target;
                  this.activeTab.classList.add('active');
                }
            });
        },
        handleInnerLevelTabs: function() {
            function handleMouseOver(e) {
                var isTabCapture = e.target.matches('.tab-capture');
                if(isTabCapture) {
                    if(this.activeInnerTab) {
                        this.activeInnerTab.classList.remove('active');
                    }
                    
                    this.activeInnerTab = e.target;
                    this.activeInnerTab.classList.add('active');
                }
            }

            [].forEach.call(this.mainNavigationDropdowns, function(elem, index, array) {
                elem.addEventListener('mouseover', handleMouseOver);
            });
        }
    };

    nav.handleHighLevelTabs();
    nav.handleInnerLevelTabs();  
})();