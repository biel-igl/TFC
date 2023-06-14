import { DataTypes, Model, QueryInterface } from 'sequelize';
import { ITeams } from '../../Interfaces/Teams/ITeams';

export default {
  up(queryInterface: QueryInterface) {
      return queryInterface.createTable<Model<ITeams>>('teams', {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          teamName: {
            type: DataTypes.STRING,
            allowNull: false,
          }
        })
    }
}