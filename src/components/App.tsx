import * as React from "react";

export class App extends React.Component<IProps, {}> {
  //first any represents any prop which we use interface IProps for, second any represents state, no state so empty object
  render() {
    return <h1>Hello {this.props.name} from App.tsx </h1>;
  }
}

//replaced any with IProps
interface IProps {
  name: string;
}
