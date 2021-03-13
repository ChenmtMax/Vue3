import { ref, computed } from "vue"

export default function useEditTodo(todosRef) {
    // 当前正在修改的数据
    const editingTodoRef = ref(null)
    let originTitle = null // 缓存之前的 title 值。

    const editTodo = (todo) => {
        originTitle = todo.title // 因为只有在 编辑状态 才会有取消。
        editingTodoRef.value = todo
    }

    // 完成修改的函数
    const doneEdit = (todo) => {
        editingTodoRef.value = null
        const title = todo.title.trim()
        if (title) {
            todo.title = title // 去除首位空白之后赋值。
        } else {
            // 找 当前项 所在索引 - 删除下标所在项，删除一个。
            todosRef.value.splice(todosRef.value.indexOf(todo), 1)
        }
    }

    // 取消修改 - ESC 快捷键
    const cancelEdit = (todo) => {
        editingTodoRef.value = null
        todo.title = originTitle
    }

    // 统一操作 - 全部完成 - 全部不完成
    const allDoneRef = computed({
        get() {
            return todosRef.value.filter(item => !item.completed).length === 0
        },
        set(checked) {
            todosRef.value.forEach((todo) => {
                todo.completed = checked
            })
        }
    })
    // const setAllCompleted = (completed) => {
    //     todosRef.value.forEach((todo) => {
    //         todo.completed = completed
    //     })
    // }

    return {
        editingTodoRef,
        editTodo,
        doneEdit,
        cancelEdit,
        allDoneRef
    }
}