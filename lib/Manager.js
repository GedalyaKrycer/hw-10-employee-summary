// This imports the Employee class
const Employee = require("../lib/Employee")

class Manager extends Employee {

    constructor(name, id, email, officeNumber) {

        // Processes these arguments through the Employee Class
        super(name, id, email);

        // Accepts this new paramter, unique to Manager
        this.officeNumber = officeNumber;
    }

    // Overrides the Role from Employee class
    getRole() {
        return "Manager";
    }

    // Method that sends the office number when called.
    getOfficeNumber() {
        return this.officeNumber;
    }
}

// This exports the Manager Class
module.exports = Manager;