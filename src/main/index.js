import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import Store from "electron-store";
import * as fs from "fs";

const store = new Store();

function loadFiles() {
    const files = [];
    const folders = store.get("folders");
    const possibleImages = ["bild.jpg", "bild.jpeg", "bild.png"];

    folders.forEach(folder => {
        const newFiles = fs.readdirSync(folder);
        newFiles.map(file => {

            const dir = fs.lstatSync(`${folder}/${file}`).isDirectory();
            if (!dir)
                return;

            const description = fs.existsSync(`${folder}/${file}/notiz.txt`) ? fs.readFileSync(`${folder}/${file}/notiz.txt`, "utf8") : "";
            let image = "";

            possibleImages.forEach(possibleImage => {
                if (fs.existsSync(`${folder}/${file}/${possibleImage}`))
                    image = `file://${folder}/${file}/${possibleImage}`;
            })

            files.push({
                name: file,
                description,
                image,
                folder
            });
        });
    });

    store.set("files", files)
    ipcMain.emit("files", files);
}

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        title: "PlottrOrganizr",
        webPreferences: {
            webSecurity: false
        }
    })

    mainWindow.loadURL(winURL)
    mainWindow.maximize()
    mainWindow.setMenu(null)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

ipcMain.on("open", (event, folder) => {
    console.log(folder)
    shell.openItem(folder);
})

ipcMain.on('select-dirs', async (event, arg) => {
    let folders = store.get("folders");

    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    })

    folders = [...folders, ...result]

    store.set("folders", folders);

    loadAndSend(event.sender);
})

ipcMain.on("delete-dirs", (event) => {
    store.set("folders", [])
    store.set("files", [])

    event.sender.send("folders", [])
    event.sender.send("files", [])
})

ipcMain.on("load", (event) => {
    loadAndSend(event.sender);
});

function loadAndSend(sender) {
    sender.send("folders", store.get("folders"))
    sender.send("files", store.get("files"))

    loadFiles()

    sender.send("files", store.get("files"))
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */