const inquirer = require('inquirer');
const fs = require('fs');
const { userInfo } = require('os');

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the name of your project?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a brief description of your project:'
  },
  {
    type: 'confirm',
    name: 'tableOfContents',
    message: 'Do you want to add table of contents in your README?'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide instructions on how to install your project:'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide instructions and examples for usage of your project:'
  },
  {
    type: 'input',
    name: 'credits',
    message: 'List any collaborators or third-party resources used in your project:'
  },
  {
    type: 'list',
    name: 'license',
    message: 'Please select the license for your project:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'None'],
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your gihub account link?'
  },
  {
    type: 'input',
    name: 'userName',
    message: 'What is your github user name?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?'
  },
  {
    type: 'input',
    name: 'contact',
    message: "What's the best way to reach you with qustions?"
  }
];

inquirer.prompt(questions).then(data => {
  let readme = `# ${data.projectName}\n\n`;
  readme += `## Description\n\n${data.description}\n\n`;
  if (data.tableOfContents) {
    readme += `## Table of Contents\n\n- [Installation](#installation)\n- [Usage](#usage)\n- [Credits](#credits)\n- [License](#license)\n- [Questions](#questions)\n`
  }

  readme += `## Installation\n\n${data.installation}\n\n`;
  readme += `## Usage\n\n${data.usage}\n\n`;
  readme += `## Credits\n\n${data.credits}\n\n`;

  if (data.license !== 'None') {
    readme += `## License\n\nThis project is licensed under the ${data.license} license.\n`;
    readme += `[![License](https://img.shields.io/badge/License-${data.license}-blue.svg)](https://opensource.org/licenses/${data.license.toLowerCase().split(' ').join('-')})\n\n`;
    readme += `You can find the license text [here](https://opensource.org/licenses/${data.license.toLowerCase().split(' ').join('-')}).\n\n`;
  } else {
    readme += `## License\n\nThis project does not have any license.\n\n`;
  }

  readme += `## Questions\n\nGithub Account: [${data.userName}](${data.github})\n\nEmail Address: ${data.email}\n\n${data.contact}`

  fs.writeFile(`${data.name}.md`, readme, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('README.md file created successfully!');
    }
  });
});
