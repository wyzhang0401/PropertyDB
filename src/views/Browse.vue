<template>
  <el-container class="app-main">
    {{ messg }}
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      messg:
        "this is browse page, 参考文献在这里显示,弄个侧导航栏，点击能够跳转的那种"
    };
  }
};
</script>
