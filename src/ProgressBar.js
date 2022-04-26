import { useEffect, useState } from "react"

export default function ProgressBar({progress}) {

    const [_progress, setProgress] = useState()
    const [assignedCol, setAssignedCol] = useState({})
    const [availCol, setAvailCol] = useState(["red","blue","green","orange"])

    useEffect(
        () => {
            console.log(progress)
            let res = []
            for (const key in progress) {
                if (Object.hasOwnProperty.call(progress, key)) {
                    let color;

                    if(assignedCol[key]){
                        color = assignedCol[key]
                    } else {
                        color = availCol.pop()
                        assignedCol[key] = color
                        setAvailCol(availCol)
                        setAssignedCol(assignedCol)
                    }
                    // availColors[ Math.round(Math.random() * availColors.length)] 
                    res.push(
                        <div style={{width:(progress[key] * 100) + "%", height: "50px" , backgroundColor: color }}>{key}</div>
                    )                    
                }
            }
            console.log(assignedCol)

            // progress.forEach(
            //     (key, value) => {
            //         let availColors = ["blue","green","red"]
            //         res.push(
            //             <span style={{width:value, color: availColors[Math.random() * availColors.length]}}></span>
            //         )
            //     }
            // )
            // console.log(res)
            setProgress(res)
        }
    ,[progress])


    return(
        <div className="cntRow progressBar">
            {
                _progress
            }
        </div>
    )   
}