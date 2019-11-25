import React from 'react';


class PageNotFound extends React.Component {

  componentDidMount() {
    console.log("this.props", this.props)
    this.props.onTryAutoSignup();
  }


render(){
  return (
 <div>
<em>The page you are looking is not there...</em>
 </div>
  );
}
}


export default PageNotFound;
