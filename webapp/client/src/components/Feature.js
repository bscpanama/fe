import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
  render(){
    return <div>Feature test drive</div>;
  }
}

export default requireAuth(Feature);
