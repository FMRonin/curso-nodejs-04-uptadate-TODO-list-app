const Task = require("./task")

class Tasks {
    _list = {}

    constructor() {
        this._list
    }

    LoadList(list = {}){
        Object.keys(list).forEach(key => {
            this._list[key] = Object.setPrototypeOf(list[key],Task.prototype)
        })
    }

    CreateTask(desc = ''){
        const task = new Task(desc)
        this._list[task.id] = task
    }

    DeleteTask(id = ''){
        if (this._list[id]) {
            delete this._list[id]
        }
    }

    ToggleTasks(ids = []){
        ids.forEach( id => {
            const task = this._list[id]
            if (!task.doneDate) {
                task.doneDate = new Date().toISOString()
            }
        })

        this.listArray.forEach( task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].doneDate = null
            }
        })
    }

    get listArray(){
        const listArr = []
        Object.keys(this._list).forEach((key) => listArr.push(this._list[key]))
        return listArr
    }

    PrintAllTasks(){
        console.log('');
        this.listArray.forEach((task,index) => {
            const idx = `${index+1}.`.green
            const {desc, doneDate} = task
            const competed = `${(!doneDate)?'Pendiente'.red:'Completada'.green}`
            console.log(`${idx} ${desc} :: ${competed}`);
        })
    }

    PrintTaskForState ( state = true ){
        console.log('');
        let count = 1
        this.listArray.forEach((task) => {
            const {desc, doneDate} = task
            const competed = (doneDate)?true:false
            const idx = `${count++}.`.green

            if(state === competed) console.log(`${idx} ${desc} :: ${(competed)?doneDate.green:'Pendiente'.red}`);
        })
    }
}

module.exports = Tasks