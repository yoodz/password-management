const chalk = require('chalk');

const messageMap = {
    needInit: {
        type: "error",
        message: "请先执行init初始化 "
    },
    initSuccess: {
        type: "success",
        message: "密钥初始化成功 "
    },
    emptyPassword: {
        type: "info",
        message: "还未存储密码，快去试试吧 "
    },
    addSuccess: {
        type: "success",
        message: "密码保存成功 "
    },
    removeSuccess: {
        type: "success",
        message: "密码删除成功 "
    },
    removeAllSuccess: {
        type: "success",
        message: "密码清空成功 "
    },
    updateSuccess: {
        type: "success",
        message: "密码更新成功 "
    },
    notFound: {
        type: "info",
        message: "未找到记录 "
    }
}

// 消息提示
function tipMessage(key) {
    const result = messageMap[key]
    if (result.type === 'error') {
        console.log(chalk.bgRed(result.message));
    } else if (result.type === 'info') {
        console.log(chalk.bgYellow(result.message));
    } else {
        console.log(chalk.bgGreen(result.message));
    }
}

module.export = {
    tipMessage,
}