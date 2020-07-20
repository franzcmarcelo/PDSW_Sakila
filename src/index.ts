import Server from './server/server'
import router from './router/router';
import MySQL from './mysql/mysql';

const server = Server.init(3000)
server.app.use(router)
MySQL.instance;
server.start(()=>{
    console.log('servidor corriendo en el puerto 3000');
})

let $container = document.querySelector('#example') as HTMLDivElement
let $item = document.createElement('h3') as HTMLHeadingElement
$item.textContent=`RAAAA`
$container.appendChild($item)

export function handleCountries(countries: Object[]) {
    console.log('HANDLE COUNTRIES');
    const trans_countries = JSON.parse(JSON.stringify(countries))
    // let $container = document.querySelector('#example') as HTMLDivElement
    for (const country of trans_countries) {
        // let $item = document.createElement('h3') as HTMLHeadingElement
        // $item.textContent=`${country.country}`
        // $container.appendChild($item)
        console.log(`ID -> ${country.country_id}`);
        console.log(`NAME -> ${country.country}`);
    }
}
export function handleCustomerOfCountry(info: Object[]) {
    console.log('HANDLE CUSTOMERS OF COUNTRY');
    const t_info = JSON.parse(JSON.stringify(info))
    for (const customer of t_info) {
        console.log(`FIRST_NAME -> ${customer.first_name}`);
        console.log(`LAST_NAME -> ${customer.last_name}`);
        console.log(`ADDRESS -> ${customer.address}`);
        console.log(`CITY -> ${customer.city}`);
        console.log(`COUNTRY_ID -> ${customer.country_id}`);
    }
}
