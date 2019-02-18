
const { promisify } = require('util')
const fs = require('fs')
const removeDir = require('rmrf')

const readDir = promisify(fs.readdir)
const createDir = promisify(fs.mkdir)
const removeFile = promisify(fs.unlink)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const service = {
  readDir: async (path) => {
    try {
      const output = await readDir(`${path}`)
      return output
    } catch (e) {
      return e
    }
  },
  readFile: async (path) => {
    try {
      const output = await readFile(`${path}`)
      return output
    } catch (e) {
      return e
    }
  },
  writeFile: async (path, filename, filetype, data) => {
    try {
      const method = await writeFile(`${path}/${filename}.${filetype}`, data)
      return {
        log: '[DEV]diskService|writeFile|SUCCESS'
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|readDir|FAILURE|${e}`
      }
    }
  },
  removeFile: async (path) => {
    try {
      const output = await removeFile(`${path}`)
      return {
        log: '[DEV]diskService|removeFile|SUCCESS',
        output
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|removeFile|FAILURE|${e}`,
      }
    }
  },
  createDir: async (path) => {
    try {
      const output = await createDir(`${path}`)
      return {
        log: '[DEV]diskService|createDir|SUCCESS',
        output
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|createDir|FAILURE|${e}`
      }
    }
  },
  removeDir: async (path) => {
    try {
      const output = await removeDir(`${path}`)
      return {
        log: '[DEV]diskService|removeDir|SUCCESS',
        output
      }
    } catch (e) {
      return {
        log: `[DEV]diskService|removeDir|FAILURE|${e}`
      }
    }
  }
}

module.exports = service
