const routers = require('./authController')

const routes = (app) => {
    app.use("/api", routers);
};

module.exports = routes;