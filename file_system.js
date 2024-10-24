const filesSysten = require('fs').promises;

const FileWrite =  async ()=>{
    try{
        await filesSysten.writeFile('file.txt','hello word');
        
    }catch(err){
       console.error(err)
    }
};

FileWrite();