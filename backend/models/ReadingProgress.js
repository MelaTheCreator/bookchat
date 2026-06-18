import { DataTypes, Model } from "sequelize";
import db from "../libs/db.js";

class ReadingProgress extends Model {}

ReadingProgress.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    currentChapter: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize: db, modelName: "readingProgress" },
);

export default ReadingProgress;
