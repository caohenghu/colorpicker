# colorpicker

## [LiveDemo](https://caohenghu.github.io/colorpicker/)

![preview-dark](https://raw.githubusercontent.com/caohenghu/colorpicker/master/src/img/preview-dark.jpg)
![preview-light](https://raw.githubusercontent.com/caohenghu/colorpicker/master/src/img/preview-light.jpg)

## Install

```bash
$ yarn add @caohenghu/olorpicker
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

## Options

| Name               | Type    | Default                                                                                                                                                                                  | Description                        |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| theme              | String  | `dark`                                                                                                                                                                                   | `dark` or `light`                  |
| color              | String  | `#000000`                                                                                                                                                                                | `rgba` or `hex`                    |
| colors-default     | Array   | `['#000000', '#FFFFFF', '#FF1900', '#F47365', '#FFB243', '#FFE623', '#6EFF2A', '#1BC7B1', '#00BEFF', '#2E81FF', '#5D61FF', '#FF89CF', '#FC3CAD', '#BF3DCE', '#8E00A7', 'rgba(0,0,0,0)']` | like `['#ff00ff', '#0f0f0f', ...]` |
| colors-history-key | String  | `colorpicker-history`                                                                                                                                                                    |
| sucker-hide        | Boolean | `true`                                                                                                                                                                                   | `true` or `false`                  |

## Events

| Name        | Type     | Args   | Description            |
| ----------- | -------- | ------ | ---------------------- |
| changeColor | Function | color  | `{ rgba: {}, hsv: {}}` |
| openSucker  | Function | isOpen | `true` or `false`      |

> if you want use sucker, then `openSucker`, `sucker-hide`, `sucker-canvas`, `sucker-area` is necessary. when you click sucker button, you can click it again or press key of `esc` to exit.

## colorpicker.canvasLoaded

### Options

| Name          | Type              | Default | Description                             |
| ------------- | ----------------- | ------- | --------------------------------------- |
| sucker-canvas | HTMLCanvasElement | `null`  | like `document.createElement('canvas')` |
| sucker-area   | Array             | `[]`    | like `[x1, y1, x2, y2]`                 |
