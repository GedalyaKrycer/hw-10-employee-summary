const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const joi = require("joi");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Initial CLI Question To Select Team Member Type
inquirer
    .prompt(
        {
            type: 'list',
            name: 'employeeSelect',
            message: 'Welcome! Choose a new team member role to add.',
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
                console.log("YAS Manager");
                inquirerManger();
                break;
            case 'Engineer':
                console.log("YAS Engineer");
                break;
            case 'Intern':
                console.log("YAS Intern");
                break;
        }
    });


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
            console.log(res);
        })
}




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
