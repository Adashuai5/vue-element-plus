<template>
  <div class="about">
<el-table
  class="table"
  :data="tableData"
  border
  show-summary
  highlight-current-row
  style="width: 100%"
>
  <el-table-column prop="id" label="ID" width="180"></el-table-column>
  <el-table-column prop="name1" label="姓名1" width="100"></el-table-column>
  <el-table-column prop="name2" label="姓名2" width="100"></el-table-column>
  <el-table-column prop="name3" label="姓名3" width="100"></el-table-column>
  <el-table-column prop="address1" label="地址1" width="180" show-overflow-tooltip></el-table-column>
  <el-table-column prop="address2" label="地址2" width="180" show-overflow-tooltip></el-table-column>
  <el-table-column prop="address3" label="地址3" width="180" show-overflow-tooltip></el-table-column>
  <el-table-column prop="amount1" sortable label="数值1"></el-table-column>
  <el-table-column prop="amount2" sortable label="数值2"></el-table-column>
  <el-table-column prop="amount3" sortable label="数值3"></el-table-column>
  <el-table-column prop="amount4" sortable label="数值4"></el-table-column>
  <el-table-column prop="amount5" sortable label="数值5"></el-table-column>
  <el-table-column prop="amount6" sortable label="数值6">
    <template slot-scope="scope">
      <span>{{toFixedTwo(scope.row.amount1, scope.row.amount2)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount7" sortable label="数值7">
    <template slot-scope="scope">
      <span>{{toFixedTwo(scope.row.amount1, scope.row.amount3)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount8" sortable label="数值8">
    <template slot-scope="scope">
      <span>{{toFixedTwo(scope.row.amount1, scope.row.amount4)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount9" sortable label="数值9">
    <template slot-scope="scope">
      <span>{{toFixedTwo(scope.row.amount1, scope.row.amount5)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount10" sortable label="数值10">
    <template slot-scope="scope">
      <span>{{toPercent(scope.row.amount1, scope.row.amount2)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount11" sortable label="数值11">
    <template slot-scope="scope">
      <span>{{toPercent(scope.row.amount1, scope.row.amount3)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount12" sortable label="数值12">
    <template slot-scope="scope">
      <span>{{toPercent(scope.row.amount1, scope.row.amount4)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount13" sortable label="数值13">
    <template slot-scope="scope">
      <span>{{toPercent(scope.row.amount1, scope.row.amount5)}}</span>
      <span>
    </template>
  </el-table-column>
</el-table>
  </div>
</template>
