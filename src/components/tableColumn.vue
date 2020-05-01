<template>
  <div>
    <div
      v-for="(item, index) in ((currentTableData && currentTableData[tableName])? currentTableData[tableName]: TABLE_DATA_MAP[tableName])"
      :key="index + item"
    >
      <el-table-column
        :label="item.label"
        :key="index + item"
        :min-width="item.width"
        :sortable="item.sortable"
        :prop="item.key"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="!item.hidden">{{ scope.row[item.key] }}</span>
          <span v-if="item.Dict">{{ item.Dict[scope.row[item.key]] }}</span>
          <span
            v-if="item.isFixedTwo"
          >{{toFixedTwo(scope.row[item.molecule], scope.row[item.denominator])}}</span>
          <span
            v-if="item.isPercent"
          >{{toPercent(scope.row[item.molecule], scope.row[item.denominator])}}</span>
        </template>
      </el-table-column>
    </div>
  </div>
</template>

<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";

export default {
  name: "table-column",
  props: {
    tableName: String
  },
  data() {
    return {
      TABLE_DATA_MAP
    };
  },
  mounted() {
    console.log(this.currentTableData);
    console.log(this.currentTableData[this.tableName]);
  },
  computed: {
    // currentTableData 实际工作中应该是保存在后端的值
    currentTableData() {
      return this.$store.state.currentTableData;
    }
  }
};
</script>