const NotesModel = require('./notesModel');
const NotesView = require('./NotesView');
const NotesApi = require('./NotesApi');
const model = new NotesModel();
const api = new NotesApi();
const view = new NotesView(model, api);

console.log('The notes app is running')

view.displayNotesFromApi();
