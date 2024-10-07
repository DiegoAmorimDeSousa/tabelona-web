import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TableContainer = styled.table`
  border: solid gray 1px;
  border-collapse: collapse;
`;

const THead = styled.thead`
  color: white;
  background: gray;

  .pos-thead {
    border-radius: 10px 0 0 0;
    padding: 10px 15px;
  }

  .p-thead {
    padding: 10px 15px;
    display: flex;
    justify-content: center;
  }

  .times-thead {
    text-align: start;
    min-width: 300px;
  }

  .thead-m {
    padding: 10px 15px;
    justify-content: center;
  }
`;

const TBody = styled.tbody`
  .pos-tbody {
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    background: red;
    border-radius: 50px;
    margin: 10px;
    font-size: 11px;
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
`;

interface Team {
  id: number;
  name: string;
  points: number;
  wins: number;
  draws: number;
  defeat: number;
}

const Table: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tournament/seria-a');
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

  console.log('teams', teams)

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
        </tr>
      </THead>
      <TBody>
        {loading ? <div>Loading...</div> : teams?.map((team, index) => (
          <tr key={team.id}>
            <td className="border border-gray-300 px-4 py-2 pos-tbody">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2">{team.name}</td>
            <td className="border border-gray-300 px-4 py-2 p-tbody">{team.points}</td>
            <td className="border border-gray-300 px-4 py-2 thead-m">{team.wins}</td>
            <td className="border border-gray-300 px-4 py-2 thead-m">{team.draws}</td>
            <td className="border border-gray-300 px-4 py-2 thead-m">{team.defeat}</td>
          </tr>
        ))}
      </TBody>
    </TableContainer>
  );
};

export default Table;
