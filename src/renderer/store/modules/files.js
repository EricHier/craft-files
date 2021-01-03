import { ipcRenderer } from "electron";

const store = {
    state: {
        files: [],
        folders: []
    },
    mutations: {
        updateFolders: (state, folders) => state.folders = folders,
        updateFiles: (state, files) => state.files = files
    },
    actions: {
        subscribeUpdates(store) {
            ipcRenderer.on("folders", (event, folders) => {
                store.commit("updateFolders", folders);
            });
            ipcRenderer.on("files", (event, files) => {
                store.commit("updateFiles", files);
            });
        }
    }
};

export default store;