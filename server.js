import http from "http";
import { PORT } from "./config/config.js";
import { getUsers } from "./helpers/file-date.js";
import { search } from "./search/request.js";
import { error } from "console";

async function  startServer() {
    await getUsers()

    const server = http.createServer((req, res ) => {
        search(req, res).catch(err => {
            console.log('Xatolik',err)
            if(!res.writableEnded) {
                res.writeHead(500)
                res.end(JSON.stringify({
                    message: 'Server xatoligi'
                }))
            }
        })
    })
    server.listen(PORT, () => {
        console.log(`Server http://localhost:${PORT} manzilida ishlamoqda...`);
    })
}

startServer()

