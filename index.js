import { program } from "commander";
import * as contactServise from './contacts.js'
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactServise.listContacts();
      return console.table(allContacts);
      break;

    case "get":
      const oneContact = await contactServise.getContactById(id);
      return console.log(oneContact)
      break;

    case "add":
      const newContact = await contactServise.addContact(name, email, phone);
      return console.log(newContact)
      break;

    case "remove":
      const removeContact = await contactServise.removeContact(id);
      return console.log(removeContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
// invokeAction({ action: 'remove', id: 'AeHIrLTr6JkxGE6SN-0Rw'});
