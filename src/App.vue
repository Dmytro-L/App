<template>
  <div id="app">
    <div class="header">
      <button @click="clearStorageList" class="clear-storage">
        Clear user storage
      </button>
      <button @click="clearStorageUser" class="clear-storage">
        Clear list storage
      </button>
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    clearStorageList() {
      localStorage.clearItem("allTodos");
    },
    clearStorageUser() {
      localStorage.clearItem("user");
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  .clear-storage {
    background-color: #5a5c5b;
    &:hover {
      cursor: pointer;
    }
  }
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;

  .header {
    background-color: #474747;
    height: 60px;
  }

  .main {
    background-color: #545454;
    min-height: calc(100% - 330px);
    width: 100vw;
  }

  .footer {
    bottom: 0;
    background-color: #474747;
    height: 270px;
    width: inherit;
  }
}
</style>
