import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../util/todoStorage";

const validHash = ['all', 'active', 'completed'] //筛选条件

export default function useFilter(todosRef) {
    const visibilityRef = ref("all")

    const onHashChange = () => {
        // 得到 hash 值
        const hash = location.hash.replace(/#\/?/, "") // 把 #/ 或者 # 替换掉。
        console.log(hash)
        if (validHash.includes(hash)) {
            // 有效的。 修改为导航栏 hash值。
            visibilityRef.value = hash
        } else {
            console.log('无效')
            // hashchange 会触发两次，因为当 hash 变为 空时，会触发 hashchange，当空再变为空则不会再触发了。
            location.hash = ''
            visibilityRef.value = 'all'
        }
    }

    // 1、组件挂在完成的生命周期函数
    onMounted(() => {
        // 监听页面 hash 的变化
        window.addEventListener("hashchange", onHashChange)
    })

    // 2、组件销毁过后的生命周期函数
    onUnmounted(() => {
        window.removeEventListener("hashchange", onHashChange)
    })

    const filteredTodosRef = computed(() => {
        // 传入 任务列表数据，hash值 过滤筛选列表数据。
        return filter(todosRef.value, visibilityRef.value)
    })

    const remainingRef = computed(() => {
        // 计算当前筛选条件下列表的长度 - 当前数据列表有多少条信息。
        // 返回的是数组，直接取 .length 长度即可。
        return filter(todosRef.value, "active").length
    })

    const completedRef = computed(() => {
        // 表示目前已经完成的数量有多少。
        console.log(filter(todosRef.value, "completed").length)
        return filter(todosRef.value, "completed").length
    })

    return {
        visibilityRef,
        filteredTodosRef,
        remainingRef,
        completedRef
    }
}