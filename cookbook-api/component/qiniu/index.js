/*
 * 七牛上传
 * @author: Magical
 */

const qiniu = require('qiniu');
const {Duplex} = require('stream');
const config = require('./config');

function getToken() {
    const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);

    const options = {
        scope: config.scope, // 你的七牛存储空间名称
        //expires: 60  //expires单位为秒，为上传凭证的有效时间 默认一小时
    };

    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
}

function upToQiNiu (filePath, key) {

    const token = getToken();

    /* 因为七牛存储支持空间创建在不同的机房，所以我们Node.js SDK 中的FormUploader和ResumeUploader上传文件之前，
     * 必须要构建一个上传用的config对象，在该对象中，可以指定空间对应的zone以及其他的一些影响上传的参数。
     */

    // 构建config对象
    const spaceConfig = new qiniu.conf.Config();
    // 空间对应的机房  Zone_z0: 华东, Zone_z1: 华北,  Zone_z2: 华南, Zone_z3: 北美
    spaceConfig.zone = qiniu.zone.Zone_z0;
    // 是否使用https域名
    //spaceConfig.useHttpsDomain = true;
    // 上传是否使用cdn加速
    //spaceConfig.useCdnDomain = true;


    const formUploader = new qiniu.form_up.FormUploader(spaceConfig);
    const putExtra = new qiniu.form_up.PutExtra();

    //处理数据
    // 得到图片去除文件头（data:image/png;base64,）
    const base64Str = filePath.replace(/^.*?,/, '');
    const buff = new Buffer(base64Str, 'base64');
    let stream = new Duplex();
    stream.push(buff);
    stream.push(null);

    return new Promise((resolve, reject) => {
        formUploader.putStream(token, key, stream, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                reject(respErr);
                console.log(respErr)
            }
            if (respInfo.statusCode === 200) {
                resolve(respBody);
                console.log(respBody)
            } else {
                resolve(respInfo.statusCode);
                console.log(respBody);
            }
        });
    });
}

module.exports = {
    getToken,
    upToQiNiu
};