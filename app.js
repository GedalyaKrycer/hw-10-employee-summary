const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { doesNotMatch } = require("assert");

const employeeRoster = [];

// Starts questionnaire 
employeeSelector();


// Initial CLI Question To Select Team Member Type
function employeeSelector() {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'employeeSelect',
                message: 'Choose a new team member role to add.',
                choices: [
                    'Manager',
                    'Engineer',
                    'Intern'
                ]
            }
        )
        .then(res => {

            // Chooses the next question to ask based on the response above. 
            switch (res.employeeSelect) {
                case 'Manager':
                    inquirerManger();
                    break;
                case 'Engineer':
                    console.log("YAS Engineer");
                    inquirerEngineer();
                    break;
                case 'Intern':
                    console.log("YAS Intern");
                    inquirerIntern();
                    break;
            }
        });

}


// Function to block users from not entering an answer in the inquirer questions.  
function validateInput(input) {
    if (!input) {
        return false;
    } else {
        return true;
    }
}


// Manager input collection function 
const inquirerManger = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Input their first and last name:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'id',
                message: 'Input the 6 digit employee ID:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'email',
                message: 'Add their valid work email address:',
                validate: validateInput
            },
            {
                type: 'number',
                name: 'officeNumber',
                message: 'What is their office number?',
                validate: validateInput
            }
        ])
        .then(res => {

            // Creates a new object based on the Manager class
            const newManager = new Manager(
                res.name,
                res.id,
                res.email,
                res.officeNumber
            );

            // Adds manager to employeeRoster Array
            employeeRoster.push(newManager);

            // Confirms a successful addition
            console.log(`You have queued ${res.name} as a new Manager!`);

            // Lets user add another person or save
            continueSelector();

        })

}

// Engineer input collection function 
const inquirerEngineer = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Input their first and last name:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'id',
                message: 'Input the 6 digit employee ID:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'email',
                message: 'Add their valid work email address:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is their github url?',
                validate: validateInput
            }
        ])
        .then(res => {

            // Creates a new object based on the Manager class
            const newEngineer = new Engineer(
                res.name,
                res.id,
                res.email,
                res.github
            );

            // Adds manager to employeeRoster Array
            employeeRoster.push(newEngineer);

            // Confirms a successful addition
            console.log(`You have queued ${res.name} as a new Engineer!`);

            // Lets user add another person or save
            continueSelector();

        })

}

// Lets user add another person or save
const continueSelector = () => {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'nextSteps',
                message: 'Would you like to add someone new or save your current selection to finish?',
                choices: [
                    'Add another team member',
                    'Save & Exit'
                ]
            }
        )
        .then(res => {

            // Chooses if to restart the first question or save/exit. 
            switch (res.nextSteps) {
                case 'Add another team member':
                    employeeSelector();
                    break;
                case 'Save & Exit':
                    for (let i = 0; i < employeeRoster.length; i++) {

                        // Confirms the employee's in the array
                        console.log(`You have successfully added ${employeeRoster[i].name}.`)
                    }
                    generateHTML();
            }
        });
};


// Builds the user's selections into an HTML page and writes it to the output folder
const generateHTML = () => {
    const outputHTML = render(employeeRoster)
    fs.writeFile(outputPath, outputHTML, (err) => {
        if (err) throw err;
    })
}