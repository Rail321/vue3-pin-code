<template>
  <div class="pin-code"
    v-bind:class="{
      'pin-code_disabled': disabled,
      'pin-code_error': error,
      'pin-code_success': success
    }"
    v-on:click="onClick"
  >
    <div class="pin-code-wrapper pin-code__wrapper">
      <input class="pin-code-input pin-code__input" type="text"
        ref="input"
        v-bind:value="modelValue"
        v-bind:disabled="disabled"
        v-on:input="onInput"
        v-on:focus="onFocus"
        v-on:copy.prevent
        v-on:cut.prevent
      />

      <ul class="pin-code-list pin-code__list">
        <li class="pin-code-item pin-code__item"
          v-for="index of length"
          v-bind:key="index"
        >
          <input class="pin-code-cell pin-code__cell" type="text" disabled
            v-bind:class="{ 'pin-code-cell_filled': !!( getValueByIndex( index - 1 ) ) }"
            v-bind:value="!!( getValueByIndex( index - 1 ) ) ? '&lowast;' : null"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, getCurrentInstance, toRefs, ref } from 'vue'

  const instance = getCurrentInstance()

  const props = defineProps( {
    modelValue: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    error: {
      type: Boolean
    },
    success: {
      type: Boolean
    }
  } )

  const { modelValue } = toRefs( props )

  const emit = defineEmits( [ 'update:modelValue', 'focus' ] )

  const length = 4

  const input = ref( null )

  const mask = value => {
    let result = value

    const matched = result.match( /\d/g )
    result = matched ? matched.join( '' ) : ''

    result = result.slice( 0, length )

    return result
  }

  const onInput = event => {
    const value = event.target.value
    const type = event.inputType
    if ( type === 'deleteByCut' ) event.preventDefault()
    const result = mask( value )
    if ( result !== modelValue.value ) emit( 'update:modelValue', result )
    instance.ctx.$forceUpdate()
  }

  const getValueByIndex = index => {
    return modelValue.value[ index ]
  }

  const onClick = () => input.value.focus()

  const onFocus = () => emit( 'focus' )
</script>

<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  input {
    outline: none;
  }

  .pin-code {
    display: inline-block;
    &_disabled {
      opacity: .5;
    }
    &_error &-cell {
      background-color: orangered;
      border: 2px solid orangered;
      color: #FFFFFF;
    }
    &_success &-cell {
      background-color: lime;
      border: 2px solid lime;
      color: #FFFFFF;
    }

    &-input {
      opacity: 0;
    }
    &-list {

    }
    &-item {

    }
    &-cell {
      background-color: #EDEEEF;
      border: 2px solid #EDEEEF;
      border-radius: 2px;
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      // font-weight: 500;
      // font-size: 24px;
      font-weight: 500;
      font-size: 32px;
      color: #414042;
      text-align: center;
    }
    &-wrapper {

    }

    &-input:focus ~ &-list &-cell {
      border: 2px solid #1EAEED;
    }
    &-input:focus ~ &-list &-cell_filled {
      background-color: #1EAEED;
      border: 2px solid #1EAEED;
      color: #FFFFFF;
    }

    &__wrapper {
      position: relative;
    }  
    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &__list {
      display: flex;
      margin-left: -2px;
      margin-right: -2px;
    }
    &__item {
      padding-left: 2px;
      padding-right: 2px;
    }
    &__cell {
      width: 40px;
      height: 60px;
    }
  }
</style>