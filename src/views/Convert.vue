<template>
  <el-container class="app-main">
    <div class="myForm">
      <!-- Form 表单 -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="200px"
        label-position="left"
        label-suffix=":"
      >
        <el-form-item label="Kmer" prop="kmer">
          <el-radio-group v-model="form.kmer" @change="changeSequence">
            <el-radio label="mono">mononucleotide</el-radio>
            <el-radio label="di">dinucleotide</el-radio>
            <el-radio label="tri">trinucleotide</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="sequence type" prop="nucleic">
          <el-radio-group v-model="form.nucleic">
            <el-radio label="dna">DNA</el-radio>
            <el-radio label="rna" :disabled="disable">RNA</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="value type" prop="value">
          <el-radio-group v-model="form.value">
            <el-radio label="original">original</el-radio>
            <el-radio label="standard">standard</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Physicochemical properties">
          <span
            >Please choose no more than five properties from followings because
            of limited computing resources:</span
          >
        </el-form-item>
        <!-- 理化特性选择区 根据参数读取数据库，根据返回来的数值取理化性质-->

        <el-table
          :data="form.properties.propertyname"
          border
          stripe
          :show-header="status"
          empty-text="Select the above parameters to obtain the physicochemical properties "
          style="width: 100%"
        >
          <el-table-column type="index" width="40"> </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <el-checkbox-group
                v-if="props.row.id0 != ''"
                v-model="form.propertyid"
                :max="max"
              >
                <el-checkbox :label="props.row.id0">
                  <span class="all_label">
                    {{ props.row.col0 }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <el-checkbox-group
                v-if="props.row.id1 != ''"
                v-model="form.propertyid"
                :max="max"
              >
                <el-checkbox :label="props.row.id1">
                  <span class="all_label">
                    {{ props.row.col1 }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <el-checkbox-group
                v-if="props.row.id2 != ''"
                v-model="form.propertyid"
                :max="max"
              >
                <el-checkbox :label="props.row.id2">
                  <span class="all_label">
                    {{ props.row.col2 }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <el-checkbox-group
                v-if="props.row.id3 != ''"
                v-model="form.propertyid"
                :max="max"
              >
                <el-checkbox :label="props.row.id3">
                  <span class="all_label">
                    {{ props.row.col3 }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <!-- <tr v-for="row in form.properties.rows" :key="row">
            <td>{{ row }}</td>
            <td v-for="col in 4" :key="col" align="left">
              <el-checkbox-group v-model="form.propertyid" :max="max">
                <el-checkbox
                  :label="form.properties.property[(row - 1) * 4 + col - 1].ID"
                >
                  <span class="all_label">
                    {{
                      form.properties.property[(row - 1) * 4 + col - 1]
                        .PropertyName
                    }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr v-if="form.properties.remain != 0">
            <td>{{ form.properties.rows + 1 }}</td>
            <td v-for="col in form.properties.remain" :key="col" align="left">
              <el-checkbox-group v-model="form.propertyid" :max="max">
                <el-checkbox
                  :label="
                    form.properties.property[form.properties.rows * 4 + col - 1]
                      .ID
                  "
                >
                  <span class="all_label">
                    {{
                      form.properties.property[
                        form.properties.rows * 4 + col - 1
                      ].PropertyName
                    }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </td>
          </tr> -->
        </el-table>

        <!-- <table border="1" cellpadding="5" style="width:100%; margin-top:20px;">
          <tr>
            <td width="40" style="font-size:12px">number</td>
             跨列 colspan
            <td colspan="4">physicochemical properties</td>
          </tr>
          <tr v-for="row in form.properties.rows" :key="row">
            <td>{{ row }}</td>
            <td v-for="col in 4" :key="col" align="left">
              <el-radio-group v-model="form.propertyid">
                <el-radio
                  :label="form.properties.property[(row - 1) * 4 + col - 1].ID"
                >
                  <span class="all_label">
                    {{
                      form.properties.property[(row - 1) * 4 + col - 1]
                        .PropertyName
                    }}
                  </span>
                </el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr v-if="form.properties.remain != 0">
            <td>{{ form.properties.rows + 1 }}</td>
            <td v-for="col in form.properties.remain" :key="col" align="left">
              <el-radio-group v-model="form.propertyid">
                <el-radio
                  :label="
                    form.properties.property[form.properties.rows * 4 + col - 1]
                      .ID
                  "
                >
                  <span class="all_label">
                    {{
                      form.properties.property[
                        form.properties.rows * 4 + col - 1
                      ].PropertyName
                    }}
                  </span>
                </el-radio>
              </el-radio-group>
            </td>
          </tr>
        </table> -->

        <el-form-item
          label="DNA or RNA sequences"
          style="margin-top: 10px; border-top: 1px solid rgb(115, 200, 200);"
        >
          <span>Enter DNA or RNA sequences:</span>
          <!-- 核酸序列输入区 -->
          <table style="width: 100%;" cellpadding="5">
            <!-- 核酸序列输入 1行1列 -->
            <tr>
              <td>
                <el-input
                  type="textarea"
                  placeholder="click on example to get an nucleotide sequence or enter a nucleotide sequence"
                  v-model="form.inputSequence"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                ></el-input>
              </td>
            </tr>
            <!-- 获取示例按钮和获取值的按钮,将两个按钮又分成了一行两列 -->
            <tr>
              <table style="width: 50%; margin: 0 auto;" cellpadding="3">
                <tr>
                  <td>
                    <input
                      type="button"
                      value="example"
                      style="width: 80px"
                      @click="getExample"
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      value="getValue"
                      style="width: 80px"
                      @click="getValue('form')"
                    />
                  </td>
                </tr>
              </table>
            </tr>
            <!-- 值的输出区 -->
            <tr>
              <td>
                <el-input
                  type="textarea"
                  placeholder="the kmers of nucleotide sequence "
                  v-model="form.outputkmers"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-input
                  type="textarea"
                  placeholder="the values of kmers "
                  v-model="form.outputValue"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                ></el-input>
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        kmer: "",
        nucleic: "",
        value: "",
        properties: {
          //理化特性的显示
          property: [], // 是个对象数组[{},{},{},...] 数据库返回的数据
          propertyname: [],
          length: 0,
          rows: 0 // 正好每行5个的总行数
          // remain: 0 // 最后一行的个数
        },
        propertyid: [], // 选中的理化特性的id,复选框，可以设置最多选几个
        inputSequence: "",
        outputkmers: "",
        outputValue: ""
      },
      rules: {
        kmer: [
          { required: true, message: "Please choose kmer", trigger: "change" }
        ],
        nucleic: [
          {
            required: true,
            message: "Please choose nucleic",
            trigger: "change"
          }
        ],
        value: [
          {
            required: true,
            message: "Please choose a kind of value",
            trigger: "change"
          }
        ]
      },
      disable: false,
      max: 5, // 复选框最多选择的个数
      status: false
    };
  },

  // computed和watch结合 监听前三个参数的值，然后显示对应的理化特性
  computed: {
    showProperty() {
      // 两种方法均可
      const { kmer, nucleic, value } = this.form;
      // const {
      //   form: { kmer },
      //   form: { nucleic },
      //   form: { value }
      // } = this;
      return { kmer, nucleic, value };
    }
  },
  watch: {
    showProperty: {
      handler: function(val) {
        // console.log(val);
        var _this = this;
        // 监听前3个参数，发生变化则清空下面的内容
        _this.form.propertyid = [];
        _this.form.inputSequence = "";
        _this.form.outputkmers = "";
        _this.form.outputValue = "";

        if (val.kmer != "" && val.nucleic != "" && val.value != "") {
          var myAPI = "/api/property/" + val.kmer + val.nucleic + val.value;
          // console.log(myAPI);
          axios.post(myAPI).then(respond => {
            _this.form.properties.property = respond.data;
            _this.form.properties.length = respond.data.length;
            // 截取对象数组中需要的字段，这里是理化特性的名称 PropertyName
            let property = respond.data.map(({ ID, PropertyName }) => ({
              ID,
              PropertyName
            }));
            // 每行4个理化性质
            _this.form.properties.rows = Math.ceil(
              _this.form.properties.length / 4
            );
            // 转换成表格中展示需要的数据格式
            _this.form.properties.propertyname = object2object(
              property,
              _this.form.properties.length,
              _this.form.properties.rows
            );
            // _this.form.properties.remain =
            //   _this.form.properties.length - _this.form.properties.rows * 4;
            // console.log(_this.form.properties.property);
            // console.log(_this.form.properties.rows);
          });
        }
        // if (val.propertyid.length == 5) {
        //   alert(
        //     "please choose no more than five properties because of limited computing resources!"
        //   );
        // }
      }
    }
  },
  methods: {
    changeSequence() {
      // 当选择单元和三元核苷酸时，只能选择DNA，并且设为自动选择DNA，RNA设为不可选
      var _this = this;
      var kmer = _this.form.kmer;
      if (kmer == "mono" || kmer == "tri") {
        this.disable = true;
        this.form.nucleic = "dna";
      } else {
        this.disable = false;
        // this.form.nucleic = "";
      }
    },
    getExample() {
      // 要根据DNA,RNA的不同，设定不同的例子
      var _this = this;
      var formData = _this.form;
      if (formData.nucleic == "") {
        alert("Please choose parameters first!");
      } else if (formData.nucleic == "dna") {
        _this.form.inputSequence = "ATCGAATCGGCTAGTCCAAT";
      } else if (formData.nucleic == "rna") {
        _this.form.inputSequence = "AUCGAAUCGGCUAGUCCAAU";
      }
    },
    getValue(formName) {
      // console.log(formName.properties.property);
      let _this = this;
      this.$refs[formName].validate(valid => {
        // 验证前三个参数的有效性
        if (valid) {
          let property = _this.form.properties.property;
          // console.log(property);
          let inputSequence = _this.form.inputSequence;
          let propertyid = _this.form.propertyid;
          let kmer = _this.form.kmer;
          let i = 0;
          // let tmpProperty = {};
          let tmpProperty = []; // [{},{},{},...]
          if (inputSequence == "" || propertyid.length == 0) {
            alert(
              "Please choose at least one physicochemical property and input nucleotide sequence first!"
            );
            return false;
          }
          // console.log(property);
          // 截取propertyid对应的对象
          let j = 0;

          for (i = 0; i < propertyid.length; i++) {
            let t = propertyid[i];
            for (j = 0; j < property.length; j++) {
              if (property[j].ID == t) {
                break;
              }
            }
            tmpProperty.push(property[j]);
          }

          // 输入的序列按照kmer进行拆分成kmers---------------------------------
          let m = 0;
          let k = 1;
          let kmers = []; // 拆分的kmers
          let outputK = "";
          if (kmer == "di") k = 2;
          else if (kmer == "tri") k = 3;
          // inputSequence 为输入的核酸序列
          for (m = 0; m <= inputSequence.length - k; m++) {
            let mer = inputSequence.substring(m, m + k);
            kmers.push(mer);
          }
          // console.log(kmers);
          outputK = "kmers:\n" + kmers.join(" "); // 数组转换为以空格分隔的字符串
          _this.form.outputkmers = outputK;
          // 输入序列拆分结束---------------------------------------------------

          // 获取outputValue的所有内容
          // 在选出的对象中将带kmers值的部分提取出来
          let n = 0;
          // let value = []; // kmers对应的理化性质propertyid的值 [[],[],[],...]
          let output = "";
          // console.log(tmpProperty);
          for (n = 0; n < tmpProperty.length; n++) {
            // eslint-disable-next-line no-unused-vars
            // let { ID, PropertyName, ReferID, PubMedID, ...tmp } = tmpProperty[
            //   n
            // ];
            let tmpValue = [];
            for (let p = 0; p < kmers.length; p++) {
              tmpValue.push(tmpProperty[n][kmers[p]]);
            }
            // value.push(tmpValue);
            output =
              output +
              _this.form.value +
              " values of " +
              tmpProperty[n].PropertyName +
              " :\n" +
              tmpValue.join(" ") +
              "\n";
          }
          _this.form.outputValue = output;
        } else {
          alert("Please choose parameters first!");
          return false;
        }
      });
    }
  }
};
// 在使用k-tuple分类的时候，处理每种类型的理化特性，整理成对象数组的形式，以便以表格形式呈现
var object2object = function(objectArray, length, rows) {
  let i = 0;
  let tmp = [];
  // 如果理化特性只满足一行，每行放4个
  if (length <= 4) {
    let p = {
      col0: "",
      id0: "",
      col1: "",
      id1: "",
      col2: "",
      id2: "",
      col3: "",
      id3: ""
    };
    for (let j = 0; j < length; j++) {
      p["col" + j.toString()] = objectArray[j]["PropertyName"];
      p["id" + j.toString()] = objectArray[j]["ID"];
    }
    tmp.push(p);
    // console.log(tmp);
    return tmp;
  }
  // 处理满行，每行4个
  for (i = 0; i < rows - 1; i++) {
    let p = {
      col0: "",
      id0: "",
      col1: "",
      id1: "",
      col2: "",
      id2: "",
      col3: "",
      id3: ""
    };
    for (let j = 0; j < 4; j++) {
      p["col" + j.toString()] = objectArray[i * 4 + j]["PropertyName"];
      p["id" + j.toString()] = objectArray[i * 4 + j]["ID"];
    }
    tmp.push(p);
  }
  let pp = {
    col0: "",
    id0: "",
    col1: "",
    id1: "",
    col2: "",
    id2: "",
    col3: "",
    id3: ""
  };
  for (let j = 0; j < length - 4 * (rows - 1); j++) {
    pp["col" + j.toString()] = objectArray[4 * (rows - 1) + j]["PropertyName"];
    pp["id" + j.toString()] = objectArray[4 * (rows - 1) + j]["ID"];
  }
  tmp.push(pp);
  // console.log(tmp);
  return tmp;
};
</script>

<style scoped lang="less">
.myForm {
  margin: 0 auto; /* 表单居中设置 */
  padding: 40px 60px;
  /* border: 1px solid #686b6d; */
  width: 60%;
  background: lightgray;
  color: #606266;
}
/* .el-select {
  width: 60%;
} */
.el-form-item {
  border-top: 1px solid rgb(115, 200, 200);
  margin-bottom: 0;
}
.el-form-item:not(:nth-child(6)) /deep/ .el-form-item__label {
  border-right: 1px solid rgb(115, 200, 200);
}
// /deep/ 相当于 >>>
/deep/ .el-checkbox__inner:hover {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
/deep/ .el-radio__inner:hover {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
// 单选框的标签可以换行了
/deep/ .all_label {
  display: inline-grid;
  white-space: pre-line;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 20px;
}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: rgb(115, 200, 200) !important;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
/deep/ .el-checkbox__label {
  padding-left: 5px;
}
/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: rgb(115, 200, 200) !important;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
/deep/ .el-radio__label {
  padding-left: 5px;
}
/deep/ .el-textarea__inner {
  border-color: rgb(115, 200, 200) !important;
}
</style>
