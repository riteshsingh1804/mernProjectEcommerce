const express=require("express");
const {registerUser,loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAnyUserDetails, getAllUsers, updateUserRole, deleteAnyUser, updateAnyUserRole}=require("../controllers/userController");
const { isAuthenticatedUser ,AuthorizeRoles} = require("../Auth/Auth");

const userRouter=express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);

userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/password/reset/:token").put(resetPassword);

userRouter.route("/me").get(isAuthenticatedUser,getUserDetails);
userRouter.route("/password/update").put(isAuthenticatedUser,updatePassword);
userRouter.route("/me/update").put(isAuthenticatedUser,updateProfile);

userRouter.route("/admin/users").get(isAuthenticatedUser,AuthorizeRoles("admin"),getAllUsers);
userRouter.route("/admin/user/:id").get(isAuthenticatedUser,AuthorizeRoles("admin"),getAnyUserDetails);
userRouter.route("/admin/user/:id").put(isAuthenticatedUser,AuthorizeRoles("admin"),updateAnyUserRole);
userRouter.route("/admin/user/:id").delete(isAuthenticatedUser,AuthorizeRoles("admin"),deleteAnyUser)





module.exports=userRouter;