import * as React from 'react';
import Game from './app/components/Game'


class App extends React.Component {
  public render() {
    return (
        <Game numRows={20} numCols={20} speed={100}/>
    );
  }
}

export default App;
