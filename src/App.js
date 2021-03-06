import React from 'react';
import { Cards, Charts, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import ReactGA from 'react-ga';

import coronaImage from './images/image.png';

class App extends React.Component {

  state = {
    data: {},
    country: ''
  }

  initializeReactGA() {
    ReactGA.initialize('UA-167987202-1');
    ReactGA.pageview('/');
    ReactGA.event({
      category: 'User',
      action: 'Create an Account'
    });
  }


  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });

  }

  render() {
    const { data, country } = this.state
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;
