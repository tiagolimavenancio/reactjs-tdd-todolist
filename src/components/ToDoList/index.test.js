import React from 'react';
import { shallow, mount } from 'enzyme';
import ToDoList from './index';
import axios from 'axios';

jest.mock('axios');

describe('ToDoList Component', () => {
    describe('when provided with an empty array of tasks', () => {
        it('contains an empty <ul> element', () => {
            const toDoList = shallow(<ToDoList tasks={[]} />);
            expect(toDoList).toContainReact(<ul />);
        });

        it('does not contain any <li> elements', () => {
            const toDoList = shallow(<ToDoList tasks={[]} />);
            expect(toDoList.find('li').length).toEqual(0);
        });
    });

    describe('when provided with an array of tasks', () => {
        it('contains a matching number of <li> elements', () => {
            const tasks = ['Wash the dishes', 'Make the bed'];
            const toDoList = shallow(<ToDoList tasks={tasks} />);
            expect(toDoList.find('li').length).toEqual(tasks.length);
        });

        it('passes them to the Task components', () => {
            const tasks = [
                {
                    id: 0,
                    name: 'Wash the dishes'
                },
                {
                    id: 1,
                    name: 'Make the bed'
                }
            ]
            
            const toDoListInstance = mount(<ToDoList tasks={tasks} />);
            toDoListInstance.find('Task').forEach(taskInstance => {
                const taskProps = taskInstance.props();
                const matchingTask = tasks.find(task => task.id === taskProps.id);
                const listItem = taskInstance.first('li');
                expect(listItem.text()).toBe(matchingTask.name);
            })
        });

        it('should render correctly', () => {
            const tasks = [
                {
                    id: 0,
                    name: 'Wash the dishes'
                },
                {
                    id: 1,
                    name: 'Make the bed'
                }
            ];

            const toDoListInstance = shallow(<ToDoList tasks={tasks} />);
            expect(toDoListInstance).toMatchSnapshot();
        });
    });

    describe('when rendered', () => {
        it('should axios a list of tasks', () => {
            const getSpy = jest.spyOn(axios, 'get');
            const toDoListInstance = shallow(<ToDoList />);
            expect(getSpy).toBeCalled();
        });

        it('should fetch a list of tasks', () => {
            const fetchSpy = jest.spyOn(window, 'fetch');
            const toDoListInstance = shallow(<ToDoList />);
            expect(fetchSpy).toBeCalled();
        });
    });

    describe('when the value of its input is changed', () => {
        it('its state should be changed', () => {
            const toDoListInstance = shallow(<ToDoList />);
            const newTask = 'new task name';
            const taskInput = toDoListInstance.find('input')
            taskInput.simulate('change', { target: { value: newTask }});

            expect(toDoListInstance.state().newTask).toEqual(newTask);
        });
    });

    describe('when the button is clicked with the input filled out', () => {
        it('a post request should be made', () => {
            const toDoListInstance = shallow(<ToDoList />);
            const postsSpy = jest.spyOn(axios, 'post');
            const newTask = 'new task name';

            const taskInput = toDoListInstance.find('input');
            taskInput.simulate('change', { target: { value: newTask }});

            const button = toDoListInstance.find('button');
            button.simulate('click');

            expect(postsSpy).toBeCalled();
        })
    });

    describe('when the button is clicked with the input filled out, the new task should be added to the state', () => {
        it('a post request should be made', () => {
            const toDoListInstance = shallow(<ToDoList/>);
            const postSpy = jest.spyOn(axios, 'post');
            const newTask = 'new task name';
            
            const taskInput = toDoListInstance.find('input');
            taskInput.simulate('change', { target: { value: newTask }});
            
            const button = toDoListInstance.find('button');
            button.simulate('click');
            
            const postPromise = postSpy.mock.results.pop().value;

            return postPromise.then((postResponse) => {
                const currentState = toDoListInstance.state();
                expect(currentState.tasks.includes((postResponse.data.task))).toBe(true)
            })
        })
    })
})