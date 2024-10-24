import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import SerieBLogo from '../assets/serie_b_logo.png';
import SerieALogo from '../assets/serie_a_logo.png';
import CopaSC from '../assets/copa_sc_logo.png';
import CapixabaB from '../assets/capixaba_serie_b_logo.png';
import CopaDoBrasil from '../assets/CopaDoBrasil.png';
import SerieCLogo from '../assets/Campeonato_Brasileiro_Série_C_logo.png';
import Libertadores from '../assets/Conmebol_Libertadores_logo.svg.png';
import SulAmericana from '../assets/Conmebol_Sudamericana_logo.png';
import Champions from '../assets/unnamed.png';
import LaLiga2 from '../assets/la-liga-2.png';
import LaLiga from '../assets/LaLiga_logo_2023.svg.png';

const ListContainer = styled.div`
  width: 100%;
  margin-top: 74px;
  max-width: 400px;
  padding: 24px;
  border-radius: 8px;
  background: #444242;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: 24px;
  color: #fff; 
`;

const MatchItem = styled.div`
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #555; 
  transition: background 0.3s;

  &:hover {
    background: #666; 
  }

    .status-indicator {
    display: inline-block;
    width: 10px; 
    height: 10px; 
    border-radius: 50%; 
    background-color: green; 
    margin-right: 5px; 
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DateSelector = styled.input`
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #444; 
  color: #fff; 
  font-size: 16px;

  &::webkit-calendar-picker-indicator {
    filter: invert(1); 
  }

  &:focus {
    outline: none;
    border-color: #ffd700;
  }
`;

const TournamentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 25px;
    height: 25px;
    object-fit: contain;
    margin: 0 10px 0 0;
  }

  p {
    margin: 0;
  }
`;

const MatchDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  text-align: center;

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
    margin: 0 10px;
  }

  .strong {
    display: flex;
  }
`;

const StatusText = styled.p`
  text-align: center;
  margin: 0;
  font-size: 12px;
`;

interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  roundInfo: {
    round: number;
    name: string;
  };
  status: string;
  tournament: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeTeamFull: string;
  awayTeamFull: string;
  formattedStartDate: string;
  currentMinute: number;
}

const TodayMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const returnLogo = (tournament: string) => {
    console.log('tournament', tournament)
    if (tournament === 'Brasileiro Serie B 2024') {
      return <img src={SerieBLogo} alt={tournament} title={tournament} />;
    }
    if (tournament === 'UEFA Champions League 24/25') {
      return <img src={Champions} alt={tournament} title={tournament} />;
    }
    if (tournament === 'LaLiga 2 24/25') {
      return <img src={LaLiga2} alt={tournament} title={tournament} />;
    }
    if (tournament === 'LaLiga 24/25') {
      return <img src={LaLiga} alt={tournament} title={tournament} />;
    }
    if (tournament === 'Copa Libertadores 2024') {
      return <img src={Libertadores} alt={tournament} title={tournament} />;
    }
    if (tournament === 'Copa do Brasil 2024') {
      return <img src={CopaDoBrasil} alt={tournament} title={tournament} />;
    }
    if (tournament === 'Brasileiro Serie A 2024') {
      return <img src={SerieALogo} alt={tournament} title={tournament} />;
    }
    if (tournament === 'Brasileiro Serie C 2024') {
      return <img src={SerieCLogo} alt={tournament} title={tournament} />;
    }
    if (tournament === 'Copa Santa Catarina 2024') {
      return <img src={CopaSC} alt={tournament} title={tournament} />;
    }
    if (tournament === 'Capixaba, Série B 2024') {
      return <img src={CapixabaB} alt={tournament} title={tournament} />;
    }
    if (tournament === 'Copa Sudamericana 2024') {
      return <img src={SulAmericana} alt={tournament} title={tournament} />;
    }
  };

  const returnStatus = (status: string, currentMinute: number) => {
    if (status === 'finished') {
      return 'Finalizado';
    }

    if (status === 'inprogress') {
      return (
        <span>
          <span className="status-indicator"></span>
          Em andamento: {currentMinute}:00
        </span>
      );
    }
  };

  const fetchMatches = async () => {
    try {
      if (
        selectedDate &&
        selectedDate.split('-').length === 3 &&
        selectedDate.split('-')[1].length === 2 &&
        selectedDate.split('-')[2].length === 2 &&
        selectedDate.split('-')[0].length === 4
      ) {
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/${selectedDate}`);
        setMatches([]);
      }
    } catch (err: unknown) {
      console.log('Erro:', err);
      setError('Erro ao buscar os jogos do dia selecionado');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [selectedDate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ListContainer>
      <DateSelector
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <MatchesContainer>
        {matches.length === 0 ? (
          <div>Nenhum jogo hoje</div>
        ) : (
          matches.map((match, index) => (
            <MatchItem key={index}>
              <TournamentTitle>
                {returnLogo(match?.tournament)}
                <p>Rodada: {match.roundInfo.name || match.roundInfo.round}</p>
              </TournamentTitle>
              <MatchDetails>
                <strong title={match.homeTeamFull.replace('Recife', '')}>
                  <img src={match?.homeTeamLogo} /><div>{match.homeTeam.replace('Recife', '')}{' '}</div>
                </strong>
                <div>{match.homeScore} - {match.awayScore}{' '}</div>
                <strong title={match.awayTeamFull.replace('Recife', '')}>
                  <img src={match?.awayTeamLogo} /> <div>{match.awayTeam.replace('Recife', '')}</div>
                </strong>
              </MatchDetails>
              <StatusText>{returnStatus(match?.status, match?.currentMinute)}</StatusText>
            </MatchItem>
          ))
        )}
      </MatchesContainer>
    </ListContainer>
  );
};

export default TodayMatches;
