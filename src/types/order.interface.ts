interface Order {
  number: string;
  date: string;
  lastChangeDate: Date;
  supplierArticle: string;
  techSize: string;
  barcode: string;
  quantity: number;
  totalPrice: number;
  discountPercent: number;
  warehouseName: string;
  oblast: string;
  incomeID: number;
  odid: number;
  nmId: number;
  subject: string;
  category: string;
  brand: string;
  isCancel: boolean;
  cancel_dt: string;
  gNumber: string;
}

export default Order;
