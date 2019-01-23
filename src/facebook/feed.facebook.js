/**
 * @name Feed.Facebook
 * @author Malte Zoudlik ma.z0u
 * @version 1.0.0
 * @copyright (c) 2019
 */
SocialFeed.prototype.buildRequestUrl = function (url, maxId) {
    if (typeof this.params.token === "undefined") {
        console.error('Please define an Access Token. (Instruction to generate Access Token can be found here -> https://stackoverflow.com/a/28418469/10616998)');
        return false;
    } else {
        url = url.join(this.params.pageID);
        url = (this.params.count) ? url + '&limit=' + this.params.count : url;
        url = url + '&access_token=' + this.params.token;
        url = (typeof maxId !== "undefined") ? url = maxId : url;
    
        return url;
    }
}
SocialFeed.prototype.createMarkup = function () {
    var markup = '',
        regExp = /[^{\}]+(?=})/g,
        _self = this,
        replaceArray = _self.template.match(regExp);
    
    console.log(_self.response);
    _self.response.data.forEach(function(current) {
        var temp = _self.template;
        current.content = (current.type === "photo") ? '<img src="' + current.full_picture + '" alt="Facebook - ' + current.from.name + '">' : '<video src="' + current.source + '"></video>';
        current.count = _self.counter;

        replaceArray.forEach(function(value) {
            temp = temp.replace('{'+value+'}', J.deep_value(current, value));
        });

        markup += temp;
        _self.params.onComplete(_self);
        _self.counter++;
    });

    _self.params.onCompleteAll(_self)
    this.requestUrl
    if(_self.loadCount > 0) _self.params.onLoadMoreComplete(_self);
    return markup
}
SocialFeed.prototype.getMaxId = function () {
    return this.response.paging.next;
}
SocialFeed.prototype.requestUrl = ['https://graph.facebook.com/v3.2/','/feed?fields=picture,caption,created_time,description,from,full_picture,link,name,place,type,id,permalink_url,source,via,attachments,likes.summary(true)'];
SocialFeed.prototype.template = [
    '<div class="feed feed-{count}">',
    '<div class="feedHeader">',
    '<address>',
    '<span>',
    '{from.name}',
    '</span>',
    '</address>',
    '</div>',
    '<div class="feedContent">',
    '<a href="{link}" title="Facebook - {from.name}">',
    '<figure data-type="{type}">',
    '{content}',
    '<figcaption>',
    '{description}',
    '</figcaption>',
    '</figure>',
    '</a>',
    '</div>',
    '<div class="feedFooter">',
    '<dl>',
    '</dl>',
    '</div>',
	'</div>',
].join("\n");