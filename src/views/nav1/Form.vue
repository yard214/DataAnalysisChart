<template>
	<div>
		<template>
			<!--上传文件模块-->
			<el-upload class="upload-demo" :show-file-list=false action="" drag :before-upload="acceptFile">
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传。</em></div>
			</el-upload>
		</template>
		<template>
			<!--excel内容展示模块-->
			<span>上传结果</span>
			<div>
				<el-table :data="listTable" height="400" style="width: 100%" border>
					<el-table-column label="获奖年份" align="center" prop="yearOfAward" ></el-table-column>
				 	<el-table-column label="姓名" align="center" prop="name" ></el-table-column>
				 	<el-table-column label="出生日期" align="center" prop="yearOfBirth" ></el-table-column>
				 	<el-table-column label="性别" align="center" prop="sex" ></el-table-column>
				 	<el-table-column label="单位名称" align="center" prop="companyName" ></el-table-column>
				 	<el-table-column label="单位地址" align="center" prop="companyAddress" ></el-table-column>
				 	<el-table-column label="地址纬度" align="center" prop="address_X" ></el-table-column>
					<el-table-column label="地址经度" align="center" prop="address_Y" ></el-table-column>
					<el-table-column label="专业" align="center" prop="major" ></el-table-column>
					<el-table-column label="毕业时间" align="center" prop="yearOfGraduate" ></el-table-column>
				</el-table>
				<el-pagination style="padding: 5px 0px;font-size:24px;"
			    :total.sync="totalCount"
					layout="total">
			  </el-pagination>
			</div>

		</template>
	</div>
</template>

<script>
import XLSX from 'xlsx';
import { uploadMock } from '../../api/api';
export default {
	name: 'app',
	data(){
		return{
			listTable:[], //存放从excel读取的内容
			currentPage:1,
			totalCount:0
		}
	},
	methods:{
		handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
		acceptFile(f){
			//获取到文件名最后一个"."的位置
			let extStart = f.name.lastIndexOf(".");
			//通过未知 获取文件后缀名
			let filetype = f.name.substring(extStart, f.name.length).toUpperCase();
			//如果后缀名不是 excel文件 提示上传指定文件
			if (filetype != ".XLSX" && filetype != ".XLS" ){
			alert("请上传正确的文件格式");
			return;
		}
			//格式正确后 开始对文件进行操作
			this.handleFile(f);
		},
		handleFile(f){
			if(window.FileReader) {
				//如果浏览器支持 创建fileReader
				var  reader = new FileReader();
			}else{
				this.$message.error('你的浏览器不支持fileReader,请升级您的浏览器！');
			}
			reader.onload =(e)=>{
				let data = e.target.result,
					//使用XLSL控件 读取文件信息
					workbook = XLSX.read(data, { type: 'binary' }),
					//获取到excel里第一个sheet文件
					sheetName = workbook.SheetNames[0],
					//获取到sheet内容
						sheet = workbook.Sheets[sheetName];
						//清空表格
						this.listTable=[];
						//开始获取excel内容
						this.getData(sheet);
			};
			//将文件读取为二进制码
			reader.readAsBinaryString(f);
		},
		getData(sheet){
			let colArr=[], //存放A~Z
				yearOfAward="",
				name="",
				yearOfBirth="",
				sex="",
				companyName="",
				companyAddress="",
				address_X="",
				address_Y="",
				major="",
				yearOfGraduate="";
		  //将A~Z存放至数组中
			for (let col = 65; col <= 90; col++) {
				let c = String.fromCharCode(col);
				colArr.push(c);
			}
			//从A1遍历至Z1 当有一个 为空时 遍历停止
			for(var i=0;;i++){
				if(sheet[colArr[i]+1]==null){
					break;
				}
				switch (sheet[colArr[i]+1].v){
					case "年份":
						yearOfAward=colArr[i];
						break;
					case "姓名":
						name=colArr[i];
						break;
					case "出生日期":
						yearOfBirth=colArr[i];
						break;
					case "性别":
						sex=colArr[i];
						break;
					case "单位名称":
						companyName=colArr[i];
						break;
					case "单位地址":
						companyAddress=colArr[i];
						break;
					case "纬度X":
						address_X=colArr[i];
						break;
					case "经度Y":
						address_Y=colArr[i];
						break;
					case "专业":
						major=colArr[i];
						break;
					case "毕业时间":
						yearOfGraduate=colArr[i];
						break;
					default:
						break;
				}
			}
			//开始遍历每一行
			for (var row=2; ;row++) {
				  let obj={};
					//当某一行全部为空时 遍历停止
					if(sheet[yearOfAward+row]==null&&sheet[name+row]==null&&sheet[yearOfBirth+row]==null&&sheet[sex+row]==null&&sheet[companyName+row]==null&&sheet[companyAddress+row]==null
					&&sheet[address_X+row]==null&&sheet[address_Y+row]==null&&sheet[major+row]==null&&sheet[yearOfGraduate+row]==null){
				    break;
		 	    }
					obj.yearOfAward=sheet[yearOfAward+row].v;
					obj.name=sheet[name+row].v;
					obj.yearOfBirth=sheet[yearOfBirth+row].v;
					obj.sex=sheet[sex+row].v;
					obj.companyName=sheet[companyName+row].v;
					obj.companyAddress=sheet[companyAddress+row].v;
					obj.address_X=sheet[address_X+row].v;
					obj.address_Y=sheet[address_Y+row].v;
					obj.major=sheet[major+row].v;
					obj.yearOfGraduate=sheet[yearOfGraduate+row].v;
					//将赋值后的对象 加入到表格数组里
					this.listTable.push(obj);
			}
			this.totalCount = row-2;
			this.upload();
		},

		//上传数据集到Mock
		upload: function () {
			let para = {
				obj: this.listTable
			};
			this.loading = true;
			uploadMock(para).then((res) => {
				this.code = res.data.code;
				this.loading = false;
				if (this.code == 200) {
					this.$alert('数据集上传成功！', '上传结果', {
	          confirmButtonText: '确定',
	          callback: action => {
							console.log(para);
	          }
	        });
				}
			});
		}
	}
}
</script>
