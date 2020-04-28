import React from 'react';
import './App.css';
import { CATEGORIES } from './data'

class App extends React.Component {

  state = {
    tasks: [
      {
        text: 'Buy rice',
        category: 'Food'
      },
      {
        text: 'Save a tenner',
        category: 'Money'
      },
      {
        text: 'Build a todo app',
        category: 'Code'
      },
      {
        text: 'Build todo API',
        category: 'Code'
      },
      {
        text: 'Get an ISA',
        category: 'Money'
      },
      {
        text: 'Cook rice',
        category: 'Food'
      },
      {
        text: 'Tidy house',
        category: 'Misc'
      }
    ],
    categories: CATEGORIES, 
    filter: 'All',
    formInput: '',
    formSelect: 'Code'
  }

  renderButtons(){
    return this.state.categories.map(category =>{
      if (category === this.state.filter){
        return<button className="selected" onClick={() => this.handleClick(category)}>{category}</button>
      }
      return<button onClick={() => this.handleClick(category)}>{category}</button>
    })
  }

  handleClick(category){
    this.setState({
      filter: category
    })
  }

  handleDelete(text){
    const updatedTasks = this.state.tasks.filter(task =>{
      return task.text !== text
    })
    this.setState({
      tasks: updatedTasks
    })
  }

  renderTasks(){
    const { filter, tasks } = this.state
    let filTasks = tasks
    if (filter !== 'All'){
      filTasks = filTasks.filter(task => task.category === filter)
    }
    return filTasks.map(task => {
      return (
        <div className="task">
          <div className="label">{task.category}</div>
          <div className="text">{task.text}</div>
          <button onClick={() => this.handleDelete(task.text)} className="delete">X</button>
        </div>
      )
    })
  }

  displaySelectOptions(){
    return this.state.categories.map(category => {
      if (category !== 'All'){
        return <option value={category}>{category}</option>
      }

    })
  }

  handleInputChange(e){
    this.setState({
      formInput: e.target.value
    })

  }

  handleSelectChange(e){
    this.setState({
      formSelect: e.target.value
    })

  }

  handleSubmit(e){
    e.preventDefault()
    this.setState(prevState => ({
        tasks: [
          ...prevState.tasks, 
          {
            text: this.state.formInput,
            category: this.state.formSelect
          }       
        ], 
        formInput: ''

    }))

  }

  render() {
    return (
      <div className="App">
        <h2>My tasks</h2>
        <div className="categories">
          {this.renderButtons()}
        </div>
        <div className="tasks">
          <h5>Tasks</h5>
          <form onSubmit={e=>this.handleSubmit(e)} className="new-task-form">
            <input onChange={e => this.handleInputChange(e)}placeholder="New task details" type="text" value={this.state.formInput}/>
            <select value={this.state.formFilter} onChange={e => this.handleSelectChange(e)}>
              {this.displaySelectOptions()}
            </select>
            <input type="submit" value="Add Task"/>
          </form>
          <div>
            {this.renderTasks()}
          </div>
        </div>
        
      </div>
    );
  }
}


export default App;
