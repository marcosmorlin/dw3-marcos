const axios = require("axios");
const moment = require("moment");


const manutAEmprestimos = async (req, res) =>
    (async () => {
      //@ Abre o formulário de manutenção de alunos
      const userName = req.session.userName;
      const token = req.session.token;
      //console.log("[ctlAutores|ManutAutores] Valor token:" + token)
      // try {
      const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllEmprestimos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Set JWT token in the header
        }
      }).catch(error => {
        if (error.code === "ECONNREFUSED") {
          remoteMSG = "Servidor indisponível"
  
        } else if (error.code === "ERR_BAD_REQUEST") {
          remoteMSG = "Usuário não autenticado";
  
        } else {
          remoteMSG = error;
        }
        res.render("Emprestimos/view/vwManutEmprestimos.njk", {
          title: "Manutenção de emprestimos",
          data: null,
          erro: remoteMSG, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
          userName: userName,
        });
      });
  
      if (!resp) {
        return;
      }
  
  
      res.render("Emprestimos/view/vwManutEmprestimos.njk", {
        title: "Manutenção de emprestimos",
        data: resp.data.registro,
        erro: null,
        userName: userName,
      });
    })();