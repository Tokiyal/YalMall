<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <!-- <a href="/">Home</a>
        <span>Goods</span> -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <slot></slot>
          <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="">
</style>