const LOCAL_KEY = "todomvc"

/**
 * 生成 一个任务的唯一编号, 时间戳 + 4位随机数
 */
export function generateId() {
    // 4位随机数：利用 random.toString(16) 转16进制的字符串，如 0.8732653523 => 0.c4c532adf
    // 从第 3 位开始截取，截取 4 位数
    return Date.now() + Math.random().toString(16).substr(2, 4)
}

/*
 获取目前所有的任务
*/
export function fetch() {
    const result = localStorage.getItem(LOCAL_KEY)
    if (result) {
        return JSON.parse(result)
    }
    return []
}

/**
 * 保存所有任务
 * @param {*} todos 任务列表
 */
export function save(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}

/**
 * 过滤数据 - 指定数据筛选功能
 */
export function filter(todos, visibility = 'all') {
    if (visibility === 'all') { // 返回所有
        return todos
    } else if (visibility === 'active') { // 返回未完成的
        return todos.filter(item => !item.completed)
    } else if (visibility === 'completed') { // 返回已完成的
        return todos.filter(item => item.completed)
    }
    // new 一个报错：无效筛选的值 invalid visibility value
    throw new Error('invalid visibility value')
}