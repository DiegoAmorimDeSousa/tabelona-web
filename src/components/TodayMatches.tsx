import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SerieBLogo from '../assets/serie_b_logo.png';

const ListContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border-radius: 8px;
  background: #444242;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: 24px;

  img {
    width: 35px;
    height: 35px;
    object-fit: contain;
    margin-right: 10px;
  }

  .title-tournament {
    display: flex;
    align-items: center;
  }

  .match {
    text-align: center;
    font-size: 20px;
    margin: 15px 0;
  }
  
  .status {
    font-size: 12px;
    text-align: center;
  }
`;

const MatchItem = styled.div`
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  roundInfo: {
    round: number;
  };
  status: string;
  tournament: string;
}

const TodayMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const returnLogo = (tournament: string) => {
    if(tournament === 'Brasileiro Serie B 2024') {
      return <img src={SerieBLogo} alt={tournament} title={tournament}/>
    }
  }

  const returnStatus = (status: string) => {
    if(status === 'finished') {
      return 'Finalizado'
    }
  }

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const currentDate = getCurrentDate();
        const response = await axios.get(`http://localhost:3000/events/${currentDate}`);
        setMatches(response.data); 
      } catch (err: unknown) {
        console.log('err', err)
        setError('Erro ao buscar os jogos de hoje');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ListContainer>
      {matches.length === 0 ? (
        <div>Nenhum jogo hoje</div>
      ) : (
        matches.map((match, index) => (
          <MatchItem key={index}>
            <div className='title-tournament'>
              {returnLogo(match?.tournament)}
              <p>Rodada: {match.roundInfo.round}</p>
            </div>
            <div className='match'><strong>{match.homeTeam}</strong> {match.homeScore} - {match.awayScore} <strong>{match.awayTeam}</strong></div>
            <p className='status'>{returnStatus(match?.status)}</p>
          </MatchItem>
        ))
      )}
    </ListContainer>
  );
};

export default TodayMatches;
