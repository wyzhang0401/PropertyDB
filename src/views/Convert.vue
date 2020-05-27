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
          <span>Select a physicochemical property from followings:</span>
        </el-form-item>
        <!-- 理化特性选择区 根据参数读取数据库，根据返回来的数值取理化性质-->

        <table border="1" cellpadding="5" style="width:100%; margin-top:20px;">
          <tr>
            <td width="40" style="font-size:12px">number</td>
            <!-- 跨列 colspan -->
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
        </table>

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
          property: "", // 是个对象数组[{},{},{},...] 数据库返回的数据
          length: 0,
          rows: 0, // 正好每行5个的总行数
          remain: 0 // 最后一行的个数
        },
        propertyid: "", // 选中的理化特性的id
        inputSequence: "",
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
      disable: false
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
        if (val.kmer != "" && val.nucleic != "" && val.value != "") {
          var myAPI = "/api/property/" + val.kmer + val.nucleic + val.value;
          // console.log(myAPI);
          axios.post(myAPI).then(respond => {
            _this.form.properties.property = respond.data;
            _this.form.properties.length = respond.data.length;
            // 每行4个理化性质
            _this.form.properties.rows =
              Math.ceil(_this.form.properties.length / 4) - 1;
            _this.form.properties.remain =
              _this.form.properties.length - _this.form.properties.rows * 4;
            // console.log(_this.form.properties.property);
            // console.log(_this.form.properties.rows);
          });
        }
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
        if (valid) {
          let property = _this.form.properties.property;
          // console.log(property);
          let inputSequence = _this.form.inputSequence;
          let propertyid = _this.form.propertyid;
          let kmer = _this.form.kmer;
          let i = 0;
          let tmpProperty = {};
          if (inputSequence == "" || propertyid == "") {
            alert(
              "Please choose a physicochemical property and input nucleotide sequence first!"
            );
            return false;
          }
          // console.log(property);
          // 截取propertyid对应的对象
          for (i = 0; i < property.length; i++) {
            if (property[i].ID == propertyid) {
              tmpProperty = property[i];
              break;
            }
          }
          // console.log(tmpProperty);
          // 在选出的对象中将带值的部分提取出来
          // eslint-disable-next-line no-unused-vars
          let { ID, PropertyName, ReferID, PubMedID, ...tmp } = tmpProperty;
          // console.log(tmp);

          // 输入的序列按照kmer进行拆分成kmers
          let j = 0;
          let k = 1;
          let kmers = []; // 拆分的kmers
          let value = []; // kmers对应的理化性质propertyid的值
          let output = "";
          if (kmer == "di") k = 2;
          else if (kmer == "tri") k = 3;
          for (j = 0; j <= inputSequence.length - k; j++) {
            let mer = inputSequence.substring(j, j + k);
            kmers.push(mer);
            value.push(tmp[mer]);
          }
          // console.log(kmers);
          // console.log(value);
          output =
            "kmers:\n" +
            kmers.join(" ") +
            "\n" +
            _this.form.value +
            " values:\n" +
            value.join(" "); // 数组转换为以空格分隔的字符串
          _this.form.outputValue = output;
        } else {
          alert("Please choose parameters first!");
          return false;
        }
      });
    }
  }
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
