$(document).ready(function (e) {
});


var Vtype = "0M";
var ccout;

$(function () {
    ccout = setTimeout("getonedata()", 1000);
    autoHeight();
    getMaindata(Vtype);

})
setInterval("getklines()", 1000);

function getklines() {
    var nowdate = new Date();
    var s = nowdate.getSeconds();
    if (s == 0) {
        getMaindata(Vtype)
    }

}

var obj = {
    start: 0,
    end: 100
}
var minQiya, maxQiya;
$(window).resize(function (e) {
    autoHeight();
})

//时间戳转成时：分：00形式   1700以来的秒数（非毫秒）
function getDateHM(tm) {
    NWh = new Date(parseInt(tm) * 1000).getHours(tm);
    NWm = new Date(parseInt(tm) * 1000).getMinutes(tm);
    NWs = new Date(parseInt(tm) * 1000).getSeconds(tm);
    if (NWh < 10) {
        NWh = "0" + NWh;
    }
    if (NWm < 10) {
        NWm = "0" + NWm;
    }
    if(NWs < 10){
       NWs = "0" + NWm;
    }
    var tt = NWh + ":" + NWm + ":" +  NWm;
    return tt;
}


//自动高度
function autoHeight() {
    var headerbarH = $(".user").height();
    var headerH = $(".first_middle").height();
    var NavH = $(".number").height();
    var tradebarH = $(".box_k").height();
    var ecBarH = $(".userp").height();
    var  footr = $(".footer").height();
    var WinHss = $(window).height();
    var hei = WinHss*0.1;
   //  $(".tabs").height(hei)
  $("#ech").height(WinHss-headerbarH-headerH-NavH-tradebarH-ecBarH-footr-hei);
  $("#ech").css("marginTop",headerbarH+headerH+NavH+tradebarH+20)
  console.log(WinHss-headerbarH-headerH-NavH-tradebarH-ecBarH-footr-hei)
}

function change_chart_period(type) {
    $(".trade-chart-period").each(function (i, e) {
        if ($(this).hasClass(type)) {
            $(this).siblings(".trade-chart-period").removeClass("active");
            $(this).addClass("active");
        }
    })

    getMaindata(Vtype);
}


function splitData(rawData) {
    var categoryData = [];
    var values = []
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(getDateHM(rawData[i].splice(0, 1)[0]));
        values.push(rawData[i])
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

function calculateMA(dayCount) {
    var result = [];
    for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += Number(data0.values[i - j][1]);
        }
        result.push(sum / dayCount);
    }

    return result;
}

function kTl(KDS) {
    K2line = new Array();
    for (p = 0; p < KDS.length; p++) {
        K2line.push(KDS[p][3])
        if (p == KDS.length - 1) {
            K2line[p] = KDS[p][1];
        }
    }

    return K2line;
}


var cldata;

//AJAX请求
function getMaindata(ctype) {


    Vtype = $(".trade-chart-period.active").data('kt');

    switch (Vtype) {
        case "0M":
            interval = "1";
            break;
        case "1M":
            interval = "1";
            break;
        case "5M":
            interval = "5";
            break;
        case "15M":
            interval = "15";
            break;
        case "30M":
            interval = "30";
            break;
        case "1H":
            interval = "60";
            break;
        case "1D":
            interval = "d";
            break;
    }

    clearTimeout(ccout);
    $.ajax({
        url: "/index/api/getkdata",
        type: "get",
        dataType: "json",
        async: true,
        contentType: "application/json",
        data: {
            "pid": 12,
            "num":40,
            "interval": interval
        },
        success: function (_jdatadata) {

            var jdatadata = jQuery.parseJSON(Base64.decode(_jdatadata));
  
            localStorage.setItem("data", '');
            localStorage.setItem("data", JSON.stringify(jdatadata));
            gotoecharts(jdatadata)
            ccout = setTimeout("getonedata()", 1000);
            getonedata();
            minQiya = jdatadata.items[jdatadata.items.length - 1][2];
            maxQiya = jdatadata.items[jdatadata.items.length - 1][3];
        },
        error: function (data) {

        }
    })

}

/*
 */

build_diff_data = function (m_short, m_long, data) {
    var result = [];
    var pre_emashort = 0;
    var pre_emalong = 0;
    for (var i = 0, len = data.length; i < len; i++) {
        var ema_short = data[i][1];
        var ema_long = data[i][1];

        if (i != 0) {
            ema_short = (1.0 / m_short) * data[i][1] + (1 - 1.0 / m_short) * pre_emashort;
            ema_long = (1.0 / m_long) * data[i][1] + (1 - 1.0 / m_long) * pre_emalong;
        }

        pre_emashort = ema_short;
        pre_emalong = ema_long;
        var diff = ema_short - ema_long;

        result.push(diff);
    }

    return result;
}

build_dea_data = function (m, diff) {
    var result = [];
    var pre_ema_diff = 0;
    for (var i = 0, len = diff.length; i < len; i++) {
        var ema_diff = diff[i];

        if (i != 0) {
            ema_diff = (1.0 / m) * diff[i] + (1 - 1.0 / m) * pre_ema_diff;
        }
        pre_ema_diff = ema_diff;

        result.push(ema_diff);
    }

    return result;
}

build_macd_data = function (data, diff, dea) {
    var result = [];

    for (var i = 0, len = data.length; i < len; i++) {
        var macd = 2 * (diff[i] - dea[i]);
        result.push(macd);
    }

    return result;
}


/*
 */

function gotoecharts(data) {

    var ecKxId = document.getElementById("ech");
    var ecKx = echarts.getInstanceByDom(ecKxId);
    if (ecKx === undefined) {
        ecKx = echarts.init(ecKxId);
    }


    $("header .now").text(data.topdata.now);

    cldata = data.topdata.now;

    $("footer").data("nowk", cldata);
    $("header .open").text(data.topdata.open);
    $("header .lowest").text(data.topdata.lowest);
    $("header .highest").text(data.topdata.highest);
    $("#container .txt1 span.a").text(getDateHM(data.topdata.topdata) + ":00");
    $("#container .txt1 span.b").text(data.topdata.now);
    $("#container .txt1 span.c").text(data.topdata.open);
    $("#container .txt1 span.d").text(data.topdata.lowest);
    $("#container .txt1 span.e").text(data.topdata.highest);
    var diff = build_diff_data(12, 26, data.items);
    var dea = build_dea_data(9, diff);
    var macd = build_macd_data(data.items, diff, dea);
    diffL = diff.length - 1;
    deaL = dea.length - 1;
    macdL = macd.length - 1;
    $("#container .txt2 span.a i").text(diff[diffL].toFixed(4));
    $("#container .txt2 span.b i").text(dea[deaL].toFixed(4));
    $("#container .txt2 span.c i").text(macd[macdL].toFixed(4));


    if (data.topdata.state == "up") {
        $("header .ng-binding").removeClass("fall").addClass("rise")
    }
    if (data.topdata.state == "down") {
        $("header .ng-binding").addClass("fall").removeClass("rise")
    }
    data0 = splitData(data.items);
  
    var ecKdata = {
        legend: {

        },

        grid: [
            {
                left: '13%',
                right: '9%',
                top: '2%',
                bottom: '15%'
            },
            {   show:false,
                left: 20,
                right: 70,
                bottom: '9%',
                height: 0
            }
        ],
		textStyle: {//字体的样式
			fontSize: 20,
			//color: "#999"
			//color: "#999"
		},
        xAxis: [{
            type: 'category',
            data: data0.categoryData,
          
            scale: true,
            boundaryGap: true,
           // splitLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: true,
                        lineStyle: {
                         color: '#555',
                        width:3,
                        type:'dashed',
                    }
                       },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#555',
                        width:3,
                        
                }
            },
           axisLabel:{
                 
                 fontSize:28,
                 fontWeight:600,
           },
            min: 'dataMin',
            max: 'dataMax',

        },
            {
                gridIndex: 1,
                type: 'category',
                data: data0.categoryData,
                scale: true,
                boundaryGap: true,
                //axisLine: {onZero: false},
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                min: 'dataMin',
                max: 'dataMax',
                show: false
            }
        ],
        yAxis: [
            {
                type: 'value',
              //  position: "right",
                scale: true,
                splitNumber: 8,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    interval:2,
                    lineStyle: {
                         color: '#555',
                        width:3,
                        type:'dashed',
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#5f5f5f',
                        width:3
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    fontSize:28,
                    fontWeight:600,
                    formatter: function (value, index) {
                        return value.toFixed(2)
                    }
                },
                max: 'dataMax',
                min: 'dataMin'

            },
            {
                gridIndex: 1,
                position: "right",
                scale: true,
                splitNumber: 3,
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {
                    show: false,
                    onZero: false,
                    lineStyle: {
                        color: '#5f5f5f'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                   
                    formatter: function (value, index) {

                        if (value > 0) {
                            return "+" + value.toFixed(2)
                        }
                        if (value < 0) {
                            return value.toFixed(5)
                        }
                        if (value == 0) {
                            return '-' + value.toFixed(2)
                        }
                    }
                },
                max: 'dataMax',
                min: 'dataMin'
            }
        ],
      /*  dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: obj.start,
                end: obj.end
            },
            {
                show: false,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '1%',
                start: 0,
                end: 50
            }
        ],*/
        series: [
            {
               // name: '日K',
                type: 'candlestick',
                data: data0.values,

                markLine: {
                    data: [
                        {yAxis: data.topdata.now}
                    ],
                    symbol: '',
                    lineStyle: {
                        normal: {
                            color: '#ffffff',
                            width:3
                        }

                    },
                    label: {
                        normal: {
                            formatter: '{c}'
                        }
                    },
                    animationDuration: 0
                },
                itemStyle: {
                    normal: { 
                       fontSize:28,
                        color: '#c23531',
                        color0: 'rgba(19,233,236,1)',
                        borderColor: '#c23531',
                        borderColor0: 'rgba(19,233,236,1)'
                    }
                },
                animationDuration: 0

            },
      /*      {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0}
                },
                animationDuration: 0,
                itemStyle: {
                    normal: {
                        opacity: 0,

                    }
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0}
                },
                animationDuration: 0,
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0}
                },
                animationDuration: 0,
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0}
                },
                animationDuration: 0,
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                }
            },*/
       /*     {
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: 'MACD',
                type: 'bar',
                data: macd,//
                smooth: true,
                symbolSize: 1,
                animationDuration: 0,
                itemStyle: {
                    normal: {
                        color: 'rgba(31,198,98,1)'
                    }
                }
            },
            {
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: 'diff',//快
                type: 'line',
                data: diff,
                smooth: true,
                animationDuration: 0,
                symbolSize: 1,
                lineStyle: {
                    normal: {
                        color: "#0fa58c"
                    }
                }
            },
            {
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: 'dea',
                type: 'line',
                data: dea,//慢
                smooth: true,
                animationDuration: 0,
                symbolSize: 1,
                lineStyle: {
                    normal: {
                        color: "#f51630"
                    }
                }
            }*/

        ]
    };
    var ecKdata2 = {
        legend: {
            //data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        /*
        tooltip: {
            trigger: 'axis'
        },
*/
        grid: [
            {
                left: '13%',
                right: '9%',
				
                top: '2%',
                bottom: '15%'
            },
            {   show:false,
                left: 20,
                right: 70,
				
                bottom: 60,
                height: 0
            }
        ],
		textStyle: {//字体的样式
			fontSize: 20,
			//color: "#999"
			//color: "#999"
		},
        xAxis: [{
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap: false,
            splitLine: {show: true,
                       lineStyle: {
                        color: '#555',
                        width:3,
                        type:'dashed',
                    }
                       },
            axisTick: {show: false},
           // splitLine: {show: false},
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#5f5f5f'
                }
            },
          axisLabel: {
             
                    show: true,
                    fontSize:28,
                    fontWeight:600,
                },
            min: 'dataMin',
            max: 'dataMax',
            //show:false
        },
            {
                gridIndex: 1,
                type: 'category',
                data: data0.categoryData,
                scale: true,
                boundaryGap: true,
                //axisLine: {onZero: false},
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                min: 'dataMin',
                max: 'dataMax',
                show: false
            }
        ],
        yAxis: [
            {
                type: 'value',
              //  position: "right",
                scale: true,
                splitNumber: 8,
               // interval: 20,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#555',
                        width:3,
                        type:'dashed',
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#5f5f5f',
                        width:3
                    }
                },
                axisTick: {
                    show: true,
                },
                axisLabel: {
                    show: true,
                    fontSize:28,
                  fontWeight:600,
                    formatter: function (value, index) {
                        return value.toFixed(2)
                    }
                },
                max: 'dataMax',
                min: 'dataMin'

            },
            {
                gridIndex: 1,
                position: "left",
                scale: true,
                splitNumber: 3,
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {
                    show: true,
                    onZero: false,
                    lineStyle: {
						
                        color: '#5f5f5f'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function (value, index) {

                        if (value > 0) {
                            return "+" + value.toFixed(2)
                        }
                        if (value < 0) {
                            return value.toFixed(2)
                        }
                        if (value == 0) {
                            return '-' + value.toFixed(2)
                        }
                    }
                },
                max: 'dataMax',
                min: 'dataMin'
            }
        ],
   /*    dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: obj.start,
                end: obj.end
            },
            {
                show: false,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '1%',
                start: 0,
                end: 50
            }
        ],*/
        series: [
            {
             //   name: '日K',
                type: 'line',
                data: kTl(data.items),
                markLine: {
                    data: [
                        {yAxis: data.topdata.now
                        }
                    ],
                    symbol: ['none','arrow'],
                    lineStyle: {
                        normal: {
                            color: '#fff',
                             width:3,
                             opacity:0.8
                        }

                    },
                    label: {
                        normal: {
                            formatter: '{c}'
                        }
                    },
                    animationDuration: 0
                },
                smooth: false,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2,
                        color: "#fff"
                    }
                },
              /*  areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#474019'
                        }, {
                            offset: 1,
                            color: '#262922',
                            opacity:0
                        }])
                    }
                },*/
                animationDuration: 0

            },
          /*  {
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: 'MACD',
                type: 'bar',
                data: macd,//
                smooth: true,
                symbolSize: 1,
                animationDuration: 0,
                itemStyle: {
                    normal: {
                        color: 'rgba(31,198,98,1)',
                        opacity:0
                    }
                }
            },
            {
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: 'diff',//快
                type: 'line',
                data: diff,
                smooth: true,
                animationDuration: 0,
                symbolSize: 1,
                lineStyle: {
                    normal: {
                        color: "#0fa58c",
                        opacity:0
                    }
                }
            },
            {
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: 'dea',
                type: 'line',
                data: dea,//慢
                smooth: true,
                animationDuration: 0,
                symbolSize: 1,
                lineStyle: {
                    normal: {
                        color: "#f51630",
                       
                    }
                }
            }*/

        ]
    };
    ecKx.clear();
    if (Vtype != "0M") {
        ecKx.setOption(ecKdata);
    } else {
        ecKx.setOption(ecKdata2);
    }

    ecKx.on("datazoom", function (param) {
        obj = param.batch[0];

    })
    ecKxId = null;


}

function getonedata() {
    var data = JSON.parse(localStorage.getItem("data"));

    clearTimeout(ccout);


    var temp = $.ajax({
        url: "/index/api/getprodata",
        type: "get",
        cache: false,
        dataType: "json",
        async: true,

        data: {
            "pid": 12,
        },
        success: function (_onedata) {
            var onedata = jQuery.parseJSON(Base64.decode(_onedata));
            var a = tempmy(onedata, data);
            a = null;

        },
        error: function (XHR) {
            XHR = null
        },
        complete: function (jqXHR, TS) {
            jqXHR = null;
        }

    })
    //temp.destroy();
    delete temp;
    ccout = setTimeout("getonedata()", 1000);
}

function tempmy(onedata, data) {


    if (onedata.now > data.topdata.now) {
        data.topdata = onedata;
        data.topdata.state = "up"
    }

    if (onedata.now < data.topdata.now) {
        data.topdata = onedata;
        data.topdata.state = "down"
    }

    data.items[data.items.length - 1][2] = onedata.now;
    maxQiya = maxQiya > onedata.now ? maxQiya : onedata.now;
    minQiya = minQiya < onedata.now ? minQiya : onedata.now;
    data.items[data.items.length - 1][3] = minQiya;
    data.items[data.items.length - 1][4] = maxQiya;
    if (Vtype == "0M") {
        K2line[data.items.length - 1] = data.topdata.now;
    }

    var gotoechartsNew = new gotoecharts(data);

    gotoechartsNew = null;

     
    newprice = data.topdata.now;
    var old_price = $('.data-price').html();
    if (old_price * 10 < newprice * 10) {
        $('.data-price').removeClass('fal');
        $('.data-price').addClass('ris');
        $('.data-lows').removeClass('fail-size');
        $('.data-lows').addClass('rise-size');
        $('.data-highs').removeClass('fail-size');
        $('.data-highs').addClass('rise-size');
        $('.data-open').removeClass('fail-size');
        $('.data-open').addClass('rise-size');
    } else if (old_price * 10 > newprice * 10) {
        $('.data-price').addClass('fal');
        $('.data-price').removeClass('ris');
      
        $('.data-lows').removeClass('rise-size');
        $('.data-lows').addClass('fail-size ');
        $('.data-highs').removeClass('rise-size ');
        $('.data-highs').addClass('fail-size');
        $('.data-open').removeClass('rise-size ');
        $('.data-open').addClass('fail-size');
    }
    $('.data-price').html(newprice);
    $('.col-nowprice').html(newprice);
    $('.newprice').html(newprice);
    $('.newprice').html(newprice);
 
    $(".data-lows").html(data.topdata.lowest);
    $(".data-highs").html(data.topdata.highest);
    $(".data-open").html(data.topdata.open);
    onedata = null;
    data = null;
}


//setInterval("getMaindata()",60000);