const Router = require("express").Router();
const Creature = require("../database/controllers/creature");
const errorWrapper = require("../utility/errorWrapper");



Router.route("/")
    .get(errorWrapper(async (req, res) => {
        return Creature.readAll(req, res);
    }))
    .post(errorWrapper(async (req, res) => {
        // auth required
        return Creature.create(req, res);
    }));

Router.route("/:id")
    .get(errorWrapper(async (req, res) => {
        if(!req.params.id) return res.status(400).json({ error: "id param required" });
        else return Creature.read(req, res);
    }))
    .put(errorWrapper(async (req, res) => {
        // auth required
        if(!req.params.id) return res.status(400).json({ error: "id param required" });
        else return Creature.update(req, res);
    }))
    .delete(errorWrapper(async (req, res) => {
        // auth required
        if(!req.params.id) return res.status(400).json({ error: "id param required" });
        else return Creature.delete(req, res);
    }));

module.exports = Router;