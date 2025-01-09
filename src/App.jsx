import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { Box, Select, MenuItem, FormControl, InputLabel, Typography, Card, CardContent } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Reactmemo from './components/ReactMemo';
import Usememo from './components/UseMemo';

function App() {
  const [comments, setComments] = useState([]);
  const [pageCount, setPageCount] = useState(84);
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState(6);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 6;

    setCurrentPage(Number(page));
    setSelect(Number(limit));

    axios
      .get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [searchParams]);

  function handleChange(event, page) {
    setCurrentPage(page);
    setSearchParams({ page: page, limit: select });
  }

  function handleSelect(event) {
    const limit = event.target.value;
    setSelect(limit);
    setSearchParams({ page: currentPage, limit: limit });
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>
      <Box>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Card key={comment.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{comment.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {comment.id}
                </Typography>
                <Typography variant="body1">{comment.body}</Typography>
              </CardContent>
            </Card>
          ))}
      </Box>

      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="select-label">Per Page</InputLabel>
          <Select
            labelId="select-label"
            value={select}
            onChange={handleSelect}
            label="Per Page"
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          size="large"
          count={pageCount}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>



<h1>reactmemo</h1>
      <Reactmemo></Reactmemo>
<h1>usememo</h1>
<Usememo></Usememo>
    </Box>
  );
}

export default App;