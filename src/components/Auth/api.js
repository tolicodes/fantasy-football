import firebase from 'firebase';
import axios from 'axios';

const { REACT_APP_API_URL: API_URL } = process.env;

export const setPersistance = () => 
    firebase.auth().setPersistence(
        firebase.auth.Auth.Persistence.LOCAL
    );

export const signIn = async ({
    email,
    password,
}) => firebase.auth().signInWithEmailAndPassword(
    email,
    password,
);

export const register = async ({
    email,
    password,
}) => firebase.auth().createUserWithEmailAndPassword(
    email,
    password,
);

export const createUser = async ({
    name,
    teamCountry,
    teamName,
}) => axios.post(API_URL + 'users/', {
    name,
    teamCountry,
    teamName,
});

export const getMe = async () => axios.get(API_URL + 'users/me');