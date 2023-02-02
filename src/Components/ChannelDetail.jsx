import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Videos from './Videos';
import ChannelCard from './ChannelCard';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Height, Widgets } from '@mui/icons-material';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [cover, setCover] = useState("")
  const { id } = useParams();

  const banner = async () => {
    const request = await fetch(`https://youtube-v31.p.rapidapi.com/channels?part=snippet,statistics&id=${id}`, {
      headers: {
        'X-RapidAPI-Key': '52224dc150mshb326037db7578c1p15accejsn547ebc7f6f71',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    })
    const response = await request.json()
    response.items.forEach((item) => {
      setCover(item.brandingSettings.image.bannerExternalUrl)
    })
  }


  useEffect(() => {
    banner()
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setVideos(data?.items));
  }, [id]);

  return (
    <Box minHeight="95vh" >
      <Box>
        <div>
          <img src={cover} alt="cover-img" style={{ height: '300px', width: '100%' }} />
        </div>

        <ChannelCard channelDetail={channelDetail} marginTop='-93px' />
      </Box>
      <Box display='flex' p='2' >
        <Box sx={{ mr: { sm: '100px' } }}/>
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail