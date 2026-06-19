import { DataTypes, Model } from "sequelize";
import db from "../libs/db.js";

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gutenbergId: { type: DataTypes.INTEGER, allowNull: false, unique: true }, // das soll die ID sein, die das Buch laut Gutenberg API hat
    title: { type: DataTypes.STRING, allowNull: true }, // allowNull true, weil sonst book speichern in db schwierig war (s. booksController)
    author: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize: db, modelName: "book", timestamps: false },
);

export default Book;
