import React, { useState } from "react";
import { TextField } from "@material-ui/core";

const Create = (props) => {
    const [fields, setFields] = useState({});
    // retrieve template for default fields from backend
    // lets mock it for now
    const updateField = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    // it has to nest properly to work out correctly
    const updateFieldCustom = (event) => {
        setFields({ ...fields, custom: { ...fields.custom, [event.target.name]: event.target.value } });
    };

    let hardTemplate = {
        stat1: { value: 2, max: 5 },
        stat2: { value: 4, max: 8 },
        stat3: { value: 3, max: 12 },
        custom: {
            custom1: { value: 6, max: 11 },
            custom2: { value: 1, max: 4 }
        }
    };
    return (
        <form>
            {Object.keys(hardTemplate).map(v => {
                return v !== "custom" ?
                    <Stat name={v} setter={updateField} stat={hardTemplate[v]} /> :
                    Object.keys(hardTemplate[v]).map(vi => {
                        return <Stat name={v} setter={updateFieldCustom} stat={hardTemplate[v][vi]} />
                    });
            })}
        </form>
    );
};

// !! Currently not syncing input !!
// takes in a Stat {value: int, max: int} and creates two named/controlled inputs for both values
const Stat = (props) => {
    // we need to sort out the name part of the fields
    // default stats will show the name but have the input locked
    // we need props to match { name, stat: { value, max }, setter() }
    return (
        <div className='stat' id={props.name}>
            <TextField id={props.name + '-value'} name={props.name + '-max'} label='standard' value={props.stat.value} onChange={props.setter} />
            <TextField id={props.name + '-max'} name={props.name + '-max'} label='standard' value={props.stat.max} onChange={props.setter} />
        </div>
    );
};

export default Create;