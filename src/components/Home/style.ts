import styled from 'styled-components'

export const WalletBtn = styled.button`
 outline: none;
  border-radius: 8px;
  min-width: 120px;
  width: fit-content;
  border: 2px solid transparent;
  font-size: 14px;
  font-weight: 500;
  opacity: 1;
  text-transform: uppercase;
  cursor: pointer;
  padding: 11px;
  transition: all linear 0.3s;
  background: linear-gradient(97.6deg, #1FC3CE 5.43%, #6E3097 98.28%), #0078FA;
  color: #FFFFFF;
  transition: all linear 0.3s;
  :hover {
    opacity: 0.9;
    box-shadow: 1px 8px 5px rgba(39,71,78);
  }
  :active {
    transform: translateY(2px);
    transition: 0.1s;
    box-shadow: 1px 4px 5px rgba(39,71,78);
  }
`
export const Container = styled.div`
 display: flex;
 justify-content: center; /* center horizontally */
 align-items: center; /* center vertically */
 height: 100vh;
 flex-direction: column;
 gap: 10px;
`

export const TokenInfo = styled.div`

`

export const Span = styled.div`
color: blueviolet;
cursor: pointer;
`

export const InputContainer = styled.input`
padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
`

export const Nav = styled.div`
float: right;
padding: 40px;
`