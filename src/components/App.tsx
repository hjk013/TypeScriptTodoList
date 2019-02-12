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
      tasks: [...this.state.tasks, this.state.currentTask]
    });
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: string, index: number) => {
      return <div key={index}>{task}</div>;
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
}

//replaced any with IProps
// interface IProps {
//   name: string;
// }

interface IState {
  currentTask: string;
  tasks: Array<string>;
}
