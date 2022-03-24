import { useEffect } from "react";
import "./scripts/DragDropTouch"

export default function Inventory({options}){

    useEffect( () => {

        //get all possible draggable items

    },[])

    function drag(ev,flowerI) {
        ev.dataTransfer.setData("text", ""+flowerI);
        // setDragging(options[flowerI])
    }

    return (
        <div >
            Inventory
            <div className="cntRow">
            {
                options ? options.map(
                    (flower, flowerI) => {
                        return (
                        <div key={flowerI} className="invCard" draggable onDragStart={(e) => drag(e,flowerI)}>
                            <p>{flower.name}</p>
                            <p>{flower.props}</p>
                        </div>
                        )
                    }
                ) :
                null
            }
            </div>

        </div>
    )
}