<template>
    <section class="chart-container">
        <el-row>
            <el-col>
                <div id="chartMap" style="width:100%; height:500px;"></div>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import echarts from 'echarts';
    import 'echarts/map/js/china.js';
    import { countArea } from '../../api/api';

    export default {
        data() {
            return {
                chartMap: null,
                count: []
            }
        },

        methods: {

            drawMapChart() {
                this.chartMap = echarts.init(document.getElementById('chartMap'));
                this.chartMap.setOption({
                  title : {
                      text: '2012-2017获得国家杰出青年称号的人员地域分布情况表',
                      subtext: '省份',
                      left: 'center'
                  },
                  tooltip : {
                      trigger: 'item'
                  },
                  legend: {
                      orient: 'vertical',
                      left: 'left',
                      data:['属于该地区的人数']
                  },
                  visualMap: {
                      min: 0,
                      max: 40,
                      left: 'left',
                      top: 'bottom',
                      text:['高','低'],           // 文本，默认为数值文本
                      calculable : true
                  },
                  toolbox: {
                      show: true,
                      orient : 'vertical',
                      left: 'right',
                      top: 'center',
                      feature : {
                          mark : {show: true},
                          dataView : {show: true, readOnly: false},
                          restore : {show: true},
                          saveAsImage : {show: true}
                      }
                  },
                  series : [
                      {
                          name: '属于该地区的人数',
                          type: 'map',
                          mapType: 'china',
                          roam: false,
                          label: {
                              normal: {
                                  show: false
                              },
                              emphasis: {
                                  show: true
                              }
                          },
                          data: this.count
                      }
                  ]
                });
            },
            drawCharts() {
                this.drawMapChart()
            },
            //获取信息列表
      			countArea: function () {
      				let para = {
      					name: ""
      				};
      				this.loading = true;
      				countArea(para).then((res) => {
      					this.count = res.data.count;
                console.log(this.count);
      					this.loading = false;
                this.drawCharts();
      				});
      			}
        },

        mounted: function () {
            this.countArea()
        },
        updated: function () {
            this.countArea()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 200px;
    }
</style>
