const { CreateToken } = require('../helpers/tokenMangemnt');
const { GenerateUniqueId } = require('../helpers/uniqueId');

module.exports = function (app, mongoose) {
    const { Validator: { UserValidator: { SignupSchema, LoginSchema } } } = require('../helpers')
    const { User, Token } = app.db.models;
    const bcrypt = require("bcryptjs");
    const saltRounds = 10;
    // Login Controller to handle Loging Route
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
            const currentUser = JSON.parse(JSON.stringify(foundUser));
            const token = await CreateToken(foundUser, app.get('token-secret'));
            currentUser["token"] = token;
            delete currentUser["password"];
            res.json({ success: true, message: "Successfully Logged In User", user: currentUser })
        } catch (error) {
            if (error) {
                console.log(error)
                res.json({ success: false, message: error.message })
            }
        }
    }

    // Signup Controller to handle Signup Route
    const SignupController = async (req, res) => {
        console.log("body", req.body);
        try {
            const validation = SignupSchema.validate(req.body);
            if (validation.error) {
                throw new Error(validation.error);
            }
            const { fullName, email, password, dob, phoneNumber } = req.body;
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.json({ success: false, message: 'This Email Adress is Already Registered' });
            }
            const bcrypySalt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hashSync(password, bcrypySalt);
            const user = new User({
                userId: GenerateUniqueId(),
                fullName,
                email,
                password: hashedPassword,
                dob,
                role: 'user',
                phoneNumber
            });
            const addedUser = await user.save();
            const newUser = JSON.parse(JSON.stringify(addedUser));
            const token = await CreateToken(newUser, app.get('token-secret'));
            newUser["token"] = token;
            res.json({ success: true, message: "Successfully Create User", user: newUser })
        } catch (error) {
            if (error) {
                console.log(error)
                res.json({ success: false, message: error.message  })
            }
        }
    }

    // Configuring User Controllers to app
    app.controllers.LoginController = LoginController;
    app.controllers.SignupController = SignupController
}