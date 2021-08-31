const { CreateToken } = require('../helpers/tokenMangemnt');

module.exports = function (app, mongoose) {
    const { Validator: { UserValidator: { SignupSchema, LoginSchema } } } = require('../helpers')
    const { User, Token } = app.db.models;
    const bcrypt = require("bcryptjs");
    const saltRounds = 10;
    const LoginController = (req, res) => {
        console.log("body", req.body);
        res.json({ success: true, message: "Successfully Logged In" })
    }

    const SignupController = async (req, res) => {
        console.log("body", req.body);
        try {
            const validation = SignupSchema.validate(req.body);
            // console.log(validation);
            if (validation.error) {
                throw new Error(validation.error);
            }
            const { fullName, email, password, dob, role, phoneNumber } = req.body;
            const bcrypySalt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hashSync(password, bcrypySalt);
            const user = new User({
                fullName,
                email,
                password: hashedPassword,
                dob,
                role,
                phoneNumber
            });
            const addedUser = await user.save();
            const newUser = JSON.parse(JSON.stringify(addedUser))
            const token = await CreateToken(newUser, app.get('token-secret'));
            newUser["token"] = token;
            res.json({ success: true, message: "Successfully Create User", token })
        } catch (error) {
            if (error) {
                console.log(error)
                res.json({ success: false, message: error.message })
            }
        }
    }
    app.controllers.LoginController = LoginController;
    app.controllers.SignupController = SignupController
}