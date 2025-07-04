import bcrypt from 'bcrypt';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';
const saltRounds = 10;

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                rodeId: data.roleId,
            })
            resolve('ok! create a new user success')
        } catch (e) {
            reject(e)
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, saltRounds);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getUserbyId = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userbyId = await db.User.findOne({
                where: { id: userId },
                raw: true
            })

            if (userbyId) {
                resolve(userbyId);
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
           
            let user1 = await db.User.findOne({
                where: { id: data.id }
            })
            if (user1) {
                user1.firstName = data.firstName;
                user1.lastName = data.lastName;
                user1.address = data.address;
                await  user1.save();
                resolve()                
            } else {
                resolve()
            }
        } catch (error) {

        }
    })
}
let deleteCRUDbyID = (userId)=>{
    return new Promise(async (resolve, reject) => {
        try {
           
            let userDelete = await db.User.findOne({
                where: { id: userId}
            })
            if (userDelete) {
               await userDelete.destroy();
                resolve()                
            } else {
                resolve()
            }
        } catch (error) {

        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserbyId: getUserbyId,
    updateUser: updateUser,
    deleteCRUDbyID: deleteCRUDbyID
}