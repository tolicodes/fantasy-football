import React from 'react';
import formatCurrency from 'format-currency';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const Title = styled(Typography)`
    flex-grow: 1;;
`;

export default ({
    name,
    balance,
    teamValue,
}) => (
    <AppBar position="static">
        <Toolbar>
            <Title
                variant="h6" color="inherit"
            >Fantasty Football</Title>

            <Typography color="inherit">
                <strong>{name}</strong> | 
                <strong> Balance:</strong> ${formatCurrency(balance)} |
                <strong> Team Value:</strong> ${formatCurrency(teamValue)}
            </Typography>
        </Toolbar>
    </AppBar>
)