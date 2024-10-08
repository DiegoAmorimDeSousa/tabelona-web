import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TableContainer = styled.table`
  width: 100%;
  border: 1px solid gray;
  border-radius: 10px; 
  border-collapse: collapse;
  overflow: hidden; 
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
}

const Table: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tournament/seria-a`);
        console.log('response', response)
        if(response?.data){
          setTeams(response.data?.[0]?.serieABrasil)
        }
      } catch (err) {
        console.log('err', err)
        setError('Erro ao buscar os times');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TableContainer className="min-w-full table-auto border-collapse border border-gray-400">
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
        {loading ? <div>Loading...</div> : teams?.map((team, index) => (
          <tr key={team.id}>
            <td 
              className="border border-gray-300 px-4 py-2 pos-tbody" 
              style={{
                background: index + 1 === 1 
                  ? '#2E8B57' 
                  : index + 1 < 7 
                    ? '#4169E1' 
                    : index + 1 < 13 
                      ? '#DAA520' 
                      : index + 1 > 34 
                        ? '#A52A2A' 
                        : 'transparent' // ou qualquer outra cor padrão que você deseje
              }}
            >
              {index + 1}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className='logo-name'>
                <img src={team.logo} />
                <div>{team.name}</div>
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
  );
};

export default Table;
