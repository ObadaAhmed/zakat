const pool = require('../DB_CONFIG/DB');


module.exports.checkIfRegistred = (req,res) => {
    try {
        let {national_number} =  req.params
        let sql = `select * from deservers where national_number = ${national_number}`;

        pool.query(sql , (err , result  ,fields) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    status : `success` ,
                    deservers : `you are registered ${result[0].username}`
                });
            }else {
                res.send({
                    status : `success` ,
                    deservers : `you not registered`
                });
            }
        });
    }catch (err) {
        console.log(err);
        res.send({
            status : `error` ,
            errorMessage : err
        });
    }
}
