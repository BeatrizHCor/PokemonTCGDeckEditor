import { useContainer } from "class-validator";
import "reflect-metadata";
import Container from "typedi";
import { DataSource } from "typeorm";

useContainer(Container);
export const getDataSource = async () => {
    const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "123456",
        database: "postgres",
        synchronize: true,
        logging: true,
        entities: ["src/entity/*.ts"],
        subscribers: [],
        migrations: [],
    });
    const dataSource = await AppDataSource.initialize();
    Container.set("dataSource", dataSource);
};
