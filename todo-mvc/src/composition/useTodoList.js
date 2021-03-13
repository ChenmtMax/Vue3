import { ref, watchEffect } from "vue";
import * as todoStorage from "../util/todoStorage";

export default function useTodoList() {
    // 在项目一开始的时候需要调用一次 fetch 取缓存，作为任务列表的初始值。
    const todoRef = ref(todoStorage.fetch());

    window.todoRef = todoRef; // 测试

    // (监控副作用)监控数据是否变化 - 使用 watchEffect 函数，给变化数据做相应的逻辑处理。
    watchEffect(() => {
        // 在该函数内，只要用到了响应式数据，这些数据就会自动被作为依赖即该函数依赖于这个响应式数据，当数据发生改变时，函数会自动重新运行一次。
        // 一重新运行，即实现数据保存。
        todoStorage.save(todoRef.value);
    });

    // 也可以直接返回 todoRef，返回对象是为了当需要返回多个值时方便返回的数据的存储返回。
    return {
        todoRef
    }
}