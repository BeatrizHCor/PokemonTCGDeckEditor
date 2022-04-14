import { compare, hash } from "bcryptjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { User } from "../../entity/User";
import { ACCESS_TOKEN_SECRET } from "../../middlewares/constants";
import { UserDTO, UserInput, UserLoginInput } from "../dto/UserDTO";

// Resolver de Usuários
export interface Context {
    user: UserDTO;
}

@Service()
@Resolver(UserDTO)
export class UserResolver {
    repository: Repository<User>;
    constructor() {
        const dataSource: DataSource = Container.get("dataSource");
        this.repository = dataSource.getRepository(User);
    }

    // Carregar a partir do JWT fornecido os dados de um usuário
    @Query((_) => UserDTO)
    async loadUser(@Arg("token") token?: string): Promise<UserDTO | null> {
        if (!token) {
            return null;
        }
        const decodedToken: JwtPayload = verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
        return this.repository.findOneOrFail({ where: { id: Number(decodedToken.sub!) } });
    }

    // Verifica os dados de Login Fornecidos e, caso corretor, retorna um JWT Válido
    @Mutation((_) => String)
    async loginUser(@Arg("input") input: UserLoginInput) {
        const email = await input.email;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const valid = await compare(input.password, user.password);
        if (!valid) {
            return null;
        }

        const accessToken = sign({ sub: user.id }, ACCESS_TOKEN_SECRET);

        return accessToken;
    }

    // Registra um usuário com senha encriptografada
    @Mutation((_) => UserDTO)
    async createUser(@Arg("input") input: UserInput): Promise<UserDTO> {
        const email = await input.email;
        const username = await input.username;
        const password = await hash(input.password, 10);
        return this.repository.save({ username, email, password, decks: [] });
    }
}
