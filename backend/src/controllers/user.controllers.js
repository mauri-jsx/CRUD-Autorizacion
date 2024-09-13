import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const registro = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).send(["El usuario ya existe"]);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      _id: userSaved._id,
      name: userSaved.name,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al registrar usuario");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).send("Usuario no encontrado");
    }
    const IsMatch = await bcrypt.compare(password, userFound.password);
    if (!IsMatch) {
      return res.status(400).send("Contraseña incorrecta");
    }
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al registrar usuario");
  }
};

export const Logut = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200).send("Cierre de sesion exitoso");
};

export const profile = async (req, res) => {
  const UserFoun = await User.findById(req.user.id);
  if (!UserFoun) {
    return res.status(400).send("Usuario no encontrado");
  }
  return res.json({
    _id: UserFoun._id,
    name: UserFoun.name,
    email: UserFoun.email,
    createdAt: UserFoun.createdAt,
    updatedAt: UserFoun.updatedAt,
  });
};
