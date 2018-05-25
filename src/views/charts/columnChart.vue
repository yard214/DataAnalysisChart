<template>
    <section class="chart-container">
        <div id="chartColumn" style="width:100%; height:400px;"></div>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import { countYear } from '../../api/api';

    export default {
        data() {
            return {
                chartColumn: null,
                count: []
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: '2012-2017获得国家杰出青年称号的人员年份分布情况表' },
                  tooltip: {},
                  xAxis: {
                      data: ["2012年", "2013年", "2014年", "2015年", "2016年", "2017年"]
                  },
                  yAxis: {},
                  series: [{
                      name: '获奖人数',
                      type: 'bar',
                      data: this.count
                    }]
                });
            },
            drawCharts() {
                this.drawColumnChart()
            },
            //获取人员年份分布数
      			countYear: function () {
      				let para = {
      					name: ""
      				};
      				this.loading = true;
      				countYear(para).then((res) => {
      					this.count = res.data.count;
                console.log(this.count);
      					this.loading = false;
                this.drawCharts();
      				});
      			}
        },

        mounted: function () {
            this.countYear();
        },
        updated: function () {
            this.countYear()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
        margin-top: 30px;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
