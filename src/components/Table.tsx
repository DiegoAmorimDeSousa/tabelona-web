import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HiMinus, HiOutlineArrowLongDown, HiOutlineArrowLongUp  } from "react-icons/hi2";

const TableContainer = styled.table`
  width: 100%;
  border: 1px solid gray;
  border-radius: 10px; 
  border-collapse: collapse;
  overflow: hidden; 
`;

const SelectTournament = styled.div`
  display: flex;
  margin: 15px 0;
  div {
    margin-right: 15px;
    cursor: pointer;
    padding: 10px 0;
    width: 130px;
    transition: border-bottom 0.3s ease; 
  }
`;

const THead = styled.thead`
  color: white;
  background: #444242;

  .pos-thead {
    border-radius: 10px 0 0 0;
    padding: 10px 15px;
  }

  .p-thead {
    padding: 10px 15px;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .times-thead {
    text-align: start;
    min-width: 300px;
  }

  .thead-m {
    padding: 10px 15px;
    justify-content: center;
  }

  .last-thead {
    border-radius: 0 10px 0 0;
  }
`;

const TBody = styled.tbody`
  img {
    width: 25px;
    height: 25px;
    object-fit: contain;
    margin-right: 10px;
  }

  .logo-name {
    display: flex;
    align-items: center;
  }

  .team-name {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .show-position {
    display: flex;
    align-items: center;
  }

  .pos-tbody {
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    border-radius: 50px;
    margin: 10px;
    font-size: 11px;
    font-weight: bold;
  }

  .p-tbody {
    display: flex;
    justify-content: center;
    padding: 10px 15px;
  }

  .thead-m {
    padding: 10px 15px;
    justify-content: center;
  }

  tr {
    border-bottom: 1px solid gray !important;
  }
`;

interface Team {
  id: number;
  name: string;
  points: number;
  wins: number;
  draws: number;
  defeat: number;
  proGoals: number;
  onwGoals: number;
  logo: string;
  currentPosition: number;
  position: number;
}

const Table: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<string>('serieABrasil');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tournament`);
        if(response?.data){
          setTeams(response.data?.[0]?.[selectedTournament])
        }
      } catch (err) {
        console.log('err', err)
        setError('Erro ao buscar os times');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [selectedTournament]);

  const showChangesPosition = (currentPosition: number, lastPosition: number) => {
    if(currentPosition === lastPosition){
      return (
        <>
          <HiMinus />
        </>
      )
    }
    if(currentPosition > lastPosition){
      return (
        <div className='show-position'>
          <HiOutlineArrowLongDown color='red' />{currentPosition - lastPosition}
        </div>
      )
    }
    if(currentPosition < lastPosition){
      return (
        <div className='show-position'>
          <HiOutlineArrowLongUp color='green' />{lastPosition - currentPosition}
        </div>
      )
    }
    return;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <SelectTournament>
        <div 
          style={selectedTournament === 'serieABrasil' ? {borderBottom: '4px solid green'} : {}}
          onClick={() => setSelectedTournament('serieABrasil')}
        >
          Série A - Brasil
        </div>
        <div 
          style={selectedTournament === 'serieBBrasil' ? {borderBottom: '4px solid green'} : {}}
          onClick={() => setSelectedTournament('serieBBrasil')}
        >
          Série B - Brasil
        </div>
        <div 
          style={selectedTournament === 'serieAMundo' ? {borderBottom: '4px solid green'} : {}}
          onClick={() => setSelectedTournament('serieAMundo')}
        >
          Série A - Mundo
        </div>
      </SelectTournament>
      <TableContainer>
        <THead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 pos-thead">#</th>
            <th className="border border-gray-300 px-4 py-2 times-thead">Times</th>
            <th className="border border-gray-300 px-4 py-2 p-thead">P</th>
            <th className="border border-gray-300 px-4 py-2 thead-m">V</th>
            <th className="border border-gray-300 px-4 py-2 thead-m">E</th>
            <th className="border border-gray-300 px-4 py-2 thead-m">D</th>
            <th className="border border-gray-300 px-4 py-2 thead-m">GP</th>
            <th className="border border-gray-300 px-4 py-2 thead-m">GC</th>
            <th className="border border-gray-300 px-4 py-2 thead-m">J</th>
            <th className="border border-gray-300 px-4 py-2 thead-m last-thead">%</th>
          </tr>
        </THead>
        <TBody>
          {teams?.map((team, index) => (
            <tr key={team.id}>
              <td 
                className="border border-gray-300 px-4 py-2 pos-tbody" 
                style={{
                  background: index + 1 === 1 
                    ? '#2E8B57' 
                    : index + 1 < 7 
                      ? '#4169E1' 
                      : index + 1 < 13 && ['serieABrasil', 'serieAMundo']?.includes(selectedTournament)
                        ? '#DAA520' 
                        : index + 1 > 34 
                          ? '#A52A2A' 
                          : 'transparent'
                }}
              >
                {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className='logo-name'>
                  <img src={team.logo} alt={team.name} />
                  <div className='team-name'>{team.name}{' '} {showChangesPosition(index + 1, team?.currentPosition)}</div>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 p-tbody">{team.points}</td>
              <td className="border border-gray-300 px-4 py-2 thead-m">{team.wins}</td>
              <td className="border border-gray-300 px-4 py-2 thead-m">{team.draws}</td>
              <td className="border border-gray-300 px-4 py-2 thead-m">{team.defeat}</td>
              <td className="border border-gray-300 px-4 py-2 thead-m">{team.proGoals}</td>
              <td className="border border-gray-300 px-4 py-2 thead-m">{team.onwGoals}</td>
              <td className="border border-gray-300 px-4 py-2 thead-m">{team.wins + team.draws + team.defeat}</td>
              <td className="border border-gray-300 px-4 py-2 thead-m">
                {(() => {
                  const totalGames = team.wins + team.draws + team.defeat;
                  return totalGames > 0 ? `${((team.points / (totalGames * 3)) * 100).toFixed(2)}%` : '0%';
                })()}
              </td>
            </tr>
          ))}
        </TBody>
      </TableContainer>
    </div>
  );
};

export default Table;
