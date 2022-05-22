import styled from "styled-components"
import { themes, copSirenShadow } from "../../../themes/themes"
// import { themes } from '../../themes/themes'

export const Container = styled.section`
  position: relative;
  
  width: fit-content;
  
  padding: 20px 35px;
  margin: 20vh auto 100px;
  
  border-radius: 5px;
  
  background-color: ${themes.color.background.main[80]};
  
  animation: ${copSirenShadow} 2s infinite;

  h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }

  .NewRoomModal--input-section {
    display: flex;
    flex-direction: column;

    gap: 20px;
    margin-bottom: 20px;
  }
`
