import {createWebServer} from "./create-web-server.js";

const server = createWebServer();

const startServer = async () => {
    await server.start()
}

startServer();

