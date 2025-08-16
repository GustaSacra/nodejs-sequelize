const UserService = require("./user.service");
const userService = new UserService();

class UserController {
    async store(req, res) {
        try {
            const { Name, email } = req.body;
            if (!Name || !email) {
                return res.status(400).json({ message: "Nome e email são obrigatórios." });
            }

            const existing = await userService.findAll({ where: { email } });
            if (existing.length > 0) {
                return res.status(400).json({ message: "Esse usuário já existe." });
            }

            const createdUser = await userService.create({ Name, email });
            return res.status(201).json(createdUser);
        } catch (error) {
            return res.status(400).json({ message: "Falha ao cadastrar o usuário" });
        }
    }

    async index(req, res) {
        const users = await userService.findAll();
        return res.status(200).json(users);
    }

    async show(req, res) {
        const user = await userService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        return res.status(200).json(user);
    }

    async update(req, res) {
        await userService.update(req.params.id, req.body);
        return res.status(200).json({ message: "Usuário atualizado" });
    }

    async destroy(req, res) {
        await userService.delete(req.params.id);
        return res.status(200).json({ message: "Usuário excluído" });
    }
}

module.exports = new UserController();
