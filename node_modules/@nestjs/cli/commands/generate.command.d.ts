import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
export declare class GenerateCommand extends AbstractCommand {
    load(program: CommanderStatic): Promise<void>;
    private buildDescription;
    private buildSchematicsListAsTable;
    private getCollection;
    private getSchematics;
}
