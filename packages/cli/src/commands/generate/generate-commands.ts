import { Command, Option } from "commander";
import { generateClass } from "./actions/generate-class/generate-class";
import { generateComponent } from "./actions/generate-component/generate-component";
import { generateDirective } from "./actions/generate-directive/generate-directive";
import { generateEnum } from "./actions/generate-enum/generate-enum";
import { generateGuard } from "./actions/generate-guard/generate-guard";
import { generateInterface } from "./actions/generate-interface/generate-interface";
import { generateModule } from "./actions/generate-module/generate-module";
import { generatePipe } from "./actions/generate-pipe/generate-pipe";
import { generateService } from "./actions/generate-service/generate-service";

export function generateCommand(program: Command) {
    const generate = program.command("generate")
        .description("Generate MonsterJS files");

    generate.command("component <name>")
        .description("Generate a component files")
        .option("--function", "Generate a function component file.", false)
        .option("--noTest", "Generate a component without a test.", false)
        .addOption(new Option('--shadow <shadow mode>', 'Generate shadow DOM component.').choices(['open', 'closed']))
        .action(generateComponent);

    generate.command("service <name>")
        .description("Generate a service file")
        .action(generateService);

    generate.command("module <name>")
        .description("Generate a module file")
        .action(generateModule);

    generate.command("class <name>")
        .description("Generate a class file")
        .action(generateClass);

    generate.command("interface <name>")
        .description("Generate an interface file")
        .action(generateInterface);

    generate.command("enum <name>")
        .description("Generate an enum file")
        .action(generateEnum);

    generate.command("guard <name>")
        .description("Generate a guard file")
        .action(generateGuard);

    generate.command("directive <name>")
        .description("Generate a directive file")
        .action(generateDirective);

    generate.command("pipe <name>")
        .description("Generate a pipe file")
        .action(generatePipe);
}