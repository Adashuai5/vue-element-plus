<template>
  <div>
    <el-button style="margin-bottom:10px;" type="primary" @click="dialogs.field.show=true">列表配置</el-button>
    <el-table
      class="table"
      :data="tableData"
      border
      show-summary
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
export default {
  data() {
    return {
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
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