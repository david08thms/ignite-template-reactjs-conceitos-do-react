import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    //negando o valor, ele transforma em bool e diz se tem algo nele ou nao, pra ver se tem eu dou !!
    if (!newTaskTitle){
      return;
    }

    const newTask = {
      id:Math.random(),
      title: newTaskTitle,
      isComplete: false
    } 

    //aqui ele basicamente ta pegando a antiga lista, somando mais um, e setando a nova lista
    //isso é feito pra evitar alguns problemas, usando o conceito de callback
    setTasks(oldState => [...oldState,newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // A minha solucao, que funciona mas tira o elemento alterado da orgem de joga pro fim
    /* 
    const selectedTask = tasks.filter(task => task.id == id);
    const foundTask = selectedTask[0];
    foundTask.isComplete = !foundTask.isComplete;
    const filteredTasks = tasks.filter(task => task.id != id);
    filteredTasks.push(foundTask);
    setTasks(filteredTasks);
    */

    // Solucao do exercicio

    //cria uma lista onde, se o ID for o recebido, ele inverte o status, senao pega ela como ta
    const changedTasks = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task )

    setTasks(changedTasks);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const filteredTasks = tasks.filter(task => task.id != id);

    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}