<template>
  <Layout>
    <div class="login-page">
      <div class="container">
        <div class="login-container">
          <h1 class="page-title">{{ $t('auth.title') }}</h1>
          <p class="page-desc">{{ $t('auth.desc') }}</p>
          
          <el-tabs v-model="activeTab" class="login-tabs">
            <!-- 登录选项卡 -->
            <el-tab-pane :label="$t('auth.login')" name="login">
              <el-form 
                ref="loginForm_ref" 
                :model="loginForm" 
                :rules="loginRules" 
                label-position="top"
                class="login-form"
              >
                <el-form-item :label="$t('auth.email')" prop="email">
                  <el-input v-model="loginForm.email" :placeholder="$t('auth.emailPlaceholder')" />
                </el-form-item>
                
                <el-form-item :label="$t('auth.password')" prop="password">
                  <el-input v-model="loginForm.password" type="password" :placeholder="$t('auth.passwordPlaceholder')" />
                </el-form-item>
                
                <div class="form-options">
                  <el-checkbox v-model="loginForm.remember">{{ $t('auth.rememberMe') }}</el-checkbox>
                  <el-button link class="forget-password">{{ $t('auth.forgotPassword') }}</el-button>
                </div>
                
                <el-button type="primary" class="submit-btn" @click="submitLoginForm">
                  {{ $t('auth.loginSubmit') }}
                </el-button>
              </el-form>
            </el-tab-pane>
            
            <!-- 注册选项卡 -->
            <el-tab-pane :label="$t('auth.register')" name="register">
              <el-form 
                ref="registerForm_ref" 
                :model="registerForm" 
                :rules="registerRules" 
                label-position="top"
                class="register-form"
              >
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('auth.name')" prop="name">
                      <el-input v-model="registerForm.name" :placeholder="$t('auth.namePlaceholder')" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('join.gender')" prop="gender">
                      <el-select v-model="registerForm.gender" :placeholder="$t('join.genderPlaceholder')" style="width: 100%;">
                        <el-option :label="$t('join.male')" value="male"></el-option>
                        <el-option :label="$t('join.female')" value="female"></el-option>
                        <el-option :label="$t('join.other')" value="other"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('auth.email')" prop="email">
                      <el-input v-model="registerForm.email" :placeholder="$t('auth.emailPlaceholder')" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('join.phone')" prop="phone">
                      <el-input v-model="registerForm.phone" :placeholder="$t('join.phonePlaceholder')" />
                    </el-form-item>
                  </el-col>
                </el-row>
                
                <el-form-item :label="$t('join.hometown')" prop="hometown">
                  <el-cascader
                    v-model="registerForm.hometown"
                    :options="hometownOptions"
                    :placeholder="$t('join.hometownPlaceholder')"
                    style="width: 100%;"
                  ></el-cascader>
                </el-form-item>
                
                <el-form-item :label="$t('join.address')" prop="address">
                  <el-input v-model="registerForm.address" :placeholder="$t('join.addressPlaceholder')" />
                </el-form-item>
                
                <el-form-item :label="$t('join.occupation')" prop="occupation">
                  <el-input v-model="registerForm.occupation" :placeholder="$t('join.occupationPlaceholder')" />
                </el-form-item>
                
                <el-form-item :label="$t('join.introduction')" prop="introduction">
                  <el-input
                    v-model="registerForm.introduction"
                    type="textarea"
                    :rows="3"
                    :placeholder="$t('join.introductionPlaceholder')"
                  ></el-input>
                </el-form-item>
                
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('auth.password')" prop="password">
                      <el-input v-model="registerForm.password" type="password" :placeholder="$t('auth.passwordPlaceholder')" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('auth.confirmPassword')" prop="confirmPassword">
                      <el-input v-model="registerForm.confirmPassword" type="password" :placeholder="$t('auth.confirmPasswordPlaceholder')" />
                    </el-form-item>
                  </el-col>
                </el-row>
                
                <el-form-item prop="agreement" class="agreement-item">
                  <el-checkbox v-model="registerForm.agreement">
                    {{ $t('auth.agreement') }} 
                    <el-button link class="agreement-link" @click="showTermsDialog">{{ $t('auth.terms') }}</el-button> 
                    {{ $t('auth.and') }} 
                    <el-button link class="agreement-link" @click="showPrivacyDialog">{{ $t('auth.privacy') }}</el-button>
                  </el-checkbox>
                </el-form-item>
                
                <el-button type="primary" class="submit-btn" @click="submitRegisterForm">
                  {{ $t('auth.registerSubmit') }}
                </el-button>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          
          <div class="login-social">
            <p class="social-title">{{ $t('auth.socialLogin') }}</p>
            <div class="social-buttons">
              <el-button class="social-btn wechat-btn">
                <i class="el-icon-wechat"></i> {{ $t('auth.wechatLogin') }}
              </el-button>
              <el-button class="social-btn qq-btn">
                <i class="el-icon-qq"></i> {{ $t('auth.qqLogin') }}
              </el-button>
            </div>
          </div>
          
          <div class="association-info">
            <p>{{ $t('auth.associationInfo') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 会员条款弹窗 -->
    <el-dialog
      v-model="termsDialogVisible"
      :title="$t('auth.termsContent.title')"
      width="60%"
      class="terms-dialog"
    >
      <div class="terms-content">
        <h3>{{ $t('auth.termsContent.chapter1.title') }}</h3>
        <p>{{ $t('auth.termsContent.chapter1.content') }}</p>
        
        <h3>{{ $t('auth.termsContent.chapter2.title') }}</h3>
        <p>{{ $t('auth.termsContent.chapter2.content') }}</p>
        
        <h3>{{ $t('auth.termsContent.chapter3.title') }}</h3>
        <p>{{ $t('auth.termsContent.chapter3.content') }}</p>
        
        <h3>{{ $t('auth.termsContent.chapter4.title') }}</h3>
        <p>{{ $t('auth.termsContent.chapter4.content') }}</p>
      </div>
    </el-dialog>

    <!-- 隐私政策弹窗 -->
    <el-dialog
      v-model="privacyDialogVisible"
      :title="$t('auth.privacyContent.title')"
      width="60%"
      class="privacy-dialog"
    >
      <div class="privacy-content">
        <h3>{{ $t('auth.privacyContent.section1.title') }}</h3>
        <p>{{ $t('auth.privacyContent.section1.content') }}</p>
        
        <h3>{{ $t('auth.privacyContent.section2.title') }}</h3>
        <p>{{ $t('auth.privacyContent.section2.content') }}</p>
        
        <h3>{{ $t('auth.privacyContent.section3.title') }}</h3>
        <p>{{ $t('auth.privacyContent.section3.content') }}</p>
      </div>
    </el-dialog>
  </Layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Layout from '@/components/Layout/Layout.vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const activeTab = ref('login')

// 登录表单
const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

// 注册表单
const registerForm = reactive({
  name: '',
  gender: '',
  email: '',
  phone: '',
  hometown: [],
  address: '',
  occupation: '',
  introduction: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// 登录表单验证规则
const loginRules = {
  email: [
    { required: true, message: () => '请输入电子邮箱', trigger: 'blur' },
    { type: 'email', message: () => '请输入有效的电子邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: () => '请输入密码', trigger: 'blur' },
    { min: 6, message: () => '密码长度不能少于6个字符', trigger: 'blur' }
  ]
}

// 注册表单验证规则
const registerRules = {
  name: [
    { required: true, message: () => '请输入姓名', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: () => '请选择性别', trigger: 'change' }
  ],
  email: [
    { required: true, message: () => '请输入电子邮箱', trigger: 'blur' },
    { type: 'email', message: () => '请输入有效的电子邮箱', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: () => '请输入联系电话', trigger: 'blur' },
    { pattern: /^(\+\d{1,3})?\d{6,14}$/, message: () => '请输入有效的电话号码', trigger: 'blur' }
  ],
  hometown: [
    { required: true, message: () => '请选择家乡所在地', trigger: 'change' }
  ],
  address: [
    { required: true, message: () => '请输入现居住地址', trigger: 'blur' }
  ],
  occupation: [
    { required: true, message: () => '请输入职业', trigger: 'blur' }
  ],
  password: [
    { required: true, message: () => '请输入密码', trigger: 'blur' },
    { min: 6, message: () => '密码长度不能少于6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: () => '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  agreement: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          if (registerForm_ref.value?.isSubmit) {
            callback(new Error('请阅读并同意用户协议和隐私政策'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'submit'
    }
  ]
}

// 表单引用
const loginForm_ref = ref(null)
const registerForm_ref = ref(null)

// 家乡选项
const hometownOptions = [
  {
    value: 'heilongjiang',
    label: '黑龙江省',
    children: [
      { value: 'harbin', label: '哈尔滨市' },
      { value: 'qiqihar', label: '齐齐哈尔市' },
      { value: 'jixi', label: '鸡西市' },
      { value: 'hegang', label: '鹤岗市' },
      { value: 'shuangyashan', label: '双鸭山市' },
      { value: 'daqing', label: '大庆市' },
      { value: 'yichun', label: '伊春市' },
      { value: 'jiamusi', label: '佳木斯市' },
      { value: 'qitaihe', label: '七台河市' },
      { value: 'mudanjiang', label: '牡丹江市' },
      { value: 'heihe', label: '黑河市' },
      { value: 'suihua', label: '绥化市' },
      { value: 'daxinganling', label: '大兴安岭地区' }
    ]
  },
  {
    value: 'jilin',
    label: '吉林省',
    children: [
      { value: 'changchun', label: '长春市' },
      { value: 'jilin', label: '吉林市' },
      { value: 'siping', label: '四平市' },
      { value: 'liaoyuan', label: '辽源市' },
      { value: 'tonghua', label: '通化市' },
      { value: 'baishan', label: '白山市' },
      { value: 'songyuan', label: '松原市' },
      { value: 'baicheng', label: '白城市' },
      { value: 'yanbian', label: '延边朝鲜族自治州' }
    ]
  },
  {
    value: 'liaoning',
    label: '辽宁省',
    children: [
      { value: 'shenyang', label: '沈阳市' },
      { value: 'dalian', label: '大连市' },
      { value: 'anshan', label: '鞍山市' },
      { value: 'fushun', label: '抚顺市' },
      { value: 'benxi', label: '本溪市' },
      { value: 'dandong', label: '丹东市' },
      { value: 'jinzhou', label: '锦州市' },
      { value: 'yingkou', label: '营口市' },
      { value: 'fuxin', label: '阜新市' },
      { value: 'liaoyang', label: '辽阳市' },
      { value: 'panjin', label: '盘锦市' },
      { value: 'tieling', label: '铁岭市' },
      { value: 'chaoyang', label: '朝阳市' },
      { value: 'huludao', label: '葫芦岛市' }
    ]
  }
]

// 弹窗控制
const termsDialogVisible = ref(false)
const privacyDialogVisible = ref(false)

// 显示会员条款弹窗
const showTermsDialog = () => {
  termsDialogVisible.value = true
}

// 显示隐私政策弹窗
const showPrivacyDialog = () => {
  privacyDialogVisible.value = true
}

// 提交登录表单
const submitLoginForm = () => {
  loginForm_ref.value?.validate((valid) => {
    if (valid) {
      // 这里应该添加实际的登录逻辑，例如API调用
      console.log('登录信息', loginForm)
      
      // 模拟登录成功
      ElMessage({
        type: 'success',
        message: t('auth.loginSuccess')
      })
      
      // 登录成功后跳转到首页
      router.push('/')
    } else {
      return false
    }
  })
}

// 提交注册表单
const submitRegisterForm = () => {
  if (registerForm_ref.value) {
    registerForm_ref.value.isSubmit = true
  }
  
  registerForm_ref.value?.validate((valid) => {
    if (valid) {
      // 这里应该添加实际的注册逻辑，例如API调用
      console.log('注册信息', registerForm)
      
      // 模拟注册成功
      ElMessage({
        type: 'success',
        message: t('auth.registerSuccess')
      })
      
      // 注册成功后跳转到首页
      router.push('/')
    } else {
      if (registerForm_ref.value) {
        registerForm_ref.value.isSubmit = false
      }
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  padding: 60px 0;
  
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .login-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
    padding: 40px;
    
    .page-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      text-align: center;
      background: linear-gradient(90deg, #d71920, #143d8a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .page-desc {
      text-align: center;
      color: #666;
      margin-bottom: 40px;
    }
  }
  
  .login-tabs {
    margin-bottom: 30px;
    
    :deep(.el-tabs__item.is-active) {
      color: #d71920;
    }
    
    :deep(.el-tabs__active-bar) {
      background: linear-gradient(90deg, #d71920, #143d8a);
    }
  }
  
  .login-form,
  .register-form {
    max-width: 100%;
    
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .forget-password {
      color: #666;
      
      &:hover {
        color: #d71920;
      }
    }
    
    .agreement-item {
      margin-bottom: 30px;
      
      :deep(.el-form-item__error) {
        margin-top: 8px;
        font-size: 13px;
      }
    }
    
    .agreement-link {
      color: #d71920;
      padding: 0;
      font-weight: 500;
    }
    
    .el-form-item {
      margin-bottom: 20px;
    }
  }
  
  .register-form {
    .el-row {
      margin-bottom: 0;
    }
    
    :deep(.el-form-item__label) {
      padding-bottom: 6px;
    }
    
    :deep(.el-input__inner),
    :deep(.el-textarea__inner) {
      font-size: 14px;
    }
  }
  
  .submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #d71920, #143d8a);
    border: none;
    font-size: 16px;
    font-weight: 600;
    padding: 12px 0;
    margin-top: 10px;
    margin-bottom: 30px;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  .login-social {
    border-top: 1px solid #eee;
    padding-top: 30px;
    margin-top: 10px;
    
    .social-title {
      text-align: center;
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      position: relative;
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 70px;
        height: 1px;
        background-color: #eee;
      }
      
      &::before {
        left: 25%;
      }
      
      &::after {
        right: 25%;
      }
    }
    
    .social-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      
      .social-btn {
        flex: 0 0 calc(50% - 10px);
        border-radius: 6px;
        font-weight: 500;
      }
      
      .wechat-btn {
        background-color: #07c160;
        color: #fff;
        border: none;
        
        &:hover {
          background-color: #06ad56;
        }
      }
      
      .qq-btn {
        background-color: #12b7f5;
        color: #fff;
        border: none;
        
        &:hover {
          background-color: #0ea2db;
        }
      }
    }
  }
  
  .association-info {
    margin-top: 30px;
    text-align: center;
    font-size: 14px;
    color: #666;
  }
}

// 响应式调整
@media screen and (max-width: 768px) {
  .login-page {
    padding: 40px 0;
    
    .login-container {
      padding: 30px 20px;
      
      .page-title {
        font-size: 24px;
      }
    }
    
    .login-social {
      .social-title {
        &::before,
        &::after {
          width: 50px;
        }
        
        &::before {
          left: 15%;
        }
        
        &::after {
          right: 15%;
        }
      }
      
      .social-buttons {
        flex-direction: column;
        
        .social-btn {
          width: 100%;
        }
      }
    }
  }
}

.terms-dialog,
.privacy-dialog {
  :deep(.el-dialog__body) {
    padding: 20px 30px;
  }
  
  .terms-content,
  .privacy-content {
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 10px;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 20px 0 15px;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 10px;
      
      &.note {
        font-style: italic;
        color: #888;
        margin-top: 5px;
      }
      
      &.content {
        margin-top: 15px;
      }
      
      &.last-update {
        margin-top: 20px;
        color: #888;
        font-size: 14px;
      }
    }
    
    ul {
      padding-left: 20px;
      margin-bottom: 15px;
      
      li {
        color: #666;
        line-height: 1.6;
        margin-bottom: 8px;
      }
    }
  }
}

// 自定义滚动条样式
.terms-content::-webkit-scrollbar,
.privacy-content::-webkit-scrollbar {
  width: 6px;
}

.terms-content::-webkit-scrollbar-thumb,
.privacy-content::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

.terms-content::-webkit-scrollbar-track,
.privacy-content::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
</style> 