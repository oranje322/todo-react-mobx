import React, {FC, useState} from "react";
import './Tasks.scss'
import TaskItem from "./TaskItem";
import tasksStore from "../../store/tasksStore";
import {observer} from "mobx-react-lite";
import sidebarStore from "../../store/sidebarStore";
import {action} from "mobx";
import EmptyTasks from "./EmptyTask";


const Tasks:FC = observer(() => {

    const [visibleTitleInput, setVisibleTitleInput] = useState(false)
    const [visibleAddTaskInput, setVisibleAddTaskInput] = useState(false)


    const onChangeTitle = (e:any) => {
        sidebarStore.folders[sidebarStore.activeItem].name = e.target.value

    }

    const onClickChangeVisibleTitle = () => {
        setVisibleTitleInput(prev => !prev)
    }

    const onClickChangeVisibleAddTaskInput = () => {
        setVisibleAddTaskInput(prev => !prev)
    }

    const tasksToRender = tasksStore.tasks.filter(task => task.group === sidebarStore.activeItem)

    const onChangeTaskInputValue = action((e: any) => {
        tasksStore.tasksInputValue = e.target.value
    })

    const onClickAddTask = action(() => {
        let newTask = {
            id: tasksStore.tasks.length,
            group: sidebarStore.activeItem,
            task: tasksStore.tasksInputValue,
            isCompleted: false
        }
        tasksStore.addTask(newTask)
        tasksStore.tasksInputValue = ''
        onClickChangeVisibleAddTaskInput()
    })






    return (
        <div className={'todo__tasks'}>

            <div className="tasks__title">
                {visibleTitleInput ? <input onBlur={onClickChangeVisibleTitle} onChange={onChangeTitle} className={'changeTaskInput'} autoFocus type="text"/> :
                    <h2>{sidebarStore.folders[sidebarStore.activeItem].name}</h2>
                }


                <div onClick={onClickChangeVisibleTitle}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z"/>
                    </svg>
                </div>


            </div>

            <div className="tasks__list">

                {sidebarStore.activeItem === 0
                    ? tasksStore.tasks.map(task => <TaskItem key={'taskID_' + task.id}
                                                             id={task.id}
                                                             task={task.task}
                                                             isCompleted={task.isCompleted}/>)
                    : tasksToRender.length >=1 ? tasksToRender.map(task => <TaskItem key={'taskID_' + task.id}
                                                          id={task.id}
                                                          task={task.task}
                                                          isCompleted={task.isCompleted}/>)
                        : <EmptyTasks />
                }


                {/*<EmptyTasks/>*/}

                {
                    visibleAddTaskInput &&
                    <input onChange={onChangeTaskInputValue} value={tasksStore.tasksInputValue} className={'field newTaskInput'} type="text" placeholder={'Текст задачи'}/>
                }

            </div>

            <div className="newTask">

                {
                    visibleAddTaskInput ? '' : <button onClick={onClickChangeVisibleAddTaskInput}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 8H15" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <p>Новая задача</p>
                    </button>
                }


                {
                    visibleAddTaskInput && <div className={'sendTaskBtn'}>
                        <button onClick={onClickAddTask} className={'greenBtn'}>Добавить задачу</button>
                        <button onClick={onClickChangeVisibleAddTaskInput} className={'grayBtn'}>Отмена</button>
                    </div>
                }


            </div>
        </div>
    )
})

export default Tasks