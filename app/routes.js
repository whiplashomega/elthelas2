/* globals appRoot */
var express = require('express');

const sitemapurls = [
    { url: '/',  changefreq: 'monthly', priority: 1 },
    { url: '/history',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/geo',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/options/domains',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/options/races',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/options/races/aasimar',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/bugbears',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/childofmolton',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/dragonborn',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/dwarves',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/elves',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/faelin',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/feyri',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/genasi',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/gnomes',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/goblins',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/goliaths',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/halfdwarves',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/halfelves',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/halflings',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/hobgoblins',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/humans',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/kobolds',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/lizardfolk',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/orcs',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/sorceronblooded',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/tieflings',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/races/trollkin',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/options/languages',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/ref/gods',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/ref/gods/alohim',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/amathera',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/arengesus',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/bahamut',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/cora',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/dorman',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/dorun',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/fanome',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/gaian',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/malik',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/maris',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/matraktha',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/molton',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/nera',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/sara',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/sylvan',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/tiamat',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/tock',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/trimala',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/trolka',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/gods/zhuul',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/ref/orgs/allianceof6nations',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/amatherasshield',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/artificersofmechanus',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/blackguardsofmatraktha',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/blacksun',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/blackwolfirregulars',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/championsofcora',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/dormanianimperialguard',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/dragoncult',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/guildofheroes',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/illustriousguildofmerchantsandfineartisans',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/internationalgrangemastersalliance',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/keepersofthegrove',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/lordsoftherisingdawn',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/makersoflegend',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/mastersofthedeepsong',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/morrindbrewersclub',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/orderofthecleansingfire',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/shepherdsoftheallmother',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/silverdragonknights',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/stormlordsoftrimala',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/sylvansrangers',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/trollkinmercenarycorps',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/orgs/voidbringers',  changefreq: 'weekly',  priority: 0.5 },
    { url: '/ref/calendar',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/ref/cosmology',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/ref/astronomy',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/ref/divines',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/ref/quick',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/ref/class',  changefreq: 'weekly',  priority: 0.7 },
    { url: '/about',  changefreq: 'weekly',  priority: 0.7 },
];

module.exports = function(app, staticDir, server) {

    //user function routes
    var users = require('./users');
    var characters = require('./characters');
    var charactersv2 = require('./charactersv2');
    var npcs = require('./npcs');
    var encounters = require('./encounters');
    var strongholds = require('./strongholds');
    var campaigns = require('./campaigns');
    var creatures = require('./creatures');

    app.use('/users', users);
    app.use('/characters', characters);
    app.use('/charactersv2', charactersv2);
    app.use('/npcs', npcs);
    app.use('/encounters', encounters);
    app.use('/strongholds', strongholds);
    app.use('/campaigns', campaigns);
    app.use('/creatures', creatures);

    app.use(express.static(appRoot, { maxAge: 365 }));

    //generate the sitemap on request
    app.get('/sitemap.xml', function(req, res) {
        var sm = require('sitemap');
        var sitemap = sm.createSitemap ({
          hostname: 'https://elthelas.com',
          cacheTime: 600000,        // 600 sec - cache purge period
        urls: sitemapurls
        });
        sitemap.toXML( function (err, xml) {
            if (err) {
                return res.status(500).end();
            }
            res.header('Content-Type', 'application/xml');
            res.send( xml );
        });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(appRoot+'/index.html'); // load our public/index.html file
    });
};
