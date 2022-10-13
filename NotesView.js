const model = require("./NotesModel");

class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector("#main-container");
    this.buttonEl = document.querySelector("#add-note-button");
    this.inputEl = document.querySelector("#note-input");

    this.buttonEl.addEventListener("click", () => {
      this.addNewNote();
      this.displayNotes();
    });
  }

  displayNotes() {
    this.model.getNotes().forEach((note) => {
      const noteParagraph = document.createElement("p");
      noteParagraph.className = "note-item";
      noteParagraph.textContent = note;
      this.mainContainerEl.append(noteParagraph);
    });
  }

  clearNotes() {
    const elementToRemove = document.querySelectorAll(".note-item");
    elementToRemove.forEach((note) => {
      note.remove();
    });
  }

  addNewNote() {
    this.model.addNote(this.inputEl.value);
  }
}

module.exports = NotesView;
