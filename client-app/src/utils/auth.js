import decode from 'jwt-decode';
import axios from 'axios';
import Router from 'vue-router';

const API_BASE_URL = process.env.BASE_URL_ || 'http://localhost:3000';
const TOKEN = 'token';

// clear token from LS
export function clearToken() {
    return localStorage.removeItem(TOKEN);
}

// set token on LS
export function setToken(token) {
    var jwt_token = token;
    return localStorage.setItem(TOKEN, jwt_token);
}

// fetch token from LS
function getToken() {
    return localStorage.getItem(TOKEN);
}

// Takes in a token, decodes it and returns its expiry date
function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

// Check if token in LS is expired
function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}

export const isUserAuthenticated = () => {
    const token = getToken();
    return !!token
}

export function isRouteAuthRequired(to, from, next) {
    if (!isUserAuthenticated()) {
        console.log('!isUserAuthenticated:', !isUserAuthenticated);
        console.log('fullPath:', to);
        next({ name : 'login'});
    } else {
        next();
    }
}

export function login(data) {
    let d = q.defer();
    let app = this;
    loginRequest(data).then(async function(resp){
        await setToken(resp);
        await setUserRoles(resp.data.user.roles);
        await setUserFullname(resp.data.user);
        d.resolve(resp);
    }).catch(function(err){
        console.log(err);
        d.reject(err.toString());
    });
    return d.promise;
}

export function logout() {
    clearToken();
}

export function setUserDetails(data){
    if(!data.firstname && !data.lastname){
        return localStorage.setItem('userDetails', data)
    }
    else{
        return localStorage.setItem('userDetails', null)

    }
}

export function getUserDetails (){
    return localStorage.getItem('userDetails')
}