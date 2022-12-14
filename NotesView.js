const model = require("./notesModel");
const api = require("./NotesApi");

class NotesView {
  constructor(model, api) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector(".flexbox-item-2");
    this.buttonEl = document.querySelector(".add-note-button");
    this.deleteButtonEl = document.querySelector(".delete-note-button");
    this.inputEl = document.querySelector("#note-input");

    this.buttonEl.addEventListener("click", async () => {
      this.clearNotes();
      await this.addNewNote(this.inputEl.value);
      this.inputEl.value = "";
      await this.displayNotesFromApi();
    });

    this.deleteButtonEl.addEventListener("click", () => {
      this.clearNotes();
      this.clearErrorMessage();
    });
  }

  displayNotes(noteData) {
    noteData.forEach((note) => {
      const noteParagraph = document.createElement("p");
      noteParagraph.className = "note-item";
      noteParagraph.textContent = note;
      this.mainContainerEl.append(noteParagraph);
    });
  }

  clearErrorMessage() {
    const elementToRemove = document.querySelectorAll("#error-message");
    elementToRemove.forEach((error) => {
      error.remove();
    });
  }

  clearNotes() {
    const elementToRemove = document.querySelectorAll(".note-item");
    elementToRemove.forEach((note) => {
      note.remove();
    });
  }

  addNewNote(note) {
    return this.api.createNote(note, () => {
      this.displayError();
    });
  }

  async displayNotesFromApi() {
    return this.api.loadNotes(
      (noteData) => {
        this.displayNotes(noteData);
      },
      () => {
        this.displayError();
      }
    );
  }

  displayError() {
    const errorMessage = document.createElement("p");
    errorMessage.id = "error-message";
    errorMessage.textContent = "Oops! Something went wrong";
    this.mainContainerEl.append(errorMessage);
  }
}

module.exports = NotesView;
