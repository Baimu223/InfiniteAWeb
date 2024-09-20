<template>
  <div class="page-container">
    <header>
      <page-header />
    </header>
    <main>
      <div class="left">
        <page-sidebar></page-sidebar>
      </div>
      <div class="right">
        <page-menu-tab></page-menu-tab>
        <!--这里其实就是专门让你去加载子路由的位置-->
        <page-main></page-main>
      </div>
    </main>
  </div>
</template>
<script setup>
import PageMenuTab from './components/PageMenuTab.vue'
import PageHeader from './components/PageHeader.vue'
import PageSidebar from './components/PageSidebar.vue'
import PageMain from './components/PageMain.vue'
</script>
<style lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  > header {
    height: 40px;
    background: #001529;
    color: #fff;
  }

  > main {
    display: flex;
    flex: 1;
    overflow: auto;

    > .left {
      height: 100%;
      background-color: #fff;
      color: #fff;
    }
    > .right {
      flex: 1;
      overflow: hidden;
      background-color: #f5f7f9;
      > .main-body {
        padding: 16px 16px 30px;
        overflow: auto;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>