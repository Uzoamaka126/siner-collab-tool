import axios from 'axios'

export function fetchClients(query) {
    const url = '/clients';

    return axios({
        method: 'post',
        url: url,
    })

}

export function createNewClient(payload) {
    const url = '/clients';

    return axios({
        method: 'post',
        url: url,
        data: payload,
    })
}

export function editClient(id, payload) {
    const url = `/clients/${id}`;

    return axios({
        method: 'put',
        url: url,
        data: payload,
    })
}

export function deleteClient(id) {
    const url = `/clients/${id}`;

    return axios({
        method: 'delete',
        url: url,
    })
}