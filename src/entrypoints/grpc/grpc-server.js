const grpc = require("grpc");

const { todoService } = require('./services/todo/todo-service')

const loadServices = (services, server, logger = console) => {
    try {
        const mapSchemaToRequest = [];
        services.forEach((svc) => {
            Object.keys(svc.handlers).forEach((key) => {
                if (!svc.schema[key]) {
                    logger.error(`Schema not found for handler: ${key} - Terminate app`);
                    process.kill(process.pid);
                    process.exit(1)
                }
                mapSchemaToRequest.push({
                    service: svc,
                    handlerName: key,
                    middleware: (call, callback, next) => {
                        call.schema = svc.schema[key];
                        next();
                    },
                });
            });
        });

        services.forEach((svc) => {
            Object.keys(svc.handlers).forEach((key) => {
                mapSchemaToRequest.push({
                    service: svc,
                    handlerName: key,
                    middleware: (call, callback, next) => {
                        call.logger = logger;
                        next();
                    },
                });
            });
        });

        services.forEach((service) => server.addService(service.service, service.handlers));
    } catch (error) {
        logger.error(`Error during loading services ${JSON.stringify(error.stack)}`);
    }
}

module.exports.GRPCServer = (logger = console, port) => {
    try {
        const server = new grpc.Server()
        loadServices([todoService], server, console)

        server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
        server.start();

        logger.info(`${"[GRPC SERVER]"} is listening on port ${port}`);
    } catch (error) {
        logger.error(`[GRPC SERVER] start error ${JSON.stringify(error.stack)}`);
        process.kill(process.pid);
        process.exit(1);
    }

}