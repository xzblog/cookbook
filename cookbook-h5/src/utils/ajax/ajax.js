import {Toast} from 'antd-mobile';  //此处需要换成自己的Toast，自己的Toast有bug,待解决


class Ajax {
    _init = function (config) {
    	const baseUrl = '/api/v1.0.0';
        const {method, url, data} = config;

        const promise = new Promise(function(resolve, reject){
            // 注意以下事件的顺序，不对可能会导致监听不到或者出现错误

            //新建一个http请求
            const xhr = new XMLHttpRequest();

            //设置超时时间
            xhr.timeout = 3000;

            // 配置请求参数和请求方式
            xhr.open(method, baseUrl + url);

            //为post请求时设置请求数据格式
            method === 'POST' && xhr.setRequestHeader('Content-Type','application/json');

            // 请求开始
            xhr.onloadstart = function () {
                //设置请求中的图标，（待优化，应请求时长大于多少秒时显示）
                // Toast.loading('请求中', 0);
            };

            //发送请求
            xhr.send(JSON.stringify(data));

            // 请求成功完成
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {  // 304拿到的是没有更改的缓存内容
                    // 成功，通过responseText拿到响应的文本:
                    return resolve(JSON.parse(xhr.responseText));
                } else {
                    // 失败，根据响应码判断失败原因:
                    return reject(xhr.status);
                }
            };

            //请求超时
            xhr.ontimeout = function() {
                return reject('请求超时',);
            };

            //网络异常
            xhr.onerror = function (err) {
                return reject('网络异常')
            };

            //请求结束，不管成功失败
            xhr.onloadend = function () {
				// Toast.hide();
                // 关闭图标,此处为了便于观察，用了一个延迟关闭，实际不需要。
                // setTimeout(()=>{
                // 	Toast.hide();
                // },3000)
            };

        });

        return promise;
    };

    get = function(url) {
        const config = {
            method: 'GET',
            url: url,
        };

        return this._init(config);
    };



    post = function(url, data) {
        const config = {
            method: 'POST',
            url: url,
            data:data,
        };
        return this._init(config);
    };
}

export default new Ajax();
