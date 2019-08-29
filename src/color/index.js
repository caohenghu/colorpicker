import './index.scss'
import html from './index.html'
import { html2Dom, setColorValue, rgb2hex } from './mixin'
import Saturation from './saturation'
import Hue from './hue'
import Alpha from './alpha'
import Preview from './preview'
import Sucker from './sucker'
import Box from './box'
import Colors from './colors'

const hueWidth = 15
const hueHeight = 152
const previewHeight = 30

export default class Index {
    constructor(props) {
        props = Object.assign({}, Index.defaultProps, props)
        const { r, g, b, a, h, s, v } = setColorValue(props.color)
        this.props = props
        this.selectSaturation = this.selectSaturation.bind(this)
        this.selectHue = this.selectHue.bind(this)
        this.selectAlpha = this.selectAlpha.bind(this)
        this.inputHex = this.inputHex.bind(this)
        this.inputRgba = this.inputRgba.bind(this)
        this.openSucker = this.openSucker.bind(this)
        this.selectSucker = this.selectSucker.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.r = r
        this.g = g
        this.b = b
        this.a = a
        this.h = h
        this.s = s
        this.v = v
        this.$el = null
        this.saturation = new Saturation({
            color: this.props.color,
            hsv: this.hsv,
            size: 152,
            selectSaturation: this.selectSaturation
        })
        this.hue = new Hue({
            hsv: this.hsv,
            width: 15,
            height: 152,
            selectHue: this.selectHue
        })
        this.alpha = new Alpha({
            rgba: this.rgba,
            width: 15,
            height: 152,
            selectAlpha: this.selectAlpha
        })
        this.preview = new Preview({
            color: this.rgbaString,
            width: this.previewWidth,
            height: 30
        })
        this.boxHex = new Box({
            name: 'HEX',
            color: this.hexString,
            inputColor: this.inputHex
        })
        this.boxRgba = new Box({
            name: 'RGBA',
            color: this.rgbaStringShort,
            inputColor: this.inputRgba
        })
        this.colors = new Colors({
            colorsDefault: this.props.colorsDefault,
            colorsHistoryKey: this.props.colorsHistoryKey,
            selectColor: this.selectColor,
            getCurrentColor: this.getCurrentColor
        })
        this.sucker = new Sucker({
            openSucker: this.openSucker,
            selectSucker: this.selectSucker
        })
        this.render()
    }

    render() {
        this.$el = html2Dom(html)
        Object.assign(this.$el.style, {
            width: this.totalWidth + 'px'
        })
        const colorSet = this.$el.querySelector('.color-set')
        const colorShow = this.$el.querySelector('.color-show')
        colorSet.appendChild(this.saturation.$el)
        colorSet.appendChild(this.hue.$el)
        colorSet.appendChild(this.alpha.$el)
        colorShow.appendChild(this.preview.$el)
        !this.props.suckerHide && colorShow.appendChild(this.sucker.$el)
        this.$el.appendChild(this.boxHex.$el)
        this.$el.appendChild(this.boxRgba.$el)
        this.$el.appendChild(this.colors.$el)
    }

    get totalWidth() {
        return hueHeight + (hueWidth + 8) * 2
    }

    get previewWidth() {
        return this.totalWidth - (this.props.suckerHide ? 0 : previewHeight)
    }

    get rgba() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        }
    }

    get hsv() {
        return {
            h: this.h,
            s: this.s,
            v: this.v
        }
    }

    get rgbString() {
        const { r, g, b } = this
        return `rgb(${r}, ${g}, ${b})`
    }

    get rgbaStringShort() {
        const { r, g, b, a } = this
        return `${r}, ${g}, ${b}, ${a}`
    }

    get rgbaString() {
        return `rgba(${this.rgbaStringShort})`
    }

    get hexString() {
        return rgb2hex(this.rgba, true)
    }

    selectSaturation(color) {
        const { r, g, b, h, s, v } = setColorValue(color)
        Object.assign(this, { r, g, b, h, s, v })
        this.alpha.renderColor(this.rgba)
        this.preview.renderColor(this.rgbaString)
        this.boxHex.renderColor(this.hexString)
        this.boxRgba.renderColor(this.rgbaStringShort)
        this.props.changeColor({
            rgba: this.rgba,
            hsv: this.hsv
        })
    }

    selectHue(color) {
        const { r, g, b, h, s, v } = setColorValue(color)
        Object.assign(this, { r, g, b, h, s, v })
        this.saturation.renderColor(this.rgbString)
        this.saturation.renderSlide(this.hsv)
        this.alpha.renderColor(this.rgba)
        this.preview.renderColor(this.rgbaString)
        this.boxHex.renderColor(this.hexString)
        this.boxRgba.renderColor(this.rgbaStringShort)
        this.props.changeColor({
            rgba: this.rgba,
            hsv: this.hsv
        })
    }

    selectAlpha(a) {
        Object.assign(this, { a: a })
        this.preview.renderColor(this.rgbaString)
        this.boxRgba.renderColor(this.rgbaStringShort)
        this.props.changeColor({
            rgba: this.rgba,
            hsv: this.hsv
        })
    }

    inputHex(color) {
        const { r, g, b, a, h, s, v } = setColorValue(color)
        Object.assign(this, { r, g, b, a, h, s, v })
        this.saturation.renderColor(this.rgbString)
        this.saturation.renderSlide(this.hsv)
        this.hue.renderSlide(this.hsv)
        this.alpha.renderColor(this.rgba)
        this.preview.renderColor(this.rgbaString)
        this.boxRgba.renderColor(this.rgbaStringShort)
    }

    inputRgba(color) {
        const { r, g, b, a, h, s, v } = setColorValue(color)
        Object.assign(this, { r, g, b, a, h, s, v })
        this.saturation.renderColor(this.rgbString)
        this.saturation.renderSlide(this.hsv)
        this.hue.renderSlide(this.hsv)
        this.alpha.renderColor(this.rgba)
        this.alpha.renderSlide(this.rgba)
        this.preview.renderColor(this.rgbaString)
        this.boxHex.renderColor(this.hexString)
    }

    openSucker(isOpen) {
        this.props.openSucker(isOpen)
    }

    canvasLoaded(options) {
        this.sucker.canvasLoaded(options)
    }

    selectSucker(color) {
        const { r, g, b, a, h, s, v } = setColorValue(color)
        Object.assign(this, { r, g, b, a, h, s, v })
        this.saturation.renderColor(this.rgbString)
        this.saturation.renderSlide(this.hsv)
        this.hue.renderSlide(this.hsv)
        this.alpha.renderColor(this.rgba)
        this.alpha.renderSlide(this.rgba)
        this.preview.renderColor(this.rgbaString)
        this.boxHex.renderColor(this.hexString)
        this.boxRgba.renderColor(this.rgbaStringShort)
        this.props.changeColor({
            rgba: this.rgba,
            hsv: this.hsv
        })
    }

    selectColor(color) {
        const { r, g, b, a, h, s, v } = setColorValue(color)
        Object.assign(this, { r, g, b, a, h, s, v })
        this.saturation.renderColor(this.rgbString)
        this.saturation.renderSlide(this.hsv)
        this.hue.renderSlide(this.hsv)
        this.alpha.renderColor(this.rgba)
        this.alpha.renderSlide(this.rgba)
        this.preview.renderColor(this.rgbaString)
        this.boxHex.renderColor(this.hexString)
        this.boxRgba.renderColor(this.rgbaStringShort)
        this.props.changeColor({
            rgba: this.rgba,
            hsv: this.hsv
        })
    }

    close() {
        this.colors.setColorsHistory(this.rgbaString)
    }

    changeTheme() {
        this.$el.classList.contains('light')
            ? this.$el.classList.remove('light')
            : this.$el.classList.add('light')
    }
}

Index.defaultProps = {
    color: '#000000',
    theme: 'dark',
    suckerHide: true,
    suckerCanvas: null, // HTMLCanvasElement
    suckerArea: [],
    colorsDefault: [
        '#000000',
        '#FFFFFF',
        '#FF1900',
        '#F47365',
        '#FFB243',
        '#FFE623',
        '#6EFF2A',
        '#1BC7B1',
        '#00BEFF',
        '#2E81FF',
        '#5D61FF',
        '#FF89CF',
        '#FC3CAD',
        '#BF3DCE',
        '#8E00A7',
        'rgba(0,0,0,0)'
    ],
    colorsHistoryKey: 'colorpicker-history',
    changeColor: () => {},
    openSucker: () => {}
}
