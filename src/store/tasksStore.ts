import {action, makeAutoObservable, observable} from "mobx";


interface taskType {
    id: number,
    group: number,
    task: string,
    isCompleted: boolean
}

class tasksStore {
    @observable tasks:taskType[] = [
        {id: 0, group: 1, task: 'Прочитать Поттера', isCompleted: false},
        {id: 1, group: 2, task: 'Посмотреть HOUSE M.D.', isCompleted: false},
        {id: 2, group: 3, task: 'Выучить MobX', isCompleted: false},
        {id: 3, group: 3, task: 'Выучить Redux', isCompleted: true},
        {id: 4, group: 4, task: 'Что-то сделать', isCompleted: false},
        {id: 5, group: 5, task: 'Купить шаверму', isCompleted: true},
        {id: 6, group: 5, task: 'Купить бигмак', isCompleted: false},
        {id: 7, group: 5, task: 'Купить слона', isCompleted: true},
        {id: 8, group: 2, task: 'Посмотреть онимэ', isCompleted: false},
        {id: 9, group: 3, task: 'Выучить React', isCompleted: true},
    ]

    @observable tasksInputValue:string | number = ''

    constructor() {
        makeAutoObservable(this)
    }

    @action addTask (task: any): void {
        this.tasks.push(task)
}

    @action deleteTask (taskId: number): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId)
    }

    @action toggleCompleted (id: number): void {
        this.tasks[id].isCompleted = !this.tasks[id].isCompleted
    }

}

export default new tasksStore()