<template>
  <div class="recent-activities">
    <div class="activities-filter">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索活动"
        prefix-icon="el-icon-search"
        clearable
        @clear="filterActivities"
        @input="filterActivities"
      ></el-input>
    </div>
    
    <div class="activity-list">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :lg="8" v-for="(activity, index) in filteredActivities" :key="index">
          <div class="activity-card">
            <div class="activity-image">
              <img :src="activity.image" :alt="activity.title">
              <div class="activity-date">
                <span class="day">{{ formatDate(activity.date).day }}</span>
                <span class="month">{{ formatDate(activity.date).month }}</span>
              </div>
            </div>
            <div class="activity-content">
              <h3>{{ activity.title }}</h3>
              <div class="activity-meta">
                <p><el-icon><Location /></el-icon> {{ activity.location }}</p>
                <p><el-icon><Timer /></el-icon> {{ activity.time }}</p>
              </div>
              <p class="activity-desc">{{ activity.description }}</p>
              <div class="activity-footer">
                <el-button type="primary" @click="viewActivityDetails(activity)">查看详情</el-button>
                <el-button v-if="activity.canSignUp" @click="signUpActivity(activity)">立即报名</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      
      <el-empty v-if="filteredActivities.length === 0" description="暂无近期活动"></el-empty>
    </div>
    
    <!-- 活动详情弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentActivity.title"
      width="70%"
      destroy-on-close
    >
      <div class="activity-details" v-if="currentActivity">
        <img :src="currentActivity.image" :alt="currentActivity.title" class="detail-image">
        <div class="detail-meta">
          <p><strong>时间：</strong>{{ currentActivity.date }} {{ currentActivity.time }}</p>
          <p><strong>地点：</strong>{{ currentActivity.location }}</p>
          <p><strong>费用：</strong>{{ currentActivity.fee || '免费' }}</p>
          <p><strong>报名截止：</strong>{{ currentActivity.deadline || '无需报名' }}</p>
        </div>
        <div class="detail-content">
          <h4>活动详情</h4>
          <p>{{ currentActivity.fullDescription || currentActivity.description }}</p>
          
          <h4>活动流程</h4>
          <ol v-if="currentActivity.schedule">
            <li v-for="(item, index) in currentActivity.schedule" :key="index">
              {{ item }}
            </li>
          </ol>
          <p v-else>暂无详细流程</p>
          
          <h4>注意事项</h4>
          <ul v-if="currentActivity.notes">
            <li v-for="(note, index) in currentActivity.notes" :key="index">
              {{ note }}
            </li>
          </ul>
          <p v-else>暂无特别注意事项</p>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button v-if="currentActivity.canSignUp" type="primary" @click="signUpActivity(currentActivity)">
            立即报名
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Location, Timer } from '@element-plus/icons-vue'

// 搜索关键词
const searchKeyword = ref('')

// 弹窗控制
const dialogVisible = ref(false)
const currentActivity = ref({})

// 模拟近期活动数据
const activities = ref([
  {
    id: 1,
    title: '2023年春节联欢会',
    date: '2023-01-22',
    time: '18:00 - 21:00',
    location: '市政厅',
    description: '同乡会举办了一场热闹的春节联欢会，会员们共度新春佳节，分享家乡美食...',
    image: '/src/assets/images/logo.png',
    canSignUp: true,
    fee: '$20/人，会员$15/人，12岁以下儿童免费',
    deadline: '2023-01-15',
    fullDescription: '为庆祝中国农历新年，增进会员之间的友谊，东北同乡会将举办2023年春节联欢会。活动将包括丰富多彩的文艺表演、传统美食品尝、新年祝福和抽奖环节等。',
    schedule: [
      '18:00 - 18:30 签到入场',
      '18:30 - 19:00 会长致辞及嘉宾讲话',
      '19:00 - 20:00 文艺表演',
      '20:00 - 20:30 自助晚餐',
      '20:30 - 21:00 抽奖活动'
    ],
    notes: [
      '请提前购票，现场购票需加收$5/人',
      '请自备餐具，响应环保',
      '停车场有限，建议拼车或使用公共交通'
    ]
  },
  {
    id: 2,
    title: '东北美食文化节',
    date: '2023-03-15',
    time: '11:00 - 16:00',
    location: '文化中心',
    description: '同乡会举办的东北美食文化节，展示东北传统美食和文化，欢迎会员参与。',
    image: '/src/assets/images/logo.png',
    canSignUp: true,
    fee: '免费入场，品尝美食需购买品尝券',
    deadline: '2023-03-10',
    fullDescription: '本次东北美食文化节将展示东北地区的传统美食和独特文化。活动现场将设立多个美食摊位，提供正宗的东北菜肴，如锅包肉、猪肉炖粉条、糖葫芦等。同时还将有文化展示区，展示东北传统手工艺品和民俗文化。',
    schedule: [
      '11:00 - 11:30 开幕仪式',
      '11:30 - 14:00 美食品尝',
      '12:00 - 15:00 文化展示',
      '14:30 - 15:30 厨艺比赛',
      '15:30 - 16:00 闭幕式及颁奖'
    ],
    notes: [
      '品尝券可在现场购买，每本$20，含10张品尝券',
      '请自备环保袋和餐具',
      '现场摄影需征得主办方同意'
    ]
  },
  {
    id: 3,
    title: '新移民生活适应讲座',
    date: '2023-04-10',
    time: '14:00 - 16:00',
    location: '图书馆会议室',
    description: '针对新移民举办的生活适应讲座，内容包括住房、教育、医疗等方面的信息。',
    image: '/src/assets/images/logo.png',
    canSignUp: true,
    fee: '免费',
    deadline: '2023-04-08',
    fullDescription: '本次讲座专为新移民设计，将由有丰富经验的资深华人分享生活经验，涵盖住房租赁、子女教育、医疗保健、就业求职、交通出行等方面的实用信息，帮助新移民更快适应当地生活。',
    schedule: [
      '14:00 - 14:10 主持人介绍',
      '14:10 - 14:40 住房与租赁话题',
      '14:40 - 15:10 教育与医疗系统介绍',
      '15:10 - 15:40 就业与交通信息',
      '15:40 - 16:00 问答环节'
    ],
    notes: [
      '请提前报名，座位有限',
      '可携带笔记本记录要点',
      '讲座结束后可与讲者一对一交流'
    ]
  }
])

// 根据关键词过滤活动
const filteredActivities = ref([...activities.value])

const filterActivities = () => {
  if (!searchKeyword.value) {
    filteredActivities.value = [...activities.value]
  } else {
    const keyword = searchKeyword.value.toLowerCase()
    filteredActivities.value = activities.value.filter(activity => 
      activity.title.toLowerCase().includes(keyword) || 
      activity.description.toLowerCase().includes(keyword) ||
      activity.location.toLowerCase().includes(keyword)
    )
  }
}

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  return {
    day: date.getDate(),
    month: months[date.getMonth()]
  }
}

// 查看活动详情
const viewActivityDetails = (activity) => {
  currentActivity.value = activity
  dialogVisible.value = true
}

// 报名活动
const signUpActivity = (activity) => {
  ElMessageBox.confirm(
    `您确定要报名参加"${activity.title}"活动吗？`,
    '报名确认',
    {
      confirmButtonText: '确定报名',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: `您已成功报名"${activity.title}"活动，请留意邮箱中的确认邮件。`
    })
  }).catch(() => {})
}
</script>

<style lang="scss" scoped>
.recent-activities {
  .activities-filter {
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-end;
  }
  
  .activity-list {
    .activity-card {
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;
      height: 100%;
      display: flex;
      flex-direction: column;
      
      .activity-image {
        position: relative;
        height: 200px;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .activity-date {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 5px 10px;
          border-radius: 4px;
          text-align: center;
          
          .day {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: #409eff;
          }
          
          .month {
            display: block;
            font-size: 14px;
            color: #666;
          }
        }
      }
      
      &:hover .activity-image img {
        transform: scale(1.05);
      }
      
      .activity-content {
        padding: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        
        h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }
        
        .activity-meta {
          margin-bottom: 15px;
          color: #666;
          
          p {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            
            .el-icon {
              margin-right: 5px;
              color: #409eff;
            }
          }
        }
        
        .activity-desc {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
          flex: 1;
        }
        
        .activity-footer {
          margin-top: auto;
          display: flex;
          gap: 10px;
        }
      }
    }
  }
  
  .activity-details {
    .detail-image {
      width: 100%;
      max-height: 300px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .detail-meta {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      
      p {
        margin-bottom: 10px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    
    .detail-content {
      h4 {
        font-size: 18px;
        margin: 20px 0 10px;
        color: #333;
      }
      
      p, li {
        color: #666;
        line-height: 1.6;
        margin-bottom: 5px;
      }
      
      ol, ul {
        padding-left: 20px;
        margin-bottom: 15px;
      }
    }
  }
}
</style> 