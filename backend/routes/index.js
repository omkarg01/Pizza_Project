import express from "express";
import registerController from "../controllers/auth/registerController.js";
import loginController from "../controllers/auth/loginController.js";
import userController from "../controllers/auth/userController.js";
import refreshController from "../controllers/auth/refreshController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import productController from "../controllers/productController.js";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

router.post("/products", [auth, admin], productController.addProduct);
router.put("/products/:id", [auth, admin], productController.updateProduct);
router.delete("/products/:id", [auth, admin], productController.deleteProduct);
router.delete("/products", [auth, admin], productController.deleteAllProducts);
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);






export default router;
