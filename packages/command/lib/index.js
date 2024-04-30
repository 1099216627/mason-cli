class Command {
    constructor(instance) {
        if (!instance) {
            throw new Error('Command instance is required');
        }
        this.program = instance;
        this.program.command(this.command);
        this.program.description(this.description)
        this.program.hook('preAction', this.preAction);
        this.program.hook('postAction', this.postAction);

        if (this.options.length) {
            this.options.forEach(option => {
                this.program.option(...option);
            });
        }
        this.program.action((...params) => {
            this.action(params);
        });
    }

    get command() {
        throw new Error('command getter must be implemented');
    }

    get description() {
        throw new Error('description getter must be implemented');
    }

    get options() {
        return [];
    }
    get action() {
        throw new Error('action getter must be implemented');
    }
    get preAction() {
        return () => {};
    }
    get postAction() {
        return () => {};
    }
}

module.exports = Command;

