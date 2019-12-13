import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import Main from './main';
import { Layout, Content } from 'react-mdl';
class SelectedBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stores: [] };

    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios
      .get(
        `https://mctsuite.it.nttdata-emea.com/preview/tag_ntt_project_work/stores.json`
      )
      .then(res => {
        const stores = res.data;
        console.log(stores.storeName);
        this.setState({
          stores
        });
      });
  }
  //   handleChange(event) {
  //     this.setState({ value: event.target.value });
  //   }




  render() {
    const { stores } = this.state;
    const options = stores.map(store => (
      <option key={store.storeCode} value={store.storeCode}>{store.storeName}</option>
    ))
    return (

      <div className="App">


        <select >
          {options}
        </select>

        <div
          className="button "

        >
          <span><Link to="/app">Continue</Link></span>
        </div>




      </div>
    )

  }

} export default SelectedBox;