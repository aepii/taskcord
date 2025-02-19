import UserModel from "../models/user.model.ts";

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserByDiscordID = async (req, res, next) => {
  try {
    const users = await UserModel.findOne({
      discordId: req.params.discordId,
    }).exec();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserByUsername = async (req, res, next) => {
  try {
    const users = await UserModel.findOne({
      discordUsername: req.params.discordUsername,
    }).exec();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = req.body;

    if (!user.discordId || !user.discordUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields." });
    }

    const newUser = new UserModel(user);

    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};
