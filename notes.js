fs = require('fs')
chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note){
        console.log(chalk.underline(note.title));
        console.log(note.body)
    }else{
        console.log(chalk.red('Title not in notes'))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0){
        console.log(chalk.blue.inverse('Your notes'))
        notes.forEach((note) => console.log(note.title))
    }else{
        console.log(chalk.red.inverse('No notes yet'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesUpdated = notes.filter((note) => note.title !== title)

    if(notes.length  > notesUpdated.length){
        saveNotes(notesUpdated);
        console.log(chalk.green.inverse(title + ' removed'))
    }else{
        console.log(chalk.red.inverse('Title does not exist'))
    }
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicationNotes = notes.find((note) => note.title === title)
    
    if (!duplicationNotes){
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse('Note added'))
    }else{
        console.log(chalk.red.inverse('Title already exist'))
    }

    saveNotes(notes);
}

const saveNotes = (notes) => {
    fileName = 'notes.json';
    fs.writeFileSync(fileName, JSON.stringify(notes))
}

const loadNotes = () => {
    try {
        fileName  = 'notes.json';
        return JSON.parse(fs.readFileSync(fileName).toString())
    } catch(e){
        return []
    }
}

module.exports= {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}