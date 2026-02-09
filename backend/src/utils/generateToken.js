const jwt = require('jsonwebtoken');

const genrateToken = (admin) => {
    return jwt.sign(
        {
            id:admin.id,
            email:admin.email,
        },
        process.env.JWT_SECRET,
        {expiresIn:'1d'}            
    )
};

module.exports = genrateToken;  