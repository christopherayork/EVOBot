const Creature = require("../schemas/creature");

exports.create = function(req, res) {
    // we'll want to validate the sent object
    let creatureProps = req.body;
    try {
        let newCreature = new Creature(creatureProps);
        newCreature.save(function(err) {
            if(err) res.status(400).json({ error: "Unable to save creature" });
            else res.status(200).json({ message: "Creature saved" });
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: "Something went wrong" });
    }
}

exports.read = function(req, res) {
    let id = req.params.id;
    try {
        Creature.findById(id).exec(function(err, results) {
            if(err) return res.status(404).json({ error: 'Could not retrieve creature' });
            else res.status(200).json(results);
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: "Something went wrong" });
    }
}

exports.readAll = function(req, res) {
    try {
        Creature.find({}).exec(function(err, results) {
            if(err) return res.status(404).json({ error: 'Could not retrieve creatures' });
            else res.status(200).json(results);
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: "Something went wrong" });
    }
}

exports.update = function(req, res) {
    let id = req.params.id;
    try {
        Creature.findByIdAndUpdate(id).exec(function(err, results) {
            if(err) res.status(400).json({ error: "Could not update creature" });
            else res.status(200).json(results);
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: "Something went wrong" });
    }
}

exports.delete = function(req, res) {
    let id = req.params.id;
    try {
        Creature.findByIdAndDelete(id).exec(function(err, results) {
            if(err) res.status(400).json({ error: "Could not delete creature" });
            else res.status(200).json(results);
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: "Something went wrong" });
    }
}