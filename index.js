#! /usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";

import { createRequest, editRequest, sendRequest, listRequests} from './functions/requests.js';

program
    .name("aceAPI")
    .description("CLI utility for swift API testing")
    .version("1.0.0");

console.log(chalk.yellow(figlet.textSync("aceAPI", { horizontalLayout: "full" })));

if(!process.argv.slice(2).length){
    console.log(chalk.cyan(`
        Welcome to aceAPI - Your Command Line API Testing Tool!

        Available Commands:
    
        Request Management:
        create-request     Create a new API request with method, URL, headers, and body
        edit-request      Modify an existing request's properties
        send <name>       Execute a saved request and view the response
        list-requests     Display all saved requests
        
        To use a command, run it like this:
        aceAPI <command> [options]
        
        For help, run:
        aceAPI --help
          `));
          process.exit();
}

program
    .command("create-request")
    .description("Create a new request")
    .action(() => {
        createRequest();
    });

program
    .command("edit-request") 
    .description("Edit request headers, body etc")
    .action(() => {
        editRequest();
    });

program
    .command("send") 
    .description("Select a method to send the request")
    .argument("<name>", "Request name to be sent")
    .action((name) => {
        sendRequest(name);
    })

program
    .command("list-requests")
    .description("Displays all existing requests")
    .action(() => {
        listRequests();
    })
    
program.showHelpAfterError('(add --help for additional information)');

program.parse(process.argv);