const database = require("../../database/databaseKslAuth");

class Users {

    static async GetUser(user) {
        try {
            var user = await database.select().table("usuarios").where({ nome: user });
            return user;
        } catch (err) {
            console.log(err);
        }

    }

}

module.exports = Users;