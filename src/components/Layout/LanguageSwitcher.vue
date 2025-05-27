<template>
  <div class="language-switcher">
    <el-dropdown @command="handleLanguageChange" trigger="click">
      <span class="language-dropdown-link">
        {{ currentLanguage }}
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN" :class="{ active: i18n.locale.value === 'zh-CN', inactive: i18n.locale.value !== 'zh-CN' }">中文</el-dropdown-item>
          <el-dropdown-item command="en-US" :class="{ active: i18n.locale.value === 'en-US', inactive: i18n.locale.value !== 'en-US' }">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'

const i18n = useI18n()

const currentLanguage = computed(() => {
  return i18n.locale.value === 'zh-CN' ? '中文' : 'English'
})

const handleLanguageChange = (lang) => {
  i18n.locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style lang="scss" scoped>
.language-switcher {
  position: relative;
  
  .language-dropdown-link {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 15px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.15);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }
    
    .el-icon--right {
      margin-left: 4px;
      font-size: 12px;
    }
  }
}

/* 动态高亮样式 */
:deep(.el-dropdown-menu__item) {
  &.active {
    color: #d71920; /* 高亮（红色） */
  }
  &.inactive {
    color: #143d8a; /* 普通（蓝色） */
  }
  &:hover {
    background-color: #f5f7fa;
  }
}

// 移动端样式调整
@media screen and (max-width: 768px) {
  .language-switcher {
    .language-dropdown-link {
      font-size: 14px;
      padding: 4px 10px;
    }
  }
}
</style> 