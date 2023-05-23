import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  color1 = "#000000";
  color2 = "#ffffff";
  contrast: number = 21;

  constructor() {
    this.changeColor("--color1", this.color1);
    this.changeColor("--color2", this.color2);
  }

  checkIfPrimaryAndAccentColorAreCompatible() {
    this.contrast = this.getContrast(this.color1, this.color2);

    if (this.contrast <= 3) {
      document.getElementById('contrast')?.style.setProperty('background-color', 'rgb(173, 1, 1)');
    } else if (this.contrast > 3 && this.contrast < 5) {
      document.getElementById('contrast')?.style.setProperty('background-color', 'rgb(246, 137, 54)');
    } else {
      document.getElementById('contrast')?.style.setProperty('background-color', 'rgb(136, 183, 46)');
    }
  }

  luminance(r: number, g: number, b: number) {

    let red = 0.2126;
    let green = 0.7152;
    let blue = 0.0722;
    let gama = 2.4;

    let a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, gama);
    });
    return a[0] * red + a[1] * green + a[2] * blue;
  }

  getContrast(hexColor1: string, hexColor2: string) {
    const c1RGB = this.getRGBColor(hexColor1);
    const c2RGB = this.getRGBColor(hexColor2);

    let lumC1 = this.luminance(c1RGB[0], c1RGB[1], c1RGB[2]);
    let lumC2 = this.luminance(c2RGB[0], c2RGB[1], c2RGB[2]);

    let brightest = Math.max(lumC2, lumC1);
    let darkest = Math.min(lumC2, lumC1);
    let contrast = (brightest + 0.05) / (darkest + 0.05);

    return Math.round((contrast * 100) / 100);
  }

  getRGBColor(color: string) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return [r, g, b];
  }

  changeColor(colorTitle: string, colorHex: string) {
    document.documentElement.style.setProperty(colorTitle, colorHex);
    this.checkIfPrimaryAndAccentColorAreCompatible();
  }
}
