const commander = require('commander');
const { program } = commander;
const packageJson = require('../package.json');
const createInitCommand = require('@mason.com/init');
const { log } = require('@mason.com/utils');
const semver = require('semver');
const chalk = require('chalk');

function checkNodeVersion() {
    const currentNodeVersion = process.version;
    const lowestNodeVersion = packageJson.engines.node;
    if (!semver.satisfies(currentNodeVersion, lowestNodeVersion)) {
        throw new Error(chalk.red(`mason-cli 需要安装 Node.js 版本 >= ${lowestNodeVersion} 请升级 Node.js 版本`));
    }
}

module.exports = function (args) {
    const pkgName = Object.keys(packageJson.bin)[0];
    log.info('version', packageJson.version);
    program
        .name(pkgName)
        .usage('<command> [options]')
        .version(packageJson.version)
        .option('-d, --debug', 'output extra debugging', false)
        .option('-e, --env <env>', 'set env')
        .hook('preAction',checkNodeVersion)

    createInitCommand(program);

    program.parse(args);
}