import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SerieBLogo from '../assets/serie_b_logo.png';
import SerieALogo from '../assets/serie_a_logo.png';
import CopaSC from '../assets/copa_sc_logo.png';
import CapixabaB from '../assets/capixaba_serie_b_logo.png';

const ListContainer = styled.div`
  width: 100%;
  margin-top: 74px;
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
    margin: 0 10px;
  }

  .title-tournament {
    display: flex;
    align-items: center;
  }

  .first {
    justify-content: space-between;
  }

  .match {
    text-align: center;
    font-size: 15px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  strong {
    display: flex;
    align-items: center;
    margin: 0 8px;
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

    if(tournament === 'Brasileiro Serie A 2024') {
      return <img src={SerieALogo} alt={tournament} title={tournament}/>
    }

    if(tournament === 'Copa Santa Catarina 2024') {
      return <img src={CopaSC} alt={tournament} title={tournament}/>
    }

    if(tournament === 'Capixaba, Série B 2024') {
      return <img src={CapixabaB} alt={tournament} title={tournament}/>
    }
  }

  const returnStatus = (status: string, currentMinute: number) => {
    if(status === 'finished') {
      return 'Finalizado'
    }

    if(status === 'inprogress') {
      return 'Em andamento: ' + currentMinute + ':00'
    }
  }

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const currentDate = getCurrentDate();
        const response = await axios.get(`https://tabelona-api.onrender.com/events/${currentDate}`);
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
            <div className='title-tournament first'>
              <div className='title-tournament'>
                {returnLogo(match?.tournament)}
                <p>Rodada: {match.roundInfo.round}</p>
              </div>
              <div>
                {match?.formattedStartDate?.split(',')?.[1]?.split(':')[0] + ':' + match?.formattedStartDate?.split(',')?.[1]?.split(':')[1]}
              </div>
            </div>
            <div className='match'>
              <strong title={match.homeTeamFull.replace('Recife', '')}>
                <img src={match?.homeTeamLogo} />{match.homeTeam.replace('Recife', '')}{' '}
              </strong> 
                {match.homeScore} - {match.awayScore}{' '}
              <strong title={match.awayTeamFull.replace('Recife', '')}>
                {match.awayTeam.replace('Recife', '')} <img src={match?.awayTeamLogo} />
              </strong>
            </div>
            <p className='status'>{returnStatus(match?.status, match?.currentMinute)}</p>
          </MatchItem>
        ))
      )}
    </ListContainer>
  );
};

export default TodayMatches;
