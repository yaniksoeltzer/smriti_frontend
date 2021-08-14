import { computed } from 'vue'

export function useModelWrapper(prop, emit, propertyName) {
    return computed({
        get: () => prop[propertyName],
        set: (value) => {
            //console.log("emit(\"update:"+propertyName+"\",", value+")")
            emit("update:"+propertyName, value)
        }
    })
}
