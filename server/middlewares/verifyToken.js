const jwt =  require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.headers['x-access-token'];

    if (token === undefined){
        return next({status: 403, message: 'Token is not provided'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (e, decode)=>{
        if(e){
            if(e.name === 'TokenExpiredError') return res.status(401).send({message:'Token has expired'});
            if(e.name === 'JsonWebTokenError') return res.status(401).send({message:'Incorrect JWT'});
            
        }
        else {
            req.username = decode.data;
            next();
       }
    })
}