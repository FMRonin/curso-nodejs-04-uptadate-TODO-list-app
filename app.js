require('colors')

const { SaveData, GetData } = require('./helpers/db-handler');
const { InquirerMenu, 
        InquirerPause, 
        InquirerReadInput,
        InquireTasksToDelete,
        InquirerConfirm,
        InquireTasksToUpdate } = require('./helpers/inquirer');
const Tasks = require('./model/tasks');

const main = async()=> {

    const tasks = new Tasks()

    if (GetData() !== null) {
        tasks.LoadList(GetData())
    }


    let opt = ''
    do {
        opt = await InquirerMenu()
        
        switch (opt) {
            case 'CREATE':
                let desc = await InquirerReadInput('Inserte la descripción de la tarea:')
                tasks.CreateTask(desc)
                break;
            default:
            case 'GET_LIST':
                tasks.PrintAllTasks()
                break;
            case 'GET_DONE_LIST':
                tasks.PrintTaskForState(true)
                break;
            case 'GET_TODO_LIST':
                tasks.PrintTaskForState(false)
                break;
            case 'COMPLETE':
                const ids = await InquireTasksToUpdate(tasks.listArray)
                tasks.ToggleTasks(ids)
                break;
            case 'DELETE':
                const idTask = await InquireTasksToDelete(tasks.listArray)
                if (idTask === 'QUIT') break
                const ok = await InquirerConfirm(`Esta seguro de eliminar la tarea ${idTask}`)
                if(ok) {
                    tasks.DeleteTask(idTask)
                    console.log('Tarea Eliminada');
                }
                break;
            case 'QUIT':
                console.clear()
                break;
        }
        if (opt !== 'QUIT'){
            console.log('');
            await InquirerPause()
            SaveData(tasks._list)
        } 
    } while (opt !== 'QUIT');
}

main();