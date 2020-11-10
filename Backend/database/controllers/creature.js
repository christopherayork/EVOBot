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


// find out why we can't save custom stats into the map with new stat objects
exports.update = function(req, res) {
    let id = req.params.id;
    let changes = req.body;
    //console.log(changes);
    try {
        Creature.findById(id).exec(function(err, results) {
            console.log(err);
            if(err) res.status(404).json({ error: "Could not update creature" });
            else {
                let creature = results["_doc"];
                console.log('before\n----------')
                console.log(creature);
                for(let key in changes) {
                    console.log(`${key}: `);
                    console.log(changes[key]);
                    //console.log(Object.keys(creature));
                    if(!creature.hasOwnProperty(key)) {
                        console.log("results didn't have the property");
                        continue;
                    }
                    let subProp = changes[key];
                    for(let innerKey in subProp) {
                        if(key === "custom") {
                            let newStat = new Stat(subProp[innerKey]);
                            //newStat.save();
                            console.log(newStat);
                            creature[key][innerKey] = newStat;
                        }
                        else creature[key][innerKey] = subProp[innerKey];
                    }
                }
                console.log("after\n---------");
                console.log(creature);
                //console.log(results);
                results.save({}, function(err, updated) {
                    //console.log(updated);
                });
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