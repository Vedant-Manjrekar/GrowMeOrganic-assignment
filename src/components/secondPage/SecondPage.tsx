import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';

function SecondPage() {
  const [data, setData] = useState<[]>();
  const location = useLocation();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('data')!));

    fetch('https://animechan.vercel.app/api/quotes/character?name=madara', {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      });

    // cleanup function
    return () => new AbortController().abort();
  }, [location]);

  // Interface to model data for rows.
  interface UserData {
    id: number;
    anime: String;
    character: String;
    quote: String;
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'character',
      headerName: 'Character',
      width: 150,
      editable: true,
      align: 'left',
    },
    {
      field: 'anime',
      headerName: 'Anime',
      width: 300,
      editable: true,
      align: 'left',
    },
    {
      field: 'quote',
      headerName: 'Quote',
      width: 800,
      align: 'left',
    },
  ];

  // initialising empty array for storing rows.
  let rows: Object[] = [];

  // mapping the fetched data.
  data?.map((element: UserData, index) => {
    rows.push({
      id: index,
      anime: element?.anime,
      character: element?.character,
      quote: element?.quote,
    });
  });

  return (
    <>
      <Box sx={{ height: 400, width: '90vw' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}

export default SecondPage;
