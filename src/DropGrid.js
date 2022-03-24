import { useEffect, useState } from "react"
import { INIT } from "./data"
import "./scripts/DragDropTouch"

import { nanoid } from "nanoid"


const print = (arg) => console.log(arg)

//changes using setData will trigger a progress calculation
export default function DropGrid({grid, setGrid }) {

    const [dragSrc, setDrgSrc] = useState()

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(x,y) {
        setDrgSrc( {"x":x,"y":y} )
    }

    function drop(ev, x, y) {
        ev.preventDefault();

        //if this is an internal drag
        if(dragSrc){

            if(grid[dragSrc.x][dragSrc.y].obj === null && grid[x][y].obj === null){
                return
            }
            //exchange objs between dragging and drop target
            const targetObj = grid[x][y].obj

            grid[x][y].obj = grid[dragSrc.x][dragSrc.y].obj
            grid[dragSrc.x][dragSrc.y].obj = targetObj
        } 
        //if this is an external drag, dragSrc will be null
        else {
            var objIndex = ev.dataTransfer.getData("text");
            grid[x][y].obj = INIT.flowers[objIndex]

        }
        //call Game.js to store in state
        setGrid([...grid])

        //cleanup
        setDrgSrc(null)
    }

    return (
        <div className="cnt">
            {grid ?
                <>
                    <div className="cntRow" style={{alignItems: "center"}}>
                        <div className="grid">
                            {
                                grid ? grid.map((row, rowI) => {

                                    return <div key={"gridRow" + rowI} className="cntRow">
                                        {row.map(
                                            (col,colI) => {
                                                const cellId = col.id
                                                const cell = <div draggable id={cellId} key={cellId} style={{
                                                }} className="gridCell" onDragStart={() => drag(rowI,colI)} onDrop={(ev) => drop(ev,rowI,colI)} onDragOver={allowDrop}>
                                                    {col.obj ? col.obj.name : null}
                                                    {/* <p>{cellId}</p> */}

                                                </div>
                                                return cell
                                            }
                                        )}
                                    </div>
                                }) : "ERROR: No data or improperly formatted passed to DropGrid"
                            }
                        </div>

                        <button style={{ width: "20px", height: "50px" }} onClick={() => {
                            //one more columns requires all arrays in the grid have an additional obj
                            grid.forEach(row => {
                                row.push({id: nanoid(8), obj: null})
                            });
                            setGrid([...grid])
                        }}>+</button>
                    </div>
                    <button style={{ width: "50px", height: "20px" }} className="addBtn" onClick={() => {
                        //resize to have one more array (one more row)
                        var a = []
                        for (let index = 0; index < grid[0].length; index++) {
                            a.push({id: nanoid(8), obj: null})
                        }
                        grid.push(a)
                        setGrid([...grid])
                    }}>+</button>
                </>
                : null}
        </div>
    )
}