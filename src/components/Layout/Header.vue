<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo.png" alt="Logo" v-if="logo" />
          <h1>{{ $t('header.title') }}</h1>
        </router-link>
      </div>
      
      <!-- 桌面导航 -->
      <div class="desktop-nav" v-if="!isMobile">
        <nav class="custom-nav">
          <router-link to="/" class="nav-item" :class="{ active: isActive('/') }">{{ $t('header.home') }}</router-link>
          <div class="dropdown-nav">
            <router-link to="/about" class="nav-item" :class="{ active: isActive('/about') }">{{ $t('header.about.title') }}</router-link>
          </div>
          <div class="dropdown-nav">
            <router-link to="/activities/recent" class="nav-item" :class="{ active: isActive('/activities') }">{{ $t('header.activities.title') }}</router-link>
            <div class="dropdown-content">
              <router-link to="/activities/recent" class="dropdown-item">{{ $t('header.activities.recent') }}</router-link>
              <router-link to="/activities/past" class="dropdown-item">{{ $t('header.activities.past') }}</router-link>
            </div>
          </div>
          <router-link to="/contact" class="nav-item" :class="{ active: isActive('/contact') }">{{ $t('header.contact') }}</router-link>
          <router-link to="/login" class="join-btn">{{ $t('header.loginRegister') }}</router-link>
        </nav>
        <LanguageSwitcher />
      </div>
      
      <!-- 移动端导航 -->
      <div class="mobile-nav" v-else>
        <div class="mobile-actions">
          <LanguageSwitcher />
          <el-button class="hamburger-btn" @click="toggleMobileMenu" type="text">
            <span class="menu-icon">≡</span>
          </el-button>
        </div>
        
        <!-- 移动端菜单 -->
        <div class="mobile-menu" v-show="mobileMenuVisible">
          <el-menu
            mode="vertical"
            :router="true"
            :default-active="activeIndex"
          >
            <el-menu-item index="/">{{ $t('header.home') }}</el-menu-item>
            <el-menu-item index="/about">{{ $t('header.about.title') }}</el-menu-item>
            <el-sub-menu index="/activities">
              <template #title>{{ $t('header.activities.title') }}</template>
              <el-menu-item index="/activities/recent">{{ $t('header.activities.recent') }}</el-menu-item>
              <el-menu-item index="/activities/past">{{ $t('header.activities.past') }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/contact">{{ $t('header.contact') }}</el-menu-item>
            <el-menu-item index="/login">{{ $t('header.loginRegister') }}</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LanguageSwitcher from './LanguageSwitcher.vue'

const route = useRoute()
const activeIndex = computed(() => {
  return route.path
})

// 判断当前路由是否激活
const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// 移动端菜单状态
const mobileMenuVisible = ref(false)
const isMobile = ref(false)
const logo = ref(true) // 控制是否显示Logo图片

// 根据屏幕宽度判断是否为移动设备
const checkScreenWidth = () => {
  isMobile.value = window.innerWidth < 992
  // 在非常小的屏幕上，可能只显示文字而不显示Logo图片
  logo.value = window.innerWidth > 480
}

// 切换移动端菜单显示状态
const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value
}

// 组件挂载和卸载时的事件处理
onMounted(() => {
  window.addEventListener('resize', checkScreenWidth)
  checkScreenWidth()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth)
})

// 监听路由变化，关闭移动菜单
watch(() => route.path, () => {
  mobileMenuVisible.value = false
})
</script>

<style lang="scss" scoped>
.header {
  background: linear-gradient(90deg, #d71920 0%, #8a0c20 30%, #143d8a 70%, #0a4d8a 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 70px;
  }

  .logo {
    a {
      display: flex;
      align-items: center;
      color: #fff;
      text-decoration: none;
      
      img {
        height: 40px;
        margin-right: 12px;
      }
      
      h1 {
        font-size: 18px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 300px;
        margin: 0;
      }
    }
  }

  // 桌面导航样式
  .desktop-nav {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    .custom-nav {
      display: flex;
      margin-right: 20px;
      align-items: center;
      
      .nav-item {
        color: rgba(255, 255, 255, 0.9);
        padding: 0 18px;
        height: 70px;
        line-height: 70px;
        text-decoration: none;
        position: relative;
        font-size: 15px;
        transition: all 0.3s ease;
        
        &:hover, &.active {
          color: #fff;
        }
        
        &.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: #ffc107; // 黄色作为辅助色
        }
      }
      
      .dropdown-nav {
        height: 70px;
        display: flex;
        align-items: center;
        position: relative;
        
        &:hover .dropdown-content {
          display: block;
          transform: translateY(0);
          opacity: 1;
        }
        
        .dropdown-content {
          display: block;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          position: absolute;
          top: 70px;
          left: 0;
          min-width: 180px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          z-index: 10;
          overflow: hidden;
          
          .dropdown-item {
            display: block;
            padding: 12px 20px;
            text-decoration: none;
            color: #444;
            transition: all 0.2s ease;
            
            &:hover {
              color: #d71920;
              background-color: #f5f7fa;
            }
          }
        }
      }
      
      .join-btn {
        display: inline-block;
        background: linear-gradient(135deg, #d71920, #143d8a);
        color: #fff;
        font-weight: 600;
        padding: 10px 20px;
        border-radius: 4px;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  // 移动端导航样式
  .mobile-nav {
    .mobile-actions {
      display: flex;
      align-items: center;
    }

    .hamburger-btn {
      margin-left: 15px;
      padding: 5px;
      color: #fff;
      
      .menu-icon {
        font-size: 28px;
        line-height: 1;
      }
    }

    .mobile-menu {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      background-color: #fff;
      z-index: 100;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    .container {
      height: 60px;
    }
    
    .logo h1 {
      font-size: 16px;
      max-width: 220px;
    }
    
    .mobile-menu {
      top: 60px;
    }
  }
}
</style> 