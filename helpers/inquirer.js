const inquirer = require('inquirer');
require('colors')

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {value:'CREATE',name:`${'1.'.green} Crear Tarea`},
            {value:'GET_LIST',name:`${'2.'.green} Listar Tareas`},
            {value:'GET_DONE_LIST',name:`${'3.'.green} Listar Tareas completadas`},
            {value:'GET_TODO_LIST',name:`${'4.'.green} Listar tareas pendientes`},
            {value:'COMPLETE',name:`${'5.'.green} Completar tarea(s)`},
            {value:'DELETE',name:`${'6.'.green} Borrar tarea`},
            {value:'QUIT',name:`${'0.'.green} Salir`}
        ]
    }
]

const InquireTasksToDelete = async( tasks = []) => {
    const choices = tasks.map((task, index) => {
        const {id, desc, doneDate} = task
        const idx = `${index+1}.`.green
        return {value:id,name:`${idx}${desc}`}
    })
    choices.unshift({
        value:'QUIT',
        name: `${'0.'.green}Ninguna`
    })
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: '¿Que  tarea desea borrar?',
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(questions)
    return id
}

const InquireTasksToUpdate = async( tasks = []) => {
    const choices = tasks.map((task, index) => {
        const {id, desc, doneDate} = task
        const check = (doneDate)?true:false
        const idx = `${index+1}.`.green
        return {value:id,name:`${idx}${desc}`,checked:check}
    })
    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: '¿Selecciones tareas a completar?',
            choices,
            validate(value){
                console.log(value);
                return true
            }
        }
    ]
    
    const {ids} = await inquirer.prompt(questions)
    return ids
}

const InquirerMenu = async() => {
    console.clear()
    console.log('=========================='.green)
    console.log('   Selecione una opción   '.green)
    console.log('==========================\n'.green)

    const {option} = await inquirer.prompt(questions)

    return option
}

const InquirerPause = async() => {

    const question = [{
        type:'input',
        name:'pause',
        message:`Presione ${'ENTER'.green} para continuar`
    }]

    await inquirer.prompt(question)
}

const InquirerReadInput = async(message = 'Por favor ingrese un valor') => {
    const question =[{
        type:'input',
        name:'desc',
        message,
        validate(value) {
            if(value.length === 0)
                return 'Por favor ingrese un valor'
            return true
        }
    }]
    const {desc} = await inquirer.prompt(question)
    return desc 
}

const InquirerConfirm = async(message = 'desea confirmar acción') => {
    const question =[{
        type:'confirm',
        name:'ok',
        message,
        default:false
    }]
    const {ok} = await inquirer.prompt(question)
    return ok 
}


module.exports = {
     InquirerMenu,
     InquirerPause,
     InquirerReadInput,
     InquireTasksToDelete,
     InquirerConfirm,
     InquireTasksToUpdate
}