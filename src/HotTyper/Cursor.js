import React from 'react';
import PropTypes from 'prop-types';

export const cursorPropType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.string
]);

export default class Cursor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  static propTypes = {
    style: PropTypes.object,
    flashing: PropTypes.bool,
    cursorFlashRate: PropTypes.number,
    cursor: cursorPropType,
  };

  static defaultProps = {
    style: {},
    flashing: false,
    cursorFlashRate: 500,
    cursor: 'I'
  };

  componentDidMount() {
    this.setState({
      isVisible: this.props.flashing
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.flashing !== this.props.flashing ||
      nextState.isVisible !== this.state.isVisible
    )
      if (nextProps.flashing) {
        setTimeout(
          this.setState.bind(this, { isVisible: !nextState.isVisible }),
          this.props.cursorFlashRate
        );
      } else {
        this.setState({
          isVisible: true
        });
      }
  }

  render() {
    const {
      props: { cursor, style, isHighlighted, hide },
      state: { isVisible }
    } = this;
    return (
      <span
        style={{
          ...style,
          display: 'inline',
          ...(isVisible && !isHighlighted && !hide
            ? {}
            : { visibility: 'hidden' })
        }}
      >
        {cursor}
      </span>
    );
  }
}
