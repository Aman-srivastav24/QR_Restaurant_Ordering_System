const prisma = require('../prisma');

const findAdminByEmail = (email)=>{
    return prisma.admin.findUnique({
        where:{
            email
        }
    });
};

module.exports = { findAdminByEmail };