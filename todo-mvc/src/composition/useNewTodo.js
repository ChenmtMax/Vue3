import { ref } from "vue"
import { generateId } from '../util/todoStorage'

// 可传参 将值传入 做相应的逻辑操作处理。
export default function userNewTodo(todoRef) {
    const newTodoRef = ref("") // 新任务的标题

    // 把输入的新任务 newTodoRef，给到 todo 对象，再更新到 todoRef 列表数据中。
    const addTodo = () => {
        // 新增一个任务 有值直接赋值并且去掉首位空格。
        const value = newTodoRef.value && newTodoRef.value.trim()
        if (!value) {
            return
        }
        console.log('新增')
        // 生成一个任务对象, 将其加入到任务列表中.
        const todo = {
            id: generateId(),
            title: value,
            completed: false // 任务是否完成
        }
        // 更新 todoList 任务列表数据
        todoRef.value.push(todo)
        newTodoRef.value = '' // 清空文本框
    }

    return {
        newTodoRef,
        addTodo
    }
}