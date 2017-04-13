import { Component } from 'react';
import { findDOMNode } from 'react-dom';

const THROTTLE_INTERVAL = 100;

class Threshold extends Component {
  constructor(props) {
    super(props);

    /*
     * initialize state with negative
     * values to avoid unnecessary update
     */
    this.state = {
      threshold: -1,
      trajectory: -1
    };

    this._updateState = throttle(this._updateState.bind(this));
    this._updateViewport = throttle(this._updateViewport.bind(this));
  }

  componentDidMount() {
    // memoize constant properties
    this._element = findDOMNode(this.child);
    this._viewport = window.innerHeight;

    // run initial check
    this._updateState();

    // start listening for changes
    window.addEventListener('scroll', this._updateState);
    window.addEventListener('resize', this._updateViewport);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._updateState);
    window.removeEventListener('resize', this._updateViewport);
  }

  componentWillMount() {
    if (typeof this.props.children.type !== 'function') {
      throw new TypeError('Threshold expects a single component as children');
    }
  }

  _updateViewport() {
    this._viewport = window.innerHeight;
    this._updateState();
  }

  _updateState() {
    const rects = this._element.getBoundingClientRect();

    const upperThreshold = ((this._viewport - rects.top) / rects.height);
    const bottomThreshold = rects.bottom / rects.height;
    const trajectoryLength = rects.height + this._viewport;

    /*
     * threshold
     *
     * This value represents the area of the component present in the viewport.
     *
     * It is calculated by using the min value between the distance from the
     * top and bottom edges of the element and its height.
     */
    const threshold = Math.min(1, Math.min(upperThreshold, bottomThreshold));

    /*
     * trajectory
     *
     * This value represents the translation of the element from the moment
     * it enters the viewport until it gets out.
     *
     * It is calculated by measuring the distance between the top of the
     * viewport and the bottom edge of the element.
     */
    const trajectory = ((trajectoryLength - rects.bottom) / (trajectoryLength));

    this.setState({ threshold, trajectory });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if element is not visible prevent updates
    return (nextState.trajectory >= 0) && (nextState.trajectory <= 1);
  }

  render() {
    return React.cloneElement(
      this.props.children,
      {
        threshold: this.state.threshold,
        trajectory: this.state.trajectory,
        ref: (child) => this.child = child,
      }
    );
  }
}

/**
 * Prevents unnecessary calls through time interval polling
 * @method throttle
 * @param {Function} fn
 * @returns {Function}
 */
var throttle = function(fn) {
  var timer = null;

  return function throttledAction() {
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments);
      timer = null;
    }, THROTTLE_INTERVAL);
  };
};

export default Threshold;
