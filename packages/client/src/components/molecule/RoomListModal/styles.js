import styled from "styled-components"
import { themes, copSirenShadow } from "../../../themes/themes"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
  & > div {
    animation: ${copSirenShadow} infinite 2s;
    border-radius: 5px;
    
    padding: 20px;
    background-color: ${themes.color.background.main[80]};
    
    ul {
      background-color: ${themes.color.background.main[110]};
      width: 300px;
      height: 200px;

      margin-bottom: 20px;
      padding: 5px 0;

      overflow-y: auto;

      li {
        background-color: ${themes.color.background.main[100]};
        transition: 100ms;
      }

      li:nth-of-type(odd) {
        background-color: ${themes.color.background.main[105]};
      }
      
      li:hover {
        background-color: ${themes.color.background.main[90]};
      }
    }

    & > button {
      display: block;

      margin: 0 auto;
    }
  }
`