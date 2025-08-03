import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Task = sequelize.define('Task', {
  task_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  due_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Completada'),
    allowNull: false,
    defaultValue: 'Pendiente'
  },
  assigned_to: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assigned_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

export default Task;
