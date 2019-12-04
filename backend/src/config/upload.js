const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname,'..', '..', 'uploads'), //define onde será salvo o arquivo
        filename: (req,file,cb)=>{ // define o nome do arquivo
            const ext = path.extname(file.originalname); // captura a extensão do arquivo
            const name = path.basename(file.originalname,ext); // captura o nome original do arquivo
            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })
}