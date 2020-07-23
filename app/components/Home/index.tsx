import React from 'react'
import styled from 'styled-components'

type Props = {
}

export default function Home(props: Props) {
  return (
    <Container>
      <p>Hello</p>
    </Container>
  )
}

export const Container = styled.div`
  color: white;
  background-color: #322322;
  height: 100vh;
`
