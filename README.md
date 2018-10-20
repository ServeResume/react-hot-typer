# react-motion-grid

**A light component that simulates typing and deleting your text, without any dependences.**

![GIF demo](https://user-images.githubusercontent.com/20513793/47254614-0d04bd80-d465-11e8-9800-79b3fb7956c3.gif)

<!-- ## Demos  -->

## Getting Started

First to install the library, run:

`$ npm install react-hot-typer --save`

OR (if you prefer `yarn`)

`$ yarn add react-hot-typer`

Then you can use it with your components:

```jsx
Import HotTyper from 'react-hot-typer';
// ...The rest of your code

render() {
  return (
    <YourJSX>
      ...
      <HotTyper
        text={[
          'Make your text animated',
          'Make your text elegent',
          'Make your text stylish',
          'Make your text stylish with ZERO effort from you ;).'
        ]}
      />
      ...
    </YourJSX>
  )
}
```

## Props

The props you may want to specify:

| Name                | Type                        | Default value | Description                                                                                                                                              |
| ------------------- | :-------------------------- | :-----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` **\***       | `string` OR `array<string>` |      ---      | Text(s) that will simulated, Note: If an array is provided, only the difference between each element and the next one is deleted, common text is spared. |
| `hideCursorOnEnd`   | `boolean`                   |     true      | Whether to hide the cursor when the all the text(s) is done or not.                                                                                      |
| `speedOfLoop`       | `number`                    |     1100      | The waiting time between the end of one text element and the next one (only relevent if an array is provided to `text` prop) in ms.                      |
| `typingRate`        | `number`                    |      100      | The waiting time between typing each character in ms.                                                                                                    |
| `cursor`            | `string` OR `node`          |      'I'      | Cursor react node or string to render.                                                                                                    |
| `cursorFlashRate`   | `number`                    |      200      | The waiting time between hiding the cursor and showing it again (Cursor flashing) in ms.                                                                 |
| `initialDelay`      | `number`                    |      800      | The waiting time before **only** the first text starts to be typed in ms.                                                                                |
| `highlightDuration` | `number`                    |      150      | The time each to-be-deleted text remains highlighted (with blue background) in ms.                                                                       |

_**(\*) required**_

## Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) file for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **[Kareem Elbahrawy](https://github.com/bitriddler)**
- **[Yasser Hennawi](https://github.com/yasserhennawi)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
