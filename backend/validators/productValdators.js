import Joi from "joi";

 const productSchema = Joi.object({
    Name: Joi.string().required(),
    Price: Joi.number().required(),
    Size: Joi.string().required(),
    image : Joi.string()
  });

  export default productSchema;