export const categories = [{id:'coffee',name:'Cà phê',en:'Coffee',number:'01'}, {id:'icecream',name:'Kem',en:'Ice cream',number:'02'}, {id:'snacks',name:'Ăn vặt',en:'Little bites',number:'03'}];
export type Product = {id:string;name:string;description:string;price:number;image_url:string;category:string;available:boolean;sort_order:number};
export type Shop = {id:number;name:string;tagline:string;address:string;phone:string;hours:string;messenger_url?:string};
export const defaultShop:Shop = {id:1,name:'CHẠM',tagline:'Một chút cà phê. Một chút thảnh thơi.',address:'Đang cập nhật địa chỉ',phone:'',hours:'Đang cập nhật giờ mở cửa'};
export const money = (value:number) => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
export const demoProducts:Product[] = [
{id:'demo-1',name:'Cà phê sữa đá',description:'Đậm vị cà phê Việt, ngọt ngào sữa đặc.',price:35000,image_url:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85',category:'coffee',available:true,sort_order:1},
{id:'demo-2',name:'Latte',description:'Espresso hòa cùng sữa tươi mềm mịn.',price:45000,image_url:'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=85',category:'coffee',available:true,sort_order:2},
{id:'demo-3',name:'Americano',description:'Một tách nhẹ nhàng cho ngày tỉnh táo.',price:35000,image_url:'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85',category:'coffee',available:true,sort_order:3},
{id:'demo-4',name:'Kem dâu',description:'Mát lành, chua ngọt từ những quả dâu.',price:35000,image_url:'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=85',category:'icecream',available:true,sort_order:1},
{id:'demo-5',name:'Kem vani',description:'Hương vani dịu dàng, tan ngay đầu lưỡi.',price:30000,image_url:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85',category:'icecream',available:true,sort_order:2},
{id:'demo-6',name:'Kem chocolate',description:'Chocolate đậm đà cho tín đồ mê ngọt.',price:35000,image_url:'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=85',category:'icecream',available:true,sort_order:3},
{id:'demo-7',name:'Croissant bơ',description:'Vỏ giòn thơm, từng lớp bơ béo ngậy.',price:35000,image_url:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',category:'snacks',available:true,sort_order:1},
{id:'demo-8',name:'Khoai tây chiên',description:'Giòn rụm, thêm chút muối vừa miệng.',price:30000,image_url:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85',category:'snacks',available:true,sort_order:2},
{id:'demo-9',name:'Cookie chocolate',description:'Chiếc bánh nhỏ cho niềm vui thật to.',price:25000,image_url:'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85',category:'snacks',available:true,sort_order:3}
];
