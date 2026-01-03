const User = require("../models/UserModal");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("auth/register", {
        error: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("auth/register", {
        error: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    req.session.userId = user._id;
    return res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return res.render("auth/register", {
      error: "Something went wrong",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("auth/login", {
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render("auth/login", {
        error: "User is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("auth/login", {
        error: "Invalid credentials",
      });
    }

    req.session.userId = user._id;
    return res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return res.render("auth/login", {
      error: "Something went wrong",
    });
  }
};


exports.logout = async (req,res) =>{
  req.session.destroy(()=>{
    res.redirect("/login");
  })
}