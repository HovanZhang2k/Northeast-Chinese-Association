<template>
  <Layout>
    <div class="board">
      <div class="container">
        <div class="section-title">
          <h2>理事会名单</h2>
          <p>了解东北同乡会理事会成员</p>
        </div>
        
        <div class="board-members">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="12" :md="8" v-for="(member, index) in boardMembers" :key="index">
              <div class="member-card">
                <div class="member-avatar">
                  <img :src="member.avatar" :alt="member.name">
                </div>
                <div class="member-info">
                  <h3 class="member-name">{{ member.name }}</h3>
                  <div class="member-position">{{ member.position }}</div>
                  <p class="member-desc">{{ member.description }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <div class="board-description">
          <h3>理事会职责</h3>
          <p>理事会是同乡会的核心管理机构，负责制定同乡会发展战略、规划年度活动、管理财务预算、处理日常事务等工作。理事会成员由会员大会选举产生，任期三年。</p>
          
          <h3>工作原则</h3>
          <p>理事会秉持公开、透明、民主的工作原则，定期向会员通报同乡会工作情况，听取会员意见和建议，不断改进工作，为会员提供更好的服务。</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '@/components/Layout/Layout.vue'

// 模拟理事会成员数据
const boardMembers = ref([
  {
    name: '张明',
    position: '会长',
    description: '来自黑龙江哈尔滨，2005年移居澳洲，现为布里斯班知名企业家，热心公益事业。',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    name: '李华',
    position: '副会长',
    description: '出生于吉林长春，资深会计师，在澳生活15年，积极参与社区活动。',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    name: '王强',
    position: '秘书长',
    description: '辽宁沈阳人，IT行业从业者，热心帮助新移民融入澳洲社会。',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    name: '赵芳',
    position: '财务长',
    description: '黑龙江大庆人，金融专业背景，负责同乡会财务管理工作。',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    name: '刘伟',
    position: '理事',
    description: '吉林延边人，教育工作者，负责同乡会文化教育相关活动。',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    name: '孙丽',
    position: '理事',
    description: '辽宁大连人，市场营销专家，负责同乡会宣传推广工作。',
    avatar: 'https://via.placeholder.com/150'
  }
])
</script>

<style lang="scss" scoped>
.board {
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
  
  .board-members {
    margin-bottom: 50px;
    
    .member-card {
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;
      height: 100%;
      display: flex;
      flex-direction: column;
      
      .member-avatar {
        text-align: center;
        padding: 20px 0;
        background-color: #f5f5f5;
        
        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      
      .member-info {
        padding: 20px;
        flex: 1;
        
        .member-name {
          font-size: 18px;
          margin-bottom: 5px;
          text-align: center;
        }
        
        .member-position {
          color: #409eff;
          font-weight: bold;
          margin-bottom: 15px;
          text-align: center;
        }
        
        .member-desc {
          color: #666;
          line-height: 1.6;
        }
      }
    }
  }
  
  .board-description {
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 8px;
    
    h3 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #333;
    }
    
    p {
      margin-bottom: 20px;
      line-height: 1.6;
      color: #666;
    }
  }
}
</style> 