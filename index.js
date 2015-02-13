var request = require('request');
var cheerio = require('cheerio');
var tidy = require('htmltidy').tidy;

var getMenu = function() {
    request('http://dagskammtur.is/matsedill.htm', function(error, res, body) {
        tidy(body, function(err, html) {
            var $ = cheerio.load(html);
            $('p font font').slice(0, 5).each(function(i, e) {
              var title = $(e).find('b').html();
              var food = $(e).html().split('<br>\n').slice(1);
              console.log(title);
              console.log(food);
              console.log('----');
            });
        });
    });
};

module.exports = getMenu;
