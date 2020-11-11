const { Creature, Stat } = require("../schemas/creature");


function hasAllProps(target, required) {
    if(typeof target !== "object") return false;
    for(let value of required) {
        if(!target.hasOwnProperty(value)) return false;
    }
    return true;
}

exports.create = function(req, res) {
    // we'll want to validate the sent object
    let creatureProps = req.body;
    try {
        let newCreature = new Creature(creatureProps);
        newCreature.save(function(err) {
            console.log(err);
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


// in mongoose, maps must be manipulated through get/set only
exports.update = function(req, res) {
    let id = req.params.id;
    let changes = req.body;
    try {
        Creature.findById(id).exec(function(err, results) {
            if(err) res.status(404).json({ error: "Could not update creature" });
            else {
                let creature = results["_doc"];
                for(let key in changes) {
                    if(!creature.hasOwnProperty(key)) continue;
                    let subProp = changes[key];
                    for(let innerKey in subProp) {
                        if(key === "custom") {
                            let newStat = new Stat(subProp[innerKey]);
                            let customMap = creature[key];
                            customMap.set(innerKey, newStat);
                        }
                        else creature[key][innerKey] = subProp[innerKey];
                    }
                }
                results.save({});
                res.status(200).json(results);
            }
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