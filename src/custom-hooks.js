import { useState, useCallback } from 'react'
import { nanoid } from 'nanoid'

export function useCoolerState(initialValue) {
    const [value, setValue] = useState(initialValue)
    const [signature, setSignature] = useState(nanoid())

    const theCoolerSetValue = useCallback(
        (newValue) => {
            setValue(newValue)
            setSignature(nanoid())
        },
        [signature]
    )

    return [
        value,
        theCoolerSetValue,
        signature
    ]
}