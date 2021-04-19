<template>
  <div id="ShuSe">
    <el-row class="mDd">
      <el-col :span="6" :offset="2">
        <template>
          宿舍栋号
          <el-select v-model="value" placeholder="请选择栋号">
            <el-option
              v-for="item in options"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="6" :offset="1">
        <template>
          楼层
          <el-select v-model="value2" placeholder="请选择楼层">
            <el-option
              v-for="item in options2"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="7" :offset="1">
        <template>
          宿舍号
          <el-input class="niq" v-model="input" placeholder="请输入内容"></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="zhengqi">
      <el-col :span="5" :offset="1">
        <template>
          状态
          <el-select v-model="ztai" placeholder="班级状态">
            <el-option
              v-for="item in options3"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="select" size="mini">查询</el-button>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" plain size="mini">重置</el-button>
      </el-col>
    </el-row>
    <el-row class="zhengqi">
      <el-col :span="10" :offset="7">
        <el-button type="primary" @click=" add(), dialogVisible = true" size="mini">新增</el-button>
        <el-button type="success" disabled size="mini">修改</el-button>
        <el-button type="danger" disabled size="mini">删除</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Row>
          <i-col span="24">
            <Table border :columns="columns1" :data="data1"></Table>

            <div style="margin-top: 20px;height: 80px">
              <Page :total="total" show-sizer show-elevator @on-change="change" />
            </div>
          </i-col>
        </Row>
      </el-col>
    </el-row>
    <!-- 添加 -->
    <el-dialog title="添加宿舍信息" :visible.sync="dialogVisible" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="宿舍栋号" :rules="[{ required: true, message: '宿舍栋号不能为空'},]">
          <el-select v-model="numberValidateForm.age" placeholder="请选择">
            <el-option
              :value="itemm.dictValue"
              :label="itemm.dictLabel"
              v-for="itemm in options"
              :key="itemm.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层" :rules="[{ required: true, message: '楼层不能为空'},]">
          <el-select v-model="numberValidateForm.age2" placeholder="请选择">
            <el-option
              :value="itemm.dictValue"
              :label="itemm.dictLabel"
              v-for="itemm in options2"
              :key="itemm.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="宿舍号"
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '宿舍号不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入宿舍号"
            v-model="numberValidateForm.age3"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="宿管老师" :rules="[{ required: true, message: '宿管老师不能为空'},]">
          <el-select v-model="suguanls" placeholder="请选择">
            <el-option
              :value="itemm.id"
              :label="itemm.username"
              v-for="itemm in updateData"
              :key="itemm.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Cha()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改宿舍信息" :visible.sync="dialogVisible1" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="宿舍栋号" :rules="[{ required: true, message: '宿舍栋号不能为空'},]">
          <el-select disabled v-model="updateForm.buildingNo" placeholder="请选择">
            <el-option
              :value="itemm.id"
              :label="itemm.username"
              v-for="(itemm,i) in data2"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层" :rules="[{ required: true, message: '楼层不能为空'},]">
          <el-select disabled v-model="updateForm.storey" placeholder="请选择">
            <el-option
              :value="itemm.id"
              :label="itemm.username"
              v-for="(itemm,i) in data2"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍号" prop="age" v-model="bclass">
          <el-input
            type="text"
            disabled
            placeholder
            v-model="updateForm.dormitoryNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="班主任" :rules="[{ required: true, message: '班主任不能为空'},]">
          <el-select v-model="updateForm.dormitoryTeacherId" placeholder="请选择">
            <el-option
              :value="itemm.id"
              :label="itemm.username"
              v-for="(itemm,i) in updateData"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style  scoped>
.ImO {
  padding-left: 20px;
}
.dQo {
  width: 1267px;
}
.Omka {
  margin: 20px 10px;
}
.ooq .el-badge {
  margin: 0 0 10px 30px;
}
.clearfix {
  display: flex;
}
.clearfix > span {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #606266;
}
.nio {
  margin-left: 10px;
}
.pad {
  margin-top: 30px;
}
.mDd,
.demonstration {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #606266;
}
.niq {
  width: 70%;
}
.omO {
  padding: 30px 30px 0 30px;
}
/* @media screen and(max-device-width:1266px) {
#ShuSe{
  width: 1267px;
}
} */

/* .zhengqi{
  width: 534vh;
  border: 1px solid red;
} */
</style>
<style>
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 15px;
  margin-top: 6px;
}
.el-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  margin-left: -72px;
}
.el-col-10 {
  width: 41.66667%;
  margin-left: 6px;
}
.ivu-col-span-24 {
  display: block;
  flex: 0 0 100%;
  max-width: 100%;
  margin-top: 11px;
}
.ivu-btn-circle {
  height: 30px !important;
  width: 30px !important;
  text-align: center !important;
  padding-left: 7px !important;
  border-radius: 50% !important;
}
</style>

<script>
let url = "http://122.112.253.28:8095/prod-api";
// sys/dict/detail/dictType/sys_storey
export default {
  name: "ShuSe",
  data() {
    return {
      input: "",
      list: [],
      updateData: [],
      options: [],
      options2: [],
      options3: [],
      value: "",
      totalPage: 0,
      pageNum: 1,
      updateForm: [],
      pageSize: 10,
      total: 27,
      totalPage: 3,
      bclass: [],
      userID: "",
      data2: [],
      suguanls: [],
      value2: [],
      ztai: [],
      value3: [],
      dialogVisible: false,
      dialogVisible1: false,
      numberValidateForm: {
        age: "",
        age2: "",
        age3: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "id",
          width: 100,
          align: "center"
        },
        {
          title: "宿舍栋号",
          key: "buildingNo",
          align: "center",
          width: 100
        },
        {
          title: "楼层",
          align: "center",
          key: "storey",
          width: 100
        },
        {
          title: "宿舍号",
          align: "center",
          key: "dormitoryNo",
          width: 120
        },
        {
          title: "宿管老师",
          align: "center",
          key: "dormitoryTeacherName",
          width: 120
        },
        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          width: 170
        },

        {
          title: "修改时间",
          align: "center",
          key: "modifyTime",
          width: 170
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          width: 100
        },
        {
          title: "操作",
          key: "uses",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h("div", [
              h(
                "i-button",
                {
                  props: {
                    type: "success",
                    icon: "ios-create-outline",
                    shape: "circle",
                    size: "small"
                  },
                  style: {
                    marginLeft: "20px"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.dialogVisible1 = true;
                      // alert(this.dialogVisible1)
                      this.userID = params.row.id;
                      console.log(this.userID);
                      this.axios({
                        url:
                          "http://122.112.253.28:8095/prod-api/basedata/bdormitory/" +
                          that.userID,
                        method: "GET",
                        headers: {
                          Authorization: window.sessionStorage.token
                        }
                      }).then(response => {
                        that.updateForm = response.data.data;
                      });
                    }
                  }
                },

                ""
              ),
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
  created() {
    var that = this;
    this.axios({
      method: "get",
      url: url + "/basedata/bdormitory/list?pageNum=1&pageSize=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(replace => {
      console.log(replace);
      this.data1 = replace.data.data.list;
      that.total = replace.data.data.total;
      that.totalPage = replace.data.data.totalPage;
    });

    this.axios({
      mehtod: "get",
      url: url + "/sys/dict/detail/dictType/sys_normal_disable",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relsut => {
      console.log(relsut);
      this.options3 = relsut.data.data;
    });
    this.axios({
      method: "get",
      url:
        url +
        "/smartdor/sdAttence/listAbsenceDormitory?checkDate=&building=&storey=&bdormitory=",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relter => {
      console.log(relter);
      this.list = relter.data.data.list;
      console.log(relter.data.data.list);
    }),
      this.axios({
        method: "get",
        url: url + "/sys/dict/detail/dictType/sys_storey",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(selectData => {
        console.log(selectData.data.data);
        this.options2 = selectData.data.data;
      }),
      this.axios({
        method: "get",
        url: url + "/sys/dict/detail/dictType/sys_building",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(selectData => {
        console.log(selectData.data.data);
        this.options = selectData.data.data;
      });
      this.axios({
      method: "get",
      url: url + "/sys/user/getClassTeacherList",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(classth => {
      console.log(classth);
      this.data2 = classth.data.data;
    });
     this.axios({
        url: "http://122.112.253.28:8095/prod-api/sys/user/getDorTeacherList",
        method: "GET",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(response => {
        this.updateData = response.data.data;
        console.log(that.updateData);
      });
  },
  methods: {
    change(pageIndex) {
      var that = this;
      this.axios({
        method: "get",
        url:
          url +
          `/basedata/bdormitory/list?pageNum=${pageIndex}&pageSize=${that.pageSize}`,
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
    delClass(id) {
      this.$confirm(
        "是否确认删除宿舍编号为'" + id + "'的数据项?, 是否继续?",
        "删除提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.axios({
            method: "DELETE",
            url: url + "/basedata/bdormitory/deleteByIds/" + id,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(delDate => {
            this.axios({
              method: "get",
              url: url + "/basedata/bdormitory/list?pageNum=1&pageSize=10",
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(replace => {
              console.log(replace);
              this.data1 = replace.data.data.list;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    select() {
      var that = this;
      this.axios({
        method: "get",
        url:
          url +
          `/basedata/bdormitory/list?pageNum=1&pageSize=10&buildingNo=${that.value}&storey=${that.value2}&dormitoryNo=${that.input}&status=${that.ztai}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relter => {
        console.log(relter);
        this.data1 = relter.data.data.list;
        console.log(relter.data.data.list);
      });
    },
    add() {
      var that = this;
      this.axios({
        url: "http://122.112.253.28:8095/prod-api/sys/user/getDorTeacherList",
        method: "GET",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(response => {
        that.updateData = response.data.data;
        console.log(that.updateData);
      });
    },
    Cha() {
      var that = this;
      this.axios({
        method: "POST",
        url: url + `/basedata/bdormitory/create`,
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: {
          buildingNo: that.numberValidateForm.age,
          dormitoryNo: that.numberValidateForm.age3,
          dormitoryTeacherId: that.suguanls,
          status: "1",
          storey: that.numberValidateForm.age2
        }
      }).then(addDate => {
        console.log(addDate);
        if (addDate.data.code == 200) {
          this.$message({
            type: "success",
            message: "新增成功!"
          });
          this.dialogVisible = false;
          this.axios({
            method: "get",
            url: url + "/basedata/bdormitory/list?pageNum=1&pageSize=10",
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(replace => {
            console.log(replace);
            this.data1 = replace.data.data.list;
          });
        } else {
          this.$message({
            type: "success",
            message: "新增失败!"
          });
        }
      });
    },
    updata() {
      var that = this;
      this.axios({
        method: "PUT",
        url: url + "/basedata/bdormitory/update/" + that.userID,
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: that.updateForm
      }).then(deldata => {
        console.log(deldata);
        if (deldata.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.dialogVisible1 = false;
          this.axios({
            method: "get",
            url: url + "/basedata/bdormitory/list?pageNum=1&pageSize=10",
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(replace => {
            console.log(replace);
            this.data1 = replace.data.data.list;
          });
        } else {
          this.$message({
            type: "success",
            message: "修改失败!"
          });
        }
      });
    }
  }
};
</script>