export default {
  install(Vue) {
    Vue.mixin({
      components: {
      },
      data() {
        return {}
      },
      computed: {
      },
      watch: {
      },
      methods: {
        toPercent(x, y) {
          if (Number(y)) {
            let newNumber = ((Number(x) / Number(y)) * 100).toFixed(2)
            return newNumber += '%'
          } else {
            return '0.00%'
          }
        },
        toFixedTwo(x, y) {
          if (typeof y === "undefined") {
            return Number(x).toFixed(2)
          } else if (Number(y)) {
            let newNumber = ((Number(x) / Number(y))).toFixed(2)
            return newNumber
          } else {
            return '0.00'
          }
        },
      },
      created() {
      }
    });
  }
}