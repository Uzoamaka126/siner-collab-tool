export default {
    createNewWorkspace(state, data) {
        state.workspaces = [...state.workspaces, data]
    },
     showCreateWorkspaceModal(state, booleanValue) {
        //  console.log(state, booleanValue);
        state.showCreateWorkspaceModal = booleanValue
    },
}