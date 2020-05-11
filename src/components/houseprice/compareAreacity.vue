<template>
  <div>
    <el-card>
      <div
        id="mychartcir"
        :data="datatB"
        :style="{width:'100%',height:'600px'}"
        style="margin-top:15px;"
      ></div>
    </el-card>

    <el-card style="margin-top:10px;">
      <div
        id="mycharts"
        :data="datatA"
        :style="{width:'100%',height:'500px'}"
        style="margin-top:15px;"
      ></div>
    </el-card>

    <el-card style="margin-top:10px;">
      <div id="mychartcom" :style="{width:'100%',height:'500px'}" style="margin-top:15px;"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataB_X: [],
      dataB_Y: [],
      dataC: []
    };
  },
  mounted() {
    this.drawcir();
    this.drawLine();
    this.drawcom();
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(
        document.getElementById("mycharts"),
        "light"
      );
      // 绘制图表
      myChart.setOption({
        title: { text: "城市区域房价对比", right: "center" },
        xAxis: {
          data: [],
          type: "category",
          nameTextStyle: {
            // 坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, -5]
          },
          nameGap: 15, // 坐标轴名称与轴线之间的距离
          axisLine: {
            // 坐标轴 轴线
            show: true, // 是否显示
            symbol: ["none", "arrow"], // 是否显示轴线箭头
            symbolSize: [8, 8], // 箭头大小
            symbolOffset: [0, 7], // 箭头位置
            // ------   线 ---------
            lineStyle: {
              // color: "#fff",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            // 坐标轴标签
            show: true, // 是否显示
            inside: false, // 是否朝内
            interval: 0,
            rotate: 40, // 旋转角度
            margin: 5 // 刻度标签与轴线之间的距离
          },
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              optionToContent: function(opt) {
                let axisData = opt.xAxis[0].data; //坐标数据
                let series = opt.series; //折线图数据
                let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
                let tdBodys = ""; //数据
                series.forEach(function(item) {
                  //组装表头
                  tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
                });
                let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
                for (let i = 0, l = axisData.length; i < l; i++) {
                  for (let j = 0; j < series.length; j++) {
                    //组装表数据
                    tdBodys += `<td>${series[j].data[i]}</td>`;
                  }
                  table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
                  tdBodys = "";
                }
                table += "</tbody></table>";
                return table;
              }
            }, // 数据视图
            magicType: { show: true, type: ["line", "bar"] }, // 图形切换
            restore: { show: true }, // 还原
            saveAsImage: { show: true } // 保存图片
          }
        },
        yAxis: {},
        series: [
          {
            name: "新房单价:万/㎡",
            type: "bar",
            data: [],
            label: {
              normal: {
                show: true,
                position: "insideRight",
                formatter: "{c}"
              }
            }
          }
        ]
      });
      const city = this.$route.params.city;
      this.$http
        .get(`/api/Home/AvgByCityArea?city=${city}`, {
          headers: { "Content-Type": "application/json;charset=utf-8" }
        })
        .then(res => {
          myChart.setOption({
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                }
              }
            },
            color: ["#1AFFFD", "#FFCB89"], // 修改图形颜色
            legend: {
              x: "14%",
              orient: "vertical",
              icon: "circle",
              data: res.data.data.chartA.xvalue,
              textStyle: {
                //图例文字的样式
                color: "#8ECBFF",
                fontSize: 18
              }
            },
            xAxis: {
              type: "category",
              data: res.data.data.chartA.xvalue
            },
            series: [
              {
                type: "bar",
                data: res.data.data.chartA.yvalue
              }
            ]
          });
        });

      window.onresize = myChart.resize;
    },
    drawcir() {
      let myChartcir = this.$echarts.init(
        document.getElementById("mychartcir"),
        "light"
      );
      myChartcir.setOption({
        // backgroundColor: "#2c343c",
        grid: {
          bottom: 150,
          top: 20,
          right: 0,
          left: 50,
          height: 300
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)" //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
        },
        title: {
          text: "城市区域房源分布图",
          x: "center",
          textStyle: {
            color: "#8ECBFF"
          }
        },
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        },
        series: [
          {
            name: "新房房源占比",
            type: "pie",
            radius: "80%",
            data: [],
            roseType: "angle"
            // label: {
            //   normal: {
            //     textStyle: {
            //       color: "rgba(255, 255, 255, 0.3)"
            //     }
            //   }
            // },
            // labelLine: {
            //   normal: {
            //     lineStyle: {
            //       color: "rgba(255, 255, 255, 0.3)"
            //     }
            //   }
            // },
            // itemStyle: {
            //   normal: {
            //     color: "#c23531",
            //     shadowBlur: 200,
            //     shadowColor: "rgba(0, 0, 0, 0.5)"
            //   }
            // }
          }
        ]
      });
      const city = this.$route.params.city;
      this.$http
        .get(`/api/Home/AreaScatte?city=${city}`, {
          headers: { "Content-Type": "application/json;charset=utf-8" }
        })
        .then(res => {
          myChartcir.setOption({
            legend: {
              x: "14%",
              orient: "vertical",
              icon: "circle",
              data: res.data.data.chartA.xvalue,
              textStyle: {
                //图例文字的样式
                color: "#8ECBFF",
                fontSize: 18
              }
            },
            series: [
              {
                name: "新房房源占比",
                type: "pie",
                radius: "80%",
                data: res.data.data.chartB
              }
            ]
          });
        });
      window.onresize = myChartcir.resize;
    },
    drawcom() {
      let myChartcom = this.$echarts.init(
        document.getElementById("mychartcom"),
        "light"
      );
      myChartcom.setOption({
        legend: {},
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              optionToContent: function(opt) {
                let axisData = opt.xAxis[0].data; //坐标数据
                let series = opt.series; //折线图数据
                let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
                let tdBodys = ""; //数据
                series.forEach(function(item) {
                  //组装表头
                  tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
                });
                let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
                for (let i = 0, l = axisData.length; i < l; i++) {
                  for (let j = 0; j < series.length; j++) {
                    //组装表数据
                    tdBodys += `<td>${series[j].data[i]}</td>`;
                  }
                  table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
                  tdBodys = "";
                }
                table += "</tbody></table>";
                return table;
              }
            }, // 数据视图
            magicType: { show: true, type: ["line", "bar"] }, // 图形切换
            restore: { show: true }, // 还原
            saveAsImage: { show: true } // 保存图片
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        dataset: {
          source: [
            ["month", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},

        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });

      window.onresize = myChartcom.resize;
    }
    // getAreacompare() {
    //   const city = this.$route.params.city;
    //   this.$http
    //     .get(`/api/Home/AvgByCityArea?city=${city}`, {
    //       headers: { "Content-Type": "application/json;charset=utf-8" }
    //     })
    //     .then(function(res) {
    //       console.log(res.data.data.chartB);
    //       this.dataB = res.data.data.chartB;
    //     });
    // }
    // async getAreacompare() {
    //   const city = this.$route.params.city;
    //   const { data } = await this.$http.get(
    //     `/api/Home/AvgByCityArea?city=${city}`,
    //     {
    //       headers: { "Content-Type": "application/json;charset=utf-8" }
    //     }
    //   );

    //   console.log(JSON.stringify(data.data.chartB));

    //   this.dataB = JSON.stringify(data.data.chartB);

    //   console.log(this.dataB);
    // }
  }
};
</script>