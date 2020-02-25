import './app.scss'
import html from './app.html'
import { html2Dom } from '../src/color/mixin'
import ColorPicker from '../src'
import imgCover from './cover.jpg'

export default class App {
    constructor() {
        this.changeColor = this.changeColor.bind(this)
        this.openSucker = this.openSucker.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
        this.animationEnd = this.animationEnd.bind(this)
        this.color = '#59c7f9'
        this.$el = null
        this.$bg = null
        this.$cover = null
        this.$switch = null
        this.suckerCanvas = null
        this.isOpenSucker = false
        this.colorpicker = new ColorPicker({
            theme: '',
            color: this.color,
            suckerHide: false,
            openSucker: this.openSucker,
            changeColor: this.changeColor
        })
        this.render()
    }

    render() {
        this.$el = html2Dom(html)
        this.$bg = this.$el.querySelector('.bg')
        this.$cover = this.$el.querySelector('.cover')
        this.$switch = this.$el.querySelector('.switch')
        this.$cover.appendChild(this.colorpicker.$el)
        this.$bg.style.background = this.color
        this.$switch.addEventListener('click', this.changeTheme)
        this.$switch.addEventListener('animationend', this.animationEnd)
    }

    changeColor(color) {
        const { r, g, b, a } = color.rgba
        this.$bg.style.background = `rgba(${r},${g},${b},${a})`
    }

    openSucker(isOpen) {
        this.isOpenSucker = isOpen
        if (isOpen) {
            const cover = document.createElement('img')
            this.$cover.appendChild(cover)
            cover.onload = () => {
                // 如果已经点击取消了才加载完，则不执行
                if (!this.isOpenSucker) {
                    return
                }
                const coverRect = cover.getBoundingClientRect()
                this.suckerCanvas = this.createCanvas(cover, coverRect)
                document.body.appendChild(this.suckerCanvas)
                this.colorpicker.canvasLoaded({
                    suckerCanvas: this.suckerCanvas,
                    suckerArea: [
                        coverRect.left,
                        coverRect.top,
                        coverRect.left + coverRect.width,
                        coverRect.top + coverRect.height
                    ]
                })
            }
            cover.setAttribute('crossorigin', 'Anonymous')
            cover.src = imgCover
        } else {
            this.$cover.querySelector('img').remove()
            this.suckerCanvas && this.suckerCanvas.remove()
        }
    }

    createCanvas(cover, coverRect) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = coverRect.width
        canvas.height = coverRect.height

        ctx.drawImage(cover, 0, 0, coverRect.width, coverRect.height)
        Object.assign(canvas.style, {
            position: 'absolute',
            left: coverRect.left + 'px',
            top: coverRect.top + 'px',
            opacity: 0
        })
        return canvas
    }

    changeTheme() {
        this.$switch.classList.add('anim-pull')
        this.colorpicker.changeTheme()
    }

    animationEnd() {
        this.$switch.classList.remove('anim-pull')
    }
}
