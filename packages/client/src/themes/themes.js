import { keyframes } from "styled-components"

export const copSirenShadow = keyframes`
  0%{
    /* background-color: blue; */
    box-shadow: 0px 0px 30px 15px blue;
  }
  50%{
    /* background-color: red; */
    box-shadow: 0px 0px 30px 15px red;
  }
  100%{
    /* background-color: blue; */
    box-shadow: 0px 0px 30px 15px blue;
  }
`

export const themes = {
  color:{
    background: {
      modal: "#000000ab",
      
      main: {
        "110": "#2e2e2e",
        "105": "#303030",
        "100": "#333",
        "90": "#474747",
        "80": "#5c5c5c",
      }
    },

    button_green: "#51b43a",
    button_green_hover: "#349e1b"
  }
}