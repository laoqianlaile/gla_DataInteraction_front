<!-- api接口配置详情 -->
<template>
  <div class='g-tableCard'>
    <NomalTable v-if='isShow' :table-json="tableJson"  :url='url' :axiosType="'post'"></NomalTable>
  </div>
</template>

<script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';
  import NomalTable from "@/components/table/NomalTable.vue";
  import {
    apiParams
  } from "../table.js"

  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      NomalTable
    },
    data() {
      //这里存放数据
      return {
        tableJson: {}, // 表头标题
        url: '',
        tableQuery: apiParams,
        isShow: false,
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      this.init();
    },
    //方法集合
    methods: {
      init() {
        this.isShow = false;
        this.tableJson = this.tableQuery.tableJson;
        this.url = `${this.$SERVER_BASE_URL}/new_interface/api_desc`;
        this.$nextTick(() => {
          this.isShow = true;
        })
      }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>

<style lang='scss' scoped>
  //@import url(); 引入公共css类
</style>