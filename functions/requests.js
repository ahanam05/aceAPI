import inquirer from "inquirer";
import fs from "fs/promises";
import { read } from "fs";

import { saveRequest, updateRequest, makeRequest, listAll } from './data.js';
import chalk from "chalk";

async function createRequest(){
    const validMethods = ["GET", "POST", "PUT", "DELETE"];
    const request = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter request name: ',
            validate: input => input.length > 0 ? true : 'Name cannot be empty'
        },
        {
            type: "list",
            name: "method",
            message: "Select the request method: ",
            choices: ["GET", "POST", "PUT", "DELETE"]
        },
        {
            type: 'input',
            name: 'url',
            message: "Enter URL: ",
            validate: input => input.length > 0 ? true : "URL cannot be empty"
        },
        {
            type: 'input',
            name: "path",
            message: "Enter the endpoint path: ",
            validate: input => input.length > 0 ? true : "Path cannot be empty"
        },
        {
            type: "input",
            name: "headers",
            message: "Enter headers (optional): ",
        },
        {
            type: "input",
            name: "body",
            message: "Enter body (optional): "
        }
    ]);

    const requestObject = {
        name: request.name,
        method: request.method,
        url: request.url,
        path: request.path,
        headers : request.headers || {},
        body: request.body || {}
    }

    saveRequest(requestObject);
}

async function editRequest(){
    const request = await inquirer.prompt([
        {   
            type: 'input',
            name: 'name',
            message: 'Enter existing request to be updated: ',
            validate: input => input.length > 0 ? true : 'Name cannot be empty'
        },
        {
            type: "list",
            name: "method",
            message: "Select updated request method: ",
            choices: ["GET", "POST", "PUT", "DELETE"]
        },
        {
            type: 'input',
            name: 'url',
            message: "Enter the new URL: ",
        },
        {
            type: 'input',
            name: "path",
            message: "Enter the new endpoint path: ",
        },
        {
            type: "input",
            name: "headers",
            message: "Enter new headers: ",
        },
        {
            type: "input",
            name: "body",
            message: "Enter the new body: "
        }
    ]);

    updateRequest(request);
}

function sendRequest(name){
    makeRequest(name);
}

function listRequests(){
    console.log(chalk.magenta("Existing Requests: "));
    listAll();
}

export {createRequest, editRequest, sendRequest, listRequests};