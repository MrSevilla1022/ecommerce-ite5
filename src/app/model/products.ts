export class Products {
  constructor(
    public category_id: number,
    public brand_id: number,
    public product_img: string,
    public product_name: string,
    public product_desc: string,
    public price: number,
    public stock_avail: number
){}
}
