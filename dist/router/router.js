"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const __1 = require("..");
const router = express_1.Router();
// http://localhost:3000/countries
router.get('/countries', (req, res) => {
    const query = `
    SELECT
    C.country_id, C.country
    FROM country C
    `;
    mysql_1.default.ejecutarQuery(query, (err, countries) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                Countries: countries
            });
            __1.handleCountries(countries);
        }
    });
});
// http://localhost:3000/country/74
router.get('/country/:id', (req, res) => {
    const country_id = req.params.id;
    const escapeId = mysql_1.default.instance.cnn.escape(country_id);
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
    mysql_1.default.ejecutarQuery(query, (err, info) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                Country: info,
            });
            __1.handleCustomerOfCountry(info);
        }
    });
});
exports.default = router;
