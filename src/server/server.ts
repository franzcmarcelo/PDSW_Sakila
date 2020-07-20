import express from 'express';
import path from 'path';

export default class Server{
    public app: express.Application;
    public port: number;

    constructor(puerto: number){
        this.port = puerto;
        this.app = express();
    }

    // Instancia unica para inicializar el servidor en un puerto x
    static init(puerto: number){
        return new Server(puerto);
    }

    private publicFolder(){
        const publicPath = path.resolve(__dirname, '../public')
        this.app.use(express.static(publicPath))
    }

    // listen
    start(callback: Function){
        this.app.listen(this.port, callback());
        this.publicFolder();
    }
}