import db from "../models/index"

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

module.exports = {
    getHomPage: getHomPage,
    getAboutPage: getAboutPage,
}