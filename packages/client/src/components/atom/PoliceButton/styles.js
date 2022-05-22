import styled from "styled-components"

export const Container = styled.button`
  display: block;
  margin: auto;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  padding: 3px 10px;
  cursor: pointer;
  border: 2px solid #d63737;
  background-color: #ff5959;
  transition: background-color .5s, border-color .5s;

  &:hover{
    border: 2px solid #3855c8;
    background-color: #4969ea;
    transition: background-color .5s, border-color .5s;
  }
`