const fs = require('fs');

const file = './db/taks_list.json'

const SaveData = (data) =>{
    fs.writeFileSync(file,JSON.stringify(data))
}

const GetData = () => {
    if (!fs.existsSync(file)) {
        return null
    }
    return JSON.parse(fs.readFileSync(file,{encoding:'utf-8'})) 
}

module.exports = {
    SaveData,
    GetData
}