<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartLine1" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine2" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts';
    import { countBirth,countGraduate } from '../../api/api';

    export default {
        data() {
            return {
                chartLine1: null,
                chartLine2: null,
                count1:[],
                count2:[]
            }
        },

        methods: {

            drawLineChart1() {
                this.chartLine1 = echarts.init(document.getElementById('chartLine1'));
                this.chartLine1.setOption({
                    title: {
                        text: '出生年份分布'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['当年出生的人数']
                    },
                    grid: {
                        left: '3%',
                        right: '9%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '当年出生的人数',
                            type: 'line',
                            stack: '总量',
                            data: this.count1
                        }
                    ]
                });
            },
            drawLineChart2() {
                this.chartLine2 = echarts.init(document.getElementById('chartLine2'));
                this.chartLine2.setOption({
                    title: {
                        text: '毕业年份分布'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['当年毕业的人数']
                    },
                    grid: {
                        left: '3%',
                        right: '9%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1995','1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '当年毕业的人数',
                            type: 'line',
                            stack: '总量',
                            data: this.count2
                        }
                    ]
                });
            },
            //获取人员出生年份情况
      			countBirth: function () {
      				let para = {
      					name: ""
      				};
      				this.loading = true;
      				countBirth(para).then((res) => {
      					this.count1 = res.data.count;
                console.log(this.count);
      					this.loading = false;
                this.drawLineChart1();
      				});
      			},
            //获取人员毕业年份情况
      			countGraduate: function () {
      				let para = {
      					name: ""
      				};
      				this.loading = true;
      				countGraduate(para).then((res) => {
      					this.count2 = res.data.count;
                console.log(this.count);
      					this.loading = false;
                this.drawLineChart2();
      				});
      			}
        },

        mounted: function () {
            this.countBirth();
            this.countGraduate();
        },
        updated: function () {
            this.countBirth();
            this.countGraduate();
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
        padding: 30px 20px;
    }
</style>
