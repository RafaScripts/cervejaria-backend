import Knex from '../database/index';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import {authConfig} from "../config/Auth";

class controllerLogin {
    async login(req, res) {
        const { email, password } = req.body;

        const user = await Knex('funcionarios').where({email}).first('*');

        if(!user) {
            return res.status(400).json({error: 'User not found'});
        }

        const verifyPassword = await bcrypt.compare(password, user.password_hash);

        if(!verifyPassword) {
            return res.status(400).json({error: 'Password does not match'});
        }

        const { id, username } = user;

        return res.json({
            user: {
                id,
                username
            },
            token: jwt.sign({id}, authConfig.Secret, {
                expiresIn: authConfig.expiresIn
            }),
        })

    }

}

export default new controllerLogin;