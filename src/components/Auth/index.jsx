import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';

import SignIn from './SignIn';
import SignUp from './SignUp';

const Container = styled.div`
    width: 500px;
    margin: 0 auto;
`;

const FullWidthTabs = styled(Tabs)`
    width: 100%;
    margin-bottom: 20px;
`;

const HalfTab = styled(Tab)`
    width: 50%;
`;

export default class extends React.Component {
    state = {
        tabIndex: 0,
    }

    handleChangeTab = (event, index) => {
        this.setState({
            tabIndex: index
        })
    }

    render() {
        const { tabIndex } = this.state;

        return (
            <Container>
                <FullWidthTabs
                    value={tabIndex}
                    onChange={this.handleChangeTab}
                >
                    <HalfTab label="Register" />
                    <HalfTab label="Login" />
                </FullWidthTabs>

                { tabIndex === 0 && <SignUp/> }
                { tabIndex === 1 && <SignIn/> }
            </Container>
        );
    }
}