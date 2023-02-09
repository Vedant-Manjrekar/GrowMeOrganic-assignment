import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';

function SecondPage() {
  const [data, setData] = useState<[]>();
  const location = useLocation();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('data')!));

    fetch('http://universities.hipolabs.com/search?country=United+States', {
      mode: 'cors',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });

    // cleanup function
    return () => new AbortController().abort();
  }, [location]);

  // Interface to model data for rows.
  interface UserData {
    id: number;
    name: String;
    alpha_two_code: String;
    web_pages: String;
    domains: String;
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'University name',
      width: 300,
      editable: true,
      align: 'left',
    },
    {
      field: 'code',
      headerName: 'Alpha-2 code',
      width: 150,
      editable: true,
      align: 'left',
    },
    {
      field: 'web_pages',
      headerName: 'Website',
      width: 200,
      align: 'left',
    },
    {
      field: 'domains',
      headerName: 'Domain name',
      width: 200,
      editable: true,
    },
  ];

  // initialising empty array for storing rows.
  let rows: Object[] = [];

  // mapping the fetched data.
  data?.map((element: UserData, index) => {
    rows.push({
      id: index,
      name: element?.name,
      code: element?.alpha_two_code,
      domains: element?.domains[0],
      web_pages: element?.web_pages[0],
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
