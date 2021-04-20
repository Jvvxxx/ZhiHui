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
        <el-table-column prop="inYearMonth" label="日期"></el-table-column>
        <el-table-column prop="buildingNo" label="宿舍栋号"></el-table-column>
        <el-table-column prop="storey" label="楼层"></el-table-column>
        <el-table-column prop="dormitoryNo" label="宿舍号"></el-table-column>
        <el-table-column prop="avgScore" label="宿舍平均总得分"></el-table-column>
      </el-table>
      <div class="page">
        <Page :total="page" show-total show-sizer />
      </div>
    </div>
    <div id="pp">
      <p><strong>卫生统计</strong><br><span style="color:gray;">宿舍平均总得分(按月)</span></p>
    </div>
    <div id="main">
      
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
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
          avgScore: "",
          buildingNo: "",
          dormitoryNo: "",
          inYearMonth: "",
          storey: ""
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
        "http://122.112.253.28:8095/prod-api/report/hygienestatistics/list?pageNum=1&pageSize=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(response => {
      this.tableData = response.data.data.list;
      this.page = response.data.data.total;
    });
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        xAxis: {
          type: "category",
          data: ["1栋-8楼-805", "1栋-8楼-806", "1栋-8楼-807", "1栋-8楼-808", "1栋-8楼-809", "1栋-8楼-8010", "1栋-8楼-811", "1栋-8楼-812", "1栋-8楼-815", "1栋-8楼-816"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [0, 90, 0, 0, 0, 0, 0, 0, 0, 0],
            type: "bar"
          }
        ]
      };

      option && myChart.setOption(option);
    },
    cha() {
      let that = this;
      if (that.value) {
        that.value = moment(new Date(that.value)).format("YYYY-MM");
      } else {
        that.value == "";
      }
      this.axios({
        method: "GET",
        url: `http://122.112.253.28:8095/prod-api/report/hygienestatistics/list?pageNum=1&pageSize=10&inYearMonth=${that.value}`,
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
#main {
  width: 100%;
  height: 300px;
  margin: -100px auto;
}
#pp{
  width: 50%;
  margin: 100px auto;
  text-align: center;
}
.bclass{
  height: 1060px;
}
</style>