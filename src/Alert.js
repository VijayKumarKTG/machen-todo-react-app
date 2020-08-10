import React, { Component } from 'react';
export class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      title: '',
      desc: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e, type) {
    if (type === 'name') this.setState({ name: e.target.value });
    else if (type === 'title') this.setState({ title: e.target.value });
    else this.setState({ title: e.target.value });
  }

  render() {
    return <div className='alert'>{this.props.children}</div>;
  }
}
