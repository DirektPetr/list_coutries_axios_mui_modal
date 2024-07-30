import { AppBar, Box, Button, CardMedia, Modal, Toolbar } from '@mui/material';
import { Country } from './Country';
import style from './ListCountries.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cancel } from '@mui/icons-material';

const ListCountries = () => {
  const [dataCountries, setDataCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((data) => {
        setDataCountries(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country); 
  };

  const handleCloseModal = () => {
    setSelectedCountry(null); 
  };

  if (isLoading)
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: ' center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Loading...
      </h1>
    );

  if (!dataCountries) return <h1>No country found</h1>;

  return (
    <>
      <AppBar position="static" sx={{ borderRadius: 1, marginTop: '1rem' }}>
        <Toolbar>
          <h1>Список стран:</h1>
        </Toolbar>
      </AppBar>
      <div className={style.list}>
        <ul className={style.ul}>
          {dataCountries.map((country) => (
            <li key={country.name.common}>
              <div onClick={() => handleCountryClick(country)}>
                <Country {...country} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedCountry && (
        <Modal
          open={!!selectedCountry}
          onClose={handleCloseModal}
          sx={{
            p: 5,
            color: '#fff',
            position: 'absolute',
            top: '30%',
            left: '30%',
            transform: 'translate(-20%, -20%)',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{ color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2>{selectedCountry.name.common}</h2>
            <h3>Capital: {selectedCountry.capital}</h3>
            <h3>Region: {selectedCountry.region}</h3>
            <CardMedia
              sx={{ pt: 2, pb: 2, width: 250 }}
              component="img"
              image={selectedCountry.flags.png}
              alt={selectedCountry.name.common}
              title={selectedCountry.name.common}
            />

            <Button onClick={handleCloseModal} style={{color: '#fff', marginTop: '30px'}}>
              <Cancel sx={{ pr: 2}} /> Close
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ListCountries;
