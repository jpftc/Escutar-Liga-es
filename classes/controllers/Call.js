const database = require("../../database/databaseKslControleLigacao");

class Call {

    static async GetCalls() {
        try {
            var listCalls = await database.select().whereRaw("LIG_DATA >= dateadd(MINUTE, -5,GETDATE()) and LIG_ARQUIVO <> ' '").table("LIGACAO");
            return listCalls;
        } catch (err) {
            console.log(err);
        }
    }

    static async GetCallsFiltered(dtInicio, dtFim, adm, ramal, grupo, cota, tel) {

        var query = `select * from LIGACAO (nolock) where LIG_DATA >= '${dtInicio}' and LIG_DATA <= '${dtFim}' `
        if (adm != "") {
            query = query + `and LIG_ADMINISTRADORA = '${adm}' `
        }

        if (ramal != "") {
            query = query + `and LIG_RAMAL = '${ramal}' `
        }

        if (grupo != "") {
            query = query + `and LIG_GRUPO = '${grupo}' `
        }

        if (cota != "") {
            query = query + `and LIG_COTA = '${cota}' `
        }

        if (tel != "") {
            query = query + `and LIG_TELEFONE = '${tel}' `
        }

        try {
            var listCallsFiltered = await database.raw(query);
            return listCallsFiltered;
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = Call;