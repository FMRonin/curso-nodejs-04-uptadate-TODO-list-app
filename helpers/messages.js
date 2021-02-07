require('colors')

const MostrarMenu = () => {

    return new Promise((resolve, reject) => {
        console.clear()
        console.log('=========================='.green)
        console.log('   Selecione una opción   '.green)
        console.log('==========================\n'.green)

        console.log(`${'1.'.green} Crear Tarea`)
        console.log(`${'2.'.green} Listar Tareas`)
        console.log(`${'3.'.green} Listar Tareas completadas`)
        console.log(`${'4.'.green} Listar tareas pendientes`)
        console.log(`${'5.'.green} Completar tarea(s)`)
        console.log(`${'6.'.green} Borrar tarea`)
        console.log(`${'0.'.green} Salir`)

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question('Selecciona una opción: ',(opt) => {
            readLine.close()
            resolve(opt)
        })
    });
}

const Pausar = () => {

    return new Promise((resolve, reject) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readLine.question(`Presione ${'ENTER'.green} para continuar`,() => {
            readLine.close()
            resolve()
        }) 
    });
}

module.exports = {
    MostrarMenu,
    Pausar
}