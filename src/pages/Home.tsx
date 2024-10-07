import React from 'react'
import styled from 'styled-components'
import Table from '../components/Table'

const Container = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center; 
`

const Content = styled.div`
  padding: 24px; 
`

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <Table />
      </Content>
    </Container>
  )
}

export default Home
