var request = require('request');
var cheerio = require('cheerio');
var tidy = require('htmltidy').tidy;

var getMenu = function(cb) {
    request('http://dagskammtur.is/matsedill.htm', function(error, res, body) {
        tidy(body, function(err, html) {
            var $ = cheerio.load(html);
            $('p font font').slice(0, 5).each(function(i, e) {
              var day = $(e).find('b').html();
              var food = $(e).html().split('<br>\n').slice(1);
              cb({weekday : day, menu_items : food});
            });
        });
    });
};

module.exports = getMenu;
