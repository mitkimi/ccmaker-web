import React from 'react';
import './header.less';

class HeaderComponent extends React.Component {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div className="header">
        <div className="page-width header-container">
          <div className="logo">Logo</div>
          <div className="nav">nav</div>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
