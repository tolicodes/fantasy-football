import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { bindActionCreators } from 'redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PlayersTable from './PlayersTable';
import UsersTable from './UsersTable';
import Header from './Header';

import {
    sellPlayer,
    buyPlayer,
    updatePlayer,
    updateUser,
    deleteUser,
    getTeamForUser,
} from './actions';

const SellTextField = styled(TextField)`
    width: 200px;
`;

const SellButton = styled(Button)`
    margin-top: 10px !important;
    width: 200px;
`;

const BuyButton = styled(Button)`
    width: 200px;
`;

class Dashboard extends React.Component {
    state = {
        playerPrices: {},
        tabIndex: 0,
    }

    handleChangeTab = (event, index) => {
        this.setState({
            tabIndex: index
        })
    }

    componentWillReceiveProps(props) {
        const { team, playersForSale } = props;
        const { playerPrices } = this.state;

        [
            ...team,
            ...playersForSale
        ].forEach(({ id, forSale }) => {
            playerPrices[id] = forSale;
        });

        this.setState({
            playerPrices
        });
    }

    onClickSell = id => () => {
        const { sellPlayer } = this.props;
        const { playerPrices } = this.state;

        sellPlayer({
            id,
            amount: playerPrices[id]
        });
    }

    onClickBuy = id => () => {
        const { buyPlayer } = this.props;

        buyPlayer({
            id,
        });
    }

    onPriceChange = id => ({ target: { value }}) => {
        const { playerPrices } = this.state;
        
        playerPrices[id] = value;

        this.setState({
            playerPrices,
        })
    }

    handlePlayerChange = (id, field) =>  ({ target: { value }}) => {
        const { team, updatePlayer } = this.props;
        const player = team.find(player => player.id === id);

        updatePlayer({
            ...player,
            [field]: value,
        })
    }

    handleUserChange = (id, field) => ({ target: { value, checked }}) => {
        const { users, updateUser } = this.props;
        const user = users.find(user => user.id === id);

        updateUser({
            ...user,
            [field]: value || !!checked,
        })
    }

    onClickDelete = id => () => {
        this.props.deleteUser(id);
    }

    onClickShowTeam = id => () => {
        this.props.getTeamForUser(id);
    }

    getTeamValue() {
        const { team } = this.props;;

        return team.reduce((sum, player) => {
            return sum + player.value;
        }, 0);
    }

    render() {
        const { team, playersForSale, me, users, teams } = this.props;
        const { playerPrices, tabIndex } = this.state;
        const { teamName, teamCountry, isAdmin, isLeagueManager } = me;

        return (
            <div>
                <Header
                    {...me}
                    teamValue={this.getTeamValue()}
                />
                <Tabs
                    value={tabIndex}
                    onChange={this.handleChangeTab}
                >
                    <Tab label={`Your Team - ${teamName} (${teamCountry})`} />
                    <Tab label="Players For Sale" />
                    { (isAdmin || isLeagueManager) &&
                        <Tab label="Manage Users" />
                    }
                </Tabs>

                { tabIndex === 0 && <PlayersTable
                    players={team}
                    actionTitle="Sell Player"
                    handleChange={this.handlePlayerChange}
                    editable={true}
                    ActionColumn={(id) =>
                        <>
                            <SellTextField
                                onChange={this.onPriceChange(id)}
                                variant="outlined"
                                value={playerPrices[id]}
                            />

                            <SellButton
                                variant="contained"
                                color="primary"
                                onClick={this.onClickSell(id)}
                            >
                                List for Sale
                            </SellButton>
                        </>
                    }
                /> }

                { tabIndex === 1 && <PlayersTable
                    players={playersForSale}
                    actionTitle="Buy Player"
                    ActionColumn={id => 
                        <>
                            ${playerPrices[id]}

                            <BuyButton
                                onClick={this.onClickBuy(id)}
                                variant="contained"
                                color="primary"
                            >
                                Buy
                            </BuyButton>
                        </>
                    }
                /> }

                { tabIndex === 2 && <UsersTable
                    users={users}
                    teams={teams}
                    admin={isAdmin}
                    leagueManager={isLeagueManager}
                    handleChange={this.handleUserChange}
                    onClickDelete={this.onClickDelete}
                    onClickShowTeam={this.onClickShowTeam}
                    handlePlayerChange={this.handlePlayerChange}
                /> }
            </div>
        )
    }
}

export default connect(
    ({
        app: {
            playersForSale,
            team,
            users,
            teams,
        },
        auth: {
            me,
        }
    }) => ({
        team,
        teams,
        playersForSale,
        me,
        users,
    }),
    dispatch => bindActionCreators({
        sellPlayer,
        buyPlayer,
        updatePlayer,
        updateUser,
        deleteUser,
        getTeamForUser,
    }, dispatch)
)(Dashboard);
