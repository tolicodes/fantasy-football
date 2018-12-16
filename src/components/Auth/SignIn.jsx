import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { signIn } from './actions';

const FullWidthText = styled(TextField)`
    width: 100%;
    margin-bottom: 10px !important;
`;

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }

    onChange = field => event => {
        this.setState({
            [field]: event.target.value,
        });
    }

    onClickSubmit = async () => {
        const { email, password } = this.state;
        const { signIn } = this.props;

        if (!email) return alert('Email is required');
        if (!password) return alert('Password is required');

        signIn({
            email,
            password,
        });
    }

    render() {
        return (
            <>
                <FullWidthText
                    label="Email"
                    type="text"
                    variant="outlined"
                    onChange={this.onChange('email')}
                />
                <FullWidthText
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={this.onChange('password')}
                />

                <Button
                    type="submit"
                    onClick={this.onClickSubmit}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </>
        )
    }
}

export default connect(
    null,
    dispatch => bindActionCreators({
        signIn,
    }, dispatch)
)(SignIn);
