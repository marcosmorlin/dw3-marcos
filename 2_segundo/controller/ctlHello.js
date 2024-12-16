<<<<<<< HEAD
const hello = (req, res) => (async () => {
    res.json({ status: "ok", "mensagem": "Olá segundo!" });
})();

const helloUser = (request, res)  => (async () =>{
    const { username } = request.body
    res.json({ status: "ok", "nomeusuario": username });	
} )();

module.exports = {
    hello,
    helloUser,
}	
=======
## arquivo: controller/ctlHello.js
2
3 const hello = (req, res) => (async () => {
4 res.json({ status: "ok", "mensagem": "Olá segundo!" });
5 })();
6
7 const helloUser = (request, res) => (async () =>{
8 const { username } = request.body
9 res.json({ status: "ok", "nomeusuario": username });
10 } )();
11
12 module.exports = {
13 hello,
14 helloUser,
15 }
>>>>>>> b15f9c093410c00132cfdebb750ac24a7a55bf80
