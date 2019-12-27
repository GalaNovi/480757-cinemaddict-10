import {render} from '../utils/render';
import SortComponent from '../components/sort';

export default class Sort {
  constructor(container) {
    this._container = container;
  }

  render() {
    const sortComponent = new SortComponent();
    render(this._container, sortComponent)
  }
}
