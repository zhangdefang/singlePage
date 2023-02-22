import XLSX from '@/assets/js/xlsx.full.min.js'
export default {
    /**
     * 时间格式化
     * @param {Number} type 类型
     * @param {String} time 日期
     */
    dateFormat: (type, time = null) => {
        let date = time ? new Date(time) : new Date();
        let o = {
            "Y": date.getFullYear(),
            "M": date.getMonth() + 1, //月份
            "D": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分钟
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //一刻
            "S": date.getMilliseconds() //毫秒
        };
        switch (type) {
            case 1:
                if (Number(o.M) < 10) {
                    o.M = '0' + o.M
                }
                if (Number(o.D) < 10) {
                    o.D = '0' + o.D
                }
                return o.Y + '-' + o.M + '-' + o.D
                break;
            case 2:
                if (Number(o.M) < 10) {
                    o.M = '0' + o.M
                }
                if (Number(o.D) < 10) {
                    o.D = '0' + o.D
                }
                if (Number(o.h) < 10) {
                    o.h = '0' + o.h
                }
                if (Number(o.m) < 10) {
                    o.m = '0' + o.m
                }
                if (Number(o.s) < 10) {
                    o.s = '0' + o.s
                }
                return o.Y + '-' + o.M + '-' + o.D + ' ' + o.h + ':' + o.m
                break;
            case 3:
                let newDate = new Date(o.Y, o.M, 0)
                let days = newDate.getDate()
                let dayArr = []
                console.log(days)
                for (var i = 1; i <= days; i++) {
                    dayArr.push(i)
                }
                return dayArr
                break;
            default:
                return o.Y + '-' + o.M + '-' + o.D + ' ' + o.h + ':' + o.m + ':' + o.s
                break;
        }
    },
    /**
     * 获取一天96个点
     */
    getTime96: () => {
        var arr = [];
        for (var i = 0; i < 96; i++) {
            var time = i * 15 + 15;
            var hour = Math.floor(time / 60);
            var minute = time % 60;
            hour = hour > 9 ? hour : "0" + hour;
            minute = minute > 9 ? minute : "0" + minute;
            arr.push(hour + ":" + minute);
        }
        return arr
    },
    /**
     * 获取一天96个点
     */
    getTime96Start00: () => {
        var arr = [];
        for (var i = 0; i < 96; i++) {
            var time = i * 15;
            var hour = Math.floor(time / 60);
            var minute = time % 60;
            hour = hour > 9 ? hour : "0" + hour;
            minute = minute > 9 ? minute : "0" + minute;
            arr.push(hour + ":" + minute);
        }
        return arr
    },
    /**
     * 获取一天24个点
     */
    getTime24: () => {
        var arr = [];
        for (var i = 0; i < 24; i++) {
            let h = i
            if (h < 10) {
                h = '0' + h + ':00'
            } else {
                h = h + ':00'
            }
            arr.push(h)
        }
        return arr
    },
    /**
     * 获取页面url中的参数
     * @param {*} url 页面url
     */
    parseURL: (url) => {
        var a = document.createElement('a')
        a.herf = url
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {}
                var s
                var strs
                if (url.indexOf('?') != -1) {
                    if (url.indexOf('#') != -1) {
                        //去除锚点
                        url = url.split('#')[0]
                    }
                    var str = url.substr(url.indexOf('?') + 1)
                    strs = str.split('&')
                    for (var i = 0; i < strs.length; i++) {
                        s = strs[i].split('=')
                        ret[s[0]] = s[1]
                    }
                }
                return ret
            })(),

            /* eslint-disable */
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),

            path: a.pathname.replace(/^([^\/])/, '/$1'),

            relative: (a.herf.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/'),
            /* eslint-enable */
        }
    },
    /**
     * 表格导出
     * @param {Array} data 需要导出的数据
     */
    epxortTable (data) {
        var wb = XLSX.utils.book_new()
        data.forEach(item => {
            item.sheet.forEach(d => {
                let sheet = XLSX.utils.json_to_sheet(d.data)
                XLSX.utils.book_append_sheet(wb, sheet, d.sheetName)
            })
            var workbookBlob = this.workbook2blob(wb)
            this.openDownloadDialog(workbookBlob, item.name + '.xlsx')
        })
    },
    /**
     * 表格导出类型，生成blob对象
     */
    workbook2blob (workbook) {
        // 生成excel的配置项
        var wopts = {
            // 要生成的文件类型
            bookType: 'xlsx',
            // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            bookSST: false,
            type: 'binary'
        }
        var wbout = XLSX.write(workbook, wopts)
        console.log(wbout)
        // 将字符串转ArrayBuffer
        function s2ab (s) {
            var buf = new ArrayBuffer(s.length)
            var view = new Uint8Array(buf)
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
            return buf
        }
        var blob = new Blob([s2ab(wbout)], {
            type: 'application/octet-stream'
        })
        return blob
    },
    /**
     * a标签实现下载功能
     */
    openDownloadDialog (blob, fileName) {
        if (typeof blob == 'object' && blob instanceof Blob) {
            blob = URL.createObjectURL(blob) // 创建blob地址
        }
        var aLink = document.createElement('a')
        aLink.href = blob
        // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
        aLink.download = fileName || ''
        var event
        if (window.MouseEvent) event = new MouseEvent('click')
        //   移动端
        else {
            event = document.createEvent('MouseEvents')
            event.initMouseEvent(
                'click',
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            )
        }
        aLink.dispatchEvent(event)
    }
}