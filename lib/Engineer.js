// This imports the Employee class
const Employee = require("../lib/Employee")

class Engineer extends Employee {

    constructor(name, id, email, github) {

        // Processes these arguments through the Employee Class
        super(name, id, email);

        // Accepts this new paramter, unique to Engineer
        this.github = github;
    }

    // Overrides the Role from Employee class
    getRole() {
        return "Engineer";
    }

    // Method that sends the office number when called.
    getGithub() {
        return this.github;
    }
}

// This exports the Engineer Class
module.exports = Engineer;