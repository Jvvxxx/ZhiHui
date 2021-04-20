<template>
  <div>
    <el-row>
      <el-col :span="15" class="Datecol">
        <template>
          <div class="block">
            <span class="demonstration">日期</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </template>
      </el-col>
      <el-col :span="2">
        <el-button class="ssbt" type="primary" @click="select" size="mini">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="tabcol">
        <template>
          <Row>
            <i-col span="24">
              <Table border :columns="columns1" :data="data1"></Table>

              <div style="margin-top: 20px;height: 80px">
                <Page :total="total" show-sizer show-elevator @on-change="change" />
              </div>
            </i-col>
          </Row>
        </template>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.Datecol {
  font-weight: bold;
  margin-left: 20px;
  margin-top: 20px;
}
.ssbt {
  margin-left: -500px;
  margin-top: 25px;
}
.tabcol {
  margin-top: 15px;
}
</style>
<script>
let url = "http://122.112.253.28:8095/prod-api";
import moment from "moment";
export default {
  data() {
    return {
      value1: "",
      total: "",
      totalPage: 0,
      data1: [],
      total: 27,
      pageNum: 1,
      totalPage: 3,
      pageSize: 10,
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "id",
          width: 80,
          align: "center"
        },
        {
          title: "设备号",
          align: "center",
          key: "deviceNo",
          width: 150
        },
        {
          title: "设备出入类型",
          align: "center",
          key: "deviceAccessType",
          width: 140
        },
        {
          title: "学号",
          align: "center",
          key: "studentNo",
          width: 180
        },
        {
          title: "班级",
          align: "center",
          key: "className",
          width: 170
        },
        {
          title: "学生姓名",
          align: "center",
          key: "studentName",
          width: 170
        },
        {
          title: "出/入时间（刷脸时间）",
          align: "center",
          key: "accessDate",
          width: 200
        },
        {
          title: "操作",
          key: "uses",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    icon: "ios-trash",
                    shape: "circle",
                    size: "small"
                  },
                  style: {
                    marginLeft: "20px"
                  },
                  on: {
                    click: () => {
                      this.delClass(params.row.id);
                    }
                  }
                },
                ""
              )
            ]);
          }
        }
      ],
      data1: [],
      forms: {
        bumen: "",
        jibie: "",
        keshi: "",
        xiags: "",
        type: "",
        date: "",
        search: ""
      }
    };
  },
  mounted() {
    this.all();
  },
  methods: {
    all() {
      this.axios({
        method: "GET",
        url: url + "/report/originalrecord/list?pageNum=1&pageSize=10",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(alldata => {
        console.log(alldata);

        this.data1 = alldata.data.data.list;
      });
    },
    //分页
    change(pageIndex) {
      var that = this;
      this.axios({
        method: "get",
        url:
          url +
          `/report/originalrecord/list?pageNum=${pageIndex}&pageSize=${that.pageSize}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(replace => {
        console.log(replace);
        this.data1 = replace.data.data.list;
        that.total = replace.data.data.total;
        that.totalPage = replace.data.data.totalPage;
      });
    },
    select() {
         if (this.value1) {
        this.value1 = moment(new Date(this.value1)).format("YYYY-MM-DD");
      } else {
        this.value1 = "";
      }

      this.axios({
        method: "GET",
        url:
          url +
          `/report/originalrecord/list?pageNum=1&pageSize=10&accessDate=${this.value1}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(selectData => {
        console.log(selectData);
        this.data1 = selectData.data.data.list;
      });
    },
    delClass(id) {
      this.$confirm(
        "是否确认删除考勤信息编号为'" + id + "'的数据项?",
        "删除提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.axios({
            method: "DELETE",
            url: url + "/report/originalrecord/deleteByIds/" + id,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(delDate => {
            if (delDate.data.code == 200) {
              console.log(delDate.data.code);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              return;
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
              return;
            }
            this.all();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
   component: {
    moment
  },
};
</script>