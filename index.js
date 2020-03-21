//criar as constantes
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then(()=>{
        console.log("Conectado ao banco");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    });

// regras do postCSS
// const postcss= require("postcss-middleware");
// const autoprefixer = require("autoprefixer");
// const postcssImport = require("postcss-import");
// const postcssSimpleVars = require("postcss-simple-vars");
// const postcssNested = require("postcss-nested");
// const postcssMixins = require("postcss-mixins");
// diretorio usado para o postcss
// const path = require("path");

// app.use(
//     '/stylesheets', postcss({
//       src: function(req) {
//         return path.join(__dirname, 'public', 'stylesheets', req.path);
//       },
//       plugins: [
//         postcssImport(),
//         postcssMixins(),
//         postcssNested(),
//         postcssSimpleVars(),
//         autoprefixer()
//       ],
//       options: {
//         map: {
//           inline: false
//         }
//       }
//     }
//   ));

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    Pergunta.findAll({raw:true,order:[
        ['id','DESC']
    ]}).then(perguntas =>{
        res.render("index",{
            Perguntas:perguntas
        });
    })
   
});

app.get("/perguntar" ,(req,res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo : titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/")
    });
});

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta =>{
        if(pergunta !=undefined){
            Resposta.findAll({
                where : {perguntaId:pergunta.id},  
                order : [['id', 'DESC']]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
                });
            });
        }else{
            res.render("/"); 
        }
    });
});

app.post("/responder",(req,res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo : corpo,
        perguntaId : perguntaId
    }).then(()=>{
        res.redirect("/pergunta/" + perguntaId);
    });
});




app.listen(3000, ()=>{
    console.log("ON");
});