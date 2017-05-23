    module.exports = {
        url : (function() {
            if(process.env.PORT == 8080) {
                return 'mongodb://localhost/stencil-dev';
            } else {
                return 'mongodb://whiplashomega:betagamma#2@ds149511.mlab.com:49511/heroku_5c4snn97';
            }
        })()
    }