const { CreateToken } = require('../helpers/tokenMangemnt');

module.exports = function (app, mongoose) {
    const { Validator: { UserValidator: { SignupSchema, LoginSchema } } } = require('../helpers')
    const { User, Token } = app.db.models;
    const bcrypt = require("bcryptjs");
    const saltRounds = 10;
    const LoginController = async (req, res) => {
        try {
            const validation = LoginSchema.validate(req.body);
            if (validation.error) {
                throw new Error(validation.error);
            };
            const { email, password } = req.body;
            const foundUser = await User.findOne({ email: email });
            if (!foundUser) {
                return res.json({ success: false, message: "No User Found With This Email Address" });
            }
            const pwdMatches = bcrypt.compareSync(password, foundUser.password);
            if (!pwdMatches) {
                return res.json({ success: false, message: "Sorry, But Password Doesn't Match" });
            }
            const token = await CreateToken(foundUser, app.get('token-secret'));
            res.json({ success: true, message: "Successfully Logged In User", token })
        } catch (error) {
            if (error) {
                console.log(error)
                res.json({ success: false, message: error.message })
            }
        }
    }

    const SignupController = async (req, res) => {
        console.log("body", req.body);
        try {
            const validation = SignupSchema.validate(req.body);
            if (validation.error) {
                throw new Error(validation.error);
            }
            const { fullName, email, password, dob, role, phoneNumber } = req.body;
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.json({ success: false, message: 'This Email Adress is Already Registered' });
            }
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