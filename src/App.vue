<template>
  <el-config-provider :locale="elementLocales[locale]">
    <router-view></router-view>
  </el-config-provider>
</template>
  
<script setup>
  import { elementLocales } from '@/i18n'
  import  DES from  '@/utils/crypto/des.js'
  import  {base64Encode,base64Decode} from  '@/utils/crypto/base64.js'
  const { locale } = useI18n();
  import {useSkeletonStore} from '@/stores/skeleton.js'
  const skeletonStore = useSkeletonStore()
  locale.value = localStorage.getItem('locale') || 'zh-cn';
  // import  * as AES from  '@/utils/aes.js'
  // const key = AES.createAesKey();
  // console.log("AES key",key)
  // const estr = AES.aesEncrypt("I love this beautiful world!",key)
  // console.log("AES",estr)
  // console.log("AES",AES.aesDecrypt(estr,key))


  var text = "123456"       // 待加密对象
  var encryptedData = DES.desEncrypt(text)
  var decryptedData = DES.desDecrypt(encryptedData)
  console.log("加密字符串: ", encryptedData)
  console.log("解密字符串: ", decryptedData)


  var text = "https://www.cnblogs.com/zichliang/p/17265960.html"
  var encodeData = base64Encode(text)
  var decodeData = base64Decode(encodeData)
  console.log("Base64 编码: ", encodeData)
  console.log("Base64 解码: ", decodeData)

  
  onMounted(() => {
      setTimeout(() => {
          skeletonStore.skLoading = false;
      }, 600)
  })
</script>