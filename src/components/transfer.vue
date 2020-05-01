<template>
  <div>
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入表头名"
      v-model="value"
      :data="data"
    ></el-transfer>
    <el-button type="primary" @click="doSubmit()">提交</el-button>
  </div>
</template>

<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";
export default {
  props: {
    tableName: String
  },
  data() {
    return {
      TABLE_DATA_MAP,
      data: TABLE_DATA_MAP[this.tableName], // 当前页默认值
      value: [], // 现在在 transfer 右测的值
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      }
    };
  },
  computed: {
    currentTableData() {
      return this.$store.state.currentTableData;
    }
  },
  methods: {
    doSubmit() {
      let sData = [];
      this.value.map(items => {
        this.TABLE_DATA_MAP[this.tableName].forEach(item => {
          if (item.key === items) {
            sData.push(item);
          }
        });
      });
      // 这里如果是实际项目应该会给后端接口传值来保存当前用户该页面的设置
      this.$store.commit("SET_TABLE_DATA", {
        type: this.tableName,
        data: sData
      });
      this.$emit("editSuc");
    }
  },
  mounted() {
    this.value = [];
    // 这里如果是实际项目 currentTableData 应该是后端获取数据，而不是 vuex 获取
    if (this.currentTableData && this.currentTableData[this.tableName]) {
      this.currentTableData[this.tableName].forEach(item => {
        if (this.TABLE_DATA_MAP[this.tableName].includes(item.key)) {
          this.value.push(item.key);
        }
      });
    }
  }
};
</script>
