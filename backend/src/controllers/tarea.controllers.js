import Tarea from "../models/tarea.models.js";

export const getTarea = async (req, res) => {
  const Tareas = await Tarea.find({
    User: req.user.id,
  }).populate("User");
  res.json(Tareas);
};

export const getTareaid = async (req, res) => {
  const Tareas = await Tarea.findById(req.params.id).populate("User");
  if (!Tareas) {
    return res.status(404).send("Tarea no encontrada");
  }
  res.json(Tareas);
};

export const CrearTarea = async (req, res) => {
  const { nombre, descripcion, fecha } = req.body;
  const newTarea = new Tarea({
    nombre,
    descripcion,
    fecha,
    User: req.user.id,
  });
  const tareaSaved = await newTarea.save();
  res.json(tareaSaved);
};

export const EliminarTarea = async (req, res) => {
  const tarea = await Tarea.findByIdAndDelete(req.params.id);
  if (!tarea) {
    return res.status(404).send("Tarea no encontrada");
  }
  return res.sendStatus(204);
};

export const EditarTarea = async (req, res) => {
  const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!tarea) {
    return res.status(404).send("Tarea no encontrada");
  }
  res.json(tarea);
};
