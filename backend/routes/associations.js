const express = require("express")
const app = express()

//  permet de récupèrer les information que je met dans postman quand je post
app.use(express.json())
let associations = require("../associations.json")
let message = require("../message.json")

//  middleware
const ExistingAssociation =(req, res, next) => {

    // récupérer le paramètre dynamique
    const {slug} = req.params
    const existAssociation = associations.find( association => association.name === slug.toLowerCase())

    if (existAssociation) {
        next()
    } else {
        res.status(404).send("L'association n'existe pas !")
    }
}
const existAssociation =(req, res, next) => {
    console.log("result =>",req.body.association_concernée);
    const theExistAssociation = associations.find(association => association.name === req.body.association_concernée.toLowerCase())
    if (theExistAssociation) {
        next()
    } else {
        res.status(404).send("L'association n'existe pas !")
    }
}
// route pour voir toutes les associations
app.get('/', (req, res) => { 
    res.json(associations)
})

//  route qui montre une seul association grace au param dynamique
app.get("/:slug",ExistingAssociation, (req, res) => {
    const {slug} = req.params
    const selectedAssociation = associations.find( association => association.name === slug.toLowerCase())
    
    res.status(200).json(selectedAssociation)
})
// route pour voir les messages ajouter
app.get('/:slug/messages', (req, res) => { 
    res.json(message)
})
// route pour ajouter des messages dans le fichier json
app.post("/",existAssociation, (req, res) => {

    console.log("result postman=>", req.body);

    // réponse de req.body dans une const
        const newMessage = {

            //  messageAssociation.length +1,
                ...req.body,

            
        }
        // // push le message dans le json message
        message = [...message, newMessage]
        res.status(200).json(message)
        
})

module.exports = app