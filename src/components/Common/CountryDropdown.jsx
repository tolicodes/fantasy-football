import React from 'react';
import countryList from 'country-list';
import styled from 'styled-components';

import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const FullWidthSelect = styled(FormControl)`
    width: 100%;
    margin-bottom: 10px !important;
`;

const inputField = (minimal) => !minimal ? {
    input: <OutlinedInput
        labelWidth={100}
    />
} : {};

export default ({ onChange, value, minimal }) => (
    <FullWidthSelect>
        {!minimal && <InputLabel>Team Country</InputLabel>}
        <Select
            value={value}
            onChange={onChange}
            {...inputField(minimal)}
        >
            {
                countryList.getData().map(({
                    code,
                    name,
                }) => (
                    <MenuItem key={code} value={code}>
                        {name}
                    </MenuItem>
                )) 
            }
        </Select>
    </FullWidthSelect>
)