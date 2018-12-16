import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { bindActionCreators } from 'redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PlayersTable from './PlayersTable';

import {
    sellPlayer,
    buyPlayer,
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

    handleChange = (id, field) =>  ({ target: { value }}) => {
        console.log(id, field, value)
    }

    render() {
        const { team, playersForSale } = this.props;
        const { playerPrices, tabIndex } = this.state;

        return (
            <div>
                <Tabs
                    value={tabIndex}
                    onChange={this.handleChangeTab}
                >
                    <Tab label="Your Team" />
                    <Tab label="Players For Sale" />
                </Tabs>

                { tabIndex === 0 && <PlayersTable
                    players={team}
                    actionTitle="Sell Player"
                    handleChange={this.handleChange}
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
            </div>
        )
    }
}

export default connect(
    ({
        app: {
            playersForSale,
            team,
        },
    }) => ({
        team,
        playersForSale,
    }),
    dispatch => bindActionCreators({
        sellPlayer,
        buyPlayer,
    }, dispatch)
)(Dashboard);
