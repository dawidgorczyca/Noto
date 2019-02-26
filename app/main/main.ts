const path = require('path')
const os = require('os')
const storage = require('electron-json-storage')
const { format } = require('url')
const { fork } = require('child_process')
const { dialog } = require('electron')

const logger = require('./logger')
const RendererHandler = require('./renderer.handler')
const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const { resolve } = require('app-root-path')

storage.setDataPath(os.tmpdir())

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  // tslint:disable-next-line:no-console
  ).catch((error) => log.handleMsg({
    level: 'error',
    message: `Extenstions error - ${error}`
  }))
}

let events = null
const log = logger.loggerInstance
log.init()

const handleEventsMsg = async (renderer, msg: any) => {
  const actionType = msg.topic.split('.')[1]
  switch (actionType) {
    case 'log':
      log.handleMsg(msg)
      break
    case 'window':
      const rendererHandler = new RendererHandler(renderer, msg)
      rendererHandler.call()
    case 'dialog':
      const dialogHandler = new RendererHandler(dialog, msg)
      const results = await dialogHandler.get()
      if(results && results.length) {
        storage.set('noto_lastFile', { results }, function(error) {
          if (error) throw error;
        })
        log.handleMsg({
          level: 'info',
          message: results
        })
      }
  }
}

const eventsInit = (renderer: any) => {
  const eventsSrc = path.join(__dirname, '../events', 'events.js')
  events = fork(eventsSrc)

  log.handleMsg({
    level: 'info',
    message: 'Events Central initialized'
  })

  events.on('message', (msg) => handleEventsMsg(renderer, msg)
}

app.on('ready', async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false
  })
  eventsInit(mainWindow)

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

const shutdownAll = () => {
  events.kill('SIGINT')
  app.quit()
  log.handleMsg({
    level: 'info',
    message: 'App closed'
  })
  process.exit()
}

app.on('window-all-closed', () => shutdownAll())
process.on( 'SIGTERM', () => shutdownAll())
