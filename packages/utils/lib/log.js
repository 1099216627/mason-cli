import log from 'npmlog'
import isDebug from './isDebug.js'

if (isDebug()) {
  log.level = 'verbose'
} else {
  log.level = 'info'
}
log.heading = 'mason'
log.addLevel('success', 2000, { fg: 'green', bold: true })
log.addLevel('error', 5000, { fg: 'red', bold: true })
log.addLevel('warning', 3000, { fg: 'yellow', bold: true })
export default log
