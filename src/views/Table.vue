<template>
  <div>
    <el-button
      style="margin-bottom:10px;"
      type="primary"
      @click="dialogs.configuration.show=true"
    >列表配置</el-button>
    <el-button style="margin-bottom:10px;" type="primary" @click="doExportExcel">导出数据(DOM)</el-button>
    <el-button style="margin-bottom:10px;" type="primary" @click="doExport2Excel">导出数据(E2E)</el-button>
    <el-table
      id="table-data"
      :data="tableData"
      border
      show-summary
      :summary-method="getSummaries"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="120" fixed="left"></el-table-column>
      <table-column tableName="tableDemo" v-if="tableData.length"></table-column>
    </el-table>
    <el-dialog
      :title="dialogs.configuration.title"
      :visible.sync="dialogs.configuration.show"
      :close-on-click-modal="false"
      width="700px"
    >
      <transfer
        :model="dialogs.configuration.data"
        :tableName="'tableDemo'"
        @close="dialogs.configuration.show=false"
        @editSuc="editSuc('configuration')"
      ></transfer>
    </el-dialog>
  </div>
</template>
<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";
import { exportExcelByDom, export_json_to_excel } from "@/utils/Export2Excel";
const tableData = [
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
];
export default {
  data() {
    return {
      TABLE_DATA_MAP,
      tableData: [],
      totalData: {
        amount1: 1883,
        amount2: 15.83,
        amount3: 63,
        amount4: 22.15,
        amount5: 60
      },
      dialogs: {
        configuration: {
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
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      setTimeout(() => {
        this.tableData = tableData;
      }, 1000);
    },
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
    doExportExcel() {
      const excel = exportExcelByDom("table-data", "导出数据.xlsx");
      if (excel) {
        this.$notify.success("导出成功！");
      }
    },
    doExport2Excel() {
      const tHeader = ["ID"];
      const keyArray = ["id"];
      this.TABLE_DATA_MAP.tableDemo.forEach(item => {
        tHeader.push(item.label);
        keyArray.push(item.key);
      });
      // 这里 jsonData 应该是所要导出的所有数据，可让后端传值
      const jsonData = this.tableData;
      jsonData.forEach(list => {
        this.TABLE_DATA_MAP.tableDemo.forEach(keyObject => {
          if (keyObject.isPercent && keyObject.isPercent === true) {
            list[keyObject.key] = this.toPercent(
              list[keyObject.molecule],
              list[keyObject.denominator]
            );
          } else if (keyObject.isFixedTwo && keyObject.isFixedTwo === true) {
            list[keyObject.key] = this.toFixedTwo(
              list[keyObject.molecule],
              list[keyObject.denominator]
            );
          }
        });
      });
      export_json_to_excel(tHeader, keyArray, jsonData, "数据导出");
    },
    editSuc(obj) {
      this.dialogs[obj].show = false;
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.tableData = [];
      this.getList();
    }
  }
};
</script>