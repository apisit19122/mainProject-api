import { ObjectType, Field } from "type-graphql";
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/database/conn";

interface UserAttributes {
  id: string;
  username: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@ObjectType("users")
export class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  @Field(() => String)
  public id!: string;

  @Field(() => String)
  public username!: string;

  @Field(() => String)
  public password!: string;

  @Field(() => String, { nullable: true })
  public firstName: string | null;

  @Field(() => String, { nullable: true })
  public lastName: string | null;

  // @Field(() => Date)
  // public createdAt?: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    username: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    firstName: {
      type: DataTypes.STRING(255),
    },
    lastName: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    tableName: "users",
    freezeTableName: true,
  }
);
