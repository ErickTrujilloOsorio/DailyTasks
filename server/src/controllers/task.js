import { Task, User } from '../models/index.js';
import { updateTaskSchema, createTaskSchema } from '../validations/taskSchemas.js';

const createTask = async (req, res) => {
  try {
    const parsedData = createTaskSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.format() });
    }

    const assignedUser = await User.findByPk(parsedData.data.assigned_to);
    if (!assignedUser) {
      return res.status(404).json({ error: 'El usuario asignado no existe' });
    }

    const assigningUser = await User.findByPk(parsedData.data.assigned_by);
    if (!assigningUser) {
      return res.status(404).json({ error: 'El usuario que asigna no existe' });
    }
    
    const task = await Task.create(parsedData.data); 
    res.status(201).json({ message: 'Tarea Creada Satisfactoriamente', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: 'AssignedTo', attributes: { exclude: ['password'] } },
        { model: User, as: 'AssignedBy', attributes: { exclude: ['password'] } }
      ]
    });
    if (tasks.length === 0) return res.status(404).json({ message: 'No hay tareas disponibles' });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await Task.findAll({
      where: { status: status },
      include: [
        { model: User, as: 'AssignedTo', attributes: { exclude: ['password'] } },
        { model: User, as: 'AssignedBy', attributes: { exclude: ['password'] } }
      ]
    });
    if (tasks.length === 0) return res.status(404).json({ message: 'No hay tareas en estado ' + status });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Tarea No Encontrada' });

    task.status = status;
    await task.save();
    res.json({ message: 'Estado actualizado', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedData = updateTaskSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.format() });
    }

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    Object.keys(parsedData.data).forEach((key) => {
      task[key] = parsedData.data[key];
    });

    await task.save();
    res.json({ message: 'Tarea actualizada correctamente', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Task.destroy({ where: { task_id: id } });
    if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createTask,
  getTasks,
  getTasksByStatus,
  updateTaskStatus,
  updateTask,
  deleteTask
};
