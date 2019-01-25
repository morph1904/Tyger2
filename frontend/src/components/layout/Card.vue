<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        {{title}}
      </div>
      <div class="card-header-icon">
        <i :class="'fa fa-' + icon"></i>
      </div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <div class="card-footer-item">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['title', 'icon'],

  };
</script>
