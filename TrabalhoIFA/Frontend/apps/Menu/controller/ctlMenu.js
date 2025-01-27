const axios = require("axios");
const moment = require("moment");

const manutMenu = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    
    try {
      const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllMenu", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Set JWT token in the header
        }
      });

      res.render("Menu/view/vwManutMenu.njk", {
        title: "Manutenção de Menu",
        data: resp.data.registro,
        erro: null,
        userName: userName,
      });
    } catch (error) {
      let remoteMSG = "Erro desconhecido";
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível";
      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";
      } else {
        remoteMSG = error.message;
      }

      res.render("Menu/view/vwManutMenu.njk", {
        title: "Manutenção de Menu",
        data: null,
        erro: remoteMSG, // Caso tenha dado erro, a mensagem será mostrada na página HTML como um alert
        userName: userName,
      });
    }
  })();

const insertMenu = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      // Buscar dados necessários (exemplo, categorias ou outras informações para o menu)
      const categorias = await axios.get(
        process.env.SERVIDOR_DW3Back + "/GetAllMenu", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // Set JWT token in the header
          }
        });

      return res.render("Menu/view/vwFCrMenu.njk", {
        title: "Cadastro de Menu",
        data: null,
        erro: null, // Caso tenha dado erro, a mensagem será mostrada na página HTML como um alert
        userName: null,
      });

    } else {
      // POST
      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertMenu", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000, // Timeout de 5 segundos
        });

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('Erro ao inserir dados no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: null,
          erro: null,
        });
      }
    }
  })();

const viewMenu = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      if (req.method == "GET") {
        const id = req.params.id;
        const oper = req.params.oper;
        parseInt(id);

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getMenuByID",
          { menuid: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status == "ok") {
          res.render("Menu/view/vwFRUDrMenu.njk", {
            title: "Visualização de Menu",
            data: response.data.registro[0],
            disabled: true,
            userName: userName,
          });
        } else {
          console.log("[ctlMenu|viewMenu] Menu não localizado!");
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlMenu.js|viewMenu] Menu não localizado!" });
      console.log("[ctlMenu.js|viewMenu] Try Catch: Erro não identificado", erro);
    }
  })();

const updateMenu = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getMenuByID",
          { menuid: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status == "ok") {
          res.render("Menu/view/vwFRUDrMenu.njk", {
            title: "Atualização de Menu",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlMenu|updateMenu] Menu não localizado!");
        }
      } else {
        // POST
        const regData = req.body;
        const token = req.session.token;

        try {
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateMenu", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            timeout: 5000, // Timeout de 5 segundos
          });

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlMenu.js|updateMenu] Erro ao atualizar dados no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: null,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlMenu.js|updateMenu] Menu não localizado!" });
      console.log("[ctlMenu.js|updateMenu] Erro não identificado", erro);
    }
  })();

const deleteMenu = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/deleteMenu", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        timeout: 5000, // Timeout de 5 segundos
      });

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlMenu.js|deleteMenu] Erro ao deletar menu no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();

module.exports = {
  manutMenu,
  insertMenu,
  viewMenu,
  updateMenu,
  deleteMenu
};
