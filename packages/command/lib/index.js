class Command {
  constructor (instance) {
    if (!instance) {
      throw new Error('Command instance is required')
    }
    this.program = instance
    const cmd = this.program.command(this.command)
    cmd.description(this.description)
    cmd.hook('preAction', () => {
      this.preAction()
    })
    cmd.hook('postAction', () => {
      this.postAction()
    })
    if (this.options?.length > 0) {
      this.options.forEach(option => {
        cmd.option(...option)
      })
    }
    cmd.action((...params) => {
      this.action(params)
    })
  }

  get command () {
    throw new Error('command getter must be implemented')
  }

  get description () {
    throw new Error('description getter must be implemented')
  }

  get options () {
    return []
  }

  get action () {
    throw new Error('action getter must be implemented')
  }

  get preAction () {
    return () => {
    }
  }

  get postAction () {
    return () => {
    }
  }
}

export default Command
