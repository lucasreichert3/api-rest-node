import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { UsuarioModel } from '../model/UsuarioModel';
import { v4 as uuidv4 } from 'uuid';

require("dotenv").config();
const jwt = require('jsonwebtoken');

const blacklist: (string | string[] | undefined)[] = [];

class AutenticacaoController {

    async create_login_teste(req: Request, res: Response) {
        const crypto = require("crypto");
        const sha256Hasher = crypto.createHmac("sha256", "CHAVE_SHA_NODE_2021");
        const passwordCriptografada = sha256Hasher.update('senha_12345').digest("hex");
        await UsuarioModel.create({ id: uuidv4(), username: 'teste', password: passwordCriptografada, token: 'teste' });
        return res.status(200).json({ message: 'Usuário criado!' });
    }

    async login(req: Request, res: Response) {
        const { usuario, senha } = req.params;        
        const crypto = require("crypto");
        const sha256Hasher = crypto.createHmac("sha256", "CHAVE_SHA_NODE_2021");
        const senhaCriptografada = sha256Hasher.update(senha).digest("hex");
        const usuarioLogado = await UsuarioModel.findAll({ 
            where: { username: usuario, password: senhaCriptografada },
        });

        if (usuarioLogado[0] != undefined) {
            console.log(usuarioLogado);
            const id = usuarioLogado[0].getDataValue('id'); 
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300
            });
            return res.json({ auth: true, token: token });
        }

        res.status(401).json({ message: 'Login inválido!' });
    }

    async logout(req: Request, res: Response) {
        blacklist.push(req.headers['access-token']);
        return res.json({ auth: false, token: null });
    }

    verifyJWT(req: Request, res: Response, next: NextFunction){
        const token = req.headers['access-token'];

        if (!token) return res.status(401).json({ auth: false, message: 'Token não especificado.' });

        const index = blacklist.findIndex(c => c === token);
        if(index !== -1) return res.status(401).json({ auth: false, message: 'Token inválido.' });
        
        jwt.verify(token, process.env.SECRET, function(err : Error, decoded: { id: any; }) {
          if (err) return res.status(401).json({ auth: false, message: 'Token inválido.' });
          
          next();
        });
    }
}


export default new AutenticacaoController();
