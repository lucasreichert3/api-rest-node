import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ProdutoModel } from "../model/ProdutoModel";

class ProdutoController {
	async criar(req: Request, res: Response) {
		const id = uuidv4();
		try {
			const record = await ProdutoModel.create({ ...req.body, id });
			return res.json({ record, msg: "Produto criado com sucesso!" });
		} catch (e) {
			return res.json({ msg: "Falha ao criar produto...", status: 500, route: "/create" });
		}
	}

	async buscar(req: Request, res: Response) {
		try {
			const limit = (req.query.limit as number | undefined) || 10;
			const offset = req.query.offset as number | undefined;

			const records = await ProdutoModel.findAll({ where: {}, limit, offset });
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "Falha ao buscar produtos...", status: 500, route: "/read" });
		}
	}

	async buscarPeloID(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await ProdutoModel.findOne({ where: { id } });
			return res.json(record);
		} catch (e) {
			return res.json({ msg: "Falha ao buscar produto...", status: 500, route: "/read/:id" });
		}
	}
	async atualizar(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await ProdutoModel.findOne({ where: { id } });

			if (!record) {
				return res.json({ msg: "Não foi possível encontrar o produto..." });
			}

			const updatedRecord = await record.update({
				//completed: !record.getDataValue("completed"),
			});
			return res.json({ record: updatedRecord });
		} catch (e) {
			return res.json({
				msg: "Falha ao buscar produto...",
				status: 500,
				route: "/update/:id",
			});
		}
	}
	async excluir(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await ProdutoModel.findOne({ where: { id } });

			if (!record) {
				return res.json({ msg: "Não foi possível encontrar o produto..." });
			}

			const deletedRecord = await record.destroy();
			return res.json({ record: deletedRecord });
		} catch (e) {
			return res.json({
				msg: "Falha ao buscar produto...",
				status: 500,
				route: "/delete/:id",
			});
		}
	}
}

export default new ProdutoController();