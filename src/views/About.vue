<template>
  <Layout>
    <div class="about">
      <div class="container">
        <div class="section-title">
          <h2>{{ t('about.title') }}</h2>
          <p>{{ t('about.desc') }}</p>
        </div>
        
        <!-- 会长致辞部分 -->
        <div class="president-message">
          <div class="president-image">
            <img src="@/assets/images/logo.png" alt="会长照片">
            <div class="president-info">
              <h3>张三</h3>
              <p>{{ t('about.presidentMessage.title') }}</p>
              <p class="president-brief">{{ t('about.presidentMessage.briefIntro') }}</p>
            </div>
          </div>
          <div class="president-content">
            <h3>{{ t('about.presidentMessage.title') }}</h3>
            <div class="message-content">
              <p>{{ t('about.presidentMessage.greeting') }}</p>
              <p>{{ t('about.presidentMessage.welcome') }}</p>
              <p>{{ t('about.presidentMessage.history') }}</p>
              <p>{{ t('about.presidentMessage.role') }}</p>
              <p>{{ t('about.presidentMessage.activities') }}</p>
              <p>{{ t('about.presidentMessage.future') }}</p>
              <p>{{ t('about.presidentMessage.closing') }}</p>
              <p class="signature">{{ t('about.presidentMessage.signature') }}</p>
            </div>
          </div>
        </div>
        
        <div class="about-content">
          <div class="about-image">
            <img src="@/assets/images/logo.png" alt="东北同乡会">
          </div>
          
          <div class="about-text">
            <h3>{{ t('about.history') }}</h3>
            <p>{{ t('about.historyContent') }}</p>
            
            <h3>{{ t('about.mission') }}</h3>
            <p>{{ t('about.missionContent') }}</p>
            
            <h3>{{ t('about.activities') }}</h3>
            <p>{{ t('about.activitiesContent') }}</p>
            
            <h3>{{ t('about.joinUs') }}</h3>
            <p>{{ t('about.joinUsContent') }}</p>
            
            <router-link to="/login" class="join-link">
              <el-button type="primary">{{ t('about.applyJoin') }}</el-button>
            </router-link>
          </div>
        </div>
        
        <div class="section-title">
          <h2>{{ t('about.boardTitle') }}</h2>
          <p>{{ t('about.boardDesc') }}</p>
        </div>
        
        <!-- 组织架构表 -->
        <div class="org-chart">
          <!-- 会长 -->
          <div class="position president">
            <div class="member-card" @click="showMemberDetail('president')">
              <h3>会长</h3>
              <div class="member-info">
                <img src="@/assets/images/logo.png" alt="张三">
                <h4>张三</h4>
                <p>2020年至今</p>
              </div>
            </div>
          </div>

          <!-- 副会长 -->
          <div class="position vice-presidents">
            <div class="member-card" @click="showMemberDetail('vice-president-1')">
              <h3>副会长</h3>
              <div class="member-info">
                <img src="@/assets/images/logo.png" alt="李四">
                <h4>李四</h4>
                <p>2021年至今</p>
              </div>
            </div>
            <div class="member-card" @click="showMemberDetail('vice-president-2')">
              <h3>副会长</h3>
              <div class="member-info">
                <img src="@/assets/images/logo.png" alt="王五">
                <h4>王五</h4>
                <p>2022年至今</p>
              </div>
            </div>
          </div>

          <!-- 理事 -->
          <div class="position directors">
            <h3>理事</h3>
            <div class="directors-grid">
              <div class="member-card" v-for="(director, index) in directors" :key="index">
                <div class="member-info">
                  <img src="@/assets/images/logo.png" :alt="director.name">
                  <h4>{{ director.name }}</h4>
                  <p>{{ director.role }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 干事 -->
          <div class="position staff">
            <h3>干事</h3>
            <div class="staff-grid">
              <div class="member-card" v-for="(staff, index) in staffMembers" :key="index">
                <div class="member-info">
                  <img src="@/assets/images/logo.png" :alt="staff.name">
                  <h4>{{ staff.name }}</h4>
                  <p>{{ staff.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 成员详情弹窗 -->
        <el-dialog
          v-model="dialogVisible"
          :title="currentMember?.title || t('about.memberDetail')"
          width="50%"
          class="member-dialog"
        >
          <div class="member-detail" v-if="currentMember">
            <div class="member-header">
              <img :src="currentMember.image" :alt="currentMember.name">
              <div class="member-info">
                <h3>{{ currentMember.name }}</h3>
                <p class="position">{{ currentMember.position }}</p>
                <p class="term">{{ currentMember.term }}</p>
              </div>
            </div>
            <div class="member-content">
              <h4>{{ t('about.biography') }}</h4>
              <p>{{ currentMember.bio }}</p>
              <h4>{{ t('about.responsibilities') }}</h4>
              <p>{{ currentMember.responsibilities }}</p>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '@/components/Layout/Layout.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dialogVisible = ref(false)
const currentMember = ref(null)

// 理事列表
const directors = [
  { name: '赵六', role: '文化理事' },
  { name: '钱七', role: '活动理事' },
  { name: '孙八', role: '财务理事' },
  { name: '周九', role: '外联理事' },
  { name: '吴十', role: '宣传理事' },
  { name: '郑十一', role: '会员理事' }
]

// 干事列表
const staffMembers = [
  { name: '王十二', role: '活动干事' },
  { name: '李十三', role: '宣传干事' },
  { name: '张十四', role: '财务干事' },
  { name: '刘十五', role: '会员干事' },
  { name: '陈十六', role: '文化干事' },
  { name: '杨十七', role: '外联干事' }
]

// 成员详情数据
const memberDetails = {
  president: {
    title: '会长详情',
    name: '张三',
    position: '会长',
    term: '2020年至今',
    image: '@/assets/images/logo.png',
    bio: '张三，2020年当选为同乡会会长。致力于促进东北文化传承，推动中澳文化交流，为在澳东北乡亲搭建互助平台。拥有丰富的社团管理经验和广泛的人脉资源。',
    responsibilities: '负责同乡会整体发展规划，主持理事会工作，代表同乡会参与重要活动，协调各部门工作。'
  },
  'vice-president-1': {
    title: '副会长详情',
    name: '李四',
    position: '副会长',
    term: '2021年至今',
    image: '@/assets/images/logo.png',
    bio: '李四，2021年当选为同乡会副会长。专注于文化活动组织和会员服务，在社区建设方面有丰富经验。',
    responsibilities: '分管文化活动部和会员服务部，负责组织各类文化活动和会员服务工作。'
  },
  'vice-president-2': {
    title: '副会长详情',
    name: '王五',
    position: '副会长',
    term: '2022年至今',
    image: '@/assets/images/logo.png',
    bio: '王五，2022年当选为同乡会副会长。擅长商业合作和资源整合，致力于促进会员间的商业交流与合作。',
    responsibilities: '分管商业合作部和外联部，负责对外联络和商业合作事务。'
  }
}

const showMemberDetail = (memberId) => {
  currentMember.value = memberDetails[memberId]
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.about {
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
  
  // 会长致辞样式
  .president-message {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 60px;
    background-color: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    .president-image {
      flex: 0 0 100%;
      position: relative;
      
      @media (min-width: 768px) {
        flex: 0 0 30%;
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .president-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%);
        color: white;
        padding: 20px;
        text-align: center;
        
        h3 {
          font-size: 24px;
          margin-bottom: 5px;
        }
        
        p {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .president-brief {
          font-size: 14px;
          line-height: 1.4;
          opacity: 0.8;
          margin-top: 10px;
          text-align: left;
          padding: 0 10px;
        }
      }
    }
    
    .president-content {
      flex: 0 0 100%;
      padding: 30px;
      
      @media (min-width: 768px) {
        flex: 0 0 70%;
      }
      
      h3 {
        font-size: 24px;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
        position: relative;
        
        &:after {
          content: '';
          display: block;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #B22222, #0047AB);
          margin: 10px auto 0;
        }
      }
      
      .message-content {
        p {
          margin-bottom: 15px;
          line-height: 1.8;
          color: #444;
          text-align: justify;
        }
        
        .signature {
          text-align: right;
          font-style: italic;
          margin-top: 30px;
          color: #666;
        }
      }
    }
  }
  
  .about-content {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 60px;
    
    .about-image {
      flex: 0 0 100%;
      margin-bottom: 30px;
      
      @media (min-width: 768px) {
        flex: 0 0 40%;
        padding-right: 30px;
      }
      
      img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
    
    .about-text {
      flex: 0 0 100%;
      
      @media (min-width: 768px) {
        flex: 0 0 60%;
      }
      
      h3 {
        font-size: 20px;
        margin: 20px 0 10px;
        color: #333;
      }
      
      p {
        margin-bottom: 15px;
        line-height: 1.6;
        color: #666;
      }
      
      .join-link {
        margin-top: 20px;
        display: inline-block;
      }
    }
  }
  
  .org-chart {
    margin-bottom: 60px;
    
    .position {
      margin-bottom: 40px;
      
      h3 {
        font-size: 20px;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
      }
    }
    
    .president {
      .member-card {
        max-width: 300px;
        margin: 0 auto;
        cursor: pointer;
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateY(-5px);
        }
      }
    }
    
    .vice-presidents {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      
      .member-card {
        flex: 0 0 250px;
        cursor: pointer;
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateY(-5px);
        }
      }
    }
    
    .directors-grid, .staff-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .member-card {
      background: #fff;
    border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    
      .member-info {
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 15px;
        }
        
        h4 {
          font-size: 18px;
          margin-bottom: 5px;
          color: #333;
        }
        
        p {
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}

// 成员详情弹窗样式
.member-dialog {
  .member-detail {
    .member-header {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      
      img {
        width: 150px;
        height: 150px;
        border-radius: 8px;
        object-fit: cover;
      }
      
      .member-info {
        flex: 1;
        
        h3 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #333;
        }
        
        .position {
          color: #409eff;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .term {
          color: #666;
          font-size: 14px;
        }
      }
    }
    
    .member-content {
      h4 {
        font-size: 18px;
        margin: 20px 0 10px;
        color: #333;
        
        &:first-child {
          margin-top: 0;
        }
      }
      
      p {
        color: #666;
        line-height: 1.6;
      }
    }
  }
}

// 响应式调整
@media screen and (max-width: 768px) {
  .org-chart {
    .vice-presidents {
      .member-card {
        flex: 0 0 100%;
      }
    }
    
    .directors-grid, .staff-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
  
  .member-dialog {
    .member-detail {
      .member-header {
        flex-direction: column;
        text-align: center;
        
        img {
          margin: 0 auto;
        }
      }
    }
  }
}
</style> 