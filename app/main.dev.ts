/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import { BrowserWindow, app } from 'electron'

import MenuBuilder from './menu'
// import ScrollState from './utils/ScrollState'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import { setParams } from './constants/params'

const path = require('path')

require('v8-compile-cache')

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  } else {
    app.show()
    app.focus()
  }
})

app.on('browser-window-focus', () => {
  // const connectedSocket = socket.getSocket()
  // if (connectedSocket) {
  //   console.log('browser-window-focus socket.connected:', connectedSocket.connected)
  //   if (!connectedSocket.connected) {
  //     connectedSocket.connect()
  //     connectedSocket.emit('reconnect')
  //   }
  // }
  app.setBadgeCount(0)
})

app.on('open-url', (event, data) => {
  event.preventDefault()
  console.log(data)
})

app.setAsDefaultProtocolClient('strum')

let forceQuit = false

app.on('before-quit', () => {
  forceQuit = true
})
const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions()
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1680,
    minWidth: 1040,
    minHeight: 540,
    height: 1080,
    icon: path.join(__dirname, '/assets/logo/icons/mac/app.icns'),
    // icon: `file://${__dirname}/assets/logo/icons/png/64x64.png`,
    titleBarStyle: 'hidden',
    // frame: false,
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)
  mainWindow.setMenuBarVisibility(false) // for windows

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('closed', (e) => {
    mainWindow = null
  })

  mainWindow.on('close', (e) => {
    if (process.platform === 'darwin') {
      if (!forceQuit) {
        e.preventDefault()
        app.hide()
      }
    }
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
}

app.on('ready', createWindow)

// register strum as protocal to open in browser

// This will catch clicks on links such as <a href="foobar://abc=1">open in foobar</a>
app.on('open-url', function(event, data) {
  event.preventDefault()
  console.log(data)
  setParams(data)
})

app.setAsDefaultProtocolClient('strum')

// Export so you can access it from the renderer thread
