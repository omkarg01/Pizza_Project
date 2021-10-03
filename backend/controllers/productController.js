import path from "path";
import multer from "multer";
import Joi from "Joi";
import fs from "fs";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import ProductDB from "../models/ProductSchema.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import productSchema from "../validators/productValdators.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "C:\\Users\\IP330s\\Desktop\\WEB_DEV\\pizza_project\\Backend\\uploads"
    );
  },
  filename: function (req, file, cb) {
    //piazz1.jpeg
    cb(
      null,
      `${Math.random(10000000)}-${new Date().getTime()}${path.extname(
        file.originalname
      )}`
    );
    //5-112461849.jpeg
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
}).single("image");

const productController = {
  // first fucntion of product controller
  async addProduct(req, res, next) {
    console.log("Inside addProduct");
    //function created
    upload(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const filePath = req.file.path;
      console.log(filePath);

      const { error } = productSchema.validate(req.body);

      if (error) {
        fs.unlink(filePath, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });
        return next(error);
      }
      console.log("productController.addProduct", "after validation");

      let savedProducts;
      console.log(req.body);
      const { Name, Price, Size } = req.body;
      //SAVE METHOD 1
      //   try {
      //     const products = new ProductDB({
      //       name: Name,
      //       price: Price,
      //       size: Size,
      //       image: filePath,
      //     });

      //     savedProducts = await products.save();
      //   } catch (error) {
      //     return next(error);
      //   }

      // SAVE METHOD 2
      try {
        savedProducts = await ProductDB.create({
          name: Name,
          price: Price,
          size: Size,
          image: filePath,
        });
      } catch (error) {
        return next(error);
      }

      res.status(201).json({ savedProducts });
    });
  },

  // second fucntion of product controller
  updateProduct(req, res, next) {
    console.log("Inside Update");
    upload(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      let filePath;
      if (req.file) {
        filePath = req.file.path;
        console.log(filePath);
      }

      const { error } = productSchema.validate(req.body);

      if (error) {
        fs.unlink(filePath, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });
        return next(error);
      }
      console.log("productController.update ", "after validation");

      let document; //data use in mongodb
      const { Name, Size, Price } = req.body;
      const update = {
        name: Name,
        size: Size,
        price: Price,
        ...(req.file && { image: filePath }),
      };

      try {
        document = await ProductDB.findByIdAndUpdate(req.params.id, update, {
          new: true,
        });
      } catch (error) {
        return next(error);
      }

      res.status(201).json({ document });
    });
  },

  // third fucntion of product controller

  async deleteProduct(req, res, next) {
    console.log("inside delete function");
    let document;
    try {
      document = await ProductDB.findOneAndDelete({ _id: req.params.id });
      // console.log(document.image);
      fs.unlink(document.image, (error) => {
        if (error) {
          return next(error);
        }
      });
    } catch (error) {
      return next(error);
    }
    res.json({ document });
  },

  async deleteAllProducts(req, res, next) {
    console.log("inside delete all ");
    let document;
    try {
      const filter = { name: "Burger pizza" };
      document = await ProductDB.deleteMany(filter);
      console.log(document);
    } catch (error) {
      return next(error);
    }

    res.json({ document });
  },

  // fourth function of product controller
  async getProducts(req, res, next) {
    console.log("inside getProducts");
    let document;
    try {
      document = await ProductDB.find({}).sort({ price: 1 });
      console.log(document);
    } catch (error) {
      return next(error);
    }
    res.json({ document: document });
  },

  async getProduct(req, res, next) {
    console.log("inside get a Single Product");
    let document;
    try {
      document = await ProductDB.findOne({ _id: req.params.id });
      if (!document) {
        return next(CustomErrorHandler.notFound("Prodcut not found"));
      }
      console.log(document);
    } catch (error) {
      return next(error);
    }
    res.json({ document: document });
  },
};

export default productController;
