/*
 * cookie
 * @Author: magical
 * @Date: 2018-01-24
 */

class Cookie {
    /**
     * 设置cookie
     * @param name 键名
     * @param value 键值
     * @param days 过期时间(天数)
     */
    setCookie(name, value, days) {
        const exp = new Date();
        days = days || 365;
        exp.setTime(exp.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${decodeURIComponent(value)};expires=${exp.toUTCString()};path=/`;
        return this;
    }

    /**
   * 读取cookie
   * @param name 键名
   * @returns {null}
   */
    getCookie(name) {
        // debugger;
        const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
        const arr = document.cookie.match(reg);
        if (arr) {
            return decodeURIComponent(arr[2]);
        }
        return null;
    }

    /**
   * 删除cookie
   * @param name 键名
   */
    delCookie(name) {
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = `${name}=${cval};expires=${exp.toUTCString()}`;
        }
        return this;
    }
}

export default new Cookie();
