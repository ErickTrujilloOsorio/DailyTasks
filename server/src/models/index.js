import sequelize from '../config/db.js';
import User from './user.js';
import Task from './task.js';

// Relaciones
Task.belongsTo(User, { as: 'AssignedTo', foreignKey: 'assigned_to' });
Task.belongsTo(User, { as: 'AssignedBy', foreignKey: 'assigned_by' });

const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la base de datos');

    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados');
  } catch (err) {
    console.error('❌ Error al sincronizar modelos:', err);
  }
};

export {
  initModels,
  sequelize,
  User,
  Task
};
