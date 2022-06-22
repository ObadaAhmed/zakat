const pool = require('../DB_CONFIG/DB');


module.exports.add = (req,res) => {
    try {
        let {username , phoneNumber , address , note , status , national_number } = req.body;
        let sql = `insert into deservers(username , phoneNumber , address , note , status , national_number) values (? , ? , ? , ? ,? , ?)`;
        let parameters = [username , phoneNumber , address , note , status , national_number];

        pool.query(sql , parameters , (err , result  ,fields) => {
            if (err) throw err;
            res.send({
                status : `success` ,
                successMessage : result
            });
        });
    }catch (err) {
        console.log(err);
        res.send({
            status : `error` ,
            errorMessage : err
        });
    }
}