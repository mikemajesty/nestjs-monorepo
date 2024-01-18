import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
export declare class StartCommand extends AbstractCommand {
    load(program: CommanderStatic): void;
}
