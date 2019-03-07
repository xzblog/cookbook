/*
 * 轻提示
 * @Author: Magical
 */


/**
 * type       支持的类型       info、success、fail、warning、loading、undefined  没有任何的效果
 * content    提示文字         any
 * duration   自动关闭时间     number  默认3000,  为0则不会关闭
 * onClose    关闭后的回调     func
 * mask       是否显示遮罩层   boolean
 * iconClass  自定义图标样式   string
 */

import Notification from './notification'

// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// Toast组件核心就是通过Notification暴露的重写方法 动态改变Notification
let newNotification;

// 获得一个Notification
const getNewNotification = () => {
    // 单例 保持页面始终只有一个Notification
    if (!newNotification) {
        newNotification = Notification.reWrite();
    }

    return newNotification;
};

// notice方法实际上就是集合参数 完成对Notification的改变
const notice = (type, content, duration,  onClose, mask = false, iconClass) => {
    let notificationInstance = getNewNotification();

    notificationInstance.notice({
        type,
        content,
        duration,
        onClose: () => {
            if (onClose) onClose();
        },
        mask,
        iconClass
    });
};

export default {
    // 无动画
    show: (content, duration, onClose, mask, iconClass) => (notice(undefined, content, duration, onClose, mask, iconClass)),
    // 翻转效果
    info: (content, duration, onClose, mask, iconClass) => (notice('info', content, duration, onClose, mask, iconClass)),
    // 缩放效果
    success: (content, duration, onClose, mask, iconClass) => (notice('success', content, duration, onClose, mask, iconClass)),
    // 从下方滑入
    warning: (content, duration, onClose, mask, iconClass) => (notice('warning', content, duration, onClose, mask, iconClass)),
    // 抖动
    fail: (content, duration, onClose, mask, iconClass) => (notice('fail', content, duration, onClose, mask, iconClass)),
    // loading
    loading: (content) => (notice(undefined, content || '加载中...', 0, undefined, 'fa-circle-o-notch fa-spin', true)),
    // 销毁
    hide() {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    },
}

