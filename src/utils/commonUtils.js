//获取下一天
function addDate(dt, days) {
    if (days == undefined || days == '') {
        days = 0;
    }
    var date = new Date(dt);
    date.setDate(date.getDate() + days);

    var last_year = date.getFullYear();
    var last_month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var last_day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    return last_year + '-' + last_month + '-' + last_day;
}
export default {
    getCurrentTime: (type) => {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1);
        var day = new Date().getDate() >= 10 ? new Date().getDate() : "0" + new Date().getDate();
        var curHour = new Date().getHours() >= 10 ? new Date().getHours() : "0" + new Date().getHours();
        var curMinute = new Date().getMinutes() >= 10 ? new Date().getMinutes() : "0" + new Date().getMinutes();

        if (type == 0) {
            return year;
        } else if (type == 1) {
            return year + "-" + month;
        } else if (type == 2) {
            return year + "-" + month + "-" + day;
        } else if (type == 3) {
            return year + "-" + month + "-" + day + " " + curHour + ":" + curMinute + ":00";
        }
    },
    //获取url地址参数值   name:参数名称
    getUrlParam: (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },

    //获取mos_param_conf配置项参数
    getParamConf: (name) => {
        let param = {
            param_name: name
        };
        let judeurl = '/pms/commonUtils/rest/CommonUtils/getParamConf'
        this.$http.get(judeurl, { params: param })
            .then(res => {
                if (res.status === 200) {
                    let data = res.body;
                    let string_value = "";
                    let int_value = "";
                    let float_value = "";
                    let long_value = "";

                    if (data.resultValue.string_value) {
                        string_value = data.resultValue.string_value;
                    }
                    if (data.resultValue.int_value) {
                        int_value = data.resultValue.int_value;
                    }
                    if (data.resultValue.float_value) {
                        float_value = data.resultValue.float_value;
                    }
                    if (data.resultValue.long_value) {
                        long_value = data.resultValue.long_value;
                    }
                    return {
                        string_value: string_value,
                        int_value: int_value,
                        float_value: float_value,
                        long_value: long_value
                    }
                } else {
                    return {
                        string_value: "",
                        int_value: "",
                        float_value: "",
                        long_value: ""
                    };
                }
            });
    },

    //获取96点  list  一般给echarts横轴使用
    get96TimesArr: () => {
        var timesArr = [];
        for (var i = 1; i < 97; i++) {
            var time = i * 15;
            var hour = Math.floor(time / 60);
            var minute = time % 60;
            hour = hour > 9 ? hour : "0" + hour;
            minute = minute > 9 ? minute : "0" + minute;
            time = hour + ":" + minute;
            timesArr.push(time);
        }
        return timesArr;
    },

    //获取当前一周的时间  time格式 yyyy-MM-dd
    getWeekDays: (time, weeknum) => {
        var weeknum_add = weeknum * 7;
        var dayArr = [
            [0, 1, 2, 3, 4, 5, 6],
            [-1, 0, 1, 2, 3, 4, 5],
            [-2, -1, 0, 1, 2, 3, 4],
            [-3, -2, -1, 0, 1, 2, 3],
            [-4, -3, -2, -1, 0, 1, 2],
            [-5, -4, -3, -2, -1, 0, 1],
            [-6, -5, -4, -3, -2, -1, 0]
        ];

        var curdate = new Date(time);
        var day_t = curdate.getDay() == 0 ? 7 : curdate.getDay();

        var weekDayArr = [];
        for (var i = 0; i < dayArr[day_t - 1].length; i++) {
            weekDayArr.push(addDate(time, dayArr[day_t - 1][i] + weeknum_add));
        }
        return weekDayArr;

    },
    //获取两个时间间的时间列表
    getDaysArr: (time1, time2) => {
        var timesArr = [];
        var startTime = new Date(time1);
        var endTime = new Date(time2);
        var days = (endTime - startTime) / (1 * 24 * 60 * 60 * 1000);
        for (var i = 0; i <= days; i++) {
            timesArr.push(addDate(startTime, i));
        }
        return timesArr;
    }
}