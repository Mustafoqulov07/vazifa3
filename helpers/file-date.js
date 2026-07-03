import fs from 'fs/promises';
import path from 'path';
import {FILE_PATH,API_URL } from '../config/config.js'

const fileName = path.join(process.cwd(), '../data/users.json')

export async function getUsers() {
    const dirPath = path.dirname(FILE_PATH);
    try {
        await fs.mkdir(dirPath, {recursive: true});
        await fs.access(FILE_PATH);

        console.log('fayl mavjud')
        return

    } catch {
        try {
            console.log('malumot yuklanmoqda...');
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Xatolik');

            const data = await response.json();

            await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
            console.log('malumotlar yozildi')
        } catch (err) {
            console.log('Xatolik', err.message);
        }
    }
}

getUsers()

export default getUsers