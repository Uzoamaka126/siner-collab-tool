import authState from './auth'

export default {
    ...authState.actions()
}

export default {
    addNewWorkspace({ commit }, data) {
        if(data) {
            commit('createNewWorkspace', data)
        }
    },
    viewCreateWorkspaceModal({ commit }, value) {
        commit('showCreateWorkspaceModal', value)
    },
    setSingleWorkspaceDetails({ commit }, data) {
        commit('addSingleWorkspaceDetails', data)
    },
}