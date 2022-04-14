import { sign } from "jsonwebtoken";
import { User } from "../entity/User";
import { ACCESS_TOKEN_SECRET } from "./constants";

export const createTokens = (user: User) => {
    const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET);

    return { accessToken };
};
