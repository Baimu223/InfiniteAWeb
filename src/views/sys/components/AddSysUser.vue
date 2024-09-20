<template>
  <el-dialog :close-on-click-modal="false" @click="handleClose" v-model="dialogFormVisible" :title="title" width="640px">
    <el-form v-loading="formLoading" ref="sysUserFormRef" :model="form" style="padding: 30px" :rules="rules">
      <el-form-item label="账号" label-width="100" required prop="account">
        <el-input v-model="form.account" autocomplete="off" maxlength="60"   placeholder="请输入账号"/>
      </el-form-item>
      <el-form-item label="昵称" label-width="100" required prop="username">
        <el-input v-model="form.username" maxlength="60" autocomplete="off"
                  placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="默认密码" v-if="!form.id" label-width="100" required prop="password">
        <el-input v-model="form.password" maxlength="60" autocomplete="off"
                  placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="头像" label-width="100" required prop="avatar">
        <el-input v-model="form.avatar" maxlength="200" autocomplete="off"
                  placeholder="请上传头像" />
      </el-form-item>
      <el-form-item label="手机" label-width="100" required prop="phone">
        <el-input v-model="form.phone" maxlength="11" autocomplete="off"
                  placeholder="请输入手机" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="100" required prop="email">
        <el-input v-model="form.email" maxlength="120" autocomplete="off"
                  placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="是否激活" label-width="100" required prop="enable">
        <el-radio-group v-model="form.enable">
          <el-radio :label="1">已激活</el-radio>
          <el-radio :label="0">未激活</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否删除" label-width="100" required prop="isDeleted">
        <el-radio-group v-model="form.isDeleted">
          <el-radio :label="1">已删除</el-radio>
          <el-radio :label="0">未删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="dialog-footer" style="text-align: center">
        <el-button @click="handleClose" icon="remove">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="suLoading" icon="plus">{{ form.id?"更新":"保存"}}</el-button>
      </div>
  </el-form>
  </el-dialog>
</template>
<script setup>
import {SaveData,GetById,UpdateData} from '@/api/sysusers.js'
import KVA from '@/utils/kva.js'
import debounce from '@/utils/debounce' 
const emits = defineEmits(["load"])
// 控制弹窗得显示
const dialogFormVisible = ref(false)
// 这个数据模型
let form = reactive({
  account:"",
  password:"",
  username:"",
  avatar:"",
  phone:"",
  email:"",
  enable:1,
  isDeleted:0
})

// 弹出标题
const title = ref("保存系统用户")
const formLoading = ref(false)
const suLoading = ref(false)
// 表单ref, 用于提交最终得验证处理
const sysUserFormRef = ref({})
// 表单验证谷子额
const rules = reactive({
  "password": [{required: true, message: '请输入密码', trigger: 'blur'}],
  "account": [{required: true, message: '请输入账号', trigger: 'blur'}],
  "username": [{required: true, message: '请输入昵称', trigger: 'blur'}],
  "phone": [
    {required: true, message: '请输入手机', trigger: 'blur'},
  ],
  "email": [{type:"email",required: true, message: '邮箱不合法', trigger: 'blur'}]
})

// 打开修改密码的弹窗
const handleOpen = async (userId) => {
  // 每次打开头重置
  dialogFormVisible.value = true;
  if(userId){
    title.value = "编辑系统用户"
    formLoading.value =  true;
    const resp = await GetById(userId)
    formLoading.value = false;
    // 这里地方要注意，一定要用reactive进行包裹处理
    form = reactive(resp.data)
    title.value = "你正在修改系统用户是【" + form.username + "】"
  }else{
    form.password = "123456"
  }
}

// 保存用户
const handleSubmit = () => {
  suLoading.value = true
  debounce(()=>{
    sysUserFormRef.value.validate(async (valid, fields) => {
      if (valid) {
          try{
            form.id? await UpdateData(form) : await SaveData(form)
            suLoading.value = false
            // 提示保存成功
            KVA.notifySuccess(form.id?"更新成功":"保存成功")
            // 关闭弹窗 
            handleClose()
            // 刷新方法
            emits("load")
          }catch(ex){
            suLoading.value = false
          }
      }else{
        suLoading.value = false
      }
    })
  },1000)
}

const handleClose = ()=>{
  delete form.id
  sysUserFormRef.value.resetFields()
  dialogFormVisible.value = false
}


// 把弹出打开得方法暴露给父组件进行调用
defineExpose({
  handleOpen
})
</script>