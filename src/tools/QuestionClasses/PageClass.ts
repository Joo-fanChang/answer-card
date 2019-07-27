import PaperType from '@/constants/PaperType';
import Size, { ISizeItem } from '@/constants/Size';
import { Union } from '@/tools/question2page';

export default class PageClass {
  contentHeight: number;
  availableHeight: number;
  pageNo: number;
  size: ISizeItem;
  paperType: PaperType;
  components: Array<Union>;

  constructor(paperType: PaperType, pageNo: number) {
    this.pageNo = pageNo;
    this.paperType = paperType;
    this.size = this.getSize(this.paperType);
    this.contentHeight = this.size.contentHeight;

    if (pageNo === 1) {
      this.availableHeight = this.size.contentHeight - this.size.cardInfoHeight;
    } else {
      this.availableHeight = this.size.contentHeight;
    }

    this.components = [];
  }

  getSize(paperType: PaperType): ISizeItem {
    return Size[paperType];
  }
}
