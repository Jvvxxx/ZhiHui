<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="职位"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
let url='http://122.112.253.28:8888/api/private/v1/';
  export default {
      data(){
          return{
              tableData:[],
          }
      },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    mounted(){
        this.onloadData();
    },
    methods:{
        onloadData(){
            this.axios({
                method:'get',
                url:url+'users?pagenum=1&pagesize=5',
                headers:{
                    Authorization:window.sessionStorage.token
                }
            }).then((result)=>{
                console.log(result);
                this.tableData=result.data.data.users
            })
        }
    }
  }
</script>
<style>
  .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 10px;
    text-align: center;
}
</style>