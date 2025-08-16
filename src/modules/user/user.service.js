const { User } = require("../../models");

class UserService {
    async create(data) {
        return User.create(data);
    }

    async findAll() {
        return User.findAll();
    }

    async findById(id) {
        return User.findByPk(id);
    }

    async update(id, data) {
        return User.update(data, { where: { id } });
    }

    async delete(id) {
        return User.destroy({ where: { id } });
    }
}

module.exports = UserService;
