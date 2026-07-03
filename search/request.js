import fs  from 'fs/promises';
import { FILE_PATH } from '../config/config.js';

export async function search(req, res) {
    res.setHeader('Content-Type', 'application/json')

    const {method, url} = req;
    const [parsedPath, quaryString] = url.split('?');

    let users = [];

    try {
        const fileData = await fs.readFile(FILE_PATH, 'utf-8');
        users = JSON.parse(fileData)
    } catch (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({message: 'Xatolik file oqilmadi'}))
    }

    if (method === 'GET' && parsedPath === '/users') {
        if (quaryString) {
            const params = new URLSearchParams(quaryString);
            const limit = params.get('limit')
            if (limit) {
                const limitNum = parseInt(limit, 10);
                if (!isNaN(limitNum) && limitNum > 0) {
                    res.writeHead(200);
                    return res.end(JSON.stringify(users.slice(0, limitNum)))
                }
            }
        }

        res.writeHead(200);
        return res.end(JSON.stringify(users))
    }

    else if (method === 'GET' && parsedPath.startsWith('/users/')) {
        const idSegment = parsedPath.split('/');
        const rawId = idSegment[2];

        const userId = Number(rawId);
        if(isNaN(userId)) {
            res.writeHead(400)
            return res.end(JSON.stringify({
                message: 'id raqam bolishi kerak'
            }))

        }

        const user = users.find(u => u.id === userId)

        if(!user) {
            res.writeHead(404)
            return res.end(JSON.stringify({
                message: 'User topilmadi'
            }))
        }

        res.writeHead(200)
        return res.end(JSON.stringify(user))

    }
    else {
        res.writeHead(404);
        return res.end(JSON.stringify({
            message: 'Hech narsa topilmadi'
        }))
    }
}