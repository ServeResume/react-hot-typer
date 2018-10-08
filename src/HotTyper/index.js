import React from 'react';
import PropTypes from 'prop-types';
import { getCommonText } from './helpers';
import Cursor from './Cursor';

export default class MovingCursor extends React.Component {
  constructor(props) {
    super(props);
    const { text } = this.props;

    this.state = {
      isCursorVisible: true,
      currentTextIndex: 0,
      currentText: '',
      highlightedText: '',
      isTyping: false,
      isFinished: false,
      textToBe: Array.isArray(text) ? text[0] : text
    };
  }

  componentDidMount() {
    setTimeout(
      this.setState.bind(this, { isTyping: true }),
      this.props.initialDelay
    );
  }

  componentWillUpdate(nextProps, nextState) {
    const {
      state: { currentTextIndex, currentText, textToBe, isTyping },
      props: { text, speedOfLoop, typingRate, highlightDuration, onFinish }
    } = this;

    if (
      nextState.isTyping &&
      nextState.currentTextIndex < text.length &&
      (currentText !== nextState.currentText || nextState.isTyping !== isTyping)
    ) {
      const currentTextDirection = getCommonText(
        nextState.currentText,
        nextState.textToBe
      ).includes(nextState.currentText);
      let newState =
        nextState.currentText === textToBe
          ? {
              isTyping: false,
              textToBe: Array.isArray(text) ? text[currentTextIndex + 1] : text,
              currentTextIndex: currentTextIndex + 1
            }
          : {
              highlightedText: currentTextDirection
                ? ''
                : nextState.currentText.substr(
                    Number(
                      nextState.currentText.length -
                        getCommonText(nextState.currentText, nextState.textToBe)
                          .length
                    )
                  ),
              currentText: currentTextDirection
                ? nextState.currentText + textToBe[nextState.currentText.length]
                : nextState.currentText.slice(
                    0,
                    Number(
                      getCommonText(nextState.currentText, nextState.textToBe)
                        .length - nextState.currentText.length
                    )
                  )
            };
      setTimeout(
        this.setState.bind(this, newState),
        nextState.highlightedText ? highlightDuration : typingRate
      );
    }
    if (
      !nextState.isTyping &&
      nextState.isTyping !== this.state.isTyping &&
      nextState.currentTextIndex < text.length &&
      nextState.textToBe !== nextState.currentText
    ) {
      const isCurrentCommon = getCommonText(
        nextState.currentText,
        nextState.textToBe
      ).includes(nextState.currentText);
      let newState = {
        isTyping: true,
        currentText: isCurrentCommon
          ? nextState.currentText +
            text[currentTextIndex + 1][nextState.currentText.length]
          : nextState.currentText.slice(
              0,
              Number(
                getCommonText(nextState.currentText, nextState.textToBe)
                  .length - nextState.currentText.length
              )
            ),
        highlightedText: isCurrentCommon
          ? ''
          : nextState.currentText.substr(
              Number(
                getCommonText(nextState.currentText, nextState.textToBe)
                  .length - nextState.currentText.length
              )
            )
      };
      setTimeout(this.setState.bind(this, newState), speedOfLoop);
    }
    if (nextState.currentTextIndex === text.length && nextState.isTyping) {
      this.setState({
        isTyping: false
      });
    }

    const finalTextCondition =
      currentTextIndex === (Array.isArray(text) ? text.length - 1 : 0);
    if (
      finalTextCondition &&
      textToBe === currentText &&
      !nextState.isFinished
    ) {
      if (onFinish) onFinish();
      this.setState({ isFinished: true });
    }
  }

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    hideCursorOnEnd: PropTypes.bool,
    speedOfLoop: PropTypes.number,
    typingRate: PropTypes.number,
    cursorFlashRate: PropTypes.number,
    initialDelay: PropTypes.number
  };

  static defaultProps = {
    text: [
      'Make your text animated',
      'Make your text elegent',
      'Make your text stylish',
      'Make your text stylish with ZERO effort from you ;).'
    ],
    speedOfLoop: 1100,
    typingRate: 100,
    initialDelay: 500,
    cursorFlashRate: 200,
    highlightDuration: 150,
    hideCursorOnEnd: true
  };
  render() {
    const {
      props: { cursorFlashRate, className, style, hideCursorOnEnd },
      state: { isTyping, currentText, highlightedText, isFinished }
    } = this;

    return (
      <span style={style} className={className}>
        {currentText}
        <span style={{ color: '#fff', backgroundColor: '#3390FF' }}>
          {highlightedText}
        </span>
        <span>
          <Cursor
            hide={hideCursorOnEnd && isFinished}
            isHighlighted={!!highlightedText}
            flashing={!isTyping}
            cursorFlashRate={cursorFlashRate}
          />
        </span>
      </span>
    );
  }
}
