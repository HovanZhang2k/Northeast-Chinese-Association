<template>
  <div class="layout">
    <Header />
    <main class="main-content">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafc;

  .main-content {
    flex: 1;
    padding: 0;
    margin-top: 70px;
  }
}

@media screen and (max-width: 768px) {
  .layout {
    .main-content {
      margin-top: 60px;
    }
  }
}
</style> 