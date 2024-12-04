const fs = require("fs");
const path = require("path");

let contas = [];

const filePath = path.resolve("db/", "contas.json");

// Função que salva a lista de Contas na pasta db
const saveContasToFile = () => {
    fs.writeFile(filePath, JSON.stringify(contas, null, 2), (err) => {
        if (err){
            console.error("Erro ao salvar Conta no arquivo:", err);
        } else {
            console.log("Conta salva com sucesso")
        }
    })
}
// Função que carrega os Contas salvos na pasta
const loadContasFromFile = () => {
    if (fs.existsSync(filePath)){
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err){
                console.error("Erro ao ler o arquivo de Contas", err);
            } else if (data.trim() === ""){
                contas = [];
                console.log("Arquivo de Contas está vazio");
            } else {
                try {
                    contas = JSON.parse(data);
                    console.log("Contas carregados com sucesso")
                } catch (parseError) {
                    console.error("erro ao interpretar o JSON", parseError);
                }
            }
        })   
    }
}

const addContas = (value) => {
    const findId = findContasById(value.id);
    console.log("id> ", findId);
    const firstId = 1;
    if (findId != null) {
        const newId = findId + 1;
        console.log("id> ", findId);

        const conta = {
            id: newId,
            contaInst : value.contaInst,
            contaTipo : value.contaTipo,
            descricao : value.descricao,
            cpf : value.cpf,
            nome : value.nome
        }

        contas.push(conta);
        saveContasToFile();
        console.log("Conta Cadastrada: ", conta);
        return conta;
    } else {
        const conta = {
            id: firstId,
            contaInst : value.contaInst,
            contaTipo : value.contaTipo,
            descricao : value.descricao,
            cpf : value.cpf,
            nome : value.nome
        }

        contas.push(conta);
        saveContasToFile();
        console.log("Conta Cadastrada: ", conta);
        return conta;
    }
}

const findContasById = (id) => {
    return contas.find(contas => contas.id === id) || null;
}

const updateContas = (value) => {
    const contas = findContasById(value.id);
    if (contas.id == value.id){
        
        contas.contaInst = value.contaInst;
        contas.contaTipo = value.contaTipo;
        contas.descricao = value.descricao;
        contas.cpf = value.cpf;
        contas.nome = value.nome;
    
        saveContasToFile();
        console.log("Contas atualizado: ", contas);
        
        return contas;
    } else {
        return null;
    }
}

const deleteContas = (id) => {
    const index = contas.findIndex(contas => contas.id === id);

    if (index !== -1){
        contas.splice(index, 1); // remove o Contas da lista
        saveContasToFile()
        console.log("Contas Deletada: ", id);
        return true;
    } else {
        return false;
    }
}

// Função que devolve a lista de Contas
const listContas = () => {
    return contas;
}

// Carrega os Contas salvos no arquivo ao iniciar
loadContasFromFile();

// Exportamos as funções para poder utilizar nos outros módulos
exports.findContasById = findContasById;
exports.addContas = addContas;
exports.updateContas = updateContas;
exports.deleteContas = deleteContas;
exports.listContas = listContas;