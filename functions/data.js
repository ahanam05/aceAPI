import fs from 'fs';
import { read } from "fs";
import chalk from "chalk";
const filePath = './requests.json';

function readRequests() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data || '[]'); 
    }
    return [];
}

function saveRequests(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); 
}

function saveRequest(newRequest) {
    const requests = readRequests(); 
    requests.push(newRequest);       
    saveRequests(requests);                
}

function updateRequest(updatedRequest){
    const requests = readRequests(); 
    let reqIndex = -1;
    for(var i = 0; i < requests.length; i++){
        if(requests[i].name == updatedRequest.name){
            reqIndex = i;  
            break;
        }
    }

    if(i == requests.length){
        console.log("Request not found");
        return;
    }

    for(const key in requests[reqIndex]){
        requests[reqIndex][key] = updatedRequest[key] || requests[reqIndex][key];
    }
    saveRequests(requests);
    console.log("Update successful");
}

function makeRequest(name) {
    const requests = readRequests(); 
    let reqIndex = -1;
    for (var i = 0; i < requests.length; i++) {
        if (requests[i].name === name) {
            reqIndex = i;  
            break;
        }
    }

    if (i === requests.length) {
        console.log("Request not found");
        return;
    }

    const requestDetails = requests[reqIndex];
    const { method, url, path, headers, body } = requestDetails;

    fetch(url + path, {
        method: method || 'GET', 
        headers: headers || {}, 
        body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : undefined 
    })
    .then(async response => {
        console.log(`Response status: ${response.status}`);
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const jsonResponse = await response.json();
            console.log("Response JSON:", jsonResponse);
        } else {
            const textResponse = await response.text();
            console.log("Response Text:", textResponse);
        }
    })
    .catch(error => {
        console.error("Error during fetch:", error);
    });
}

function listAll(){
    const requests = readRequests(); 
    for(var i = 0; i < requests.length; i++){
        console.log(chalk.cyan(`${i + 1}. ${requests[i].name}`));
    }
}

export { saveRequest, updateRequest, makeRequest, listAll };