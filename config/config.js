import path from 'path';

export const PORT = 3000;
export const API_URL = "https://jsonplaceholder.typicode.com/users";

export const FILE_PATH = path.join(process.cwd(),'..', 'data', 'users.json');


console.log(FILE_PATH);