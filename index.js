#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk');
const {
  getPasswords,
  savePass,
  initSecretKey,
  removeByNameOrUsesrname,
  updateByNameAndUsesrname,
  removeAllRecord
} = require('./utils')


// 新增密码
program.command("add")
  .description("save username and password")
  .requiredOption('-n, --name <name>')
  .requiredOption('-u, --username <username>')
  .requiredOption('-p, --password <password>')
  .action((data, options) => {
    const { name, username, password } = data
    savePass(name, username, password)
  });

// 更新密码
program.command("update")
  .description("update password by username")
  .requiredOption('-n, --name <name>')
  .requiredOption('-u, --username <username>')
  .requiredOption('-p, --password <password>')
  .action((data, options) => {
    const { name, username, password } = data
    updateByNameAndUsesrname(name, username, password)
  });

// 根据用户名查询密码
program.command("get")
  .description("get password by name or username")
  .option('-n, --name <name>', 'get by name')
  .option('-u, --username <username>', 'get by username')
  .option('-a, --all', 'return all password')
  .action((data, options) => {
    console.log(data, 'index-41')
    if (data.all) {
      // get all
      getPasswords("", "", 'all')
    } else {
      const { name, username } = data
      getPasswords(name, username)
    }
  });

// 删除用户名密码
program.command("remove")
  .description("remove password by name or username")
  .option('-n, --name <name>')
  .option('-u, --username <username>')
  .action((data, options) => {
    const { name, username } = data
    removeByNameOrUsesrname(name, username)
  });

// 清空记录
program.command("removeAll")
  .description("remove all password records, dangerous！！！")
  .action((data, options) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    readline.question(chalk.bgRed(`This action cannot be undone. Are you absolutely sure?: (y/n)`), key => {
      console.log(key, 'index-69')
      if (key === 'y') {
        removeAllRecord()
      }
      readline.close()
    })
  });


program.command("init")
  .description("init command")
  .action((data, options) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    readline.question(`please input your secret key? \n `, key => {
      initSecretKey(key)
      readline.close()
    })
  })

program.parse(process.args);

// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0], options, 'hello-11')
// console.log(program.args[0].split(options.username, limit));