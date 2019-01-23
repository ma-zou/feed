/**
 * @name Feed.Instagram
 * @author Malte Zoudlik ma.z0u
 * @version 1.0.0
 * @copyright (c) 2019
 */
SocialFeed.prototype.buildRequestUrl = function (url, maxId) {
    if (typeof this.params.token === "undefined") {
        console.error('Please define an Access Token. (Generate Access Token here -> http://instagram.pixelunion.net/)');
        return false;
    } else {
        url = url + this.params.token;
        url = (this.params.count) ? url + '&count=' + this.params.count : url;
        url = (typeof maxId !== "undefined") ? url + '&max_id=' + maxId : url;
        
        return url;
    }
}
SocialFeed.prototype.createMarkup = function () {
    var markup = '',
        regExp = /[^{\}]+(?=})/g,
        _self = this,
        replaceArray = _self.template.match(regExp);

    _self.response.data.forEach(function(current) {
        var temp = _self.template;
        current.content = (current.type === "image") ? '<img src="' + current.images.standard_resolution.url + '" alt="Instagram - ' + current.user.full_name + '">' : '<video src="' + current.videos.standard_resolution.url + '"></video>';
        current.count = _self.counter;

        replaceArray.forEach(function(value) {
            temp = temp.replace('{'+value+'}', J.deep_value(current, value));
        });

        markup += temp;
        _self.params.onComplete(_self);
        _self.counter++;
    });

    _self.params.onCompleteAll(_self)
    if(_self.loadCount > 0) _self.params.onLoadMoreComplete(_self);
    return markup
}
SocialFeed.prototype.getMaxId = function () {
    return this.response.pagination.next_max_id;
}
SocialFeed.prototype.requestUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';
SocialFeed.prototype.template = [
    '<div class="feed feed-{count}">',
    '<div class="feedHeader">',
    '<address>',
    '<img src="{user.profile_picture}" alt="Instagram - {user.full_name}">',
    '<span>',
    '{user.full_name}',
    '<small>{user.username}</small>',
    '</span>',
    '</address>',
    '</div>',
    '<div class="feedContent">',
    '<a href="{link}" title="Instagram - {user.full_name}">',
    '<figure data-type="{type}">',
    '{content}',
    '<figcaption>',
    '{caption.text}',
    '</figcaption>',
    '</figure>',
    '</a>',
    '</div>',
    '<div class="feedFooter">',
    '<dl>',
    '<dt>Comments:</dt>',
    '<dd>{comments.count}</dd>',
    '<dt>Likes:</dt>',
    '<dd>{likes.count}</dd>',
    '</dl>',
    '</div>',
	'</div>',
].join("\n");