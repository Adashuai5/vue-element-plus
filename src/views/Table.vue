<template>
  <div>
    <el-button style="margin-bottom:10px;" type="primary" @click="dialogs.field.show=true">列表配置</el-button>
    <el-table
      class="table"
      :data="tableData"
      border
      show-summary
      :summary-method="getSummaries"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="120" fixed="left"></el-table-column>
      <table-column tableName="tableDemo"></table-column>
    </el-table>
    <el-dialog
      :title="dialogs.field.title"
      :visible.sync="dialogs.field.show"
      :close-on-click-modal="false"
      width="700px"
    >
      <transfer
        :model="dialogs.field.data"
        :formName="'tableDemo'"
        @close="dialogs.field.show=false"
        @editSuc="editSuc('field')"
      ></transfer>
    </el-dialog>
  </div>
</template>
<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";
export default {
  data() {
    return {
      TABLE_DATA_MAP,
      tableData: [
        {
          id: "12987122",
          name1: "王小虎",
          name2: "王小虎",
          name3: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄",
          address3: "上海市普陀区金沙江路 1518 弄",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
          amount4: "4.43",
          amount5: 12
        },
        {
          id: "12987123",
          name1: "王小虎",
          name2: "王小虎",
          name3: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄",
          address3: "上海市普陀区金沙江路 1518 弄",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
          amount4: "4.43",
          amount5: 12
        },
        {
          id: "12987124",
          name1: "王小虎",
          name2: "王小虎",
          name3: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄",
          address3: "上海市普陀区金沙江路 1518 弄",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
          amount4: "4.43",
          amount5: 12
        },
        {
          id: "12987125",
          name1: "王小虎",
          name2: "王小虎",
          name3: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄",
          address3: "上海市普陀区金沙江路 1518 弄",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: "4.43",
          amount5: 12
        },
        {
          id: "12987126",
          name1: "王小虎",
          name2: "王小虎",
          name3: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄",
          address3: "上海市普陀区金沙江路 1518 弄",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: "4.43",
          amount5: 12
        }
      ],
      totalData: {
        amount1: 1883,
        amount2: 15.83,
        amount3: 63,
        amount4: 22.15,
        amount5: 60
      },
      dialogs: {
        field: {
          title: "动态列表配置",
          data: "",
          show: false
        }
      }
    };
  },
  components: {
    transfer: () => import("@/components/transfer"),
    "table-column": () => import("@/components/tableColumn")
  },
  methods: {
    getSummaries({ columns }) {
      let sums = [];
      columns.forEach((column, index) => {
        if (column.property === "id") {
          sums[index] = "合计";
          return;
        } else {
          this.TABLE_DATA_MAP.tableDemo.forEach(keyObject => {
            if (keyObject.key.includes(column.property)) {
              if (keyObject.isPercent && keyObject.isPercent === true) {
                sums[index] = this.toPercent(
                  this.totalData[keyObject.molecule],
                  this.totalData[keyObject.denominator]
                );
              } else if (
                keyObject.isFixedTwo &&
                keyObject.isFixedTwo === true
              ) {
                sums[index] = this.toFixedTwo(
                  this.totalData[keyObject.molecule],
                  this.totalData[keyObject.denominator]
                );
              } else {
                sums[index] = this.totalData[column.property];
              }
            }
          });
        }
      });
      return sums;
    },
    editSuc(obj) {
      this.dialogs[obj].show = false;
      this.$message({
        message: "提交成功",
        type: "success"
      });
    }
  }
};
</script>