<template>
  <div id="ShuSe">
    <el-row class="mDd">
      <el-col :span="6" :offset="2">
        <template>
          参数名称
          <el-input class="niq" v-model="value" placeholder="请输入内容"></el-input>
        </template>
      </el-col>
      <el-col :span="6" :offset="1">
        <template>
           参数键名
          <el-input class="niq" v-model="value2" placeholder="请输入内容"></el-input>
        </template>
      </el-col>
      <el-col :span="7" :offset="1">
        <template>
           系统内置
          <el-select v-model="ztai" placeholder="系统内置">
            <el-option
              v-for="item in options3"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </template>
      </el-col>
    </el-row>
    <el-row class="zhengqi">
      <el-col :span="10" :offset="1">
        <div class="block">
          <span class="demonstration">创建时间</span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </div>
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
       
        <el-form-item
          label="参数名称"
          prop="age"
          v-model="bclass"
        >
          <el-input
            type="text"
            placeholder="请输入参数名称"
            v-model="numberValidateForm.age3"
            autocomplete="off"
          ></el-input>
        </el-form-item>
       <el-form-item
          label="参数键名"
          prop="age"
          v-model="bclass"
          
        >
          <el-input
            type="text"
            placeholder="请输入参数键名"
            v-model="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item
          label="参数键值"
          prop="age"
          v-model="bclass"
          
        >
          <el-input
            type="text"
            placeholder="请输入参数键值"
            v-model="numberValidateForm.age4"
            autocomplete="off"
          ></el-input>
        </el-form-item>
<template>
  <el-radio v-model="radio" label="1">是</el-radio>
  <el-radio v-model="radio" label="2">否</el-radio>
</template>

        <el-form-item
          label="备注"
          prop="age"
          v-model="bclass"
         
        >
          <el-input
            type="text"
            placeholder="请输入备注"
            v-model="numberValidateForm.age2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Cha()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改字典信息" :visible.sync="dialogVisible1" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="参数名称" prop="age" v-model="bclass">
          <el-input
            type="text"
            
            placeholder
            v-model="updateForm.paramName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="参数键名" prop="age" v-model="bclass">
          <el-input
            type="text"
            
            placeholder
            v-model="updateForm.paramKey"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="参数键值" prop="age" v-model="bclass">
          <el-input
            type="text"
            
            placeholder
            v-model="updateForm.paramValue"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <template>
  <el-radio v-model="updateForm.status" label="1">正常</el-radio>
  <el-radio v-model="updateForm.status" label="2">停用</el-radio>
</template>
        <el-form-item label="备注" prop="age" v-model="bclass">
          <el-input
            type="text"
            
            placeholder
            v-model="updateForm.remark"
            autocomplete="off"
          ></el-input>
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
      value: [],
      totalPage: 0,
      pageNum: 1,
      updateForm: [],
      value1:[],
      pageSize: 10,
      radio: '1',
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
        age3: "",
        age4:""
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
          title: "参数主键",
          key: "id",
          width: 130,
          align: "center"
        },
        {
          title: "参数名称",
          key: "paramName",
          align: "center",
          width: 160
        },
        {
          title: "参数键名",
          align: "center",
          key: "paramKey",
          width: 175
        },
        {
          title: "参数键值",
          align: "center",
          key: "paramValue",
          width: 120
        },
        {
          title: "系统内置",
          align: "center",
          key: "valid",
          width: 100
        },
        {
          title: "备注",
          align: "center",
          key: "remark",
          width: 260
        },
        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          width: 200
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
                          "http://122.112.253.28:8095/prod-api/sys/config/" +
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
      url: url + "/sys/config/list?pageNum=1&pageSize=10&beginTime=&endTime=",
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
      url: url + "/sys/dict/detail/dictType/sys_yes_no",
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
          `/sys/config/list?pageNum=${pageIndex}&pageSize=${that.pageSize}`,
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
            url: url + "/sys/config/deleteByIds/" + id,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(delDate => {
            this.axios({
              method: "get",
              url: url + "/sys/config/list?pageNum=1&pageSize=10&beginTime=&endTime=",
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
          url +`/sys/config/list?pageNum=1&pageSize=10&paramName=${that.value}&paramKey=${that.value2}&paramType=${that.ztai}&beginTime=&endTime=`,
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
        url: url + `/sys/config/create`,
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: {
          paramName: that.numberValidateForm.age3,
          paramKey: that.numberValidateForm.age,
          paramValue: that.numberValidateForm.age4,
          status: "1",
          remark:that.numberValidateForm.age2,
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
            url: url + "/sys/config/list?pageNum=1&pageSize=10&beginTime=&endTime=",
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
        url: url + "/sys/config/update/" + that.userID,
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
            url: url + "/sys/config/list?pageNum=1&pageSize=10&beginTime=&endTime=",
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