const { format } = require('url')
const { fork } = require('child_process')
const path = require('path')

const logger = require('./logger')
const RendererHandler = require('./renderer.handler')
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
  ).catch((error) => log.handleMsg({
    level: 'error',
    message: `Extenstions error - ${error}`
  }))
}

let events = null
const log = logger.loggerInstance
log.init()

const handleEventsMsg = (renderer, msg: any) => {
  const actionType = msg.topic.split('.')[1]
  switch (actionType) {
    case 'log':
      log.handleMsg(msg)
      break
    case 'window':
      const rendererHandler = new RendererHandler(renderer, msg)
      rendererHandler.call()
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
    show: false
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
