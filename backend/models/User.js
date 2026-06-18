import { DataTypes, Model } from "sequelize";
import db from "../libs/db.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isOnline: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize: db, modelName: "user", timestamps: false },
);

export default User;
