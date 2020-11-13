import React, { useState } from "react";
import { Input } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


let hardTemplate = {
    stat1: { value: 2, max: 5 },
    stat2: { value: 4, max: 8 },
    stat3: { value: 3, max: 12 },
    custom: {
        custom1: { value: 6, max: 11 },
        custom2: { value: 1, max: 4 }
    }
};

const Create = (props) => {
    const [fields, setFields] = useState(hardTemplate);
    // retrieve template for default fields from backend
    // lets mock it for now
    const updateField = (event, tag) => {
        setFields({
            ...fields,
            [event.target.name]: {
                ...fields[event.target.name],
                [tag]: event.target.value
            }
        });
    };

    // it has to nest properly to work out correctly
    const updateFieldCustom = (event, tag) => {
        setFields({
            ...fields,
            custom: {
                ...fields.custom,
                // each field holds a stat of the format -> stat: { value: int, max: int }
                // we want to keep the other and change the target using the tag, which will either be 'value' or 'max'
                [event.target.name]: {
                    ...fields[event.target.name],
                    [tag]: event.target.value
                }
            }
        });
    };
    let keys = Object.keys(fields);
    let customKeys = Object.keys(fields["custom"]);
    let defaults = keys.filter(v => v !== "custom");
    let vals = defaults.map(v => {
        return <Stat key={v} name={v} setter={updateField} stat={fields[v]} />
    });
    let customVals = customKeys.map(v => {
        return <Stat key={v} name={v} setter={updateFieldCustom} stat={fields["custom"][v]} />
    });
    return (
        <form>
            <Table className='stat table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Stat</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Max</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vals}
                    {customVals}
                </TableBody>
            </Table>
        </form>
    );
};

// !! Currently not syncing input !!
// takes in a Stat {value: int, max: int} and creates two named/controlled inputs for both values
const Stat = (props) => {
    // we need to sort out the name part of the fields
    // default stats will show the name but have the input locked
    // we need props to match { name, stat: { value, max }, setter() }
    let applyProps = (tag) => {
        return {
            key: `${props.name}-${tag}`,
            id: `${props.name}-${tag}`,
            name: props.name,
            label: `${props.name} ${tag}`,
            value: props.stat[tag], // its very important that tag always matches the attribute key
            variant: 'outlined',
            onChange: (event) => props.setter(event, tag) // tell it whether its value or max
        };
    }
    return (
        <TableRow className='stat' id={props.name}>
            <TableCell>
                {props.name}
            </TableCell>
            <TableCell>
                <Input {...applyProps('value')} />
            </TableCell>
            <TableCell>
                <Input {...applyProps('max')} />
            </TableCell>
        </TableRow>
    );
};

export default Create;