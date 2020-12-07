import {action, makeAutoObservable, observable} from "mobx";

interface sidebarStoreTypes {
    id: number,
    name: string,
    color: string
}


class sidebarStore {
    @observable folders:sidebarStoreTypes[] = [
        {id: 0, name: 'Все задачи', color: ''},
        {id: 1, name: 'Книги', color: 'green'},
        {id: 2, name: 'Сериалы', color: 'orange'},
        {id: 3, name: 'Учеба', color: 'red'},
        {id: 4, name: 'Разное', color: 'blue'},
        {id: 5, name: 'Покупки', color: 'indigo'},
    ]

    selectColorMass = ['green', 'orange', 'red', 'blue', 'indigo']

    @observable activeItem:number = 0

    @observable visiblePopup:boolean = false

    @observable popupInputValue:string | number = ''

    @observable selectedColor:number = 0

    constructor() {
        makeAutoObservable(this)
    }

    @action addFolder (folder: any) {
        this.folders.push(folder)
    }

    @action deleteFolder (id: number) {
        this.folders = this.folders.filter(folder => folder.id !== id)
    }


}


export default new sidebarStore()
