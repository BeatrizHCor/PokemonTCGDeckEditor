import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import Container from "typedi";
import { getDataSource } from "./data-source";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./graphql/resolvers/UserResolver";

const init = async () => {
    await getDataSource();
    const schema = await buildSchema({
        // eslint-disable-next-line node/no-path-concat
        resolvers: [__dirname + "/graphql/resolvers/*.{ts,js}"],
        container: Container,
        validate: false,
    });
    const server = new ApolloServer({
        schema,
        context: async ({ req }) => ({
            user: await Container.get(UserResolver).loadUser(req.headers.authorization),
        }),
    });

    server.listen().then(({ url }: any) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};

init();
