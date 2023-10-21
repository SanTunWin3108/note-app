const saveBtn = document.querySelector('#saveBtn');
let title_text_input = document.querySelector('#title-text');
let text_content_input = document.querySelector('#text-content'); 
let note_row = document.querySelector('.note-row');
let id = 0;
let notes_arr = [];
let my_note_title = document.querySelector('.my-note-title');
let my_note_content = document.querySelector('.my-note-content');
const mySaveBtn = document.querySelector('#mySaveBtn');
let edit_id = 0;
//click save btn
saveBtn.addEventListener('click', () => {
   saveNote();
});



function saveNote() {
  let title = title_text_input.value;
  let my_content = text_content_input.value;
  if(title_text_input.value !== '' && text_content_input.value !== '') {
      id++;
      showNotes(id, title, my_content);

      let my_note_obj = makeNoteObj(id, title_text_input.value, text_content_input.value);
      notes_arr.push(my_note_obj);

      localStorage.setItem('my_notes', JSON.stringify(notes_arr));

      title_text_input.value = '';
      text_content_input.value = '';
}
}

mySaveBtn.addEventListener('click', function() {
  editSaveNote();
})

function editSaveNote() {
  let edit_title = document.getElementById('edit-title').value; //very important!
  let edit_text = document.getElementById('edit-text').value; //very important!

  notes_arr = notes_arr.filter(function(item) {
    return item.id !== edit_id;
  })

  id++;
  notes_arr.push(makeNoteObj(id, edit_title, edit_text));
  localStorage.setItem('my_notes', JSON.stringify(notes_arr));
  showNotes(id, edit_title, edit_text);
  location.reload();
}

function makeNoteObj(id, title, content) {
    let note_obj = {
        id,
        title,
        content
    }

    return note_obj;
}

function showNotes(id, title, my_content) {
    let content = `
    <div class="card">
      <div class="card-header">
        <div class="id" hidden>${id}</div>
        <h6 class="note_title">${title.slice(0, 25)}...</h6>
      </div>
      <div class="card-body">
        <p class="note_content">
         ${my_content.slice(0, 25)}...
        </p>
      </div>
      <div class="card-footer">
        <button
          type="button"
          class="btn btn-primary seeMoreBtn"
          data-bs-toggle="modal"
          data-bs-target="#showMyNote"
        >
          See More
        </button>
        <button type="button" class="btn btn-danger deleteBtn">Delete</button>
      </div>
    </div>
    
   `;

   let note_col = document.createElement('div');
   note_col.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-3', 'note-col');
   note_col.innerHTML = content;
   
   note_row.append(note_col);

   //let deleteButtons = document.querySelectorAll('.deleteBtn');
   /* for(let deleteBtn of deleteButtons) {
    deleteBtn.addEventListener('click', function() {
        const bool = confirm('Are you sure you want to delete it?');
        if(bool) {
          let index = this.parentElement.parentElement.querySelector(`.id`).textContent;
          notes_arr = notes_arr.filter(function(item) {
              return item.id.toString() !== index;
          })

          localStorage.setItem('my_notes', JSON.stringify(notes_arr));
          this.parentElement.parentElement.parentElement.remove();
        }
    })
    
   } */

   let seeMoreButtons = document.querySelectorAll('.seeMoreBtn');
   for(let seeMoreBtn of seeMoreButtons) {
    seeMoreBtn.addEventListener('click', function() {
      /* let note_title = this.parentElement.parentElement.querySelector('.note_title').textContent;
      let note_content = this.parentElement.parentElement.querySelector('.note_content').textContent.trim(); */
      let my_note_id = parseInt(this.parentElement.parentElement.querySelector('.id').textContent);
      let note_title;
      let note_content;
      edit_id = my_note_id;
      console.log(edit_id);
      
      for(let my_note of notes_arr) {
        if(my_note_id === my_note.id) {
          note_title = my_note.title;
          note_content = my_note.content;
        }
      }
      
      editNote(note_title, note_content);
    })
   }




}

function editNote(note_title, note_content) {
  my_note_title.value = note_title;
  my_note_content.textContent = note_content;
}

window.addEventListener('load', () => {

    notes_arr = JSON.parse(localStorage.getItem('my_notes')) || [];
    console.log(notes_arr);
    for(let note of notes_arr) {
        let my_content = note.content;
        let title = note.title;
        id = note.id;
        showNotes(id, title, my_content);
    }
    
})

 /* notes_arr = notes_arr.filter(function(item) {
        return item.id !== 2;
    }) */
//localStorage.removeItem('my_notes');

note_row.addEventListener('click', function(event) {
  if(event.target.classList.contains('deleteBtn')) {
    let deleteBtn = event.target;
    const bool = confirm('Are you sure you want to delete it?');
    if(bool) {
      let index = deleteBtn.parentElement.parentElement.querySelector(`.id`).textContent;
      notes_arr = notes_arr.filter(function(item) {
          return item.id.toString() !== index;
      })

      localStorage.setItem('my_notes', JSON.stringify(notes_arr));
      deleteBtn.parentElement.parentElement.remove();
      location.reload();
    }
  }
})