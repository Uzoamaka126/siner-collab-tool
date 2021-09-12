
export default {
    addNewWorkspace({ commit }, data) {
        if(data) {
            commit('createNewWorkspace', data)
        }
    },
    viewCreateWorkspaceModal({ commit }, value) {
        commit('showCreateWorkspaceModal', value)
    }
}