import User from "../../models/UserSchema.js"
const userController = {
  async me(req, res, next) {
    console.log("hello i am user controller");
    try {
      const user = await User.findOne({ _id: res.locals.payloadData.id });
      res.json({ user });
    } catch (error) {
      return next(error);
    }
    
  },
};
export default userController;
