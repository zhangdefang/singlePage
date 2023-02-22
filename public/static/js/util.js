export default {
    // 返回当前+day天的年月日
    getDay: function (day) {
        var today = new Date()
        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
        today.setTime(targetday_milliseconds) //注意，这行是关键代码
        var tYear = today.getFullYear()
        var tMonth = today.getMonth()
        var tDate = today.getDate()
        tMonth = this.doHandleMonth(tMonth + 1)
        tDate = this.doHandleMonth(tDate)
        return tYear + '-' + tMonth + '-' + tDate
    },
    doHandleMonth: function (month) {
        var m = month
        if (month.toString().length == 1) {
            m = '0' + month
        }
        return m
    },

    //样式切换初始化数据 传入颜色主题
    commomhandle: function () {
        var color = null
        if (window.parent.document.getElementById("themeColor")) {
            color = window.parent.document.getElementById("themeColor").getAttribute("class")
        }

        if (color != 'theme_blue' && color != "theme_green") {
            color = 'theme_blue'
        }
        let head = document.getElementsByTagName('head')[0]
        let skinPath = './static/css/' + color + '.css'
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = skinPath
        link.id = 'workbench_color'
        head.appendChild(link)
    },

    //jExcel 24*4表头
    jExcelColumns: function () {
        let TimeDot = [
            {
                type: 'text',
                title: ' ',
                width: '50px',
                readOnly: true,
                name: 'timeDot',
            },
        ]
        for (let i = 0; i < 24; i++) {
            if (i == 0) {
                TimeDot.push({
                    type: 'numeric',
                    title: '0',
                    width: '50px',
                    name: '0',
                })
            } else {
                TimeDot.push({
                    type: 'numeric',
                    title: i.toString(),
                    width: '50px',
                    name: i.toString(),
                })
            }
        }
        return TimeDot
    },

    //下拉框96个点
    selectDot96: function () {
        var TimeDot = [];
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < 4; j++) {
                if (i < 10) {
                    if (j < 1) {
                        TimeDot.push({
                            "value": "0" + i + ":" + "0" + j * 15,
                            "label": "0" + i + ":" + "0" + j * 15
                        })

                    } else {
                        TimeDot.push({
                            "value": "0" + i + ":" + j * 15,
                            "label": "0" + i + ":" + j * 15
                        })
                        // TimeDot.push("0" + i + ":" + j * 15)
                    }

                } else if (i >= 10) {
                    if (j < 1) {
                        TimeDot.push({
                            "value": i + ":" + "0" + j * 15,
                            "label": i + ":" + "0" + j * 15
                        })
                        // TimeDot.push(i + ":" + "0" + j * 15)
                    } else {
                        TimeDot.push({
                            "value": i + ":" + j * 15,
                            "label": i + ":" + j * 15
                        })
                        // TimeDot.push(i + ":" + j * 15)
                    }

                }
            }
        }
        TimeDot.shift()
        TimeDot.push({
            value: "24:00",
            label: "24:00"
        })
        return TimeDot
    },
    selectDot96_index: function () {
        var TimeDot = [];
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < 4; j++) {
                if (i < 10) {
                    if (j < 1) {
                        TimeDot.push({
                            "value": i*4+j,
                            "label": "0" + i + ":" + "0" + j * 15
                        })

                    } else {
                        TimeDot.push({
                            "value": i*4+j,
                            "label": "0" + i + ":" + j * 15
                        })
                        // TimeDot.push("0" + i + ":" + j * 15)
                    }

                } else if (i >= 10) {
                    if (j < 1) {
                        TimeDot.push({
                            "value": i*4+j,
                            "label": i + ":" + "0" + j * 15
                        })
                        // TimeDot.push(i + ":" + "0" + j * 15)
                    } else {
                        TimeDot.push({
                            "value": i*4+j,
                            "label": i + ":" + j * 15
                        })
                        // TimeDot.push(i + ":" + j * 15)
                    }

                }
            }
        }
        TimeDot.shift()
        TimeDot.push({
            value: 96,
            label: "24:00"
        })
        return TimeDot
    },
    //滑块96个点
    sliderDot96: function () {
        var TimeDot = []
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < 4; j++) {
                if (i < 10) {
                    if (j < 1) {
                        TimeDot.push({
                            label: '0' + i + ':' + '0' + j * 15,
                        })
                    } else {
                        TimeDot.push({
                            label: '0' + i + ':' + j * 15,
                        })
                    }
                } else if (i >= 10) {
                    if (j < 1) {
                        TimeDot.push({
                            label: i + ':' + '0' + j * 15,
                        })
                    } else {
                        TimeDot.push({
                            label: i + ':' + j * 15,
                        })
                    }
                }
            }
        }
        TimeDot.shift()
        TimeDot.push({
            label: '24:00',
        })
        for (let index = 1; index <= TimeDot.length; index++) {
            TimeDot[index - 1].value = index.toString()
        }
        return TimeDot
    },

    //折线图96个点
    chartDot96: function () {
        var TimeDot = [];
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < 4; j++) {
                if (i < 10) {
                    if (j < 1) {
                        TimeDot.push("0" + i + ":" + "0" + j * 15)
                    } else {
                        TimeDot.push("0" + i + ":" + j * 15)
                    }

                } else if (i >= 10) {
                    if (j < 1) {
                        TimeDot.push(i + ":" + "0" + j * 15)
                    } else {
                        TimeDot.push(i + ":" + j * 15)
                    }

                }
            }
        }
        TimeDot.shift()
        TimeDot.push("24:00")
        return TimeDot
    },
    //南网折线图96个点
    chartDot96N: function () {
        var TimeDot = [];
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < 4; j++) {
                if (i < 10) {
                    if (j < 1) {
                        TimeDot.push("0" + i + ":" + "0" + j * 15)
                    } else {
                        TimeDot.push("0" + i + ":" + j * 15)
                    }

                } else if (i >= 10) {
                    if (j < 1) {
                        TimeDot.push(i + ":" + "0" + j * 15)
                    } else {
                        TimeDot.push(i + ":" + j * 15)
                    }

                }
            }
        }
        return TimeDot
    },
    //从路径获取项目名
    getBaseUrlParam:function(){
        var programPath = location.pathname.split("/")[1];
        console.log("页面路径："+programPath);
        if(!programPath||(programPath!="pms"&&programPath!="osp")){
            programPath = "pms";
        }
        return programPath;
    },
    // 获取页面路径中的参数
    parseURL: function (url) {
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

    // 生成本月最后一天
    getCurrentMonthLast: function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        var lastTime = new Date(nextMonthFirstDay - oneDay);
        var month = parseInt(lastTime.getMonth() + 1);
        var day = lastTime.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return date.getFullYear() + '-' + month + '-' + day;
    },

    // 生成本月第一天
    getCurrentMonthFirst: function () {
        var date = new Date();
        date.setDate(1);
        var month = parseInt(date.getMonth() + 1);
        var day = date.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return date.getFullYear() + '-' + month + '-' + day;
    },

    //获取两日期之间日期列表函数
    getDiffDate: function (stime, etime) {
        //初始化日期列表，数组
        var diffdate = new Array();
        var i = 0;
        //开始日期小于等于结束日期,并循环
        while (stime <= etime) {
            diffdate[i] = stime;

            //获取开始日期时间戳
            var stime_ts = new Date(stime).getTime();
            // console.log('当前日期：' + stime + '当前时间戳：' + stime_ts);

            //增加一天时间戳后的日期
            var next_date = stime_ts + (24 * 60 * 60 * 1000);

            //拼接年月日，这里的月份会返回（0-11），所以要+1
            var next_dates_y = new Date(next_date).getFullYear() + '-';
            var next_dates_m = (new Date(next_date).getMonth() + 1 < 10) ? '0' + (new Date(next_date).getMonth() + 1) +
                '-' : (new Date(next_date).getMonth() + 1) + '-';
            var next_dates_d = (new Date(next_date).getDate() < 10) ? '0' + new Date(next_date).getDate() : new Date(
                next_date).getDate();

            stime = next_dates_y + next_dates_m + next_dates_d;

            //增加数组key
            i++;
        }
        return diffdate
    },
    dateToString:function(date){
        var year = date.getFullYear();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
        if(month.length==1){
          month = "0"+month;
        }
        if(day.length==1){
          day="0"+day;
        }
        var dateTime = year+"-"+month+"-"+day;
        return dateTime;
      },
     formxAxis:function(start,end){
        var xAxis = [];
        for(var i=start;i<=end;i++){
            for(var j=1;j<=4;j++){
            var hour = 0;
            if(j==4){
                hour = i+1;
            }else{
                hour = i;
            }
            var title = (hour<10?("0"+hour):hour)+":"+(j==4?"00":j*15);
            xAxis.push(title);
            }
        }
        return xAxis;
        },
}

