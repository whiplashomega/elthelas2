/* globals MONGODB_URI, process, module */

module.exports = {
    'secretKey': '12345-67890-09876-54321',
}
    module.exports.port = process.env.PORT || 3000; 
    
    if(module.exports.port == 3000 || module.exports.port == 8080) { //we are in a local environment, provision config variables accordingly
        module.exports.mongoUrl = 'mongodb://0.0.0.0:27017/elthelas';
        module.exports.facebook = {
            clientID: '1915523602044424',
            clientSecret: 'c5bd3fd394b3e67c7624da4aac935e06',
            callbackURL: 'https://elthelas2-whiplashomega.c9users.io/users/facebook/callback'
        };
        module.exports.staticDir = "/elthelasapp/www/dist";
        module.exports.port = 8081;
    } else {
        console.log(process.env.MONGODB_URI);
        module.exports.mongoUrl = process.env.MONGODB_URI;
        module.exports.facebook = {
            clientID: '1706715636300300',
            clientSecret: '409369a75ffe5ece6c1dbfa040ed8c6e',
            callbackURL: 'https://elthelas.com/users/facebook/callback'
        };
        module.exports.staticDir = '/elthelasapp/www/dist';
    }