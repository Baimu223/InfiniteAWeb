<template>
    <el-skeleton animated :loading="skLoading">
        <template #template>
            <div style="background: #fff;padding:5px;">
                <el-skeleton-item variant="div" style="height: 25px" />
            </div>
        </template>
        <template #default>
            <el-tabs v-if="settings.showMenuTab" v-model="activeTab" 
                @tab-click="handleTabClick" type="card"
                @tab-remove="removeTab">
                <el-tab-pane v-for="(item,index) in menuList"  
                :closable="index > 0" 
                :key="item.path" :label="t('menu.'+item.name)" :name="item.path"></el-tab-pane>
            </el-tabs>          
        </template>
    </el-skeleton>
</template>
<script setup>
import {useMenuTabStore} from '@/stores/menuTab.js'
import {useSkeletonStore} from '@/stores/skeleton.js'
import settings from '@/settings.js'
// 获取菜单tab的状态信息
const menuTabStore = useMenuTabStore();
// 国际化处理
const { t } = useI18n();
// 1：定义一个容器，专门用于存储用户的路由访问信息
const activeTab = computed(()=>menuTabStore.activePath)
const menuList  = computed(()=>menuTabStore.menuList)
const skeletonStore = useSkeletonStore()
const skLoading  = computed(()=>skeletonStore.skLoading)
// 删除时候触发
const removeTab = (path)=>{
    menuTabStore.removeMenuTab(path)
}
// 点击的时候触发
const handleTabClick = (tab)=>{
    menuTabStore.changeMenuTab(tab.props.name)
}

</script>
<style>
    .el-tabs--card>.el-tabs__header{margin: 0!important;}
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        border-bottom:3px solid transparent !important;
        border-bottom-color: #409eff !important;
    }
</style>
  