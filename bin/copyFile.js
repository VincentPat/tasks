#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const copy = require('copy');

program
    .version('0.0.1')
    .command('copy')
    .description('copy file to somewhere!')
    .option('-s --source <source>', 'source path')
    .option('-d --destination <destination>', 'destination path')
    .action((argvs) => {
        if (typeof argvs.source === 'undefined') {
            console.error(chalk.red.inverse('source path is required!'));
        } else if (typeof argvs.destination === 'undefined') {
            console.error(chalk.red.inverse('destination path is required!'));
        } else {
            success(`Copying ${argvs.source} to ${argvs.destination}`);
            const source = argvs.source;
            const dest = argvs.destination;
            copy(source, dest, (err) => {
                if (err) {
                    error('Copy Failed!');
                    throw err;
                }
                success('Copy Success!');
            });
        }
    });

program.parse(process.argv);

// 输出错误信息
function error(text) {
    console.error(chalk.red(text));
}

// 输出正确信息
function success(text) {
    console.log(chalk.green(text))
}