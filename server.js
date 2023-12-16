import express from 'express';
import Formations from './models/Formations.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", async function (req, res) {
  const formationDispo = await Formations.loadMany(); //Va falloir mettre un param style AjoutPanier: 1
  res.render('listFormations.ejs', {formationDispo});
});

app.get("/panier", async function (req, res){
  const panier = await Formations.loadMany({AjoutPanier: 1}); //Va falloir mettre un param style AjoutPanier: 1
  res.render('listPanier.ejs', {panier});//Faut mettre un autre fichier que listFormations.ejs créer un truc comme broken
});

app.get("/inscription/:id", async function(req, res){
  const Panier = await Formations.load({idforma: req.params.id});
  Panier.AjoutPanier = 1;
  await Panier.save();
  res.redirect('/');
});

app.get("/annule/:id", async function (req, res) {
  const Annulation = await Formations.load({ idforma : req.params.id });
  Annulation.AjoutPanier = 0;
  await Annulation.save();
  res.redirect('/panier');
});

app.post("/add", async function (req, res) { //Pour le moment ajouter un truc comme qd on ajoute une nouvelle TV mais nous on veut ajout comme qd ajout dans liste boughtList
  const NewLigne = new Formations();
  NewLigne.Prix = req.body.Prix
  await NewLigne.save();
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await Formations.delete({ idforma : req.params.id });
  res.redirect('/');
});

app.listen(4000);
