import mysql from 'mysql';

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: 'password',
            database: 'sakila'
        });
        this.conectarDB();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function){
        this.instance.cnn.query(query, (err:any, results: Object[], fields:any)=>{
            if (err) {
                console.log('error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length===0) {
                callback('El regitro solicitado no existe')
            }else{
                callback(null, results);
            }
        });
    }

    private conectarDB(){
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('base de datos online');

        });
    }
}