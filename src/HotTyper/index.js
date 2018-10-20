import React from 'react';
import PropTypes from 'prop-types';
import { getCommonText } from './helpers';
import Cursor, { cursorPropType } from './Cursor';

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

  componentDidUpdate(prevProps, prevState) {
    const {
      state: {
        currentTextIndex,
        currentText,
        textToBe,
        isTyping,
        highlightedText,
        isFinished
      },
      props: { text, speedOfLoop, typingRate, highlightDuration, onFinish }
    } = this;

    if (
      isTyping &&
      currentTextIndex < text.length &&
      (prevState.currentText !== currentText || isTyping !== prevState.isTyping)
    ) {
      const currentTextDirection = getCommonText(
        currentText,
        textToBe
      ).includes(currentText);
      let newState =
        currentText === prevState.textToBe
          ? {
              isTyping: false,
              textToBe: Array.isArray(text)
                ? text[prevState.currentTextIndex + 1]
                : text,
              currentTextIndex: prevState.currentTextIndex + 1
            }
          : {
              highlightedText: currentTextDirection
                ? ''
                : currentText.substr(
                    Number(
                      currentText.length -
                        getCommonText(currentText, textToBe).length
                    )
                  ),
              currentText: currentTextDirection
                ? currentText + prevState.textToBe[currentText.length]
                : currentText.slice(
                    0,
                    Number(
                      getCommonText(currentText, textToBe).length -
                        currentText.length
                    )
                  )
            };
      setTimeout(
        this.setState.bind(this, newState),
        highlightedText ? highlightDuration : typingRate
      );
    }
    if (
      !isTyping &&
      isTyping !== prevState.isTyping &&
      currentTextIndex < text.length &&
      textToBe !== currentText
    ) {
      const isCurrentCommon = getCommonText(currentText, textToBe).includes(
        currentText
      );
      let newState = {
        isTyping: true,
        currentText: isCurrentCommon
          ? currentText +
            text[prevState.currentTextIndex + 1][currentText.length]
          : currentText.slice(
              0,
              Number(
                getCommonText(currentText, textToBe).length - currentText.length
              )
            ),
        highlightedText: isCurrentCommon
          ? ''
          : currentText.substr(
              Number(
                getCommonText(currentText, textToBe).length - currentText.length
              )
            )
      };
      setTimeout(this.setState.bind(this, newState), speedOfLoop);
    }
    if (currentTextIndex === text.length && isTyping) {
      this.setState({
        isTyping: false
      });
    }

    const finalTextCondition =
      prevState.currentTextIndex ===
      (Array.isArray(text) ? text.length - 1 : 0);
    if (
      finalTextCondition &&
      prevState.textToBe === prevState.currentText &&
      !isFinished
    ) {
      if (onFinish) onFinish();
      this.setState({ isFinished: true });
    }
  }

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    hideCursorOnEnd: PropTypes.bool,
    speedOfLoop: PropTypes.number,
    typingRate: PropTypes.number,
    cursorFlashRate: PropTypes.number,
    initialDelay: PropTypes.number,
    cursor: cursorPropType
  };

  static defaultProps = {
    speedOfLoop: 1100,
    typingRate: 100,
    cursorFlashRate: 200,
    highlightDuration: 150,
    hideCursorOnEnd: true,
    initialDelay: 800
  };
  render() {
    const {
      props: { cursorFlashRate, className, style, hideCursorOnEnd, cursor },
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
            cursor={cursor}
          />
        </span>
      </span>
    );
  }
}
