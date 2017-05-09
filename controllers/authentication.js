const User = require('../models/user');
const jwt = require('jwt-simple');
const JWT_SECRET = require('../.configuration');


//create jwt-token and set subject, timestamp and secret
function createJwtToken(user) {
    const timestamp = new Date().getDate();
    return jwt.encode({ sub: user.id, iat: timestamp }, JWT_SECRET.ID)
};


//authorized just need to issue a jwt_token
exports.signin = (req, res, next) => {
    res.send({ web_token: createJwtToken(req.user) })
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'Email and Password are required' })
    }

    /****************add email validation********************/


    //does user with email exist?
    User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        //if email already exists return error message
        if (existingUser) {
            return res.status(422).send({ error: 'Email already exists' })
        }

        //if new user create new User and return JWT_TOKEN 
        const user = new User({
            email: email,
            password: password
        });
        user.save((err) => {
            if (err) {
                return next(err);
            }
            res.send({ Web_token: createJwtToken(user) });
        });

    });

};

