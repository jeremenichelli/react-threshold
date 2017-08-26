import React from 'react';
import { render } from 'react-dom';
import ReactThreshold from '../dist/react-threshold.js';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="test-element"/>
    );
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      area: 0,
      trajectory: {
        x: -1,
        y: -1
      }
    };

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(stats) {
    this.setState(stats);
  }

  render() {
    return (
      <div id="demo">
        <div className="metrics-panel">
          <pre><code>{'{ '}
            area: <span id="area-indicator">{ this.state.area.toFixed(3) }</span>,
            trajectory: {'{ '}
              x: <span id="x-trajectory-indicator">{ this.state.trajectory.x.toFixed(3) }</span>,
              y: <span id="y-trajectory-indicator">{ this.state.trajectory.y.toFixed(3) }</span>
            {' }'}
          {' }'}
          </code></pre>
        </div>
        <ReactThreshold onUpdate={ this.onUpdate }>
          <TestComponent />
        </ReactThreshold>
      </div>
    );
  }
}

render(
  <Demo />,
  document.getElementById('container')
);
