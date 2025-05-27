<template>
  <Layout>
    <div class="home">
      <!-- Hero 区域 -->
      <div class="hero-section" :class="{'northeast-bg': showNortheastBg, 'brisbane-bg': !showNortheastBg}">
        <div class="container">
          <h1 class="welcome-title">{{ showNortheastBg ? $t('home.northeastTitle') : $t('home.welcome') }}</h1>
          <p>{{ showNortheastBg ? $t('home.northeastSlogan') : $t('home.slogan') }}</p>
          <div class="hero-actions">
            <el-button class="action-btn" @click="$router.push('/login')">{{ $t('home.loginRegister') }}</el-button>
            <el-button class="switch-btn" @click="toggleBackground">{{ $t('home.switchView') }}</el-button>
          </div>
        </div>
      </div>
      
      <div class="container">
        <!-- 特色区域 -->
        <div class="section-title">
          <h2>{{ $t('home.aboutUs') }}</h2>
          <p>{{ $t('home.aboutDesc') }}</p>
        </div>
        
        <div class="features">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="12" :md="8">
              <div class="feature-item feature-item-red">
                <div class="feature-icon">
                  <el-icon><User /></el-icon>
                </div>
                <h3>{{ $t('home.service') }}</h3>
                <p>{{ $t('home.serviceDesc') }}</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <div class="feature-item feature-item-blend">
                <div class="feature-icon">
                  <el-icon><Calendar /></el-icon>
                </div>
                <h3>{{ $t('home.cultural') }}</h3>
                <p>{{ $t('home.culturalDesc') }}</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <div class="feature-item feature-item-blue">
                <div class="feature-icon">
                  <el-icon><Connection /></el-icon>
                </div>
                <h3>{{ $t('home.resource') }}</h3>
                <p>{{ $t('home.resourceDesc') }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <!-- 同乡会精神slogan区域 -->
        <div class="slogan-section">
          <div class="slogan-container">
            <div class="slogan-content">
              <p class="slogan-text">{{ $t('home.slogan1') }}</p>
              <p class="slogan-text">{{ $t('home.slogan2') }}</p>
            </div>
          </div>
        </div>
        
        <!-- 精彩活动区域 -->
        <div class="section-title">
          <h2>{{ $t('home.recentActivities') }}</h2>
          <p>{{ $t('home.recentDesc') }}</p>
        </div>
        
        <div class="activities-slider">
          <div class="activities-wrapper">
            <div class="activity-card" v-for="(activity, index) in recentActivities" :key="index">
              <div class="activity-image">
                <img :src="activity.image" :alt="activity.title">
              </div>
              <div class="activity-content">
                <div class="activity-date">{{ formatDate(activity.date) }}</div>
                <h3>{{ activity.title }}</h3>
                <p class="activity-desc">{{ activity.description }}</p>
                <router-link :to="`/activities/recent`" class="view-details">
                  {{ $t('home.viewDetails') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '@/components/Layout/Layout.vue'
import { User, Calendar, Connection } from '@element-plus/icons-vue'

// 控制显示哪个背景图
const showNortheastBg = ref(false)

// 切换背景图函数
const toggleBackground = () => {
  showNortheastBg.value = !showNortheastBg.value
}

// 模拟最新活动数据
const recentActivities = ref([
  {
    title: '2023年春节联欢会',
    date: '2023-01-22',
    description: '同乡会举办了一场热闹的春节联欢会，会员们共度新春佳节，分享家乡美食...',
    image: '/src/assets/images/logo.png'
  },
  {
    title: '东北美食文化节',
    date: '2023-03-15',
    description: '在市中心举办了东北美食文化节，向当地居民展示了东北的美食文化...',
    image: '/src/assets/images/logo.png'
  },
  {
    title: '2023年中秋聚会',
    date: '2023-09-29',
    description: '同乡会组织了一场中秋聚会，会员们共赏明月，品尝月饼，共叙乡情...',
    image: '/src/assets/images/logo.png'
  }
])

// 日期格式化函数
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('zh-CN', options)
}
</script>

<style lang="scss" scoped>
.home {
  // Hero 区域
  .hero-section {
    height: 580px;
    background-size: cover;
    background-position: center;
    color: #fff;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 0;
    padding-top: 100px;
    transition: background-image 0.8s ease;
    
    &.brisbane-bg {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/images/home-picture.jpg');
    }
    
    &.northeast-bg {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/images/northeast.jpg');
    }

    .container {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px; // 添加左右内边距
    }

    .welcome-title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 24px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      overflow: visible; // 允许标题超出容器
      line-height: 1.2;
      max-width: 100%;
      display: inline-block;
      white-space: pre-line; // 处理\n换行符
      transition: all 0.5s ease;
      
      // 在英文模式下为标题添加适当的换行
      &:lang(en-US) {
        font-size: 42px;
        max-width: 90%;
        word-wrap: break-word;
      }
    }

    p {
      font-size: 22px;
      margin-bottom: 40px;
      line-height: 1.6;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      transition: all 0.5s ease;
    }

    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .action-btn {
      background: linear-gradient(135deg, #d71920, #143d8a);
      border: none;
      color: #fff;
      padding: 16px 36px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
      }
    }
    
    .switch-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.6);
      color: #fff;
      padding: 16px 24px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-3px);
      }
    }
  }

  // 章节标题
  .section-title {
    text-align: center;
    margin-bottom: 50px;

    h2 {
      font-size: 36px;
      margin-bottom: 16px;
      font-weight: 700;
      background: linear-gradient(90deg, #d71920, #143d8a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    p {
      color: #444;
      font-size: 18px;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  // 特色区域
  .features {
    margin-bottom: 80px;

    .feature-item {
      background-color: #fff;
      padding: 40px 30px;
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      text-align: center;
      height: 100%;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
      }
      
      &.feature-item-red {
        border-top: 4px solid #d71920;
        
        .feature-icon {
          background-color: rgba(215, 25, 32, 0.1);
          
          .el-icon {
            color: #d71920;
          }
        }
      }
      
      &.feature-item-blue {
        border-top: 4px solid #143d8a;
        
        .feature-icon {
          background-color: rgba(20, 61, 138, 0.1);
          
          .el-icon {
            color: #143d8a;
          }
        }
      }
      
      &.feature-item-blend {
        border-image: linear-gradient(90deg, #d71920, #143d8a) 1;
        border-top: 4px solid;
        
        .feature-icon {
          background: rgba(138, 12, 32, 0.05);
          
          .el-icon {
            background: linear-gradient(90deg, #d71920, #143d8a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }

      .feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto 24px;

        .el-icon {
          font-size: 36px;
        }
      }

      h3 {
        font-size: 22px;
        margin-bottom: 16px;
        font-weight: 600;
        color: #333;
      }

      p {
        color: #666;
        font-size: 16px;
        line-height: 1.6;
      }
    }
  }

  // 同乡会精神slogan区域
  .slogan-section {
    margin-bottom: 80px;
    background: linear-gradient(135deg, rgba(215, 25, 32, 0.05), rgba(20, 61, 138, 0.05));
    padding: 60px 0;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #d71920, #143d8a);
    }
    
    .slogan-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .slogan-content {
      text-align: left;
      
      .slogan-text {
        font-size: 18px;
        line-height: 1.8;
        color: #333;
        margin-bottom: 20px;
        position: relative;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  // 精彩活动区域
  .activities-slider {
    margin-bottom: 80px;
    position: relative;
    
    .activities-wrapper {
      display: flex;
      gap: 30px;
      overflow-x: auto;
      padding: 10px 5px 20px;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      
      &::-webkit-scrollbar {
        height: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: linear-gradient(90deg, #d71920, #143d8a);
        border-radius: 10px;
      }
    }

    .activity-card {
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      flex: 0 0 350px;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
      }

      .activity-image {
        height: 200px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
      }

      &:hover .activity-image img {
        transform: scale(1.08);
      }

      .activity-content {
        padding: 25px;

        .activity-date {
          display: inline-block;
          color: #fff;
          background: linear-gradient(135deg, #d71920, #143d8a);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          margin-bottom: 16px;
          font-weight: 500;
        }

        h3 {
          font-size: 20px;
          margin-bottom: 12px;
          font-weight: 600;
          color: #333;
        }

        .activity-desc {
          color: #666;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.6;
        }

        .view-details {
          display: inline-block;
          background: linear-gradient(90deg, #d71920, #143d8a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #d71920, #143d8a);
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
          }
          
          &:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      }
    }
  }
}

// 响应式调整
@media screen and (max-width: 768px) {
  .home {
    .hero-section {
      height: 450px;
      margin-top: -60px; // 调整移动端的顶部负外边距
      padding-top: 120px; // 调整移动端的顶部内边距

      .welcome-title {
        font-size: 32px; // 移动端减小字体大小
        white-space: normal; // 在移动端允许换行
        
        &:lang(en-US) {
          font-size: 28px;
        }
      }
      
      p {
        font-size: 18px;
      }
      
      .hero-actions {
        flex-direction: column;
        gap: 15px;
        
        .action-btn, .switch-btn {
          padding: 12px 24px;
        }
      }
    }
    
    .section-title {
      h2 {
        font-size: 28px;
      }
      
      p {
        font-size: 16px;
      }
    }
    
    .features .feature-item {
      margin-bottom: 20px;
    }
    
    .activities-slider .activities-wrapper {
      gap: 20px;
      
      .activity-card {
        flex: 0 0 280px;
      }
    }

    .slogan-section {
      padding: 40px 0;
      
      .slogan-content .slogan-text {
        font-size: 16px;
        line-height: 1.6;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .home {
    .hero-section {
      height: 450px;
      
      .welcome-title {
        font-size: 24px;
        
        &:lang(en-US) {
          font-size: 22px;
        }
      }
    }
    
    .activities-slider .activities-wrapper .activity-card {
      flex: 0 0 260px;
    }

    .slogan-section {
      padding: 30px 0;
      
      .slogan-content .slogan-text {
        font-size: 15px;
      }
    }
  }
}
</style> 