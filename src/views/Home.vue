<template>
  <el-container style="height:100vh">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router="true" 
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/wage">薪水</el-menu-item>
        <el-submenu index="2">
          <template slot="title">房价</template>
          <el-menu-item index="/houseprice">热门城市房价</el-menu-item>
          <el-menu-item index="2-2">其他</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">分数</template>
          <el-menu-item>高考</el-menu-item>
          <el-menu-item>考研</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <a href="http://47.96.74.144:8000/swagger/index.html" target="_blank">查看API</a>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
</style>
