import React, { Component } from 'react';
import './App.css';

let hisUndo = [];
let hisRedo = [];

var listJob = [{name: "job1", done : true},{name:"job2", done: false},{name:"job3", done: false},{name:"job4", done: false}]
//
class App extends Component {
  constructor(props){
      super(props)
      this.state = {
        listWork : listJob,
        stage :"all"
      }
  }
  handleClick = ()=>{
    var value = document.getElementById('inputText').value
    document.getElementById('inputText').value = ''
    if(value){
      for(var i = 0; i< listJob.length;i++){
        if(listJob[i].name === value)
        break
      }
      if(i === listJob.length){
        hisUndo.push({name: value, done: "add"});
        hisRedo = [];
        listJob.push({name: value, done: false})
        this.setState({listWork: listJob})
      }else  {
        alert(value+ " is already exists")
      }

    }
  }
  workClick(id){
    for(var i = 0; i<listJob.length; i++){
      if(this.state.listWork[id].name === listJob[i].name){
        hisUndo.push({name: listJob[i].name, done : listJob[i].done});
        hisRedo = [];
        listJob[i].done = !listJob[i].done;
        break;
      }
    }
    if(this.state.stage ==="all"){
      this.setState({listWork: listJob})
    }else {
      this.state.listWork.splice(id,1)
      this.setState({listWork : this.state.listWork})
    }
  }
  listAll= ()=>{
    this.setState({
      listWork :listJob,
      stage :"all"
    })
  }
  listDone = ()=>{
    this.setState({
      listWork : listJob.filter((cur)=>{
        return cur.done === true;
      }),
      stage:"done"
    })
  }
  listDoing = ()=>{
    this.setState({
      listWork : listJob.filter((cur)=>{
        return cur.done === false;
      }),
      stage:"doing"
    })
  }
  undoClick = ()=>{
    if(hisUndo.length !== 0){
      var mem = hisUndo.pop()
      if(mem.done === "add"){
        hisRedo.push(mem);
        listJob.splice(listJob.length-1,1)
      }else{
        hisRedo.push({name: mem.name, done: !mem.done})
        for(var i = 0; i<listJob.length; i++){
          if(listJob[i].name === mem.name){
            break
          }
        }
        listJob[i].done = mem.done;
      }
      this.setState({listWork:listJob, stage :"all"})
    }
  }
  redoClick =()=>{
    if(hisRedo.length !== 0){
      var mem = hisRedo.pop()
      if(mem.done === "add"){
        hisUndo.push(mem)
        listJob.push({name:mem.name, done: false})
      }else {
        hisUndo.push({name:mem.name, done: !mem.done})
        for(var i = 0; i<listJob.length; i++){
          if(listJob[i].name === mem.name){
            break
          }
        }
        listJob[i].done = mem.done;
      }
      this.setState({listWork: listJob,stage: "all"})
    }
  }
  render() {
    return (
      <div>
       <h2 >My To Do List</h2>
       <input type="text" id= 'inputText' placeholder="Write your work"/>
       <input type= "button" value = "Add" onClick={this.handleClick}/>
       <ul>{this.state.listWork.map((work,index)=>{
         return work.done? <li key= {index} onClick = {this.workClick.bind(this,index)} style = {{color:'black'}}>{work.name}</li>:
          <li key= {index} onClick = {this.workClick.bind(this,index)} style = {{color:'red'}}>{work.name}</li>
       },this).reverse()}</ul>

        <a href = "#" onClick = {this.listAll} >All</a>
        <a> </a>
       <a href = "#" onClick = {this.listDone}>Done</a>
       <a> </a>
       <a href = "#" onClick = {this.listDoing}>Doing</a><br/>
       <input type='button' onClick = {this.undoClick} value = "Undo"/>
       <input type='button' onClick = {this.redoClick} value = 'Redo'/>
      </div>
    );
  }
}


export default App;
