<template>
  <div class="bclass">
    <div class="top">
      <el-form :model="formInline" :inline="true">
        <strong style="margin-left:40px;">日期</strong>
        <el-date-picker
          v-model="value"
          align="right"
          type="month"
          placeholder="选择日期"
          style="margin-left:20px;"
        ></el-date-picker>
        <el-form-item style="margin-left:20px;">
          <el-button type="primary" @click="cha()">
            <i class="el-icon-search"></i> 搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        element-loading-text="拼命加载中"
        :header-cell-style="{textAlign: 'center',background:'#eef1f6'}"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="inMonth" label="日期"></el-table-column>
        <el-table-column prop="buildingNo" label="宿舍栋号"></el-table-column>
        <el-table-column prop="storey" label="楼层"></el-table-column>
        <el-table-column prop="dormitoryNo" label="宿舍号"></el-table-column>
        <el-table-column prop="avgScore" label="宿舍平均总得分"></el-table-column>
        <el-table-column prop="avgNormalAttenceRate" label="正常出勤率"></el-table-column>
      </el-table>
      <div class="page">
        <Page :total="page" show-total show-sizer />
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment"

export default {
  component: {
    moment
  },
  data() {
    return {
      formInline: {
        user: "",
        region: []
      },
      tableData: [
        {
          inMonth: "", //日期
          buildingNo: "", //宿舍栋号
          dormitoryNo: "",//宿舍号
          avgScore: "",
          storey: "",//楼层
          avgNormalAttenceRate:"",//出勤率
        }
      ],
      page: Number(),
      value: "",
      formLabelWidth: "80px",
      page:Number()
    };
  },
  created() {
    //获取卫生列表
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8095/prod-api/report/excellentdorsta/list?pageNum=1&pageSize=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(response => {
      this.tableData = response.data.data.list;
      this.page = response.data.data.total;
    });
  },
  methods: {
    cha() {
      let that = this;
      if (that.value) {
        that.value = moment(new Date(that.value)).format("YYYY-MM");
      } else {
        that.value == "";
      }
      this.axios({
        method: "GET",
        url: `http://122.112.253.28:8095/prod-api/report/excellentdorsta/list?pageNum=1&pageSize=10&inMonth=${that.value}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(response => {
        this.tableData = response.data.data.list;
      });
    }
  }
};
</script>
<style>
.top {
  width: 80%;
  margin-top: 10px;
}
.sou {
  font-weight: 600;
}
.but {
  margin-top: 10px;
}
.but button {
  margin-left: 10px;
}
.but button:nth-of-type(1) {
  margin-left: 0;
}
.table {
  margin-top: 20px;
}
.page {
  float: right;
  margin: 20px;
}
</style>