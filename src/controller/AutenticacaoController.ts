import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

require("dotenv").config();
const jwt = require('jsonwebtoken');

const blacklist: (string | string[] | undefined)[] = [];

class AutenticacaoController {

    async login(req: Request, res: Response) {
        const { usuario, senha } = req.params;
        if (usuario === 'usuario' && senha === 'senha') {
            const id = 1; //idUsuario
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
