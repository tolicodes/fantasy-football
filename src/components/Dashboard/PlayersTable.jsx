import React from 'react';
import styled from 'styled-components';
import formatCurrency from 'format-currency';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import CountryDropdown from '../Common/CountryDropdown'

const SellColumn = styled(TableCell)`
    width: 200px;
`;

const BigTextField = styled(TextField)`
    width: 100px;
`;

export default class PlayersTable extends React.Component {
    render() {
        const { 
            players,
            actionName,
            ActionColumn,
            editable,
            handleChange,
        } = this.props;
        
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Value</TableCell>
                        <SellColumn>{ actionName }</SellColumn>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        players.map(({
                            image,
                            firstName,
                            lastName,
                            position,
                            age,
                            country,
                            value,
                            id
                        }) => (
                            <TableRow key={id}>
                                <TableCell>
                                    <img
                                        width={100}
                                        src={image}
                                        alt={firstName + ' ' + lastName}
                                    />
                                </TableCell>
                                <TableCell>{
                                    editable
                                        ? <BigTextField
                                            value={firstName}
                                            onChange={handleChange(id, 'firstName')}
                                            />
                                        : firstName
                                }</TableCell>
                                <TableCell>{
                                    editable
                                        ? <BigTextField
                                            value={lastName}
                                            onChange={handleChange(id, 'lastName')}
                                            />
                                        : lastName
                                }</TableCell>
                                <TableCell>{position}</TableCell>
                                <TableCell>{age}</TableCell>
                                <TableCell>{
                                    editable
                                    ? <CountryDropdown
                                        value={country}
                                        onChange={handleChange(id, 'country')}
                                    />
                                    : country
                                }</TableCell>
                                <TableCell>${formatCurrency(value)}</TableCell>
                                <TableCell>
                                   {ActionColumn(id)}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        )
    }
}