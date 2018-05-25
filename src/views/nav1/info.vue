<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getInfo">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="info" v-loading="loading" height="500" style="width: 100%" border>
				<el-table-column label="获奖年份" align="center" prop="yearOfAward" sortable ></el-table-column>
				<el-table-column label="姓名" align="center" prop="name" sortable ></el-table-column>
				<el-table-column label="出生日期" align="center" prop="yearOfBirth" sortable ></el-table-column>
				<el-table-column label="性别" align="center" prop="sex" sortable ></el-table-column>
				<el-table-column label="单位名称" align="center" prop="companyName" sortable ></el-table-column>
				<el-table-column label="单位地址" align="center" prop="companyAddress" ></el-table-column>
				<el-table-column label="地址纬度" align="center" prop="address_X" ></el-table-column>
				<el-table-column label="地址经度" align="center" prop="address_Y" ></el-table-column>
				<el-table-column label="专业" align="center" prop="major" sortable ></el-table-column>
				<el-table-column label="毕业时间" align="center" prop="yearOfGraduate" sortable ></el-table-column>
			</el-table>
			<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-sizes="[10, 20, 50, 100, totalCount]"
	      :page-size.sync="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
				:total.sync="totalCount">
	    </el-pagination>
		</template>

	</section>
</template>
<script>
	import { getInfoList,getInfoListPage } from '../../api/api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				totalCount:0,
				currentPage: 1,
				totalCount: 0,
				pageSize: 10,
				info: [
				]
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
				console.log(this.pageSize);
        this.getInfo();
      },
      handleCurrentChange(val) {
				this.currentPage = val;
				console.log(this.currentPage);
        this.getInfo();
      },

			//获取信息列表
			getInfo: function () {
				let para = {
					page: this.currentPage,
					name: this.filters.name,
					pageSize: this.pageSize
				};
				this.loading = true;
				getInfoListPage(para).then((res) => {
					this.info = res.data.info;
					this.totalCount = res.data.total;
					this.loading = false;
				});
			}
		},
		mounted() {
			this.getInfo();
		}
	};

</script>

<style scoped>

</style>
