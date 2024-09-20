<template>
  <div class="kva-container">
    <div class="kva-contentbox">
      <home-page-header>
        <div class="kva-form-search">
          <el-form :inline="true" :model="queryParams">
            <el-form-item>
              <el-button type="primary" v-permission="[10001]" icon="Plus" @click="handleAdd">添加角色</el-button>
              <el-button type="danger"  v-permission="[20001]" icon="Delete" @click="handleDels">删除角色</el-button>
            </el-form-item>
            <el-form-item label="关键词：">
              <el-input v-model="queryParams.keyword" placeholder="请输入搜索角色名称..." maxlength="10" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click.prevent="handleSearch">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table 
        :data="tableData"  
        @selection-change="handleSelectionChange" 
        :height="settings.tableHeight()">
          <el-table-column type="selection" fixed="left" width="55" />
          <el-table-column prop="id" fixed="left" label="ID" width="60" />
          <el-table-column prop="roleName"  label="角色名称" />
          <el-table-column prop="roleCode"  label="角色代号"/>
          <el-table-column label="删除状态" align="center" width="200">
            <template #default="scope">
              <el-switch v-model="scope.row.isDeleted" @change="handleDel(scope.row)" active-color="#ff0000" active-text="已删除" inactive-text="未删除" :active-value="1" :inactive-value="0"/>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" width="160">
            <template #default="scope">
              {{ formatTimeToStr(scope.row.createdAt,"yyyy/MM/dd hh:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center" width="160">
            <template #default="scope">
              {{ formatTimeToStr(scope.row.updatedAt,"yyyy/MM/dd hh:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="360">
            <template #default="{row,$index}">
              <el-button text icon="edit" @click="handleEdit(row)"  type="primary">编辑</el-button>
              <el-button text icon="switch" @click="handleOpenMenu(row)" type="success">授权菜单</el-button>
              <el-button text icon="switch" @click="handleOpenApi(row)" type="success">授权API</el-button>
              <el-button text icon="edit" type="primary">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="kva-pagination-box">
          <el-pagination
            v-model:current-page="queryParams.page"
            v-model:page-size="queryParams.pageSize"
            :page-sizes="[10,20,30,50,100, 200]"
            small
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </home-page-header>
    </div>
    <!--添加和修改系统角色-->
    <add-sys-role ref="addRef" @load="handleLoadData"></add-sys-role>
    <role-menu ref="menuRef"></role-menu>
    <role-apis ref="apiRef"></role-apis>
  </div>
</template>

<script  setup>
import KVA from '@/utils/kva.js'
import settings from '@/settings';
import { formatTimeToStr } from '@/utils/date'
import {LoadData,UpdateStatus} from '@/api/sysroles.js'
import AddSysRole from '@/views/sys/components/AddSysRole.vue'
import RoleMenu from '@/views/sys/components/RoleMenu.vue'
import RoleApis from '@/views/sys/components/RoleApis.vue'

// 添加角色
const addRef = ref(null);
// 角色授权
const menuRef = ref(null);
const apiRef = ref(null);

// 搜索属性定义
const queryParams = reactive({
  page:1,
  pageSize:10,
  keyword:""
})

// 数据容器
const tableData = ref([]) 
const total = ref(0) 

// 搜索
const handleSearch = ()=> {
  queryParams.page = 1
  queryParams.total = 0
  queryParams.pageSize = 10
  handleLoadData()
}

// 查询列表
const handleLoadData = async ()=>{
  const resp = await LoadData(queryParams)
  const dbList = resp.data.list;
  tableData.value = dbList.map(data=>{
    data.roleIds = data.roleIds ? data.roleIds.split(",").map(r=>r*1) : []
    return data;
  })
  total.value = resp.data.total
  queryParams.page = resp.data.page
}

// 改变分页Size
const handleSizeChange = (psize)=>{
  queryParams.page = 1
  queryParams.pageSize = psize
  handleLoadData()
}

// 改变分页PageNo
const handleCurrentChange = (pno)=>{
  queryParams.page = pno
  handleLoadData()
}

// 添加
const handleAdd = ()=>{
  addRef.value.handleOpen()
}

// 编辑
const handleEdit =  async (row) => {
  // 在打开,再查询，
  addRef.value.handleOpen(row.id)
}

// 删除单个
const handleDel =  async (row) => {
    var params = {
      id:row.id,
      field:'is_deleted',
      value:row.isDeleted
    }
    await UpdateStatus(params)
    KVA.notifySuccess("操作成功")
}

// 打开角色授权菜单
const handleOpenMenu = (row) => {
  menuRef.value.handleOpen(row)
}

// 打开角色授权api
const handleOpenApi = (row) => {
  apiRef.value.handleOpen(row)
}

// 生命周期加载
onMounted(()=>{
  handleLoadData()
})


</script>


