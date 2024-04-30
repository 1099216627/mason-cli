const Command = require('@mason.com/command');
const { log } = require('@mason.com/utils')
class InitCommand extends Command {
    get command() {
        return 'init <name>';
    }
    get description() {
        return '初始化项目';
    }
    get options() {
        return [
            ['-f, --force', '强制初始化项目']
        ];
    }
    action([name, cmd]) {
        log.verbose('name:', name);
    }
}

function createInitCommand(program) {
    return new InitCommand(program);
}

module.exports = createInitCommand;
