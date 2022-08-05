<template>
  <div class="pin-code">
    <div class="pin-code-wrapper pin-code__wrapper">
      <input type="text" class="pin-code-input pin-code__input"
        v-bind:value="modelValue"
        v-on:input="onInput"
      />

      <ul class="pin-code-list pin-code__list">
        <li class="pin-code-item pin-code__item"
          v-for="index of length"
          v-bind:key="index"
        >
          <input class="pin-code-cell pin-code__cell" type="text" disabled
            v-bind:value="getValueByIndex( index - 1 )"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, getCurrentInstance, toRefs } from 'vue'

  const instance = getCurrentInstance()

  const props = defineProps( {
    modelValue: {
      type: String
    }
  } )

  const { modelValue } = toRefs( props )

  const emit = defineEmits( [ 'update:modelValue' ] )

  const length = 4

  const mask = value => {
    let result = value

    const matched = result.match( /\d/g )
    result = matched ? matched.join( '' ) : ''

    result = result.slice( 0, length )

    return result
  }

  const onInput = event => {
    const value = event.target.value
    const result = mask( value )
    emit( 'update:modelValue', result )
    instance.ctx.$forceUpdate()
  }

  const getValueByIndex = index => {
    return modelValue.value[ index ]
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .pin-code {
    &-input {
      
    }
    &-list {
      list-style: none;
    }
    &-item {

    }
    &-cell {

    }
    &-wrapper {

    }
    
    &__input {
      // position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    &__list {
      display: flex;
      margin-left: -2.5px;
      margin-right: -2.5px;
    }
    &__item {
      padding-left: 2.5px;
      padding-right: 2.5px;
    }
    &__cell {

    }
    &__wrapper {
      position: relative;
    }
  }
</style>