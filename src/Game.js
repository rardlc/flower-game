import logo from './logo.svg';
import { useEffect, useState } from 'react';

import './Game.css';

import {INIT, Progress} from "./data.js"

import ProgressBar from "./ProgressBar"
import DropGrid from './DropGrid';
import Inventory from './Inventory';
import { nanoid } from 'nanoid';
import { useCoolerState } from './custom-hooks';


export default function Game() {

  const [level, setLevel] = useState(INIT.levels[0])

  //represent the grid markup and contains collisionless ids
  const [grid, setGrid] = useState()

  //acess by markup id values in grid
  // const [gridHash, setGridHash] = useState()

  const [progress, setProgress, progressSignature] = useCoolerState(INIT.progress)

  // 

  useEffect(() => {

    // console.log(progress.now)

  },[progressSignature])

  useEffect(() => {
    setGrid([
      [{id: nanoid(8), obj:null}]
    ])

  },[])

  function deleteDrop(ev){
    ev.preventDefault()

    let dataIndex = ev.dataTransfer.getData("text").split(" ")
    if(dataIndex[1]){
      grid[dataIndex[0]][dataIndex[1]].obj = null
      setGrid([...grid])
    }
  }

  
  return (
    <div className="App" onDragOver={(ev) => ev.preventDefault()} onDrop={deleteDrop}>
      <header className="App-header">
        <ProgressBar progress={progress.now}></ProgressBar>

        <p>Drag the flower into the rectangle:</p>
        <DropGrid grid={grid} setGrid={setGrid} progress={progress} setProgress={setProgress}></DropGrid>
        <Inventory options={INIT.flowers}></Inventory>

      </header>
    </div>
  );
}

