/*
    Notes
        * Core stats are universal across the board
        * Include a map of additional fields that can be added/edited/deleted by the user
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statSchema = new Schema({
    value: { type: Number, required: true },
    max: { type: Number, required: true }
});

const defaultStat = { value: 0, max: 0 };
const defaultStatField = { type: statSchema, default: defaultStat };

const movementStatSchema = new Schema({
    speed: defaultStatField,
    control: defaultStatField,
    leap: defaultStatField
});

const defaultMovement = { type: movementStatSchema };

const creatureSchema = new Schema({
    population: { ...defaultStatField, required: true },
    brain: { ...defaultStatField, required: true },
    sight: { ...defaultStatField, required: true },
    touch: { ...defaultStatField, required: true },
    hearing: { ...defaultStatField, required: true },
    smell: { ...defaultStatField, required: true },
    taste: { ...defaultStatField, required: true },
    swimming: defaultMovement,
    land: defaultMovement,
    flying: defaultMovement,
    attack: { ...defaultStatField, required: true },
    defense: { ...defaultStatField, required: true }
});

module.exports = mongoose.model("Creature", creatureSchema);