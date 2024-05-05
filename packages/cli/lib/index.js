import createCLI from './createCLI.js'
import createInitCommand from '@mason.com/init'
import './exception.js'

export default function () {
  const program = createCLI()
  createInitCommand(program)
  program.parse(process.argv)
}
