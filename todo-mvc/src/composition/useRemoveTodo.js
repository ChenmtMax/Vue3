export default function useRemoveTodo(todosRef) {
    // 删除某项
    const remove = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1)
    }

    // 删除所有完成的任务项
    const removeCompleted = () => {
        todosRef.value = todosRef.value.filter(item => !item.completed)
    }

    return {
        remove,
        removeCompleted
    }
}