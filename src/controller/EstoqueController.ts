import { Estoque } from "../model/EstoqueModel";

export class EstoqueController {

    getEstoque(): Estoque {
        return { id: 'teste', nome: 'Lucas' };
    }
}

export default new EstoqueController();