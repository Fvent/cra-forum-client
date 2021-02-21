import React from 'react';
import { Form } from 'react-bootstrap';


export class Forum extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading : true,
          foruminfo : [],
          formUserInput: '',
          formCommentInput: ''
        }

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getForumInfo = this.getForumInfo.bind(this);
    }
    
    async componentDidMount() {
        this.getForumInfo();
    }

    async getForumInfo(){ 
        const url = 'http://localhost:1515/viewcomments';
        const response = await fetch(url);
        const data = await response.json();
      
          this.setState({loading: false, foruminfo: data})
          console.log(this.state.foruminfo);
    }

    handleCommentSubmit(event){
      event.preventDefault();
      // console.log(this.state.formUserInput);
      // console.log(this.state.formCommentInput);

      var payload = {'user': this.state.formUserInput, 'comment': this.state.formCommentInput};
        console.log(payload);
        var http = new XMLHttpRequest();
        var url = 'http://localhost:1515/addcomment';
        http.open("POST", url);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(payload));
        http.onreadystatechange = () => {
            this.getForumInfo();
        }

      document.getElementById('forum-form').reset();
    }

    handleInputChange(event){
        var nam = event.target.name;
        var val = event.target.value;
        console.log(nam ,'--',val);
        this.setState({
          [nam]: val
        });
    }

    render(){
        return (<div id="forum">

          <div id="forum-display">
          <h1>Forum</h1>
           { this.state.loading ? 
           <h2>Loading...</h2> : 
           this.state.foruminfo.map((item) => <li key={item._id}>{item.user}&nbsp;{item.comment}</li>)}
          </div>
            

            <form id="forum-form" className="form-group" onSubmit={this.handleCommentSubmit}>
              <input type="text"  className="form-control" name="formUserInput" id="userinput" onChange={this.handleInputChange} />
              <textarea type="text" className="form-control" name="formCommentInput" id="commentinput" onChange={this.handleInputChange} />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>);
    }
}