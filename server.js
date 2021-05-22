const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});

app.get('/api/notes/:id', (req, res) => {
    let saveNote = JSON.parse(fs.readFileSync('./db/db.json'));
    res.json(saveNote[Number(req.params.id)])
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/notes', (req, res) => {
    const saveNote = JSON.parse(fs.readFileSync('./db/db.json'));
    const note = req.body;
    const noteId = (saveNote.length).toString();
    note.id = noteId;
    saveNote.push(note);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(saveNote));
    res.json(saveNote);
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
   