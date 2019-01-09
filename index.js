"use strict";
const server = require("./dist/server/server");
const debug = require("debug")("express:server");
const http = require("http");

// generate server
const httpPort = 8080;
const app = server.Server.bootstrap().app; 
// server.Server.bootstrap().app 이 express(); 와 같은 역할과 app.use에 대한 미들웨어 설정을 class릁 통해서 설정된 결과를 받아오도록 할 것임.
app.set("port", httpPort);
const httpServer = http.createServer(app);
httpServer.listen(httpPort);

// error handler function
const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof httpPort === "string" ? `Pipe ${httpPort}` : `Port ${httpPort}`;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevate privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// error event binding
httpServer.on("error", onError);

// listening handler function
const onListening = () => {
    const addr = httpServer.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.info("Listening on " + bind);
}
// listening event binding
httpServer.on("listening", onListening);
