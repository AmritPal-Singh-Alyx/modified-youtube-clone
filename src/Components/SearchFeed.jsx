import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Videos from './Videos';
import { fetchFromAPI } from '../utils/fetchFromAPI';




const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const  { searchTerm }  =useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        setVideos(data.items);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, [searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (

    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2, ml:'100px' }}>

      <Typography variant='h4' fontWeight="bold" mb={2} sx={{ color: 'white' }}>
        Search Videos For: <span style={{ color: '#fc1503' }}>{searchTerm}</span>Videos
      </Typography>
      <Videos videos={videos} />

    </Box>
  )
}

export default SearchFeed