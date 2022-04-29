const express = require('express');
const router = express.Router();
const connection = require('../DBService.js');
const httpCodes = require('../constants/httpCodes');
const bcrypt = require('bcrypt');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const app = express();
const session = require('express-session');
var bodyParser = require('body-parser');
const multer = require('multer');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: '123456cat',
    resave: true,
    saveUninitialized: true
}));




/********************************************* Login ********************************************* */

router.post('/login', (request, response) => {


    var email = request.body.email;
    var password = request.body.password;


    if (email && password) {
        connection.query('SELECT * FROM user WHERE email = ? ', [email], function (error, results, fields) {

            if (results.length == 0) {

                return response.status(httpCodes.BAD_REQUEST).send("Email or password doesn't exist ");

            } else {
                if (results[0].verif == 1) {
                    const hashedPassword1 = results[0].mdp;
                    if (bcrypt.compareSync(password, hashedPassword1)) {

                        session.email = email;
                        session.idu = results[0].idu;
                        session.idc = results[0].idc;
                        session.loggedin = true;

                        return response.status(httpCodes.ACCEPTED).send("logined with success");

                    }
                    else {
                        return response.status(httpCodes.BAD_REQUEST).send("Email or password is uncorrect");
                    }
                }
                else { return response.status(httpCodes.BAD_REQUEST).send("user is not verified"); }

            }



        });
    }
    else {

        return response.status(httpCodes.BAD_REQUEST).send("remplir les champs ");
    }



});



/********************************************* Register ********************************************* */

router.post('/register', (request, response) => {


    const { name, email, tel } = request.body;
    var password1 = request.body.password1;
    var password2 = request.body.password2;

    var hashedPassword = bcrypt.hashSync(password1, 10);

    if (email && password1 && name && tel && password2) {
        if (password1.localeCompare(password2) == 0) {

            connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, result, fields) {
                //user dosen't exist
                if (result.length == 0) {



                    //create user
                    connection.query("INSERT INTO user(idu,nom,email,numTel,mdp ) VALUES (0,?,?,?,?);", [name, email, tel, hashedPassword], function (error, results, fields) {
                        //response.redirect('http://localhost:3000');
                        //response.status(httpCodes.ACCEPTED).send("registered with success");

                        idui = results.insertId;
                        console.log(error);




                        const token = crypto.randomBytes(16).toString('hex');
                        console.log(token);
                        //	Save the verification token
                        connection.query("INSERT INTO tokens(id_tu,token,idu ) VALUES (0,?,?);", [token, idui], function (err, results, fields) {
                            if (err) {
                                console.log(err);
                                return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
                            }

                        });



                        const transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            tls: {
                                rejectUnauthorized: false
                            },
                            port: 465,
                            secure: false,
                            auth: {
                                user: 'wadii.sdouga@etudiant-isi.utm.tn',
                                pass: 'wadiisdouga2000'
                            }
                        });
                        const mailOptions = {
                            from: "no-reply@MycarrerMobelite.com",
                            to: email,
                            subject: 'Account Verification Token',
                            text:
                                'Hello,\n\n' +
                                'Please verify your account by clicking the link: \nhttp://' +
                                request.headers.host +
                                '/confirmation/' +
                                token +
                                '.\n'
                        };
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) {
                                console.log(err);
                                return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
                            }
                            return response.status(httpCodes.CREATED).send('A verification email has been sent to ' + email + '.');
                        });

                    });
                }

                //user exist
                else {

                    return response.status(httpCodes.BAD_REQUEST).send("User already exist ");
                }
            });
        }
        else {

            return response.status(httpCodes.BAD_REQUEST).send("Mot de passe incompatible");

        }
    }
    else {

        return response.status(httpCodes.BAD_REQUEST).send("remplir les champs ");
    }


});



/***************************** token verification ****************** */
router.get('/confirmation/:token', async (req, res) => {
    // Find a matching token

    try {
        connection.query('SELECT * FROM tokens WHERE token = ? ', [req.params.token], function (error, results, fields) {

            if (results.length == 0)
                return res.status(httpCodes.BAD_REQUEST).send({
                    type: 'not-verified',
                    msg: 'We were unable to find a valid token. Your token my have expired.'
                });
            else {

                //	If we found a token, find a matching user

                connection.query('SELECT * FROM user  WHERE idu = ? ', [results[0].idu], function (error, result, fields) {



                    if (result.length == 0)
                        return res.status(httpCodes.BAD_REQUEST).send({ msg: 'We were unable to find a user for this token.' });

                    else {
                        // Verify and save the user
                        if (result[0].verif != 0)
                            return res
                                .status(httpCodes.BAD_REQUEST)
                                .send({ type: 'already-verified', msg: 'This user has already been verified.' });
                        else {

                            connection.query("UPDATE user SET verif = '1'  WHERE idu = ? ", [results[0].idu], function (error, result, fields) {

                                if (error) {
                                    console.log(error);

                                    return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
                                }
                                return res.redirect('http://localhost:3000/');
                                //status(httpCodes.OK).send('The account has been verified.Please log in.');


                            });

                        }



                    }
                });

            }
        });





    } catch (err) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
    }

});



/*************************** send Email for new password *******************************/

router.post('/resend', (request, response) => {



    var email = request.body.email;

    if (email) {
        connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, result, fields) {
            //user dosen't exist
            if (result.length == 0) {

                return response.status(httpCodes.INTERNAL_SERVER_ERROR).send("user dosen't exist");

            }

            //user exist
            else {
                const token = crypto.randomBytes(16).toString('hex');

                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    tls: {
                        rejectUnauthorized: false
                    },
                    port: 465,
                    secure: false,
                    auth: {
                        user: 'wadii.sdouga@etudiant-isi.utm.tn',
                        pass: 'wadiisdouga2000'
                    }
                });
                const mailOptions = {
                    from: 'no-reply@MycarrerMobelite.com',
                    to: email,
                    subject: 'Account New Password Token',
                    text:
                        'Hello,\n\n' +
                        'Please click on this link to update your password : \nhttp://' +
                        request.headers.host +
                        '/newpassword/' +
                        token +
                        '.\n'
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        console.log(err);
                        return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
                    }
                    return response.status(httpCodes.CREATED).send('A verification email has been sent to ' + email + '.');
                });

            }
        });

    }
    else {
        return response.status(httpCodes.BAD_REQUEST).send("remplir les champs ");
    }



});

/******************** verify the new password **************** */
router.get('/newpassword/:token', (request, response) => {
    response.redirect('http://localhost:3000/passforgot');


});


router.post('/newpassword', (request, response) => {
    const { password1, email, password2 } = request.body;


    var hashedPassword = bcrypt.hashSync(password1, 10);

    // les 2 mot de passe sont identiques 
    if (password1.localeCompare(password2) == 0) {
        connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, result, fields) {
            //user dosen't exist
            if (result.length == 0) {

                return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });

            }

            //user exist
            else {
                connection.query('UPDATE user SET mdp = ?  WHERE idu = ?', [hashedPassword, result[0].idu], function (error, result, fields) {
                    console.log('sdouga');
                    return response.redirect('http://localhost:3000/');
                });


            }
        });

    }
    // les 2 mdp ne sont pas identiques
    else {
        return response.status(httpCodes.BAD_REQUEST).send("Mot de passe incompatible");
    }


});


/*****************************  Profil ********************** */



router.get('/profil', (request, response) => {
    console.log(session.loggedin);
    connection.query('SELECT * FROM user WHERE email = ? ', [session.email], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }
        response.send(result);

    });

});



router.post('/profil', (request, response) => {
    var { nom, email, numTel } = request.body;

    connection.query('SELECT * FROM user WHERE email = ? ', [session.email], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
        }
        response.send(result);

        if (email == "") {
            email = result[0].email;
        }
        if (nom == "") {
            nom = result[0].nom;
        }
        if (numTel == "") {
            numTel = result[0].numTel;
        }


        connection.query('  UPDATE user SET nom = ?, email= ? ,numTel= ?   WHERE email = ? ', [nom, email, numTel, session.email], function (error, result, fields) {
            if (error) {
                console.log(error);
                return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
            }
            router.get('/dashboard', (request, response) => {
                connection.query('SELECT * FROM user WHERE email = ?', [session.email], function (error, result, fields) {
                    if (error) {
                        console.log(error);
                        return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
                    }

                    response.send(result);
                });

            });


        });
    });

});


/*****************************Dashboard ********************** */



router.get('/dashboard', (request, response) => {

    connection.query('SELECT * FROM niveau N,user U,technologie T,carrer C WHERE U.email= ? and N.idu=U.idu and N.idt=T.idt and C.idc=U.idc;', [session.email], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }
        response.send(result);
    });




});

router.get('/dashboard2', (request, response) => {

    connection.query(' SELECT * FROM user U,carrer C  WHERE U.email= ? and C.idc=U.idc;', [session.email], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }
        response.send(result);



    });


});


/*****************************carriere  get********************** */


router.get('/carriere', (request, response) => {

    connection.query('SELECT * FROM user WHERE email=? ;', [session.email], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });

});


router.get('/carriere2', (request, response) => {

    connection.query('SELECT * FROM user U,technologie T WHERE U.email=? and U.idc=T.idc;', [session.email], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });

});

/*****************************carriere  post********************** */
router.post('/carriere', (req, res) => {
    var format = req.body.format;
    var rate = req.body.a;
    var tech = req.body.b;
    console.log(rate);
    console.log(tech);
    console.log("wadii");

    if (format) {
        connection.query("SELECT idc FROM carrer  WHERE titre = ? ;", [format],
            function (error, results, fields) {

                if (error) {
                    console.log(error);
                    return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
                }

                connection.query("UPDATE user SET idc= ?   WHERE email = ? ", [results[0].idc, session.email],
                    function (error, results, fields) {

                        if (error) {
                            console.log(error);
                            return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
                        }
                        return res.redirect('http://localhost:3000/carriere');
                    });

            });
    }
    else {

        connection.query("SELECT idt FROM technologie  WHERE idc= ? and nomT= ?;", [session.idc, tech],
            function (error, result, fields) {

                console.log(result);
                if (error) {
                    console.log(error);
                    return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
                }

                connection.query("INSERT INTO niveau  (idn,niv,idu,idt ) VALUES (0,?,?,? );", [rate, session.idu, result[0].idt],
                    function (error, results, fields) {


                        if (error) {
                            console.log(error);
                            return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
                        }

                    })

            });

    }

});

/***************************Admin /user  ************************* */
router.get('/admin/user', (request, response) => {

    connection.query('SELECT * FROM user U,carrer C  WHERE U.idc=C.idc and U.email != "admin@admin";', function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });

});

router.post('/admin/user', (request, response) => {
    var search = request.body.search;
    console.log(search);
    connection.query('SELECT * FROM user U,carrer C  WHERE nom= ? and U.idc=C.idc;', [search], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });

});





/******************* Delete user *************** */
router.post('/admin/carrer', (request, response) => {
    var supp = request.body.del;
    console.log(request.body);
    connection.query('DELETE FROM user WHERE email=?;', [supp], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });
});

router.post('/admin/delete/user', (request, response) => {
    var del = request.body.d;
    connection.query('DELETE FROM technologie WHERE nomT=?;', [del], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });
});

/************************************** Delete tech ***************************/
router.post('/admin/delete/tech', (request, response) => {
    var del = request.body.d;
    connection.query('DELETE FROM user WHERE email=?;', [del], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });
});
/**************** barchart ************* */
router.get('/barchart', (request, response) => {

    connection.query("SELECT titre,count(*) AS Nombre_employé FROM user U, carrer C where U.idc=C.idc and U.email!='admin@admin' GROUP BY U.idc;", function (error, result, fields) {
        if (error) {
            console.log(error);

            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });

});


/************ View profil ***********************/

router.get('/admin/view/profil', (request, response) => {

    var a = request.headers.email;
    console.log(a);
    connection.query('SELECT * FROM niveau N,user U,technologie T WHERE U.email= ? and N.idu=U.idu and N.idt=T.idt ;', [a], function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });
})

/******************* add technologie & carriere **************** */
router.get('/admin/add/tech', (request, response) => {

    connection.query('SELECT * FROM carrer C, technologie T WHERE C.idc=T.idc  order BY C.titre;', function (error, result, fields) {
        if (error) {
            console.log(error);
            return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
        }

        response.send(result);
    });
})



router.post('/admin/add/tech', (request, response) => {

    const f = request.body.format;
    const a = request.body.carr;
    console.log(a);

    connection.query('SELECT nomT FROM technologie where nomT=?;', [f], function (error, result, fields) {
        if (result.length == 0) {
            connection.query('SELECT idc FROM carrer where titre=?;', [a], function (error, result, fields) {
                if (error) {
                    console.log(error);
                    return response.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: error.message });
                }

                connection.query("INSERT INTO technologie(idt,nomT,idc) VALUES (0,?,?) ;", [f, result[0].idc], function (error, results, fields) {
                    if (error) {
                        console.log(error);

                    }
                    return response.status(httpCodes.ACCEPTED).send("technologie ajouter");
                });
            });
        }
        else {
            return response.status(httpCodes.BAD_REQUEST).send("technologie already exist");
        }
    });
})

router.post('/admin/add/carr', (request, response) => {


    const a = request.body.car;
    console.log(a);

    connection.query('SELECT titre FROM carrer where titre=?;', [a], function (error, result, fields) {
        if (result.length == 0) {
            
                connection.query("INSERT INTO carrer(idc,titre) VALUES (0,?) ;", [a], function (error, results, fields) {
                    if (error) {
                        console.log(error);

                    }
                    return response.status(httpCodes.ACCEPTED).send("carriére ajouter");
                });
           
        }
        else {
            return response.status(httpCodes.BAD_REQUEST).send("carriére exist déja");
        }
    });
})


module.exports = router;