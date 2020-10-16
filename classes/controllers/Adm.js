const databaseKslFinanceiro = require("../../database/databaseKslFinanceiro");

class Adm {

    static async GetAdms() {
        try {
            var listAdms = await databaseKslFinanceiro.raw("select c_conect, ADM, ram_ramal from Financeiro..conexao inner join ControleLigacao..ramal on Financeiro..conexao.c_conect = ControleLigacao..ramal.ram_c_adm where ram_desabilitado = 0 and ram_c_adm <> 1 order by ADM")
            return listAdms;
        } catch (err) {
            console.log(err);
        }
    }


    // Função que remove administradoras duplicadas do select de carteiras
    static RemoveDuplicates(data) {
        var listAdms = [];
        data.forEach(element => {
            var ram_ramal = element.ram_ramal;
            var c_conect = element.c_conect;
            var admin = element.ADM.trim();
            var data = { c_conect: c_conect, ADM: admin, ram_ramal: ram_ramal };
            var validation = listAdms.find(adm => adm.ADM == admin);
            if (validation != undefined) {
                validation = validation.ADM;
            }

            if (admin != validation) {
                listAdms.push(data);
            }

        })
        return listAdms;
    }

}

module.exports = Adm;