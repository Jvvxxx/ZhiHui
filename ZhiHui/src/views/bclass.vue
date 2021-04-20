<template>
  <div>
    <el-row class="mDd">
      <el-col :span="5" :offset="1">
        <template>
          班级名称
          <el-input class="niq" v-model="input" placeholder="请输入班级名称"></el-input>
        </template>
      </el-col>
      <el-col :span="5" :offset="1">
        <template>
          班主任
          <el-input class="niq" v-model="input1" placeholder="请输入班主任名称"></el-input>
        </template>
      </el-col>
      <el-col :span="5" :offset="1">
        <template>
          状态
          <el-select v-model="value2" placeholder="班级状态">
            <el-option
              v-for="item in options2"
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
        <el-button type="primary" @click="dialogVisible = true" size="mini">新增</el-button>
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
    <el-dialog title="添加班级信息" :visible.sync="dialogVisible" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="班级名称"
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '班级名称不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入班级名称"
            v-model="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="班主任" :rules="[{ required: true, message: '班主任不能为空'},]">
          <el-select v-model="numberValidateForm.age2" placeholder="请选择">
            <el-option
              :value="itemm.id"
              :label="itemm.username"
              v-for="(itemm,i) in data2"
              :key="i"
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
    <el-dialog title="修改班级信息" :visible.sync="dialogVisible1" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="班级名称" prop="age" v-model="bclass">
          <el-input
            type="text"
            disabled
            placeholder
            v-model="updateForm.className"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="班主任" :rules="[{ required: true, message: '班主任不能为空'},]">
          <el-select v-model="updateForm.classTeacherId" placeholder="请选择">
            <el-option
              :value="itemm.id"
              :label="itemm.username"
              v-for="(itemm,i) in data2"
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
<style scoped>
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
  margin-top: 10px;
}
.niq {
  width: 70%;
}
.omO {
  padding: 30px 30px 0 30px;
}
</style>
<style>
.el-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  margin-left: -63px;
}
.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  margin-top: 2px;
}
.el-col-10 {
  width: 41.66667%;
  margin-left: 40px;
}
.ivu-row {
  display: flex;
  flex-flow: row wrap;
  margin-top: 10px;
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
export default {
  data() {
    return {
      totalPage: 0,
      value2: "",
      options2: "",
      input: "",
      input1: "",
      userID: "",
      dialogVisible1: "",
      data2: [],
      pageNum: 1,
      pageSize: 10,
      total: 27,
      totalPage: 3,
      bclass: [],
      value: "",
      dialogVisible: false,
      dialogVisible1: false,
      updateForm: {},
      numberValidateForm: {
        age: "",
        age2: ""
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
          width: 120,
          align: "center"
        },
        {
          title: "班级名称",
          key: "className",
          align: "center",
          width: 120
        },
        {
          title: "班主任",
          align: "center",
          key: "classTeacherName",
          width: 120
        },
        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          width: 180
        },
        {
          title: "修改时间",
          align: "center",
          key: "modifyTime",
          width: 180
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          render: (h, params) => {
            return h("i-switch", {
              props: {
                value: params.row.status === "1"
              },
              on: {
                "on-change": status => {
                  this.setDisable(params.row.id, status);
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "uses",
          align: "center",
          width: 380,
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
                      ///basedata/bclass/150
                      var that = this;

                      this.axios({
                        url:
                          "http://122.112.253.28:8095/prod-api/basedata/bclass/" +
                          that.userID,
                        method: "GET",
                        headers: {
                          Authorization: window.sessionStorage.token
                        }
                      }).then(response => {
                        that.updateForm = response.data.data;
                      });

                      this.dialogVisible1 = true;
                      // alert(this.dialogVisible1)
                      this.userID = params.row.id;
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
  mounted() {
    this.axios({
      mehtod: "get",
      url: url + "/sys/dict/detail/dictType/sys_normal_disable",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relsut => {
      console.log(relsut);
      this.options2 = relsut.data.data;
    });
    var that = this;
    this.axios({
      method: "get",
      url: url + "/basedata/bclass/list?pageNum=1&pageSize=10",
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
      method: "get",
      url: url + "/sys/user/getClassTeacherList",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(classth => {
      console.log(classth);
      this.data2 = classth.data.data;
    });
  },
  methods: {
    change(pageIndex) {
      var that = this;
      this.axios({
        method: "get",
        url:
          url +
          `/basedata/bclass/list?pageNum=${pageIndex}&pageSize=${that.pageSize}`,
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
      var that = this;
      this.axios({
        method: "get",
        url:
          url +
          `/basedata/bclass/list?pageNum=1&pageSize=10&className=${that.input}&classTeacherName=${that.input1}&status=${that.value2}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(selectDate => {
        console.log(selectDate);
        this.data1 = selectDate.data.data.list;
      });
    },
    delClass(id) {
      this.$confirm(
        "是否确认删除班级编号为'" + id + "'的数据项?, 是否继续?",
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
            url: url + "/basedata/bclass/deleteByIds/" + id,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(delDate => {
            this.axios({
              method: "get",
              url: url + "/basedata/bclass/list?pageNum=1&pageSize=10",
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
    Cha() {
      var that = this;
      this.axios({
        method: "POST",
        url: url + `/basedata/bclass/create`,
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: {
          className: that.numberValidateForm.age,
          classTeacherId: that.numberValidateForm.age2,
          status: "1"
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
            url: url + "/basedata/bclass/list?pageNum=1&pageSize=10",
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
        url: url + "/basedata/bclass/update/" + that.userID,
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
            url: url + "/basedata/bclass/list?pageNum=1&pageSize=10",
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
    },
    setDisable(id,status){
      var that=this;
      if(status){
        status='1';
      }else{
        status='0';
      }
      var result=false;
      this.axios({
        url:url+`/basedata/bclass/update/status/${id}?status=${status}`,
        method:"PUT",
         headers: {
          Authorization: window.sessionStorage.token
        },
      }).then((response)=>{
        if(response.data.code===200){
          result=true;
        }else{
          result=false;
        }
        that.$message.success(response.data.message);
      }).catch((error)=>{
        console.log(error);
      })
      return result;
    }
  }
};
</script>