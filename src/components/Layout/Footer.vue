<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-about">
          <h2>{{ $t('header.title') }}</h2>
          <p>{{ $t('footer.slogan') }}</p>
          <div class="social-icons">
            <a href="#" target="_blank" aria-label="Facebook">
              <i class="icon-facebook"></i>
            </a>
            <a href="#" target="_blank" aria-label="Twitter">
              <i class="icon-twitter"></i>
            </a>
            <a href="#" target="_blank" aria-label="Instagram">
              <i class="icon-instagram"></i>
            </a>
            <a href="#" target="_blank" aria-label="WeChat">
              <i class="icon-wechat"></i>
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h3>{{ $t('footer.quickLinks') }}</h3>
            <ul>
              <li><router-link to="/">{{ $t('common.home') }}</router-link></li>
              <li><router-link to="/about">{{ $t('common.about') }}</router-link></li>
              <li><router-link to="/activities">{{ $t('common.activities') }}</router-link></li>
              <li><router-link to="/contact">{{ $t('common.contact') }}</router-link></li>
              <li><router-link to="/join">{{ $t('common.join') }}</router-link></li>
            </ul>
          </div>
          
          <div class="link-group">
            <h3>{{ $t('footer.contactInfo') }}</h3>
            <ul class="contact-info">
              <li>
                <i class="icon-location"></i>
                <span>{{ $t('footer.address') }}</span>
              </li>
              <li>
                <i class="icon-phone"></i>
                <span>{{ $t('footer.phone') }}</span>
              </li>
              <li>
                <i class="icon-mail"></i>
                <span>{{ $t('footer.email') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="copyright">
        <p>&copy; {{ new Date().getFullYear() }} {{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 页脚组件
</script>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(180deg, #0a2540 0%, #13254a 100%);
  color: #fff;
  padding: 60px 0 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #d71920 0%, #8a0c20 30%, #143d8a 70%, #0a4d8a 100%);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 40px;

    .footer-about {
      flex: 0 0 350px;
      margin-bottom: 30px;

      h2 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
        color: #fff;
      }

      p {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .social-icons {
        display: flex;
        gap: 15px;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff;
          transition: all 0.3s ease;

          &:hover {
            background: linear-gradient(135deg, #d71920, #143d8a);
            transform: translateY(-3px);
          }

          i {
            font-size: 18px;
          }
        }
      }
    }

    .footer-links {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;

      .link-group {
        flex: 0 0 230px;
        margin-bottom: 30px;
        margin-left: 40px;

        h3 {
          font-size: 17px;
          margin-bottom: 20px;
          font-weight: 600;
          position: relative;
          padding-bottom: 10px;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 30px;
            height: 2px;
            background: linear-gradient(90deg, #d71920, #143d8a);
          }
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            margin-bottom: 12px;

            a {
              color: rgba(255, 255, 255, 0.7);
              transition: all 0.3s ease;
              text-decoration: none;
              display: inline-block;

              &:hover {
                color: #fff;
                transform: translateX(5px);
              }
            }
          }
          
          &.contact-info {
            li {
              display: flex;
              align-items: flex-start;
              
              i {
                margin-right: 10px;
                color: #d71920;
                font-size: 16px;
                margin-top: 3px;
              }
              
              span {
                color: rgba(255, 255, 255, 0.7);
                line-height: 1.6;
              }
            }
          }
        }
      }
    }
  }

  .copyright {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
  }
}

// 暂时使用字体图标的占位符，后续可替换为实际的图标字体或SVG图标
[class^="icon-"] {
  &::before {
    display: inline-block;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
  }
}

.icon-facebook::before { content: "f"; }
.icon-twitter::before { content: "t"; }
.icon-instagram::before { content: "i"; }
.icon-wechat::before { content: "w"; }
.icon-location::before { content: "📍"; }
.icon-phone::before { content: "📞"; }
.icon-mail::before { content: "✉"; }

@media screen and (max-width: 992px) {
  .footer {
    .footer-content {
      .footer-links {
        .link-group {
          flex: 0 0 200px;
          margin-left: 30px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
    
    .footer-content {
      flex-direction: column;

      .footer-about,
      .footer-links {
        flex: 1 1 100%;
      }

      .footer-links {
        justify-content: flex-start;
        margin-top: 20px;

        .link-group {
          margin-left: 0;
          margin-right: 30px;
          flex: 0 0 48%;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .footer {
    .footer-content {
      .footer-links {
        flex-direction: column;
        
        .link-group {
          flex: 1 1 100%;
          margin-right: 0;
        }
      }
    }
  }
}
</style> 