const { format } = require('url')
const { fork } = require('child_process')
const path = require('path')

const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const { resolve } = require('app-root-path')

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  // tslint:disable-next-line:no-console
  ).catch(console.log)
}

const runBroker = (renderer) => {
  const brokerSrc = path.join(__dirname, 'ipc.broker.js')
  const broker = fork(brokerSrc)
  broker.on('message', (msg) => {
    renderer.webContents.send('ping', msg)
  })
}

app.on('ready', async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  })

  runBroker(mainWindow)

  if (isDev) {
    await installExtensions()
  }
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  const devPath = 'http://localhost:1124'
  const prodPath = format({
    pathname: resolve('app/renderer/.parcel/production/index.html'),
    protocol: 'file:',
    slashes: true
  })
  const url = isDev ? devPath : prodPath

  mainWindow.setMenu(null)
  mainWindow.loadURL(url)
})

app.on('window-all-closed', app.quit)
