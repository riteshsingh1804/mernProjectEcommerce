const express=require("express");
const { isAuthenticatedUser,AuthorizeRoles } = require("../Auth/Auth");
const { newOrder, getAnyOrderDetails, myOrders, getAllOrders, updateAnyOrderStatus, deleteAnyOrder } = require("../controllers/orderController");

const  orderRouter=express.Router();

orderRouter.route("/order/new").post(isAuthenticatedUser,newOrder);
orderRouter.route("/order/:id").get(isAuthenticatedUser,getAnyOrderDetails);
orderRouter.route("/orders/me").get(isAuthenticatedUser,myOrders);


orderRouter.route("/admin/orders").get(isAuthenticatedUser,AuthorizeRoles("admin"),getAllOrders);
orderRouter.route("/admin/order/:id").put(isAuthenticatedUser,AuthorizeRoles("admin"),updateAnyOrderStatus)
                                .delete(isAuthenticatedUser,AuthorizeRoles("admin"),deleteAnyOrder);

module.exports=orderRouter;