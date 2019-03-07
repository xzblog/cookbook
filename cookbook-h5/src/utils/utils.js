/*
 * 工具函数集 utils
 * @Author: magical
 */

import cookie from './cookie/cookie';  //处理cookie
import ajax from './ajax/ajax';  //异步请求

class Utils {

	/**
	 * 获取浏览器类型和版本
	 * @return {String}
	 */
	getExplore = () => {
		var sys = {},
			ua = navigator.userAgent.toLowerCase(),
			s;
		(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
			(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
				(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
					(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
						(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
							(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
								(s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
		// 根据关系进行判断
		if (sys.ie) return ('IE: ' + sys.ie)
		if (sys.edge) return ('EDGE: ' + sys.edge)
		if (sys.firefox) return ('Firefox: ' + sys.firefox)
		if (sys.chrome) return ('Chrome: ' + sys.chrome)
		if (sys.opera) return ('Opera: ' + sys.opera)
		if (sys.safari) return ('Safari: ' + sys.safari)
		return 'Unkonwn'
	};

	/**
	 * @desc 获取操作系统类型
	 * @return {String}
	 */
	getOS = () => {
		const userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
		const vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
		const appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

		if (/mac/i.test(appVersion)) return 'MacOSX'
		if (/win/i.test(appVersion)) return 'windows'
		if (/linux/i.test(appVersion)) return 'linux'
		if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
		if (/android/i.test(userAgent)) return 'android'
		if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
	};



	/**
	 * @desc  获取一个元素的距离文档(document)的位置
	 * @param {HTMLElement} ele
	 * @returns { {left: number, top: number} }
	 */
	offset = (ele) => {
		var pos = {
			left: 0,
			top: 0
		};
		while (ele) {
			pos.left += ele.offsetLeft;
			pos.top += ele.offsetTop;
			ele = ele.offsetParent;
		};
		return pos;
	};



	/**
	 * 深拷贝，支持常见类型
	 * @param {Any} values
	 */
	deepClone = (values) => {
		var copy;
		// Handle the 3 simple types, and null or undefined
		if (null == values || "object" != typeof values) return values;

		// Handle Date
		if (values instanceof Date) {
			copy = new Date();
			copy.setTime(values.getTime());
			return copy;
		}

		// Handle Array
		if (values instanceof Array) {
			copy = [];
			for (var i = 0, len = values.length; i < len; i++) {
				copy[i] = deepClone(values[i]);
			}
			return copy;
		}

		// Handle Object
		if (values instanceof Object) {
			copy = {};
			for (var attr in values) {
				if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
			}
			return copy;
		}
		throw new Error("Unable to copy values! Its type isn't supported.");
	};


	/**
	 * @desc   判断`obj`是否为空
	 * @param  {Object} obj
	 * @return {Boolean}
	 */
	isEmptyObject = (obj) => {
		if (!obj || typeof obj !== 'object' || Array.isArray(obj)){
			return false;
		}
		return !Object.keys(obj).length
	};

	/**
	 *
	 * @desc   判断是否为邮箱地址
	 * @param  {String}  str
	 * @return {Boolean}
	 */
	isEmail = (str) => {
		return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
	};

	/**
	 * 判断是否为手机号
	 * @param  {String|Number} str
	 * @return {Boolean}
	 */
	isMobile = (str) => {
		return /^1\d{10}$/.test(str)
	};

	/**
	 * 判断是否为身份证号
	 * @param  {String|Number} str
	 * @return {Boolean}
	 */
	isIdCard = (str) => {
		return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
	};

	/**
	 * 获取search参数
	 * @param name
	 * @returns {*}
	 */
	getQuery = (name) => {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		const r = window.location.search.substr(1).match(reg);
		if (r != null)
			return decodeURIComponent(r[2]);
		return null;
	};


	/**
	 * 判断是否为URL地址
	 * @param  {String} str
	 * @return {Boolean}
	 */
	isUrl = (str) => {
		return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
	};

    /**
     * 产生介于两者之间的随机数,不包含min
     * @param min、max
     * @returns {number}
     */
    randomBetween = (min, max) =>{
        return min + Math.floor(Math.random() * (max - min) + 1)
    };

    /**
     * 把ISO格式时间转成时间戳
     * @param isoStr
     * @returns {number}
     */
    getTimeStamp = (isoStr) => {
        const arr = isoStr.match(/\d+/g);
        arr[1] = arr[1]-1;      //月份要减一  因为0代表一月
        return new Date(...arr).getTime();
    };

    /**
     * 时间计算（几分钟前...）
     * @param dateTimeStamp
     * @returns {string}
     */
    timeAgo = (dateTimeStamp) => {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
        const minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const month = day * 30;
        const now = new Date().getTime();   //获取当前时间毫秒
        const diffValue = now - dateTimeStamp;//时间差
        if(diffValue < 0){
            return false;
        }
        const minC = diffValue/minute;  //计算时间差的分，时，天，周，月
        const hourC = diffValue/hour;
        const dayC = diffValue/day;
        const weekC = diffValue/week;
        const monthC = diffValue/month;
        let result = '';
        if(monthC >= 1 && monthC <= 4){
            result = `${parseInt(monthC,10)}月前`
        }else if(weekC >= 1 && weekC <= 4){
            result = `${parseInt(weekC,10)}周前`
        }else if(dayC >= 1 && dayC <= 7){
            result = `${parseInt(dayC,10)}天前`
        }else if(hourC >= 1 && hourC <= 24){
            result = `${parseInt(hourC,10)}小时前`
        }else if(minC >= 1 && minC <= 60){
            result = `${parseInt(minC,10)}分钟前`
        }else if(diffValue >= 0 && diffValue <= minute){
            result = "刚刚"
        }else {  //超过三月显示日期
            const datetime = new Date(dateTimeStamp);
            const dYear = datetime.getFullYear();
            const dMonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            const dDate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            result = `${dYear}-${dMonth}-${dDate}`

        }
        return result;
    };

    /**
     * 数组去重
     * @param arr
     * @returns {any[]}
     */
    distinct = (arr) => {
        return [...new Set(arr)];
    };

    /**
     * 去空格
     * @param str
     */
    delSpace = (str) => {
        return str.replace(/\s/g,'');
    };

    /**
     * 设置cookie
     */
    setCookie = cookie.setCookie;

    /**
     * 获取cookie
     */
    getCookie = cookie.getCookie;

    /**
     * 删除cookie
     */
    delCookie = cookie.delCookie;

    /**
     * ajax 请求
     */
    ajax = ajax;

}

export default new Utils();
