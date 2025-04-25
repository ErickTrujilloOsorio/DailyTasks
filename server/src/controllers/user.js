import User from '../models/user.js';
import Task from '../models/task.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, user_type } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: encryptedPassword,
            user_type
        });
        res.status(201).json( { message: 'Usuario Creado Satisfactoriamente', user } );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: 'Credenciales Incorrectas, Vuelva a Intentarlo' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales Incorrectas, Vuelva a Intentarlo' });
        }
        let name = user.first_name + ' ' + user.last_name;
        res.status(200).json({ message: 'Login Exitoso, Bienvenido: ' + name, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No existen usuarios registrados' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTasksByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await Task.findAll({
            where: { assigned_to: id },
            include: [
                { 
                    model: User,
                    as: 'AssignedTo', 
                    attributes: ['first_name', 'last_name'] 
                }
            ]
        });
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No hay tareas asociadas para este usuario' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getTasksByUserId
};