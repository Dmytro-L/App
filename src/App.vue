<template>
  <div id="app">
    <div class="header"></div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
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
    display: flex;
  }

  .footer {
    bottom: 0;
    background-color: #474747;
    height: 270px;
    width: inherit;
  }
}
</style>
