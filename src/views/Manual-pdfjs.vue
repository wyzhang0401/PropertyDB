<template>
  <iframe
    id="printIframe"
    :src="'/pdf/web/viewer.html?file=' + src"
    class="frame"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {
      src: "manual.pdf"
    };
  },
  mounted() {
    function iframeAutohw() {
      var ifm = document.getElementById("printIframe");
      // ifm.height = (Number(document.documentElement.clientHeight) - 60)+'px'
      ifm.height = document.documentElement.clientHeight;
      ifm.width = document.documentElement.clientWidth;
    }
    iframeAutohw();
    window.onresize = function() {
      iframeAutohw();
    };
  }
};
</script>

<style scoped>
.frame {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
}
</style>
