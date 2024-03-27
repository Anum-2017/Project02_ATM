#! /usr/bin/env node
import inquirer from "inquirer";
let user = {
    name: "pin",
    pin: 5982,
    balance: 100000,
};
const resp = await inquirer.prompt([
    {
        message: "Please enter your 4 digit pinCode",
        name: "pin",
        type: "password",
    },
]);
let continueTransaction = true;
// TODO: Retry on incorrect pin
if (Number(resp.pin) !== user.pin) {
    console.log("You have entered an incorrect pin");
}
else {
    while (continueTransaction == true) {
        const resp = await inquirer.prompt([
            {
                name: "selectedType",
                message: "Please select an option",
                type: "list",
                choices: ["Withdraw", "Fast Cash", "Balance Inquiry"], // add Deposit, and bill payment
            },
            {
                name: "amount",
                message: "Please select amount",
                type: "list",
                choices: ["500", "1000", "3000", "5000", "8000", "10000"],
                when(resp) {
                    return resp.selectedType == "Fast Cash";
                },
            },
            // TODO: amount should be multiple of 500
            {
                name: "amount",
                message: "Please enter amount",
                when(resp) {
                    return resp.selectedType == "Withdraw";
                },
            },
        ]);
        // TODO: Do you want to try another transaction
        if (resp.selectedType == "Balance Inquiry") {
            console.log(`Your balance is: ${user.balance}`);
            const toRepeat = await inquirer.prompt([
                {
                    name: "repeat",
                    type: "confirm",
                    message: "Do you want to try another transaction",
                },
            ]);
            if (toRepeat.repeat == true)
                continueTransaction = true;
            else {
                continueTransaction = false;
            }
        }
        else {
            user.balance = user.balance - resp.amount;
            console.log(`Your remaining new balance is: ${user.balance}`);
            continueTransaction = false;
        }
    }
}
