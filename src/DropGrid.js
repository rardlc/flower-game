import { useEffect, useState } from "react"
import { INIT } from "./data"
import "./scripts/DragDropTouch"

import { nanoid } from "nanoid"


const print = (arg) => console.log(arg)

//changes using setData will trigger a progress calculation
export default function DropGrid({grid, setGrid, progress, setProgress}) {

    const [dragSrc, setDrgSrc] = useState()

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev, x,y) {
        ev.dataTransfer.setData("text", x + " " + y)
    }

    function drop(ev, x, y) {
        ev.stopPropagation();
        ev.preventDefault();

        let srcI = ev.dataTransfer.getData("text").split(" ")

        //if this is an internal drag
        if(srcI[1]){

            if(grid[srcI[0]][srcI[1]].obj === null && grid[x][y].obj === null){
                return
            }
            //exchange objs between dragging and drop target
            const targetObj = grid[x][y].obj

            grid[x][y].obj = grid[srcI[0]][srcI[1]].obj
            console.log(targetObj)
            grid[ srcI[0] ][ srcI[1] ].obj = targetObj

        } 

        //if this is an external drag, dragI will be 1 element
        else {
            var objIndex = ev.dataTransfer.getData("text");

            if(grid[x][y].obj){
                const currentProps = grid[x][y].obj.props
                grid[x][y].obj = INIT.flowers[objIndex]
                progress.addFlowerProp(currentProps,grid[x][y].obj.props)
                

            } else {
                grid[x][y].obj = INIT.flowers[objIndex]
                progress.addFlowerProp([],grid[x][y].obj.props)

            }
            setProgress(progress)

        }
        //call Game.js to store in state
        setGrid([...grid])

        //cleanup
        ev.dataTransfer.setData("text", "");

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
                                                const cell = <div draggable id={rowI + " " + colI} key={cellId} style={{
                                                }} className="gridCell" onDragStart={(ev) => drag(ev,rowI,colI)} onDrop={(ev) => drop(ev,rowI,colI)} onDragOver={allowDrop}>
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