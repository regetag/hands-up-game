import { Container } from "./styles"


export function PoliceButton({ onClick, children }) {

  return (
    <Container 
      onClick={ onClick }
    >
      {children}
    </Container>
  )
}