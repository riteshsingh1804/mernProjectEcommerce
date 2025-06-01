const express= require("express");
const { doubt,getAllProducts,getAllProductsAdmin,createProduct,updateProduct,deleteProduct, getProductDetails, createUpdateAnyProductAnyReview ,deleteAnyProductAnyReview, getAllReviewsOfAnyProduct} = require("../controllers/productController");
const {isAuthenticatedUser,AuthorizeRoles} = require("../Auth/Auth");

const productRouter=express.Router();

productRouter.route("/doubt/:id").get(doubt);





productRouter.route("/products").get(getAllProducts);
productRouter.route("/admin/products").get(isAuthenticatedUser,AuthorizeRoles("admin"),getAllProductsAdmin);

productRouter.route("/admin/product/new").post(isAuthenticatedUser,AuthorizeRoles("admin"),createProduct);
productRouter.route("/admin/product/:id")
             .put(isAuthenticatedUser,AuthorizeRoles("admin"),updateProduct)
             .delete(isAuthenticatedUser,AuthorizeRoles("admin"),deleteProduct);
productRouter.route("/product/:id").get(getProductDetails);             

productRouter.route("/review").put(isAuthenticatedUser,createUpdateAnyProductAnyReview);
productRouter.route("/reviews").delete(isAuthenticatedUser,deleteAnyProductAnyReview)
                               .get(getAllReviewsOfAnyProduct);
module.exports=productRouter;

// http://localhost:3000/product/65f0affd1bc62ad643ddd90a