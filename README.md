# S.V.O.T.C  
A NodeJs app built with MeteorJs with KYC/AML baked in.  

#### Prerequisites
- **Git** 2.8 or higher
- **[Meteor](https://www.meteor.com/)** 1.8 or higher
- **Terminal emulator** / Command Prompt

#### Cloning
- Clone app to local machine `git clone <path to this repo>`

#### Bootstrapping
- To decrypt settings file use `gpg development.settings.json.gpg`
You will be prompted to enter the password our team has shared with you.
Enter the password. If the password is correct you'll find a file named `development.settings.json` in the root folder of the project. Open it to verify it's in text format and human-readable.

#### Running:
- Use `meteor npm install` to install npm module before running the app for the first time
- To start the app use `meteor --settings development.settings.json`

#### What if it doesn't work?
Save outputs from an error message you get when you try running the app to a text file, run the following commands in your Terminal window, **inside your project directory** and save those outputs too. Send that file to our team.

- `git --version`
- `meteor --version`
- `meteor node -v`
- `meteor npm -v`
- `meteor list`
