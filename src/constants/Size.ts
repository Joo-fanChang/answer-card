import PaperType from './PaperType';

export interface ISizeItem {
  actualWidth: number;
  actualHeight: number;
  contentWidth: number;
  contentHeight: number;
}

export interface ISize {
  [key: string]: ISizeItem;
}

const Size: ISize = {
	[PaperType.A4]: {
		actualWidth: 210,
		actualHeight: 297,
		contentWidth: 190,
		contentHeight: 277,
	}
}

export default Size;
