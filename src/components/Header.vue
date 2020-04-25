<template>
  <nav>
    <ul class="topnav" id="dropdownClick">
      <li class="title">
        <h2>{{ title }}</h2>
      </li>
      <li
        :index="item.id"
        v-for="item in menus"
        v-on:click="toggle(item.id)"
        :class="{ 'is-active': item.id == checkId }"
        :key="item.id"
      >
        <router-link :to="item.url">
          {{ item.name }}
        </router-link>
      </li>
      <li class="dropdownIcon">
        <a href="javascript:void(0);" @click="dropdownMenu()">&#9776;</a>
      </li>
    </ul>
  </nav>
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
          url: "/home",
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
          url: "/browse",
          name: "Browse"
        },
        {
          id: 5,
          url: "/convert",
          name: "Convert"
        },
        {
          id: 6,
          url: "/manual.pdf",
          name: "Manual"
        },
        {
          id: 7,
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
    },
    dropdownMenu() {
      let x = document.getElementById("dropdownClick");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
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
          case "Home":
            this.checkId = 1;
            break;
          case "Search":
            this.checkId = 2;
            break;
          case "Download":
            this.checkId = 3;
            break;
          case "Browse":
            this.checkId = 4;
            break;
          case "Convert":
            this.checkId = 5;
            break;
          case "Manual":
            this.checkId = 6;
            break;
          case "About":
            this.checkId = 7;
            break;
        }
      }
    }
  }
};
</script>

<style scope>
body {
  margin: 0;
  line-height: 1;
}

nav {
  display: block;
  width: 100%;
  margin: 0;
}

ul.topnav {
  background-color: rgb(250, 250, 250);
  margin: 0;
  padding: 0;
  overflow: hidden;
}

ul.topnav li {
  float: left;
  color: rgb(115, 200, 200);
}

ul.topnav li.title {
  padding: 0 100px 0 40px;
}

ul.topnav li a {
  display: block;
  min-height: 20px;
  padding: 20px;
  color: rgb(115, 200, 200);
  font-weight: bold;
}

ul.topnav li a:hover {
  background: lightgray;
}

ul.topnav li.dropdownIcon {
  display: none;
}

ul.topnav .is-active a {
  background: lightgray;
}

@media screen and (max-width: 700px) {
  ul.topnav li:not(:nth-child(1)) {
    display: none;
  }

  ul.topnav li.dropdownIcon {
    display: block;
    float: right;
  }

  ul.topnav.responsive {
    position: relative;
  }

  ul.topnav.responsive li {
    float: none;
    display: block;
    text-align: left;
  }
  ul.topnav.responsive li:nth-child(2) {
    border-top: 1px solid;
    border-top-color: gray;
  }
  ul.topnav.responsive li.dropdownIcon {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
