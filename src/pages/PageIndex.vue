<template>
  <div>
    <AppPinCode
      v-model="pinCode"
    />

    <p>{{ pinCode }}</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import AppPinCode from '@/components/AppPinCode'

  const pinCode = ref( '' )
</script>