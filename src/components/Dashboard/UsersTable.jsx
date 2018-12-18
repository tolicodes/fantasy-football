import React from 'react';
import styled from 'styled-components';
import formatCurrency from 'format-currency';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';

import CountryDropdown from '../Common/CountryDropdown'
import PlayersTable from './PlayersTable';

const BigTextField = styled(TextField)`
    width: 100px;
`;

export default ({
    users,
    admin,
    teams,
    leagueManager,
    handleChange,
    onClickDelete,
    onClickShowTeam,
    handlePlayerChange,
}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Team Name</TableCell>
                    <TableCell>Team Country</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>League Manager</TableCell>
                    <TableCell>Admin</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    users.map(({
                        id,
                        name,
                        teamName,
                        teamCountry,
                        balance,
                        isLeagueManager,
                        isAdmin,
                    }) => (
                        <>
                            <TableRow key={id}>
                                <TableCell>{
                                    admin
                                        ? <BigTextField
                                            value={name}
                                            onChange={handleChange(id, 'name')}
                                            />
                                        : name
                                }</TableCell>
                                <TableCell>{
                                    (admin || leagueManager)
                                        ? <BigTextField
                                            value={teamName}
                                            onChange={handleChange(id, 'teamName')}
                                            />
                                        : teamName
                                }</TableCell>
                                <TableCell>{
                                    (admin || leagueManager)
                                    ? <CountryDropdown
                                        minimal={true}
                                        value={teamCountry}
                                        onChange={handleChange(id, 'teamCountry')}
                                    />
                                    : teamCountry
                                }</TableCell>
                                <TableCell>{
                                    admin
                                    ? <BigTextField
                                        value={balance}
                                        onChange={handleChange(id, 'balance')}
                                    />
                                    : `${formatCurrency(balance)}`
                                }
                                </TableCell>
                                <TableCell>{
                                    <Checkbox
                                        checked={isLeagueManager}
                                        onChange={handleChange(id, 'isLeagueManager')}
                                        disabled={!admin}
                                    />
                                }
                                </TableCell>
                                <TableCell>{
                                    <Checkbox
                                        checked={isAdmin}
                                        onChange={handleChange(id, 'isAdmin')}
                                        disabled={!admin}
                                    />
                                }
                                </TableCell>
                                {admin && <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={onClickDelete(id)}
                                    >
                                        Delete
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={onClickShowTeam(id)}
                                    >
                                        View Team
                                    </Button>
                                </TableCell>}
                            </TableRow>

                            {teams[id] && 
                                <TableRow key={id + '-team'}>
                                    <TableCell colSpan={7}>
                                        <PlayersTable
                                            players={teams[id]}
                                            admin={admin}
                                            leagueManager={leagueManager}
                                            handleChange={handlePlayerChange}
                                        />
                                    </TableCell>
                                </TableRow>
                            }
                        </>
                    ))
                }
            </TableBody>
        </Table>
    )
}