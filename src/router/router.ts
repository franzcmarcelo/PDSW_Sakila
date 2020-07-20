import { Router, Request, Response } from 'express'
import MySQL from '../mysql/mysql';
import { handleCountries, handleCustomerOfCountry } from '..';

const router = Router();

// http://localhost:3000/countries
router.get('/countries', (req: Request, res: Response) => {

    const query = `
    SELECT
    C.country_id, C.country
    FROM country C
    `;

    MySQL.ejecutarQuery(query, (err:any, countries:Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                Countries: countries
            });
            handleCountries(countries)
        }
    })
})

// http://localhost:3000/country/74
router.get('/country/:id', (req: Request, res: Response) => {
    const country_id = req.params.id;
    const escapeId = MySQL.instance.cnn.escape(country_id)

    const query = `
    SELECT
    CU.first_name, CU.last_name,
    A.address,
    CI.city,
    CO.country_id
    FROM customer CU
    INNER JOIN address A
    ON CU.address_id = A.address_id
    INNER JOIN city CI
    ON A.city_id = CI.city_id
    INNER JOIN country CO
    ON CI.country_id = CO.country_id
    WHERE CO.country_id = ${escapeId}
    `;

    MySQL.ejecutarQuery(query, (err:any, info:Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                Country: info,
            });
            handleCustomerOfCountry(info)
        }
    })
})

export default router;