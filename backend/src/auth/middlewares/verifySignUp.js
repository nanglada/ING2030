const db = require("../../../models/index");
const Buyer = db.buyer;

const checkDuplicateEmail = (req, res, next) => {
    Buyer.findOne({
        where: {
            email: req.body.email
        }
    }).then(buyer => {
        if (buyer) {
            res.status(400).send({
                message: 'Email ya está en uso.'
            });
            return;
        }
        next();
    });
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};
module.exports = verifySignUp;