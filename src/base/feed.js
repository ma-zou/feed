var SocialFeed = function(selector, params) {
    var instance = {},
        apiRequest = new XMLHttpRequest(),
        requestUrl = this.requestUrl,
        currentUrl = '',
        _self = this;

    this.defaults = {
        count: 5,
        loadMax: 5,
        template: this.template,
        requestSuccess: function(){},
        onComplete: function(){},
        onCompleteAll: function(){},
        onLoadMoreComplete: function(){}
    };

    this.loadCount = 0;
    this.counter = 0;    
    this.container = (typeof selector == "string") ? document.querySelectorAll(selector) : selector;
    
    if(typeof this.container == "object" && this.container.length > 1) {
        console.error('There is more than one Element matching the Selector "' + selector + '"');
        return false;
    } else if (this.container.length != "undefined" && !J.isNodeElement(this.container)) {
        this.container = this.container[0];
    }

    this.params = J.merge(this.defaults, params);
    
    this.apiRequestLoaded = function() {
        if(this.status === 200) {
            _self.response = JSON.parse(this.response);
            _self.params.requestSuccess(_self);
            _self.container.innerHTML += _self.createMarkup();
            _self.loadCount++;
        } else {
            console.error('Request Failed:' , this.responseText);
        }
    }
    this.callRequest = function(url, maxId) {
        apiRequest.addEventListener('load', this.apiRequestLoaded);
        currentUrl = (typeof maxId !== "undefined") ? this.buildRequestUrl(url, maxId) : this.buildRequestUrl(url);
        apiRequest.open('GET', currentUrl);
        apiRequest.send();
    }
    this.init = function() {
        _self.callRequest(requestUrl);
        return this;
    }
    this.loadMore = function() {
        var maxId = _self.getMaxId();
        if(_self.loadCount < _self.params.loadMax) _self.callRequest(requestUrl, maxId);
    }
}

