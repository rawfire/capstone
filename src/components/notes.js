import React from 'react';
import fire from '../config/firebase';
import Modal from 'react-modal';
// import "firebase/database";
// import 'firebase/auth';

import NotesCard from './note-card';

Modal.setAppElement('#root');


export default class Notes extends React.Component {
  _isMounted = false;
  
  constructor(props) {
    super(props);
    
    this.state = {
      notes: [],
      showModal: false,
      loggedin: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);

  }
  
  componentDidMount() {
    this._isMounted = true;

    fire.auth().onAuthStateChanged((user) => {
      if(user){
        // call firebase from import fire 
        // grab userData and push it to the dataArray
        fire.database().ref(`users/${user.uid}/notes`).on('value', (res) => {
          const userData = res.val()
          const dataArray = []
          for(let objKey in userData) {
            userData[objKey].key = objKey
            dataArray.push(userData[objKey])
          }
          // set in the state 
          if(this._isMounted){
            this.setState({
            notes: dataArray,
            loggedin: true
            })
          }
        });
      }else {
        this.setState({loggedin: false})

      }
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleAddNote (e) {
    e.preventDefault()

    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value
    }
    // reference where we can push it
    const userId = fire.auth().currentUser.uid;
    const dbRef = fire.database().ref(`users/${userId}/notes`);
    dbRef.push(note)

    this.noteTitle.value = ''
    this.noteText.value = ''
    this.handleCloseModal()
  }

  handleRemoveNote(key) {
    const userId = fire.auth().currentUser.uid;
    const dbRef = fire.database().ref(`users/${userId}/notes/${key}`);
    dbRef.remove();
  }

  handleOpenModal (e) {
    e.preventDefault();
    this.setState({
      showModal: true
    });
  }

  handleCloseModal () {
    this.setState({
      showModal: false
    });
  }



  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>create Note</button>
        <section className='notes'>
          {
            this.state.notes.map((note, indx) => {
              return (
                <NotesCard 
                  note={note} 
                  key={`note-${indx}`} 
                  handleRemoveNote={this.handleRemoveNote}
                /> 
              )
            }).reverse()
          }
        </section>
        <Modal
        isOpen={this.state.showModal}
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={false}
        style={
          {
            overlay: {
              backgroundColor: '#9494b8'
            },
            content: {
              color: '#669999'
            }
          }
        }
        >
          <form onSubmit={this.handleAddNote}>
            <h3>Add New Note</h3>
            <label htmlFor='note-title'>Title:</label>
            <input type='text' name='note-title' ref={ref => this.noteTitle = ref} />
            <label htmlFor='note-text'>Note</label>
            <textarea name='note-text' ref={ref => this.noteText = ref} placeholder='type notes here...' />
            <input type='submit' onClick={this.handleAddNote} />
            <button onClick={this.handleCloseModal}>close</button>
          </form>
        </Modal>
      </div>
    )
  }
}