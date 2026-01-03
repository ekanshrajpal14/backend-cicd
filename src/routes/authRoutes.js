const express= require("express");

const router= express.Router();
const authController= require("../controllers/authController");
const middleware= require("../middlewares/authMiddleware")

router.get("/register", (req,res)=>{
  res.render("auth/register", {error:null});
});

router.post("/register", authController.register)

router.get("/login", (req,res)=>{
  res.render("auth/login", {error:null});
})

router.post("/login", authController.login)

router.get("/logout", authController.logout)

router.get("/dashboard",middleware, (req,res)=>{
  res.render("posts/dashboard")
})


module.exports = router;