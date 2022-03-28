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

  //represent the grid markup
  const [grid, setGrid, gridSig] = useCoolerState()
  
  const [progress, setProgress, progressSignature] = useCoolerState(INIT.progress)


  useEffect(() => {
    setGrid([
      [{id: nanoid(8), obj:null}]
    ])

  },[])


  useEffect(() => {
    //whenever progress changes, 
    console.log(progress.now)

  },[progressSignature])





  return (
    <div className="App">
      <header className="App-header">
        <ProgressBar progress={progress}></ProgressBar>

        <p>Drag the image into the rectangle:</p>
        <DropGrid grid={grid} setGrid={setGrid} progress={progress} setProgress={setProgress} ></DropGrid>
        <Inventory options={INIT.flowers}></Inventory>
        <br></br>
        {/* <img style={{accentColor: 'blue'}} id="drag1" src="" draggable="true" onDragStart={drag} width="336" height="69" /> */}

      </header>
    </div>
  );
}

