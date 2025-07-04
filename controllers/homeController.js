import db from "../models/index"
import CRUDservice from "../services/CRUDservice"

let getHomPage = async (req, res) => {

    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data1: JSON.stringify(data)
        });

    } catch (error) {
        console.log(error);
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/testPage.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crudPage.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    // await db.User.create(req.body);
    return res.send('post CRUD from server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (userId) {
        let user1 = await CRUDservice.getUserbyId(userId);
        return res.render('editCRUDPage.ejs', {
            user: user1,
        }
        )
    } else {
        return res.send('has no userId')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservice.updateUser(data);
    let getAllUser = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: getAllUser
    })

}

let deleteCRUD = async (req,res) =>{
    let userId = req.query.id;
    await CRUDservice.deleteCRUDbyID(userId);
    let getAllUser = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: getAllUser
    })
}

module.exports = {
    getHomPage: getHomPage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}