import React, {FC} from 'react';

import Sidebar from "./components/sidebar/Sidebar";
import Tasks from "./components/tasks/Tasks";

const App:FC = () => {
  return (
      <div className={'todo'}>
        <Sidebar/>
        <Tasks/>
      </div>
  );
}

export default App;
