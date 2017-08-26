import { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import threshold from 'threshold';

class ReactThreshold extends Component {
  constructor(props) {
    super(props);

    /*
     * initialize state with negative
     * values to avoid unnecessary update
     */
    this.state = {
      area: 0,
      trajectory: {
        x: -1,
        y: -1
      }
    };

    const { throttleInterval } = this.props;

    this._updateState = throttle(this._updateState.bind(this), throttleInterval);
  }

  componentDidMount() {
    // memoize constant properties
    this._element = findDOMNode(this.child);

    // run initial check
    this._updateState();

    // start listening for changes
    window.addEventListener('scroll', this._updateState);
    window.addEventListener('resize', this._updateState);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._updateState);
    window.removeEventListener('resize', this._updateState);
  }

  componentWillMount() {
    if (typeof this.props.children.type !== 'function') {
      throw new TypeError('[react-threshold] single component as children expected');
    }
  }

  _updateState() {
    const { area, trajectory } = threshold(this._element);

    this.setState(() => {
      const updatedMetrics = { area, trajectory };

      this.props.onUpdate(updatedMetrics);

      return updatedMetrics;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if element is not visible prevent updates
    const xVisible = (nextState.trajectory.x >= 0) && (nextState.trajectory.x <= 1)
    const yVisible = (nextState.trajectory.y >= 0) && (nextState.trajectory.y <= 1)

    return (xVisible && yVisible) || this.props.forceUpdate;
  }

  render() {
    return cloneElement(
      this.props.children,
      {
        area: this.state.area,
        trajectory: this.state.trajectory,
        ref: (child) => this.child = child,
      }
    );
  }
}

ReactThreshold.defaultProps = {
  forceUpdate: false,
  onUpdate: f => f,
  throttleInterval: 100
};

/**
 * Prevents unnecessary calls through time interval polling
 * @method throttle
 * @param {Function} fn
 * @returns {Function}
 */
var throttle = function(fn, interval) {
  var timer = null;

  return function throttledAction() {
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments);
      timer = null;
    }, interval);
  };
};


export default ReactThreshold;
