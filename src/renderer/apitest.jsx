import React, { Component } from 'react';
import axios from 'axios';
let url_list='http://192.168.10.179/oneFM.php';
let url_episode='http://192.168.10.179/episode.php';

const config={
  headers:{
    'Accept':'application/json',
    'Accept-Encoding':'gzip'
  }
};

export default class apitest extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      program_id:'',
      title:'',
      image:''
    }
    this.handleClick =this.handleClick.bind(this);
  }

  handleClick() {
    axios.get(url_list,config)
      .then(response => this.setState({username: response.data.data[0].channel_code.label, program_Id:response.data.data[0].program_Id}));

    url_episode += ("&program_id="+this.state.program_id);

    axios.get(url_episode)
      .then(response => this.setState({title:response.data.data.title, image:response.data.data.image_w}));
  }

  render() {
    return (
        <div className='button__container'>
          <button className='button' onClick={this.handleClick}>Click Me</button>
          <p>{this.state.username}</p>
          <p>{this.state.title}</p>
          <img src=this.state.image_w />
        </div>
    );
  }
}
