import fs from 'fs'
import path from 'path'
import ytdl from 'ytdl-core'

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const URL = 'https://www.youtube.com/watch?v=QMbx0dTWJIQ'
  const videoInfo = await ytdl.getInfo(URL)
  console.log(videoInfo.formats)
  const format = ytdl.chooseFormat(videoInfo.formats, { quality: '248' })
  const outputFilePath = `${path.resolve(__dirname + '../../../uploads')}/${
    videoInfo.videoDetails.title
  }.${format.container}`
  const outputStream = fs.createWriteStream(outputFilePath)

  ytdl.downloadFromInfo(videoInfo, { format }).pipe(outputStream)

  outputStream.on('finish', () => {
    console.log(`Finished download: ${outputFilePath}`)
  })
})()
