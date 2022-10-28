const GITHUB_BASE_URL = require("./constans");
const axios = require("axios");

const listUsers = async (id = 0) => {
    try {
        const response = await axios.get(`${GITHUB_BASE_URL}/users?since=${id}&per_page=100`)
        return response.data
    } catch(e) {
        throw e
    }
}

const getUserDetails = async userName => {
    try {
        const response = await axios.get(`${GITHUB_BASE_URL}/users/${userName}`)
        return response.data
    } catch(e) {
        throw e
    }
}

const getUserRepos = async userName => {
    try {
        const response = await axios.get(`${GITHUB_BASE_URL}/users/${userName}/repos`)
        return response.data
    } catch(e) {
        throw e
    }
}

module.exports = {
    listUsers,
    getUserDetails,
    getUserRepos    
};