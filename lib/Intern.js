// This imports the Employee class
const Employee = require("../lib/Employee")

class Intern extends Employee {

    constructor(name, id, email, school) {

        // Processes these arguments through the Employee Class
        super(name, id, email);

        // Accepts this new paramter, unique to Intern
        this.school = school;
    }

    // Overrides the Role from Employee class
    getRole() {
        return "Intern";
    }

    // Method that sends the office number when called.
    getSchool() {
        return this.school;
    }
}

// This exports the Intern Class
module.exports = Intern;