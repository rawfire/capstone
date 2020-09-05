import React from 'react';
import fire from '../config/firebase';

export default class NotesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      note: {}
    }
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }

  handleEditNote() {
    this.setState({
      editing: true
    })
  }

  handleSaveNote(e) {
    e.preventDefault()
    const userId = fire.auth().currentUser.uid;
    const dbRef = fire.database().ref(`users/${userId}/notes/${this.props.note.key}`);
    dbRef.update({
      title: this.noteTitle.value,
      text: this.noteText.value
    })
    this.setState({
      editing: false
    })
  }

  render() {
    let editingTemp = (
      <span>
        <h4>{this.props.note.title}</h4>
        <p>{this.props.note.text}</p>
      </span>
    )
    if(this.state.editing) {
      editingTemp = (
        <form onSubmit={this.handleSaveNote}>
          <div>
            <input 
              type='text' 
              defaultValue={this.props.note.title} 
              name='title' 
              ref={ref => this.noteTitle = ref}
            />
          </div>
          <div>
            <input 
              type='text' 
              defaultValue={this.props.note.text} 
              name='text' 
              ref ={ref => this.noteText = ref}
            />
          </div>
          <input type='submit' value='done editing' />
        </form>
      )

    }
    
    return (
      <div>
        <button onClick={this.handleEditNote}>edit</button>
        <button onClick={()=> this.props.handleRemoveNote(this.state.note.key)}>delete</button>
        {editingTemp}
      </div>
    )
  }
} 