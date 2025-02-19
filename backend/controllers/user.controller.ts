import User from "../models/user.model.ts";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const users = await User.findOne({ discordId: req.params.id }).exec();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
