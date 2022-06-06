import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface TaskAttributes {
    id: string,
    title: string,
    description: string,
    latitude: number,
    longitude: number,
    status: string,
    date: Date
}

export interface TaskInput extends Optional<TaskAttributes, 'id'> { };
export interface TaskOutput extends Required<TaskAttributes> { };

class Task extends Model<TaskAttributes, TaskInput> implements TaskAttributes {
    public id!: string;
    public title!: string;
    public description!: string;
    public latitude!: number;
    public longitude!: number;
    public status!: string;
    public date!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection
})

export default Task;