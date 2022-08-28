import crypto from 'crypto'
import fs from 'fs'
import chalk from 'chalk';
import moment from 'moment';
import  { tipMessage } from './message.js'
import os from 'os'

var homeDir = os.homedir();
var dirPath = homeDir + "/.mypass";
// const homedir = require('os').homedir();

// 加密
function encrypt(str) {
  const result = getSecretKey()
  const cipher = crypto.createCipheriv('aes-256-cbc', result[0], result[1])
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

// 解密
function decrypt(str) {
  const result = getSecretKey()
  var decipher = crypto.createDecipheriv('aes-256-cbc', result[0], result[1]);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

// 用户新增密码
function savePass(name, username, password) {
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss');
  const passLog = {
    date: timeNow,
    name: name,
    username: username,
    password: password,
  }
  fs.writeFile(dirPath + "/pl", encrypt(JSON.stringify(passLog)) + "\n", { flag: "a" }, function (err) {
    if (err) {
      console.log('fail', 'utils-60')
    } else {
      tipMessage("addSuccess")
    }
  });
}

// 获取用户密码
function getPasswords(name, username, all) {
  fs.readFile(dirPath + "/pl", 'utf8', function (err, data) {
    if (err) {
      tipMessage("emptyPassword")
      process.exit()
    } else {
      var arr = data.split("\n");
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i]) {
          var onePass = JSON.parse(decrypt(arr[i]));
          if (all || onePass.username.indexOf(username) !== -1 || onePass.name.indexOf(name) !== -1) {
            console.log(
              chalk.green("name: ") + chalk.yellow(onePass.name) + ' '
              + chalk.green("username: ") + chalk.cyan(onePass.username) + ' '
              + chalk.green("password: ") + chalk.blue.bgWhite.bold(onePass.password) + '\n'

            );
          }
        }
      }
    }
  });
}

// 获取用户密码
function removeByNameOrUsesrname(name, username) {
  fs.readFile(dirPath + "/pl", 'utf8', function (err, data) {
    if (err) {
      console.log(err, 'utils-100')
      tipMessage("emptyPassword")
      process.exit()
    } else {
      var arr = data.split("\n");
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i]) {
          var onePass = JSON.parse(decrypt(arr[i]));
          if (onePass.username === username || onePass.name === name) {
            arr.splice(i, 1)
          }
        }
      }
      fs.writeFile(dirPath + "/pl", arr.join('\n'), { flag: "w" }, function (err) {
        tipMessage("removeSuccess")
      })
    }
  });
}

// 通过标题和用户名更新密码
function updateByNameAndUsesrname(name, username, password) {
  fs.readFile(dirPath + "/pl", 'utf8', function (err, data) {
    if (err) {
      tipMessage("notFound")
      process.exit()
    } else {
      var arr = data.split("\n");
      let hitCount = 0
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i]) {
          var onePass = JSON.parse(decrypt(arr[i]));
          if (onePass.username === username && onePass.name === name) {
            hitCount++
            onePass.password = password
            arr[i] = encrypt(JSON.stringify(onePass))
          }
        }
      }
      if (hitCount > 0) {
        fs.writeFile(dirPath + "/pl", arr.join('\n'), { flag: "w" }, function (err) {
          tipMessage("updateSuccess")
        })
      } else {
        tipMessage("notFound")
      }
    }
  });
}

// 初始化密钥
function initSecretKey(key) {
  fs.writeFile(dirPath + "/auth", key, { flag: "w" }, function (err) {
    if (err) {
      console.log('fail', 'utils-60')
    } else {
      tipMessage('initSuccess')
    }
  });
}

// 获取密钥
function getSecretKey() {
  try {
    const data = fs.readFileSync(dirPath + "/auth", 'utf8')
    const key = crypto.scryptSync(data, 'GfG', 32);
    const iv = crypto.scryptSync(data, 'GfG', 16);
    return [key, iv]
    // })
  } catch (error) {
    tipMessage('needInit')
    process.exit()
  }
}

function removeAllRecord() {
  fs.unlinkSync(dirPath + '/pl')
  tipMessage('removeAllSuccess')
}



export {
  decrypt,
  encrypt,
  savePass,
  getPasswords,
  initSecretKey,
  removeByNameOrUsesrname,
  removeAllRecord,
  updateByNameAndUsesrname
}