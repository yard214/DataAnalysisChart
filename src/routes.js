import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import info from './views/nav1/info.vue'
import echarts from './views/charts/echarts.vue'
import columnChart from './views/charts/columnChart.vue'
import pieChart from './views/charts/pieChart.vue'
import lineChart from './views/charts/lineChart.vue'
import mapChart from './views/charts/mapChart.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '数据集导入',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/form', component: Form, name: '上传数据集' },
            { path: '/info', component: info, name: '数据集内容' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '图表化展示',
        iconCls: 'fa fa-bar-chart',
        children: [
            // { path: '/echarts', component: echarts, name: 'echarts' },
            { path: '/mapChart', component: mapChart, name: '人员地域分布' },
            { path: '/lineChart', component: lineChart, name: '出生及毕业日期情况分布' },
            { path: '/pieChart', component: pieChart, name: '性别构成' },
            { path: '/columnChart', component: columnChart, name: '人员获奖年份分布' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
