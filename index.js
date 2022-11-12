#!/usr/bin/env node

import inquirer from "inquirer"
import * as fs from "fs"

import { dirname } from "path"
import { fileURLToPath } from "url"

import createTemplate from "./createDirTemplates.js"

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url))

const CHOICES = fs.readdirSync(`${__dirname}/templates`)

const QUESTIONS = [
    {
      name: 'project-choice',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: CHOICES,
    },
    {
      name: 'project-name',
      type: 'input',
      message: 'Project name:',
      validate: function (input) {
        if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
      },
    },
  ];


  inquirer.prompt(QUESTIONS).then(answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;
  
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  
    createTemplate(templatePath, projectName);
    console.log("    ")
    console.log(`${projectName} created!`)
    console.log("    ")
    if(projectChoice === "react-hook"){
        console.log(`cd ${[projectName]} and npm install`)
    }
  
    
    console.log("    ")
    console.log("npm run build  - to build the project")
    console.log("    ")
    console.log("npm run pub  - to build and publish the project on npm - make sure you logged in with npm login")




  });


