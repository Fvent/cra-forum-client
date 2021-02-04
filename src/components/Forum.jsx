import React from 'react';


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
    }
    
    async componentDidMount() {
        const url = 'http://localhost:1515/viewcomments';
        const response = await fetch(url);
        const data = await response.json();
       
          this.setState({loading: false, foruminfo: data})
          console.log(this.state.foruminfo);
        
    }

    handleCommentSubmit(event){
      event.preventDefault();
      console.log(this.state.formUserInput);
      console.log(this.state.formCommentInput);
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
            <h1>Forum</h1>
           { this.state.loading ? <h2>Loading...</h2>: this.state.foruminfo.map((item) => <li key={item._id}>{item.user}&nbsp;{item.comment}</li>)}
            
            <form id="forum-form" onSubmit={this.handleCommentSubmit}>
              <input type="text" name="formUserInput" id="userinput" onChange={this.handleInputChange} />
              <input type="text" name="formCommentInput" id="commentinput" onChange={this.handleInputChange} />
              <button type="submit">submit</button>
            </form>

        </div>);
    }
}