<template>
  <el-header class="header">
    <el-row class="header-content" type="flex" align="middle">
      <el-col :span="6" class="title">
        <h2>{{ title }}</h2>
      </el-col>
      <el-col :span="12">
        <ul class="el-menu">
          <li
            :index="item.id"
            v-for="item in menus"
            v-on:click="toggle(item.id)"
            :class="{ 'is-active': item.id == checkId }"
            :key="item.id"
          >
            <router-link :to="item.url">{{ item.name }}</router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      title: "PropertyDB",
      menus: [
        {
          id: 1,
          url: "/",
          name: "Home"
        },
        {
          id: 2,
          url: "/search",
          name: "Search"
        },
        {
          id: 3,
          url: "/download",
          name: "Download"
        },
        {
          id: 4,
          url: "/manual.pdf",
          name: "Manual"
        },
        {
          id: 5,
          url: "/about",
          name: "About"
        }
      ],
      checkId: null
    };
  },
  methods: {
    toggle(val) {
      this.checkId = val;
    }
    /* 路由跳转的方法：*/
    // goToRouter () {
    //   this.$router.go(-1)      // 上一次浏览的页面
    //   this.$router.replace('link')  // 指定页面
    //   this.$router.replace({ name:'routerName'})    // 通过路由name跳转指定页面
    //   this.$router.push('link')    // 指定页面（常用）
    //   this.$router.push({ name:'routerName'})    // 通过路由name跳转指定页面
    // }
  },
  watch: {
    /* 监听路由，并显示导航栏的选中效果 */
    $route: {
      handler() {
        let linkName = this.$route.name;
        // console.log(this.checkId)
        switch (linkName) {
          case "homeLink":
            this.checkId = 1;
            break;
          case "searchLink":
            this.checkId = 2;
            break;
          case "downloadLink":
            this.checkId = 3;
            break;
          case "manualLink":
            this.checkId = 4;
            break;
          case "aboutLink":
            this.checkId = 5;
            break;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 60px;
  background: #99cccc;
  color: #696969;
  position: fixed;
  top: 0;
  z-index: 100;
  .header-content {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    .title {
      text-align: center;
    }
    ul.el-menu {
      background: transparent;
      border: 0;
      li {
        display: inline-block;
        line-height: 60px;
        margin: 0 10px;
        a {
          display: block;
          width: inherit;
          height: 100%;
          color: #696969;
          font-size: 16px;
          padding: 0 20px;
        }
      }
      li:hover {
        background: #54b3af;
        a {
          color: #fff;
        }
      }
      .is-active {
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
