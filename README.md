# 命令行密码管理器
它是一个命令行里的密码管理工具，安装后需要执行``` pass init ```初始化密钥，存储的所有密码都会依赖这个密码进行AES加密。
## 安装
```
npm install -g password-management
```
## 查看帮助
```shell
pass -h

Usage: index [options] [command]

Options:
  -h, --help        display help for command

Commands:
  add [options]     save username and password
  update [options]  update password by username
  get [options]     get password by name or username
  remove [options]  remove password by name or username
  removeAll         remove all password records, dangerous！！！
  init              init command
  help [command]    display help for command
```
## 初始化密钥
```
pass init
```

## 新增密码
```
pass add -n baidumail -r root -p root
```