<template>
  <div id="app">
    <section class="todo">
      <header class="todo-header">
        <h1>todos</h1>
      </header>
      <section class="main">
        <div class="bar">
          <div class="box" v-show="todoRef.length > 0">
            <!-- $event.target.checked 当前的事件参数.文本框.文本框的选中与否
            @change="setAllCompleted($event.target.checked)"
          -->
            <input
              id="toggle-all"
              class="toggle-all"
              type="checkbox"
              v-model="allDoneRef"
            />
            <label for="toggle-all">
              {{ allDoneRef ? " all incomplete" : " all completed" }}</label
            >
          </div>
          <input
            type="text"
            class="input"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            v-model="newTodoRef"
            @keyup.enter="addTodo"
          />
        </div>

        <ul class="todo-list clearfix">
          <li
            class="li"
            :class="{
              completed: todo.completed,
              editing: todo === editingTodoRef,
            }"
            v-for="todo in filteredTodosRef"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <!-- 当鼠标移出时，完成修改 -->
              <label @dblclick="editTodo(todo)" for="">{{ todo.title }}</label>
              <button class="destroy" @click="remove(todo)">x</button>
            </div>
            <input
              v-model="todo.title"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.escape="cancelEdit(todo)"
              class="edit"
              type="text"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todoRef.length > 0">
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef === 1 ? "" : "s" }} left</span>
        </span>
        <ul class="ul">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              >completed</a
            >
          </li>
        </ul>
        <button
          class="button"
          @click="removeCompleted"
          v-show="completedRef > 0"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import useEditTodo from "./composition/useEditTodo";
import useRemoveTodo from "./composition/useRemoveTodo";

export default {
  // setup 只会执行一次
  setup() {
    const { todoRef } = useTodoList();

    return {
      todoRef,
      // 使用 扩展运算法，可让组件直接使用该方法中 所有导出的属性和方法。
      ...useNewTodo(todoRef), // 这样可以直接拿到 函数执行后所返回的 newTodoRef 给页面直接使用。
      ...useFilter(todoRef), // 筛选任务列表
      ...useEditTodo(todoRef), // 编辑任务列表
      ...useRemoveTodo(todoRef), // 删除指定任务列表项
    };
  },
};
</script>
