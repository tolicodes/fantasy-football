import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

import { register } from './actions';
import CountryDropdown from '../Common/CountryDropdown'

const FullWidthText = styled(TextField)`
    width: 100%;
    margin-bottom: 10px !important;
`;

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        teamName: '',
        teamCountry: 'US',
    }

    onChange = field => event => {
        this.setState({
            [field]: event.target.value,
        });
    }

    onClickSubmit = async () => {
        const { 
            email,
            password,
            confirmPassword,
            name,
            teamName,
            teamCountry,
        } = this.state;

        const { register } = this.props;

        if (!email) return alert('Email is required');
        if (!password) return alert('Password is required');
        if (!confirmPassword) return alert('Confirm Password is required');
        if (!name) return alert('Name is required');
        if (!teamName) return alert('Team Name is required');
        if (!teamCountry) return alert('Team Country is required');
        if (password !== confirmPassword) return alert('Password and Confirm Password Must Match');

        register({
            email,
            password,
            name,
            teamName,
            teamCountry,
        });
    }

    render() {
        const {
            email,
            password,
            confirmPassword,
            name,
            teamName,
            teamCountry,
        } = this.state;

        return (
            <>
                <FullWidthText
                    label="Email"
                    type="text"
                    value={email}
                    variant="outlined"
                    onChange={this.onChange('email')}
                />
                <FullWidthText
                    label="Password"
                    type="password"
                    value={password}
                    variant="outlined"
                    onChange={this.onChange('password')}
                />

                <FullWidthText
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    variant="outlined"
                    onChange={this.onChange('confirmPassword')}
                />

                <FullWidthText
                    label="Name"
                    type="text"
                    value={name}
                    variant="outlined"
                    onChange={this.onChange('name')}
                />

                <FullWidthText
                    label="Team Name"
                    value={teamName}
                    type="text"
                    variant="outlined"
                    onChange={this.onChange('teamName')}
                />

                <CountryDropdown
                    value={teamCountry}
                    onChange={this.onChange('teamCountry')}
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
        register,
    }, dispatch)
)(SignUp);