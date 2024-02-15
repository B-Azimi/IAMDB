import { ref, watch, unref, getCurrentInstance } from 'vue'

export const useLocalModelValue = ({ props, property = 'modelValue', instance }) => {
  const localModelValue = ref(unref(props[property]))
  const currentInstance = instance || getCurrentInstance()
  const formatter = props.formatter || (v => v)

  watch(() => {
    return props[property]
  }, () => {
    localModelValue.value = unref(formatter(props[property]))
  })
  watch(localModelValue, (value) => {
    if (value !== formatter(value)) {
      localModelValue.value = formatter(value)
    }
    currentInstance.emit(`update:${property}`, formatter(localModelValue.value))
  })

  return {
    localModelValue
  }
}
 