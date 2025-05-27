<template>
  <Layout>
    <div class="activities">
      <div class="container">
        <div class="section-title">
          <h2>精彩活动</h2>
          <p>东北同乡会组织的各类活动</p>
        </div>
        
        <div class="activities-nav">
          <el-tabs v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane label="近期活动" name="recent">
              <router-view v-if="activeTab === 'recent'" />
            </el-tab-pane>
            <el-tab-pane label="往期活动" name="past">
              <router-view v-if="activeTab === 'past'" />
            </el-tab-pane>
          </el-tabs>
        </div>
        
        <el-empty v-if="!hasContent" description="请选择活动类型查看详情"></el-empty>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Layout from '@/components/Layout/Layout.vue'

const router = useRouter()
const route = useRoute()

// 当前活动标签
const activeTab = ref('recent')

// 判断是否有子路由内容显示
const hasContent = computed(() => {
  return route.path !== '/activities'
})

// 处理标签切换
const handleTabClick = (tab) => {
  if (tab.props.name === 'recent') {
    router.push('/activities/recent')
  } else if (tab.props.name === 'past') {
    router.push('/activities/past')
  }
}

// 根据当前路由设置活动标签
onMounted(() => {
  if (route.path.includes('/activities/recent')) {
    activeTab.value = 'recent'
  } else if (route.path.includes('/activities/past')) {
    activeTab.value = 'past'
  } else {
    router.push('/activities/recent')
  }
})

// 监听路由变化
watch(
  () => route.path,
  (path) => {
    if (path.includes('/activities/recent')) {
      activeTab.value = 'recent'
    } else if (path.includes('/activities/past')) {
      activeTab.value = 'past'
    }
  }
)
</script>

<style lang="scss" scoped>
.activities {
  padding: 20px 0 60px;
  
  .section-title {
    text-align: center;
    margin-bottom: 40px;
    
    h2 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    p {
      color: #666;
    }
  }
  
  .activities-nav {
    margin-bottom: 30px;
  }
}
</style> 