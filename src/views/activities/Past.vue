<template>
  <div class="past-activities">
    <div class="activities-filter">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="8" :md="6">
          <el-select v-model="filterYear" placeholder="选择年份" clearable @change="filterActivities">
            <el-option
              v-for="year in availableYears"
              :key="year"
              :label="year + '年'"
              :value="year"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6">
          <el-select v-model="filterType" placeholder="活动类型" clearable @change="filterActivities">
            <el-option
              v-for="type in activityTypes"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索活动"
            clearable
            @clear="filterActivities"
            @input="filterActivities"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    
    <div class="timeline">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in filteredActivities"
          :key="index"
          :timestamp="activity.date"
          :color="getTypeColor(activity.type)"
        >
          <div class="timeline-card">
            <el-card>
              <template #header>
                <div class="card-header">
                  <h3>{{ activity.title }}</h3>
                  <el-tag :type="getTypeTag(activity.type)" size="small">{{ getTypeLabel(activity.type) }}</el-tag>
                </div>
              </template>
              <div class="card-content">
                <div class="activity-image" v-if="activity.image">
                  <el-image
                    :src="activity.image"
                    fit="cover"
                  >
                  </el-image>
                </div>
                <div class="activity-info">
                  <p class="activity-location">
                    <el-icon><Location /></el-icon>
                    {{ activity.location }}
                  </p>
                  <p class="activity-desc">{{ activity.description }}</p>
                  <el-button type="primary" link @click="viewActivityDetails(activity)">
                    查看详情
                  </el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-timeline-item>
      </el-timeline>
      
      <el-empty v-if="filteredActivities.length === 0" description="暂无符合条件的活动记录"></el-empty>
    </div>
    
    <!-- 活动详情弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentActivity.title"
      width="70%"
      destroy-on-close
    >
      <div class="activity-details" v-if="currentActivity">
        <div class="detail-gallery" v-if="currentActivity.image">
          <el-image
            :src="currentActivity.image"
            fit="cover"
            class="detail-image"
          >
          </el-image>
        </div>
        
        <div class="detail-meta">
          <p><strong>日期：</strong>{{ currentActivity.date }}</p>
          <p><strong>地点：</strong>{{ currentActivity.location }}</p>
          <p><strong>活动类型：</strong>{{ getTypeLabel(currentActivity.type) }}</p>
          <p v-if="currentActivity.participants"><strong>参与人数：</strong>{{ currentActivity.participants }} 人</p>
        </div>
        
        <div class="detail-content">
          <h4>活动回顾</h4>
          <p>{{ currentActivity.fullDescription || currentActivity.description }}</p>
          
          <div v-if="currentActivity.highlights">
            <h4>活动亮点</h4>
            <ul>
              <li v-for="(item, index) in currentActivity.highlights" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          
          <div v-if="currentActivity.feedback">
            <h4>参与者反馈</h4>
            <div class="feedback-list">
              <div v-for="(feedback, index) in currentActivity.feedback" :key="index" class="feedback-item">
                <p class="feedback-content">{{ feedback.content }}</p>
                <p class="feedback-author">—— {{ feedback.author }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Location } from '@element-plus/icons-vue'

// 过滤条件
const filterYear = ref('')
const filterType = ref('')
const searchKeyword = ref('')

// 弹窗控制
const dialogVisible = ref(false)
const currentActivity = ref({})

// 活动类型
const activityTypes = [
  { label: '节日庆祝', value: 'festival' },
  { label: '文化交流', value: 'cultural' },
  { label: '讲座培训', value: 'workshop' },
  { label: '联谊聚会', value: 'social' },
  { label: '公益活动', value: 'charity' }
]

// 模拟往期活动数据
const activities = ref([
  {
    id: 1,
    title: '2022年中秋聚会',
    date: '2022-09-10',
    location: '市政厅',
    description: '同乡会组织了一场中秋聚会，会员们共赏明月，品尝月饼，共叙乡情...',
    image: '/src/assets/images/logo.png',
    type: 'festival'
  },
  {
    id: 2,
    title: '2022年春节团拜会',
    date: '2022-01-30',
    type: 'festival',
    location: '文化中心',
    description: '欢庆虎年春节，同乡会举办了传统春节联欢活动，包括文艺表演、抽奖等环节。',
    image: '/src/assets/images/logo.png',
    participants: 150,
    fullDescription: '2022年1月30日，为迎接虎年春节的到来，同乡会在文化中心举办了盛大的春节团拜会。活动吸引了150多位会员参加，现场洋溢着喜庆热闹的节日氛围。活动包括丰富的文艺表演、传统游戏、抽奖环节等，大家共同度过了一个欢乐祥和的新春佳节。',
    highlights: [
      '东北秧歌、二人转等特色表演',
      '春节传统游戏互动',
      '丰富的抽奖环节',
      '年夜饭共享环节'
    ],
    feedback: [
      {
        content: '表演非常精彩，特别是东北秧歌让我想起了家乡的春节，非常感动。',
        author: '王女士'
      },
      {
        content: '活动组织得很好，让我的孩子们也体验到了中国传统春节的快乐。',
        author: '赵先生'
      }
    ]
  },
  {
    id: 3,
    title: '生活经验分享会',
    date: '2022-06-18',
    type: 'workshop',
    location: '图书馆会议室',
    description: '邀请有丰富经验的资深会员分享生活经验，帮助新移民适应当地生活。',
    image: '/src/assets/images/logo.png',
    participants: 45,
    fullDescription: '2022年6月18日，同乡会在图书馆会议室举办了一场生活经验分享会。活动邀请了有丰富经验的资深会员担任讲者，分享了在住房、教育、医疗、就业等方面的实用经验和建议。活动特别针对新移民设计，帮助他们更快适应当地生活，解决生活中的实际问题。',
    highlights: [
      '住房市场解析和租房技巧',
      '子女教育选择和学校申请流程',
      '医疗保健系统使用指南',
      '求职就业经验和职场文化介绍'
    ],
    feedback: [
      {
        content: '讲座内容非常实用，解答了我很多关于教育体系的疑问。',
        author: '刘女士'
      },
      {
        content: '感谢同乡会组织这样的活动，让我对未来的生活有了更清晰的规划。',
        author: '陈先生'
      }
    ]
  },
  {
    id: 4,
    title: '东北文化交流日',
    date: '2022-08-27',
    type: 'cultural',
    location: '文化广场',
    description: '展示东北地区的传统文化、美食和艺术，促进文化交流。',
    image: '/src/assets/images/logo.png',
    participants: 200,
    fullDescription: '2022年8月27日，同乡会在文化广场举办了东北文化交流日活动。活动设置了多个展示区域，包括东北传统美食品尝、民间工艺展示、文化表演等。此次活动不仅吸引了众多华人参与，也有许多当地居民前来了解中国东北文化，成为一次成功的文化交流活动。',
    highlights: [
      '东北特色美食展示与品尝',
      '东北剪纸、泥塑等传统手工艺展示',
      '二人转、东北大秧歌等表演',
      '东北方言趣味课堂'
    ],
    feedback: [
      {
        content: '第一次尝到正宗的东北美食，太美味了！也了解了很多东北的文化知识。',
        author: 'John (当地居民)'
      },
      {
        content: '活动非常成功，看到这么多朋友对我们的文化感兴趣，很自豪。',
        author: '李先生 (活动组织者)'
      }
    ]
  }
])

// 可选年份
const availableYears = computed(() => {
  const years = new Set()
  activities.value.forEach(activity => {
    const year = new Date(activity.date).getFullYear()
    years.add(year)
  })
  return [...years].sort((a, b) => b - a) // 降序排列
})

// 根据条件过滤活动
const filteredActivities = ref([...activities.value])

const filterActivities = () => {
  let result = [...activities.value]
  
  // 按年份筛选
  if (filterYear.value) {
    result = result.filter(activity => {
      const activityYear = new Date(activity.date).getFullYear()
      return activityYear === filterYear.value
    })
  }
  
  // 按类型筛选
  if (filterType.value) {
    result = result.filter(activity => activity.type === filterType.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(activity => 
      activity.title.toLowerCase().includes(keyword) || 
      activity.description.toLowerCase().includes(keyword) ||
      activity.location.toLowerCase().includes(keyword)
    )
  }
  
  // 按日期排序
  result.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  filteredActivities.value = result
}

// 获取活动类型标签
const getTypeLabel = (type) => {
  const found = activityTypes.find(item => item.value === type)
  return found ? found.label : '其他活动'
}

// 获取活动类型颜色
const getTypeColor = (type) => {
  const typeColors = {
    festival: '#FF9900',
    cultural: '#409EFF',
    workshop: '#67C23A',
    social: '#E6A23C',
    charity: '#F56C6C'
  }
  return typeColors[type] || '#909399'
}

// 获取标签类型
const getTypeTag = (type) => {
  const typeTags = {
    festival: 'warning',
    cultural: 'primary',
    workshop: 'success',
    social: '',
    charity: 'danger'
  }
  return typeTags[type] || 'info'
}

// 查看活动详情
const viewActivityDetails = (activity) => {
  currentActivity.value = activity
  dialogVisible.value = true
}

// 初始化
onMounted(() => {
  filterActivities()
})
</script>

<style lang="scss" scoped>
.past-activities {
  .activities-filter {
    margin-bottom: 30px;
    
    .el-select, .el-input {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  
  .timeline {
    .timeline-card {
      margin-bottom: 20px;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h3 {
          margin: 0;
          font-size: 16px;
        }
      }
      
      .card-content {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        gap: 15px;
        
        .activity-image {
          flex: 0 0 100%;
          
          @media (min-width: 768px) {
            flex: 0 0 30%;
          }
          
          .el-image {
            width: 100%;
            height: 150px;
            border-radius: 4px;
          }
        }
        
        .activity-info {
          flex: 0 0 100%;
          
          @media (min-width: 768px) {
            flex: 0 0 calc(70% - 15px);
          }
          
          .activity-location {
            color: #909399;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            
            .el-icon {
              margin-right: 5px;
            }
          }
          
          .activity-desc {
            color: #606266;
            line-height: 1.6;
            margin-bottom: 15px;
          }
        }
      }
    }
  }
  
  .activity-details {
    .detail-gallery {
      margin-bottom: 20px;
      
      .carousel-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
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
      
      ul {
        padding-left: 20px;
        margin-bottom: 20px;
      }
      
      .feedback-list {
        margin-top: 15px;
        
        .feedback-item {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          
          .feedback-content {
            font-style: italic;
            margin-bottom: 10px;
          }
          
          .feedback-author {
            text-align: right;
            color: #909399;
          }
        }
      }
    }
  }
}
</style> 