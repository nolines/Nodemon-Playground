var express = require('express');
var route = express.Router();
var Note = require('../models/note');

route.get('/', function (req, res, next) {
    //will be change
    res.send('default route');
});

route.get('/', (req, res) => {
    res.sendFile("/app/views/main.html");
})
route.get('/notes', findAllNotes);
route.get('/notes/:id', findNoteById);
route.post('/notes', addNote);
route.put('/notes/:id', updateNote);
route.delete('/notes/:id', deleteNote);

function findAllNotes(req, res) {
    Note.find((err, notes) => {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json(notes);
        }
    });
}

function findNoteById(req, res) {
    Note.findById(req.params.id, function (err, note) {
        console.log(note);
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json(note);
        }
    });
}

function addNote(req, res) {
    var newNote = new Note({
        title: req.body.title,
        description: req.body.description
    });
    newNote.save(function (err) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json({ 'SUCCESS': newNote });
        }
    });
}

function updateNote(req, res) {
    Note.findById(req.params.id, function (err, note) {
        note.title = req.body.title;
        note.description = req.body.description;
        note.save(function (err) {
            if (err) {
                res.json({ 'ERROR': err });
            } else {
                res.json({ 'UPDATED': note });
            }
        });
    });
}

function deleteNote(req, res) {
    Note.findById(req.params.id, function (err, note) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            note.remove(function (err) {
                if (err) {
                    res.json({ 'ERROR': err });
                } else {
                    res.json({ 'REMOVED': note });
                }
            });
        }
    });
}

module.exports = route;