import { useEffect } from 'react';



const useHello = (name:string) => {
       
    useEffect(()=> {
     console.log("Hook in action")
    }, [])
    return `hello ${name}`
}


export default useHello