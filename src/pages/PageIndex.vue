<template>
  <div>
    <div>
      <app-pin-code
        secured
        v-model="pinCode"
        v-bind:disabled="pinCodeDisabled"
        v-bind:error="pinCodeError"
        v-bind:success="pinCodeSuccess"
        v-on:update:modelValue="onUpdatePinCode"
      />
    </div>

    <br />

    <div>
      <app-pin-code
        disabled
        v-model="pinCode"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import AppPinCode from '@/components/AppPinCode'

  const pinCode = ref( '' )
  const pinCodeDisabled = ref( false )
  const pinCodeError = ref( false )
  const pinCodeSuccess = ref( false )

  const onUpdatePinCode = value => {
    pinCodeError.value = false
    pinCodeSuccess.value = false

    if ( value.length === 4 ) {
      pinCodeDisabled.value = true
      setTimeout( () => {
        pinCodeDisabled.value = false
        if ( Math.random() > 0.5 ) {
          pinCodeError.value = true
        } else {
          pinCodeSuccess.value = true
        }
      }, 1000 )
    }
  }
</script>