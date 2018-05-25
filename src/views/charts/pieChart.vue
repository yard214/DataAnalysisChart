<template>
    <section class="chart-container">
        <el-row>
            <el-col>
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts';
    import { countSex } from '../../api/api';

    export default {
        data() {
            return {
                chartPie: null,
                count: []
            }
        },

        methods: {

            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '性别构成表',
                        subtext: '12-17获得国家杰出青年称号性别百分比',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['男', '女']
                    },
                    series: [
                        {
                            name: '性别构成',
                            type: 'pie',
                            radius: '75%',
                            center: ['50%', '60%'],
                            data: this.count,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawPieChart()
            },
            //获取信息列表
      			countSex: function () {
      				let para = {
      					name: ""
      				};
      				this.loading = true;
      				countSex(para).then((res) => {
      					this.count = res.data.count;
                console.log(this.count);
      					this.loading = false;
                this.drawCharts();
      				});
      			}
        },

        mounted: function () {
            this.countSex()
        },
        updated: function () {
            this.countSex()
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
