import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
export declare class BuildCommand extends AbstractCommand {
    load(program: CommanderStatic): void;
}
