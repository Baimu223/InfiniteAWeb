<template>
  <div class="kva-container">
    <div class="kva-contentbox">
      <home-page-header>
        <div class="kva-form-search">
          <el-form :inline="true" :model="queryParams">
            <el-form-item>
              <el-button type="primary" v-permission="['A1001','A1002']" icon="Plus" @click="handleAdd">添加用户</el-button>
              <el-button type="danger"  v-permission="'A1003'"  icon="Delete" @click="handleDels">删除用户</el-button>
            </el-form-item>
            <el-form-item label="关键词：">
              <el-input v-model="queryParams.keyword" placeholder="请输入搜索账号或者昵称..." maxlength="10" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  v-permission="'A1008'"  icon="Search" @click.prevent="handleSearch">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData"  @selection-change="handleSelectionChange" style="width: 100%" :height="settings.tableHeight()">
          <el-table-column prop="id" fixed="left" label="ID"  />
          <el-table-column label="昵称" fixed="left"  width="150">
            <template #default="scope">
              <el-avatar :src="scope.row.avatar" size="small"></el-avatar>
              <span style="margin-left: 5px;position: relative;top:-5px;">{{scope.row.username}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="account"  label="账号"  width="200" />
          <el-table-column prop="phone" label="用户手机号" width="150"/>
          <el-table-column prop="email" label="用户邮箱"  width="180"/>
          <el-table-column label="否被启用" align="center" width="200">
            <template #default="scope">
              <el-switch v-model="scope.row.enable" @change="handleChangeEnable(scope.row)"  active-text="启用中" inactive-text="禁止中"  :active-value="1" :inactive-value="0"/>
            </template>
          </el-table-column>
          <el-table-column label="删除状态" align="center" width="200">
            <template #default="scope">
              <el-switch v-model="scope.row.isDeleted" @change="handleDel(scope.row)" active-color="#ff0000" active-text="已删除" inactive-text="未删除" :active-value="1" :inactive-value="0"/>
            </template>
          </el-table-column>
          <el-table-column label="授予角色" align="center" width="320">
            <template #default="{row,$index}">
              <el-cascader
                  style="width: 100%;"
                  v-model="row.roleIds"
                  :options="rolesData"
                  @change="handleChangeRole(row)"
                  :props="props"
              />
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
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template #default="{row,$index}">
              <el-button text icon="edit" @click="handleEdit(row)"  type="primary">编辑</el-button>
              <el-button text icon="switch" @click="handleResetPwd(row)" type="success">重置密码</el-button>
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
    <!--自定义修改密码得弹窗-->
    <update-pwd ref="userPwdRef"></update-pwd>
    <!--添加和修改系统用户-->
    <add-sys-user ref="addRef" @load="handleLoadData"></add-sys-user>
  </div>
</template>

<script  setup>
import KVA from '@/utils/kva.js'
import settings from '@/settings';
import { formatTimeToStr } from '@/utils/date'
import {LoadData,UpdateStatus} from '@/api/sysusers.js'
import {FindData} from '@/api/sysroles.js'
import UpdatePwd from '@/views/sys/components/UpdatePwd.vue'
import AddSysUser from '@/views/sys/components/AddSysUser.vue'
import {SaveUserRole} from "../../api/sysusers";


const addRef = ref(null);
const rolesData = ref([])
const multipleSelection = ref([])

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

// 批量选择

const handleSelectionChange = (vals) => {
  multipleSelection.value = vals
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

// 启用和未启用
const handleChangeEnable = async (row) => {
  var params = {
    id:row.id,
    field:'enable',
    value:row.enable
  }
  await UpdateStatus(params)
  // 删除成功查询一次
  KVA.notifySuccess("操作成功")
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

// 查询所有的角色信息
const props = ref({multiple:true,emitPath:false})
// 查询所有的角色信息
const handleFindRoles = async () => {
    const resp = await FindData();
    rolesData.value = resp.data.map(r=>({label:r.roleName,value:r.id}))
}

// 删除多个
const handleDels =  ()=>{
  KVA.confirm("警告","<strong>你确定要抛弃我么？</strong>",{icon:"success"}).then(()=>{
    KVA.message("去请求你要删除的异步请求的方法把")
  }).catch(err=>{
    KVA.error("你点击的是关闭或者取消按钮")
  })
}

// 获取重置密码的组件对象
const userPwdRef = ref({});
// 重置密码
const handleResetPwd =  (row)=>{
  userPwdRef.value.handleOpen(row)
}

// 授予角色
const handleChangeRole = async (row) => {
    // 获取当前授予的用户
    const params = {
      userId:row.id,
      roleIds:row.roleIds.join(",")
    }  
    // 调用授权的接口即可
    await SaveUserRole(params)
    KVA.notifySuccess("用户授予角色成功!")
}



// 生命周期加载
onMounted(()=>{
  handleLoadData()
  handleFindRoles()
})


</script>


