const pool = require('../DB_CONFIG/DB');


module.exports.add = (req,res) => {
    try {
        let {username , password} = req.body;
        let sql = `insert into admin(username , password) values (? , ?)`;
        let parameters = [username , password];

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

module.exports.fethAllDeservers = (req,res) => {
    try {
        let type = req.query.type;
        let sql = ''
        if (type && type == 1) {
         sql = `select * from deservers where accept_status = 1`;
        }else {
         sql = `select * from deservers where accept_status = 0`;
        }

        pool.query(sql , (err , result  ,fields) => {
                if (err) throw err;
               res.send({
                   status : `success` ,
                   deservers : result
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

module.exports.addEmployee = (req,res) => {
    try {

        let {id} = req.params;
        let {username , password , address , phoneNumber} = req.body;
        let sqlCheck = `select * from admin where id =${id}`;

        pool.query(sqlCheck , (err , result , fields) => {
            if (err) throw err;
            if (result.length > 0 ) {
                let sql = `insert into employees(username , password , phoneNumber , address) values (? , ? , ? , ?)`;
                let parameters = [username , password , phoneNumber , address];

                pool.query(sql , parameters , (err , result  ,fields) => {
                    if (err) throw err;
                    res.send({
                        status : `success` ,
                        successMessage : result
                    });
                });
            }else {
                res.status(400).send({
                    status : `error` ,
                    errorMessage : `UnAuthorized access`
                })
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

module.exports.acceptDeclineDeserver = (req , res ) => {
    try {
        let {id} = req.params
       let {deserverStatus} = req.body;

       let sql = `update deservers set accept_status = ? where id = ${id}`;
       let parameters = [deserverStatus];
       pool.query(sql ,parameters , (err , result , fields) => {
            if (err) throw err;
            if (deserverStatus == 0) {
                res.send({
                    status : 'success' ,
                    successMessage : `deserver declinde successfully`
                });
            }else {
                res.send({
                    status : 'success' ,
                    successMessage : `deserver accepted successfully`
                });
            }
       });
    }catch (err) {
        console.log(err);
        res.send({
            status : `error` ,
            errorMessage : `انت غير مستحق`
        });
    }
}