import ListItem from "./ListItem";
import AddNewButtonList from "./AddNewListButton";
import React, {FC} from "react";
import './ListItem.scss'
import sidebarStore from "../../store/sidebarStore";
import {observer} from "mobx-react-lite";
import {action} from "mobx";


const Sidebar:FC = observer(() => {



    const onClickChangeVisiblePopup = action(() => {
        sidebarStore.visiblePopup = !sidebarStore.visiblePopup
    })




    return (
        <div className={'todo__sidebar'}>
            <div className="list">
                <div className="list__body">

                    {
                        sidebarStore.folders.map(folder => <ListItem key={folder.id}
                                                                     id={folder.id}
                                                                     name={folder.name}
                                                                     color={folder.color}
                                                                    />)
                    }


                </div>
                <div className="list__footer">
                    <button className={'sidebar__add-folder-btn'} onClick={onClickChangeVisiblePopup}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <p className="list__footerText">Добавить папку</p>
                    </button>


                    {
                        sidebarStore.visiblePopup && <AddNewButtonList />
                    }


                </div>
            </div>


        </div>
    )
})

export default Sidebar