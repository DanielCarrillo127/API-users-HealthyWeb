const app = require('./app');
require('./database');


async function init (){
    await app.listen(app.get('port'));
    console.log('[ Server on port',app.get('port'),']');
}
init();