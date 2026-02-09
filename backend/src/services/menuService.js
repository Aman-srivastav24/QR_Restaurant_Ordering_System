const prisma = require('../prisma');

const getMenuforCustmer =()=>{
    return prisma.menuItems.findMany({
        where:{
            available:true
        }
    });
}

const getMenuForAdmin =()=>{
    return prisma.menuItems.findMany();
}

const createMenuItem =(data)=>{
    return prisma.menuItems.create({
        data
    });
}   

const updateMenuItem =(id, data)=>{
    return prisma.menuItems.update({
        where:{ id},
        data
    });
}

const softDeleteMenuItem =(id)=>{
    return prisma.menuItems.update({
        where:{ id},
        data:{ available:false}
    });
}

module.exports = { getMenuforCustmer, getMenuForAdmin, createMenuItem, updateMenuItem, softDeleteMenuItem };