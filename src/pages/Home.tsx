import React from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import TodayMatches from '../components/TodayMatches';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
`;


const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <Table />
        <TodayMatches />
      </Content>
    </Container>
  );
};

export default Home;
