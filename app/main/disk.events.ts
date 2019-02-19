const { promisify } = require('util')
const fs = require('fs')
const removeDir = require('rmrf')

const readDir = promisify(fs.readdir)
const createDir = promisify(fs.mkdir)
const removeFile = promisify(fs.unlink)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const service = {
  readDir: async (path) => await readDir(`${path}`),
  readFile: async (path) => await readFile(`${path}`),
  writeFile: async (path, filename, filetype, data) => await writeFile(`${path}/${filename}.${filetype}`, data),
  removeFile: async (path) => await removeFile(`${path}`),
  createDir: async (path) => await createDir(`${path}`),
  removeDir: async (path) => await removeDir(`${path}`)
}

module.exports = service
