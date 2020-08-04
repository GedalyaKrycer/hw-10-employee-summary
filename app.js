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
                message: 'Welcome! Choose a new team member role to add.',
                choices: [
                    'Manager',
                    'Engineer',
                    'Intern',
                    'Save & Exit'
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
                case 'Save & Exit':
                    generateHTML();
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
            console.log(`You have added a ${res.name} as a new Manager!`);
            employeeSelector();

        })

}


const generateHTML = () => {
    const outputHTML = render(employeeRoster)
    fs.writeFile(outputPath, outputHTML, (err) => {
        if (err) throw err;
    })
}

// After the user has input all employees desired, call the `render` function (required above) and pass in an array containing all employee objects; the `render` function will generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML returned from the `render` function. Now write it to a file named `team.html` in the `output` folder. You can use the variable `outputPath` above target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

