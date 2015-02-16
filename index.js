var request = require('request');
var cheerio = require('cheerio');
var tidy = require('htmltidy').tidy;
var windows1252 = require('windows-1252');

var getMenu = function(cb) {
    request({url: 'http://dagskammtur.is/matsedill.htm', encoding: 'binary'}, function(error, res, body) {
        body = windows1252.decode(body);
        tidy(body, function(err, html) {
            var $ = cheerio.load(html);
            var data = [];
            $('p font font').slice(0, 5).each(function(i, e) {
              var day = $(e).find('b').html();
              var food = $(e).html().split('<br>\n').slice(1);
              data.push({weekday : day, menu_items : food});
            });
            cb(data);
        });
    });
};

module.exports = getMenu;
