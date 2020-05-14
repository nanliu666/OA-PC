// require modules
const fs = require('fs')
const archiver = require('archiver')
const path = require('path')
const rimraf = require('rimraf')
const chalk = require('chalk')

const p = path.resolve(__dirname, '../../saber.zip')
// create a file to stream archive data to.
rimraf(p, () => {
  const output = fs.createWriteStream(p)
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  })

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    // eslint-disable-next-line no-console
    console.log(chalk.green(`压缩完成，压缩包位置-> ${p}`))
    // eslint-disable-next-line no-console
    console.log(chalk.green.red(`压缩包大小：${archive.pointer()} bytes`))
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    // eslint-disable-next-line no-console
    console.log('Data has been drained')
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output)

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory('dist/', 'saber')

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()
})
