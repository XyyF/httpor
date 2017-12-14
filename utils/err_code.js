const DEFAULT_MESSAGE = '网络错误，请重试';
const errorCode = {};
const codeInfoMap = [];

/**
 * 定义一个错误码
 * @param {number} code 错误码，必须唯一
 * @param {null | string?} message 错误描述，会下发给浏览器端让用户看见。若不填则使用默认值。
 *                                   通过特殊标志${1}或${2}等，配合MError的setMessageTemplateData方法可以嵌入变量
 * @param {boolean?} fatal 是否是致命错误，默认为true。致命错误在测试环境会显示大红条提示
 * @return {number}
 */
function defineCode(code, message, fatal) {
    if (codeInfoMap[code]) {
        throw new Error(`重复的错误码:${code}`);
    }
    codeInfoMap[code] = {
        message: message || `(${code})${DEFAULT_MESSAGE}`,
        fatal: fatal === undefined || fatal
    };
    return code;
}

/**
 * 获取错误码对应的错误信息
 * @param {number} code
 * @returns {{message: string, fatal: boolean}}
 */
errorCode.getCodeData = function getCodeData(code) {
    if (codeInfoMap[code]) {
        return codeInfoMap[code];
    }
    console.error(`未知的错误码:${code}`);
    return {
        message: DEFAULT_MESSAGE,
        fatal: true
    };
};

/* eslint-disable no-template-curly-in-string */
/** 无错误 */
errorCode.SUCCESS = defineCode(0, '');

/** 不知名错误 */
errorCode.UNKNOWN = defineCode(1, '未知错误');

/** **********************************以下前端相关的错误码*********************************** */

/** 401未授权 */
errorCode.HTTP_UNAUTHORIZED = defineCode(1001, '请求未授权');

/** 前端请求超时 */
errorCode.HTTP_TIME_OUT = defineCode(1002, '网络超时，请重试');

/** 403禁止访问 */
errorCode.HTTP_FORBIDDEN = defineCode(1003, '禁止访问');

/** 404找不到 */
errorCode.HTTP_NOT_FOUND = defineCode(1004, '请求的网址不存在');

/** 其它前端请求网络错误 */
errorCode.HTTP_NETWORK_ERR = defineCode(1005, '网络连接错误，请重试');

/** 微信支付错误 */
errorCode.WECHAT_PAY_ERROR = defineCode(1006, '微信支付遇到问题，请重新支付');

module.exports = errorCode;
