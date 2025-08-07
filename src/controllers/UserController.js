

const { User } = require("../models");



class UserController {
    //* Método para armazenar um novo usuário no banco de dados
    async store(req, res) {
        try {
            const { Name, email } = req.body;

        // Validação básica
        if (!Name || !email) {
            return res.status(400).json({ message: "Nome e email são obrigatórios." });
        }

        // Verifica se já existe um usuário com o mesmo email
        const userAlreadyExists = await User.findOne({ where: { email } });

        if (userAlreadyExists) {
            return res.status(400).json({ message: "Esse usuário já existe." });
        }

        // Cria novo usuário
        const createdUser = await User.create({ Name, email });

        return res.status(201).json(createdUser);
        } catch (error) {
            return res.status(400).json({message: "falha ao cadastrar o usuario"});
        }
    }


    async index(req, res){
        try {
            const users = await User.findAll();

        return res.status(200).json(users);
        } catch (error) {
             return res.status(400).json({message: "falha ao cadastrar o usuario"});
        }
    }

    async show(req, res){
        try {
            const {id} = req.params;

        const user = await User.findByPk(id);

        if (!user){
            return res.status(404).json({message: "usuario nao encontrado"});
        }

        return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({message: "falha ao detalhar usuario"});
        }
    }

    async update(req, res){
        try {
            const {id} = req.params;

            const {Name, email} = req.body;

            await User.update(
                {Name, email},
                {
                    where: {
                        id: id,
                    },
                }
            );

            return res.status(200).json({message: "Usuario atualizado"});
        } catch (error) {
             return res.status(404).json({message: "falha ao atualizar o usuario"})
        }
    }

    async destroy(req, res){
        try {
            const {id} = req.params;

            await User.destroy(
                
                {
                    where: {
                        id: id,
                    },
                }
            );

            return res.status(200).json({message: "Usuario excluido com sucesso"});
        } catch (error) {
             return res.status(404).json({message: "falha ao excluir o usuario"})
        }
    }
}

//* exportando uma nova instacia criada
module.exports = new UserController();