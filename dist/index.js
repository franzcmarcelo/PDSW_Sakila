"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCustomerOfCountry = exports.handleCountries = void 0;
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const mysql_1 = __importDefault(require("./mysql/mysql"));
const server = server_1.default.init(3000);
server.app.use(router_1.default);
mysql_1.default.instance;
server.start(() => {
    console.log('servidor corriendo en el puerto 3000');
});
function handleCountries(countries) {
    console.log('HANDLE COUNTRIES');
    const t_countries = JSON.parse(JSON.stringify(countries));
    for (const country of t_countries) {
        console.log(`ID -> ${country.country_id}`);
        console.log(`NAME -> ${country.country}`);
    }
}
exports.handleCountries = handleCountries;
function handleCustomerOfCountry(info) {
    console.log('HANDLE CUSTOMERS OF COUNTRY');
    const t_info = JSON.parse(JSON.stringify(info));
    for (const customer of t_info) {
        console.log(`FIRST_NAME -> ${customer.first_name}`);
        console.log(`LAST_NAME -> ${customer.last_name}`);
        console.log(`ADDRESS -> ${customer.address}`);
        console.log(`CITY -> ${customer.city}`);
        console.log(`COUNTRY_ID -> ${customer.country_id}`);
    }
}
exports.handleCustomerOfCountry = handleCustomerOfCountry;
// FIXME: Ejecutar
// tsc -w
// npm run build (html)
// nodemon dist/index (servidor)
