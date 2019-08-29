# colorpicker

## [LiveDemo](https://caohenghu.github.io/colorpicker/)

![preview-dark](https://raw.githubusercontent.com/caohenghu/colorpicker/master/src/img/preview-dark.jpg)
![preview-light](https://raw.githubusercontent.com/caohenghu/colorpicker/master/src/img/preview-light.jpg)

## Install

```bash
$ yarn add @caohenghu/colorpicker
```

## Example

```javascript
import ColorPicker from '@caohenghu/colorpicker'

export default class App {
    constructor(props) {
        super(props)
        this.changeColor = this.changeColor.bind(this)
        this.openSucker = this.openSucker.bind(this)
        this.color = '#59c7f9'
        this.$bg = null
        this.$cover = null
        this.suckerCanvas = null
        this.colorpicker = new ColorPicker({
            theme: '',
            color: this.color,
            suckerHide: false,
            openSucker: this.openSucker,
            changeColor: this.changeColor
        })
    }

    render() {
        this.$bg = document.querySelector('.bg')
        this.$cover = document.querySelector('.cover')
        this.$cover.appendChild(this.colorpicker.$el)
        this.$bg.style.background = this.color
    }

    changeColor(color) {
        const { r, g, b, a } = color.rgba
        this.$bg.style.background = `rgba(${r},${g},${b},${a})`
    }

    openSucker(isOpen) {
        if (isOpen) {
            // ... canvas be created, and get the area of canvas
            // this.colorpicker.canvasLoaded({
            //     suckerCanvas: this.suckerCanvas,
            //     suckerArea: [
            //         coverRect.left,
            //         coverRect.top,
            //         coverRect.left + coverRect.width,
            //         coverRect.top + coverRect.height
            //     ]
            // })
        } else {
            // this.suckerCanvas && this.suckerCanvas.remove()
        }
    }
}
```

## new ColorPicker(options)

### Options

| Name             | Type     | Default/Args                                                                                                                                                                             | Description                        |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| theme            | String   | `dark`                                                                                                                                                                                   | `dark` or `light`                  |
| color            | String   | `#000000`                                                                                                                                                                                | `rgba` or `hex`                    |
| colorsDefault    | Array    | `['#000000', '#FFFFFF', '#FF1900', '#F47365', '#FFB243', '#FFE623', '#6EFF2A', '#1BC7B1', '#00BEFF', '#2E81FF', '#5D61FF', '#FF89CF', '#FC3CAD', '#BF3DCE', '#8E00A7', 'rgba(0,0,0,0)']` | like `['#ff00ff', '#0f0f0f', ...]` |
| colorsHistoryKey | String   | `colorpicker-history`                                                                                                                                                                    |
| suckerHide       | Boolean  | `true`                                                                                                                                                                                   | `true` or `false`                  |
| changeColor      | Function | color                                                                                                                                                                                    | `{ rgba: {}, hsv: {}}`             |
| openSucker       | Function | isOpen                                                                                                                                                                                   | `true` or `false`                  |

> if you want to use sucker, then `openSucker`, `suckerHide` is necessary. and when `canvas` is ready, you can call function `colorpicker.canvasLoaded` width args `suckerCanvas` and `suckerArea`. when you click sucker button, you can click it again or press key of `esc` to exit.

## colorpicker.canvasLoaded(options)

### Options

| Name         | Type              | Default | Description                             |
| ------------ | ----------------- | ------- | --------------------------------------- |
| suckerCanvas | HTMLCanvasElement | `null`  | like `document.createElement('canvas')` |
| suckerArea   | Array             | `[]`    | like `[x1, y1, x2, y2]`                 |

## colorpicker.close()

> when you want to close colorpicker, you can call function `colorpicker.close()`, it can remember current color into history.
