<template>
  <div id="ShuSe">
    <el-row>
      <el-col :span="24" class="omO">
        <el-button @click="Kai()">开闸</el-button>
      </el-col>
    </el-row>
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
      <el-col :span="10" :offset="7">
        <div class="block pad">
          <span class="demonstration">请选择日期</span>
          <el-date-picker
            v-model="value3"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-button type="primary" class="nio" @click="select">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="ImO">
      <el-col :span="5" v-for="(item, index) in list" :key="index" class="Omka">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ item.roomName }}</span>
            <span>宿舍总人数:{{ item.total }}</span>
          </div>
          <div class="ooq">
            <el-badge :value="item.normal" class="item normal">
              <el-button size="small">正常</el-button>
            </el-badge>
            <el-badge :value="item.leaveCount" class="item" type="warning">
              <el-button size="small">请假</el-button>
            </el-badge>
            <el-badge :value="item.comebacklate" class="item" type="primary">
              <el-button size="small">晚归</el-button>
            </el-badge>
            <el-badge :value="item.absence" class="item" type="warning">
              <el-button size="small">缺勤</el-button>
            </el-badge>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style  scoped>
.ImO {
  padding-left: 20px;
  
}
.dQo{
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
/* .el-badge__content {
    background-color: #13CE66;
    border-radius: 10px;
    color: #FFF;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #FFF;
} */
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
      options: [],
      options2: [],
      value: "",
      value2: [],
      value3: [],
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
      }
    };
  },
  created() {
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
  },
  methods: {
    Kai() {
      this.$confirm("确定开闸?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    select() {
      var that = this;
      this.axios({
        method: "get",
        url:
          url +
          `/smartdor/sdAttence/listAbsenceDormitory?checkDate=${that.value3}&building=${that.value}&storey=${that.value2}&bdormitory=${that.input}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relter => {
        console.log(relter);
        this.list = relter.data.data.list;
        console.log(relter.data.data.list);
      });
    }
  }
};
</script>