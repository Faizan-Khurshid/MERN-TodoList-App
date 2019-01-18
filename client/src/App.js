import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  addNewItem(){
    const { todo } = this.state
    console.log("input", todo)
    fetch("/add", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({todo})
    }).then(() => this.fetchTodos() )
    
  }

    fetchTodos(){
      const { res } = this.state
      fetch("/fetchTodos")
      .then(result => result.json())
      .then(result => {
        this.setState({res : result})
        console.log("result", result)
      })
    
  }

  componentDidMount(){
    this.fetchTodos()
  }

  deleteTodo(todoObj){
    console.log("todoObj", todoObj)
    fetch("/deleteTodo", {
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({id : todoObj._id })
    }).then(() => this.fetchTodos() )
  }

  openPopUp(todoObj){
    this.setState({popup : true, updateTodo : todoObj, updatedTodo : todoObj.todo})
    
  }

  updateTodo(){
    const { updatedTodo } = this.state

    return(
      <div style={{display : "absolute"}}>
        <form onSubmit={() => this.todoUpdated()}>
          <h3>Enter New Todo</h3>
          <input style={{width : "30%", height : 30, fontSize : 20, padding : 5, outline : "none" , border : "2px solid grey", borderRadius : 10}} value={updatedTodo} onChange={(e) => this.setState({updatedTodo : e.target.value})} />
          <input style={{width : "10%", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} type="submit" value="update" />
          <input style={{width : "10%", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} type="button" onClick={() => this.setState({popup : false}) } value="cancel" />
        </form>
      </div>
    )
  }

  todoUpdated(){
    const { updateTodo, updatedTodo } = this.state
    if(updatedTodo != ""){
      fetch("updateTodo", {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({id : updateTodo._id, updatedTodo })
      })
    }else{
      this.deleteTodo(updateTodo)
    }
  }

  render() {
    const { res, popup } = this.state
    console.log("res", res)
    return (
      <div className="App">
          <h1>Todo List</h1>

          <form style={{margin : 30}} onSubmit={() => this.addNewItem()}>
            <input style={{width : "60%", height : 30, fontSize : 20, padding : 5, outline : "none" , border : "2px solid grey", borderRadius : 10}} onChange={(e) => this.setState({ todo : e.target.value })} />
            <input style={{width : "10%", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} type="submit" value="Add" />
          </form>
          { popup && this.updateTodo() }
          <div style={{width : "60%", margin : "0 auto"}}>
            {res && res.length &&  res.map(value => {
              return (
                <div>
                  <li style={{width : "70%",display : "inline-block", margin : 10, fontSize : 20, outline : "none", padding : 10, border : "2px solid grey", borderRadius : 10}} >{value.todo}</li>
                  <button style={{width : "10%",display : "inline-block", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} onClick={this.deleteTodo.bind(this,value)}>delete</button>
                  <button style={{width : "10%",display : "inline-block", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} onClick={this.openPopUp.bind(this,value)}>update</button>
                </div>
              )
            })}
          </div>
          {/* <div style={{width : "60%", margin : "0 auto"}}>
            <li style={{width : "70%",display : "inline-block", margin : 10, fontSize : 20, outline : "none", padding : 10, border : "2px solid grey", borderRadius : 10}} >CT Assignment</li>
            <button style={{width : "10%",display : "inline-block", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} onClick={this.deleteTodo.bind(this)}>delete</button>
            <button style={{width : "10%",display : "inline-block", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} onClick={this.openPopUp.bind(this)}>update</button>
            
            <li style={{width : "70%",display : "inline-block", margin : 10, fontSize : 20, outline : "none", padding : 10, border : "2px solid grey", borderRadius : 10}} >React Assignment</li>
            <button style={{width : "10%",display : "inline-block", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} onClick={this.deleteTodo.bind(this)}>delete</button>
            <button style={{width : "10%",display : "inline-block", height : 45, marginLeft : 10, fontSize : 20, outline : "none", padding : 5, border : "2px solid grey", borderRadius : 10}} onClick={this.openPopUp.bind(this)}>update</button>
            
          </div> */}

        
        
      </div>
    );
  }
}

export default App;
