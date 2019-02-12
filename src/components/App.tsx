import * as React from "react";

export class App extends React.Component<{}, IState> {
  //first any represents any prop which we use interface IProps for, second any represents state, no state so empty object
  //but don't really need it for todo-list
  //<any, any> --> <IProps, {}> for example

  constructor(props: {}) {
    super(props);

    this.state = {
      currentTask: "",
      tasks: []
    };
  }

  //usually, if it deals with html, will be public
  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    //the void above is telling typescript what it should return
    e.preventDefault();
    this.setState({
      currentTask: "",
      tasks: [
        ...this.state.tasks,
        {
          id: this._timeInMilliseconds(),
          //underscore indicates private methods
          value: this.state.currentTask,
          completed: false
        }
      ]
    });
  }

  public deleteTask(id: number): void {
    const filteredTasks: Array<ITask> = this.state.tasks.filter(
      (task: ITask) => task.id !== id
    );
    this.setState({ tasks: filteredTasks });
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (
        <div key={task.id}>
          <span>{task.value}</span>
          <button onClick={() => this.deleteTask(task.id)}>Delete</button>
        </div>
      );
    });
  }
  public render(): JSX.Element {
    console.log("this.state: ", this.state);
    return (
      <div>
        <h1>React TypeScript Todo list</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Add a Task"
            value={this.state.currentTask}
            onChange={e => this.setState({ currentTask: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }
  //private methods go below public methods
  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
    //will turn current time into milliseconds
  }
}

//replaced any with IProps
// interface IProps {
//   name: string;
// }

interface IState {
  currentTask: string;
  tasks: Array<ITask>;
}

interface ITask {
  id: number;
  value: string;
  completed: boolean;
}
