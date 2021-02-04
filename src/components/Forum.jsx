import React from 'react';


export class Forum extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading : true,
          foruminfo : []
        }

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    
    async componentDidMount() {
        const url = 'http://localhost:1515/viewcomments';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({loading: false, foruminfo: data})
        console.log(this.state.foruminfo);
    }

    handleCommentSubmit(event){
      console.log(event.target);
        // var postRequest = new XMLHttpRequest();

        // postRequest.open("POST", "http://localhost:1515/addcomment");
        
        // postRequest.send(JSON.stringify({user: event.target.userinput.value, comment: event.target.value.commentinput}))
    }

    render(){
        return (<div id="forum">
            <h1>Forum</h1>
           { this.state.loading ? <h2>Loading...</h2>: this.state.foruminfo.map((item) => <li key={item._id}>{item.user}&nbsp;{item.comment}</li>)}
            
            <form onSubmit={this.handleCommentSubmit}>
              <input type="text" name="userinput" id="userinput"/>
              <input type="text" name="commentinput" id="commentinput"/>
              <button type="submit">submit</button>
            </form>

        </div>);
    }
}