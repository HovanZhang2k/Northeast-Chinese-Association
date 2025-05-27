<template>
  <Layout>
    <div class="contact">
      <div class="container">
        <div class="section-title">
          <h2>{{ $t('contact.title') }}</h2>
          <p>{{ $t('contact.desc') }}</p>
        </div>
        
        <div class="contact-content">
          <el-row :gutter="30">
            <el-col :xs="24" :md="12">
              <div class="contact-info">
                <div class="info-title">{{ $t('contact.info') }}</div>
                <ul class="info-list">
                  <li>
                    <el-icon><Location /></el-icon>
                    <div class="info-item">
                      <h4>{{ $t('contact.address') }}</h4>
                      <p>{{ $t('contact.addressDetail') }}</p>
                    </div>
                  </li>
                  <li>
                    <el-icon><Phone /></el-icon>
                    <div class="info-item">
                      <h4>{{ $t('contact.phone') }}</h4>
                      <p>123-456-7890</p>
                    </div>
                  </li>
                  <li>
                    <el-icon><Message /></el-icon>
                    <div class="info-item">
                      <h4>{{ $t('contact.email') }}</h4>
                      <p>info@necommunity.com</p>
                    </div>
                  </li>
                  <li>
                    <el-icon><Clock /></el-icon>
                    <div class="info-item">
                      <h4>{{ $t('contact.workHours') }}</h4>
                      <p>{{ $t('contact.workDays') }}</p>
                      <p>{{ $t('contact.weekends') }}</p>
                    </div>
                  </li>
                </ul>
                
                <div class="social-media">
                  <div class="info-title">{{ $t('contact.followUs') }}</div>
                  <div class="social-links">
                    <a href="#" class="social-link" title="微信公众号">
                      <el-icon><ChatDotRound /></el-icon>
                    </a>
                    <a href="#" class="social-link" title="Facebook">
                      <el-icon><Connection /></el-icon>
                    </a>
                    <a href="#" class="social-link" title="Twitter">
                      <el-icon><Promotion /></el-icon>
                    </a>
                    <a href="#" class="social-link" title="Instagram">
                      <el-icon><Picture /></el-icon>
                    </a>
                  </div>
                </div>
              </div>
            </el-col>
            
            <el-col :xs="24" :md="12">
              <div class="contact-form">
                <div class="info-title">{{ $t('contact.messageForm') }}</div>
                <el-form 
                  ref="messageFormRef"
                  :model="messageForm"
                  :rules="rules"
                  label-position="top"
                >
                  <el-form-item :label="$t('contact.name')" prop="name">
                    <el-input v-model="messageForm.name" :placeholder="$t('contact.namePlaceholder')"></el-input>
                  </el-form-item>
                  
                  <el-form-item :label="$t('contact.email')" prop="email">
                    <el-input v-model="messageForm.email" :placeholder="$t('contact.emailPlaceholder')"></el-input>
                  </el-form-item>
                  
                  <el-form-item :label="$t('contact.subject')" prop="subject">
                    <el-input v-model="messageForm.subject" :placeholder="$t('contact.subjectPlaceholder')"></el-input>
                  </el-form-item>
                  
                  <el-form-item :label="$t('contact.message')" prop="message">
                    <el-input 
                      v-model="messageForm.message" 
                      type="textarea" 
                      :rows="5"
                      :placeholder="$t('contact.messagePlaceholder')"
                    ></el-input>
                  </el-form-item>
                  
                  <el-form-item>
                    <el-button type="primary" @click="submitForm(messageFormRef)">{{ $t('contact.send') }}</el-button>
                    <el-button @click="resetForm(messageFormRef)">{{ $t('contact.reset') }}</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <div class="map-section">
          <div class="info-title">{{ $t('contact.location') }}</div>
          <div class="map-container">
            <img :src="mapImage" alt="Location Map" class="map-image">
          </div>
          <p class="map-note">{{ $t('contact.mapNote') }}</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Layout from '@/components/Layout/Layout.vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { 
  Location, 
  Phone, 
  Message, 
  Clock, 
  ChatDotRound, 
  Connection, 
  Promotion, 
  Picture 
} from '@element-plus/icons-vue'

const { t } = useI18n()
const messageFormRef = ref()

// 留言表单数据
const messageForm = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: t('contact.namePlaceholder'), trigger: 'blur' },
    { min: 2, max: 20, message: t('contact.validation.nameLength'), trigger: 'blur' }
  ],
  email: [
    { required: true, message: t('contact.emailPlaceholder'), trigger: 'blur' },
    { type: 'email', message: t('contact.validation.emailFormat'), trigger: 'blur' }
  ],
  subject: [
    { required: true, message: t('contact.subjectPlaceholder'), trigger: 'blur' }
  ],
  message: [
    { required: true, message: t('contact.messagePlaceholder'), trigger: 'blur' },
    { min: 10, message: t('contact.validation.messageLength'), trigger: 'blur' }
  ]
}

// 替换地图占位图片
const mapImage = '/src/assets/images/logo.png'

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return
  
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 在这里处理表单提交逻辑，例如发送到后端 API
      console.log('表单提交成功', messageForm)
      
      // 显示提交成功的消息
      ElMessage({
        type: 'success',
        message: t('contact.success')
      })
      
      // 重置表单
      resetForm(formEl)
    } else {
      console.log('表单验证失败', fields)
    }
  })
}

// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.contact {
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
  
  .contact-content {
    margin-bottom: 50px;
    
    .contact-info, .contact-form {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      padding: 30px;
      height: 100%;
    }
    
    .info-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #333;
      position: relative;
      padding-bottom: 10px;
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 2px;
        background-color: #409eff;
      }
    }
    
    .info-list {
      list-style: none;
      padding: 0;
      
      li {
        display: flex;
        margin-bottom: 25px;
        
        .el-icon {
          color: #409eff;
          font-size: 24px;
          margin-right: 15px;
          margin-top: 3px;
        }
        
        .info-item {
          h4 {
            font-size: 16px;
            margin: 0 0 5px;
            color: #333;
          }
          
          p {
            color: #666;
            margin: 0;
            line-height: 1.5;
          }
        }
      }
    }
    
    .social-media {
      margin-top: 30px;
      
      .social-links {
        display: flex;
        gap: 15px;
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #f5f5f5;
          border-radius: 50%;
          color: #333;
          transition: all 0.3s;
          
          &:hover {
            background-color: #409eff;
            color: #fff;
          }
          
          .el-icon {
            font-size: 20px;
          }
        }
      }
    }
    
    .contact-form {
      .el-form-item {
        margin-bottom: 20px;
      }
    }
  }
  
  .map-section {
    margin-top: 50px;
    
    .map-container {
      margin: 20px 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      
      .map-image {
        width: 100%;
        display: block;
      }
    }
    
    .map-note {
      text-align: center;
      color: #666;
      font-style: italic;
    }
  }
}

@media (max-width: 768px) {
  .contact {
    .contact-content {
      .contact-info, .contact-form {
        margin-bottom: 30px;
      }
    }
  }
}
</style> 