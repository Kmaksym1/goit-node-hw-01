const fs = require('fs').promises;

const contacts = require("./contacts.js")

const { program } = require("commander");
// const argv = require('yargs').argv;
// const { option } = require('yargs');

const invokeAction = async({action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            return console.table(allContacts)
        case "get":
            const contactById = await contacts.getContactById(id);
            return console.log(contactById)
        case "add":
            const newContact = await contacts.addContact({ name, email, phone });
            return console.log(newContact)
        // case "updateById":
        //     const updateContact = await contacts.updateById(id, { name, email, phone })
        //     return console.log(updateContact)
        case "remove":
            const removeContacts = await contacts.removeContact(id)
            return console.log("remove", removeContacts)
        default:
            return console.log("\x1B[31m Unknown action type!")
    }
}
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({ action: "add", name: "Max", email: "kmak@g.com", phone: "9496179898" });
// invokeAction({ action: "updateById", id: "1QihSXjaPV", name: "Max", email: "kmaksym@g.com", phone: "9496179336" });
// invokeAction({ action: "remove", id: "ErfvX8DDnu"});
// console.log(contacts)

// console.log(process.argv.indexOf("--action"))
// const actionIndx = process.argv.indexOf("--action")
// if (actionIndx !== -1) {
//     const action = process.argv[actionIndx + 1]
//     invokeAction({action})
// }
program
    .option("--action, <type>")
    .option("--id, <type>")
    .option("--name, <type>")
    .option("--email, <type>")
    .option("--phone, <type>")
program.parse();
const option = program.opts()
invokeAction(option)