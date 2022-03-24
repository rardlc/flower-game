import logo from './logo.svg';
import { useEffect, useState } from 'react';

import './Game.css';

import {INIT, Progress} from "./data.js"

import ProgressBar from "./ProgressBar"
import DropGrid from './DropGrid';
import Inventory from './Inventory';
import { nanoid } from 'nanoid';

export default function Game() {

  const [level, setLevel] = useState(INIT.levels[0])

  //represent the grid markup and contains collisionless ids
  const [grid, setGrid] = useState()

  //acess by markup id values in grid
  // const [gridHash, setGridHash] = useState()

  const [progress, setProgress] = useState(INIT.progress)

  useEffect(() => {
    const id = nanoid(8)
    setGrid([
      [{id: id, obj:null}]
    ])

  },[])

  //whenever the grid changes...score the grid and add to Progress
  // useEffect(() => {
  //   // var currentProgress = {}
  //   // currentGrid.forEach(row => {
  //   //   row.forEach(col => {
  //   //     if(col){
  //   //       col.props.forEach((flowerProp) => {
  //   //         currentProgress[flowerProp] ? 
  //   //           currentProgress[flowerProp] = currentProgress[flowerProp] + 1 : 
  //   //           currentProgress[flowerProp] = 1
  //   //       })
  //   //     }
  //   //   })
  //   // });
  //   // progress.current = currentProgress
  //   // setProgress(progress)

  // },[currentGrid])

  // useEffect( () => {
  //   console.log(currentGrid)
  // },[currentGrid])

  function gridChanged(newGrid) {
    console.log(grid)
    //update progress bar based on the new grid
    

    setGrid(newGrid)
  }

  return (
    <div className="App">
      <header className="App-header">
        <ProgressBar progress={progress}></ProgressBar>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <p>Drag the image into the rectangle:</p>
        <DropGrid grid={grid} setGrid={gridChanged} progress={progress}></DropGrid>
        <Inventory options={INIT.flowers}></Inventory>
        <br></br>
        {/* <img style={{accentColor: 'blue'}} id="drag1" src="" draggable="true" onDragStart={drag} width="336" height="69" /> */}

      </header>
    </div>
  );
}

