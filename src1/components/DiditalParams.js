import React from 'react'

class DigitalParams extends React.Component {
  constructor(){
    super();
  }

  render() {
    console.log(this.props);
    window.location.reload();
    return (
       <div>
         Digital Params
         Id{this.props.match.params.id}
         Name{this.props.match.params.name}
       </div>
    );
  }
}

export default DigitalParams;