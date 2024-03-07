import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/forecast', { state: { searchTerm } });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Welcome to the Weather Forecast App!
                </Typography>
                <TextField label='Enter Zip Code or Address' variant='outlined' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ mt: 2, mb: 2, width: '100%'}}/>
                <Button variant='contained' onClick={handleSearch}>
                    Search
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;