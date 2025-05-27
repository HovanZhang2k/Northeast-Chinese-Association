<template>
  <div class="app">
    <el-config-provider :locale="elementLocale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const i18n = useI18n()

// 根据当前语言设置Element Plus的语言
const elementLocale = computed(() => {
  return i18n.locale.value === 'zh-CN' ? zhCn : en
})

// 更新HTML lang属性和页面标题
const updateLanguageSettings = (locale) => {
  // 更新HTML lang属性
  document.documentElement.lang = locale === 'zh-CN' ? 'zh-CN' : 'en-US'
  
  // 更新页面标题
  const title = locale === 'zh-CN' 
    ? '东北同乡会' 
    : 'Northeast Chinese Association'
  document.title = title
}

// 监听语言变化
watch(() => i18n.locale.value, (newLocale) => {
  updateLanguageSettings(newLocale)
}, { immediate: true })

onMounted(() => {
  // 初始化时设置语言属性
  updateLanguageSettings(i18n.locale.value)
})
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
}
</style> 