// server/sync.js
import sequelize from '../config/db.js'; // ajusta según tu estructura
import '../models/user.js'; 
import '../models/task.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync(); // o force: true si estás en modo prueba
    console.log('Base de datos sincronizada correctamente');
    process.exit(0); // termina el proceso
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    process.exit(1);
  }
};

syncDatabase();