# react-threshold

React component for [threshold](https://github.com/jeremenichelli/threshold) library. Allows to wrap components and receive props about the visible area and trajectory across the viewport.

Great for scroll based updates and stateful parallax animations.

Run `npm install react-threshold --save` to add to your project.


## Use

Imagine a component that could use its relative scroll position or visible area to render some specific content or change style properties.

```js
import React from 'react';
import ReactThreshold from 'react-threshold';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { area } = this.props;
    const styles = {
      opacity: area
    }

    return (
      <div
        className="test-element"
        style={ styles }
      />
    );
  }
}

class WrappedComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactThreshold>
        <TestComponent />
      </ReactThreshold>
    );
  }
}
```

`TestComponent` will receive an `area` prop and a `trajectory` object with `x` for horizontal and `y` for vertical scroll progression. To know more about how these properties work go to [threshold](https://github.com/jeremenichelli/threshold) README file since all of them are calculated by this script.


### Controlled updates

One nice thing about this component is that when its child is out of the viewport **it will prevent updates to save performance**. If you need to change this behavior you can pass `forceUpdate={ true }` to `ReactThreshold` wrapper component.

If you need to gather inner **threshold** data you can pass a `onUpdate` prop method to `ReactThreshold`.


## Demo

Clone this repo, install dependencies and run `npm test` to get a working demo for this component.


## TODO

- Add tests
- Allow multiple children rendering
- Create demo page with stateful parallax animations.


## LICENSE

```
MIT License

Copyright (c) 2017 Jeremias Menichelli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
