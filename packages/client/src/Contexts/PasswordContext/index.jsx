import { createContext, useState } from "react"

export const PasswordContext = createContext()

export function PasswordProvider({children}){
  const [ contextPassword, setContextPassword ] = useState("")

  return(
    <PasswordContext.Provider value={{setContextPassword, contextPassword}}>
      {children}
    </PasswordContext.Provider>
  )
}