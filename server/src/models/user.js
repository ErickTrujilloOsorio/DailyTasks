import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  user_type: {
    type: DataTypes.ENUM('Admin', 'User'),
    allowNull: false,
    defaultValue: 'User'
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Método para comparar contraseña
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default User;
