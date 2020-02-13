import React, { Component } from 'react';
import Task from '../Task';
import axios from 'axios';

class ToDoList extends Component {
    state = {
        tasks: [],
        newTask: ''
    }

    componentDidMount() {
        return axios.get('https://jsonplaceholder.typicode.com/todos/').then(tasksResponse => {
            this.setState({
                tasks: tasksResponse.data
            })
      }).catch(error => {
        console.log(error);
      })
    }

    addATask = () => {
        const {
            newTask,
            tasks
        } = this.state;
        if(newTask) {
            return axios.post('https://jsonplaceholder.typicode.com/todos/', {
                task: newTask
            }).then(taskResponse => {
                const newTasksArray = [ ...tasks ];
                newTasksArray.push(taskResponse.data.task);
                this.setState({
                    tasks: newTasksArray,
                    newTask: ''
                })
            }).catch(error => {
                console.log(error);
            })
        }
    }

    handleInputChange = (event) => {
        this.setState({
            newTask: event.target.value
        })
    }

    render() {
        const { newTask } = this.state;
        return (
            <div>
                <h1>ToDoList</h1>
                <input onChange={this.handleInputChange} value={newTask} />
                <button onClick={this.addATask}>Add a task</button>
                <ul>
                {
                    this.state.tasks.map(task =>
                        <Task key={task.id} id={task.id} name={task.name}/>
                    )
                }
                </ul>
            </div>
        )
    }
}

export default ToDoList;