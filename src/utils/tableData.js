/**
 *  参数作用说明：
 *      key: 展示字段
 *      label: 列头名称
 *      width: 列宽
 *      sortable: 是否可筛选
 *      hidden: 隐藏默认展示字段
 *      Dict: 展示用字典
 *      isFixedTwo: 保留两位（可配合分子/分母使用）
 *      isPercent: 百分号展示（配合分子/分母使用）
 *      molecule: 分子
 *      denominator: 分母
 **/

export const TABLE_DATA_MAP = {
  tableDemo: [
    {
      key: "name1",
      label: "姓名1",
      width: 100,
    },
    {
      key: "name2",
      label: "姓名2",
      width: 100,
    },
    {
      key: "name3",
      label: "姓名3",
      width: 100,
    },
    {
      key: "address1",
      label: "地址1",
      width: 180,
    },
    {
      key: "address2",
      label: "地址2",
      width: 180,
    },
    {
      key: "address3",
      label: "地址3",
      width: 180,
    },
    {
      key: "amount1",
      label: "数值1",
      width: 100,
      sortable: true,
    },
    {
      key: "amount2",
      label: "数值2",
      width: 100,
      sortable: true,
    },
    {
      key: "amount3",
      label: "数值3",
      width: 100,
      sortable: true,
    },
    {
      key: "amount4",
      label: "数值4",
      width: 100,
      sortable: true,
    },
    {
      key: "amount5",
      label: "数值5",
      width: 100,
      sortable: true,
    },
    {
      key: "amount6",
      molecule: "amount1",
      denominator: "amount2",
      label: "数值6",
      width: 100,
      sortable: true,
      isFixedTwo: true,
      hidden: true,
    },
    {
      key: "amount7",
      molecule: "amount1",
      denominator: "amount3",
      label: "数值7",
      width: 100,
      sortable: true,
      isFixedTwo: true,
      hidden: true,
    },
    {
      key: "amount8",
      molecule: "amount1",
      denominator: "amount4",
      label: "数值8",
      width: 100,
      sortable: true,
      isFixedTwo: true,
      hidden: true,
    },
    {
      key: "amount9",
      molecule: "amount1",
      denominator: "amount5",
      label: "数值9",
      width: 100,
      sortable: true,
      isFixedTwo: true,
      hidden: true,
    },
    {
      key: "amount10",
      molecule: "amount1",
      denominator: "amount2",
      label: "数值10",
      width: 100,
      sortable: true,
      isPercent: true,
      hidden: true,
    },
    {
      key: "amount11",
      molecule: "amount1",
      denominator: "amount3",
      label: "数值11",
      width: 100,
      sortable: true,
      isPercent: true,
      hidden: true,
    },
    {
      key: "amount12",
      molecule: "amount1",
      denominator: "amount4",
      label: "数值12",
      width: 100,
      sortable: true,
      isPercent: true,
      hidden: true,
    },
    {
      key: "amount13",
      molecule: "amount1",
      denominator: "amount5",
      label: "数值13",
      width: 100,
      sortable: true,
      isPercent: true,
      hidden: true,
    },
  ]
}