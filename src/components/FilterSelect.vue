<script setup lang="ts">
import {defineProps, ref, watch} from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue']);
const selectedOption = ref(props.modelValue);
watch(selectedOption, (newVal) => {
  emit('update:modelValue', newVal);
});

</script>

<template>
  <select
    class="select border rounded-lg bg-blue-50 p-2 text-gray-500"
    v-model="selectedOption"
    multiple
    size="6"
  >
    <option v-for="option in options"  class="select__option" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
</template>
<style scoped>
.select {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f8ff;
  padding: 8px;
  color: #888;
  overflow: auto;
}
.select__option {
  padding: 4px 8px;
}
.select__option:hover {
  background-color: #ebebeb;
}
</style>
