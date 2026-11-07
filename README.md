# CHẠM — Coffee & little joys

Landing page tiếng Việt và trang quản trị dùng Next.js, TypeScript, Supabase Auth, PostgreSQL và Storage. Giao diện responsive, nền trắng, chữ đen, Bungee cho tiêu đề và tên món; Be Vietnam Pro cho nội dung dài. Hiệu ứng cuộn tôn trọng chế độ giảm chuyển động.

## Chạy cục bộ

Node.js 24, npm. Dùng checkout hiện có; không cần worktree.

```sh
cd /workspace/coffee_shop
npm ci --cache /tmp/coffee-npm-cache
cp .env.example .env.local # chỉ khi file chưa tồn tại
# Điền URL và publishable key của dự án Supabase vào .env.local
npm run dev
```

Mở `/` cho khách hàng và `/admin` cho người quản trị. `npm run build`, `npm start` để chạy bản production; `npm run typecheck` để kiểm tra kiểu dữ liệu. Nếu đổi biến NEXT_PUBLIC_* trên production, build lại. Không commit .env.local và không đưa service_role key vào frontend.

## Khởi tạo Supabase (chủ dự án thực hiện một lần)

1. Trong Supabase Dashboard → SQL Editor, chạy toàn bộ file `supabase/schema.sql`. Script tạo bảng, chính sách RLS và bucket ảnh công khai, không ghi đè sản phẩm đã có.
2. Authentication → Users → Add user: tạo tài khoản email/mật khẩu cho quản trị. Không chia sẻ mật khẩu trong chat. Nếu cần, dùng tùy chọn xác nhận email khi tạo user trong Dashboard.
3. Sao chép UUID của user, thay `ADMIN_USER_UUID` và chạy trong SQL Editor:

```sql
insert into public.admins (user_id)
values ('ADMIN_USER_UUID')
on conflict do nothing;
```

4. Đăng nhập tại `/admin`, cập nhật thông tin shop và thêm sản phẩm. Ảnh JPG/PNG/WebP/AVIF tối đa 5 MB; có thể tải ảnh hoặc nhập URL HTTPS. Lưu sản phẩm sau khi tải ảnh. Số điện thoại tạo liên kết gọi đặt món.
5. Kiểm tra trang chủ khi đăng xuất: dữ liệu phải hiển thị và ghi dữ liệu phải bị RLS từ chối. Đăng nhập admin rồi kiểm tra thêm/sửa/xóa món, tải ảnh và lưu thông tin shop. Tài khoản thường không có hàng trong `admins` không được ghi.

Không có đăng ký admin công khai. Publishable key có thể hiển thị ở trình duyệt; bảo mật dữ liệu dựa trên RLS và tài khoản admin. Bucket ảnh là public, không tải tài liệu riêng tư lên. Ảnh cũ được giữ khi sửa/xóa sản phẩm để tránh xóa nhầm ảnh đang được dùng; có thể dọn ảnh không dùng trong Storage Dashboard.

## Dữ liệu ban đầu

Khi Supabase chưa cấu hình hoặc chưa truy cập được schema, landing page hiển thị menu **minh họa** có nhãn rõ ràng. Sau khi schema hoạt động, chỉ dữ liệu thật từ Supabase được dùng (menu ban đầu trống). Không dùng địa chỉ, giờ mở cửa, số điện thoại giả. Tên CHẠM và slogan là nội dung mặc định có thể sửa trong admin. Món tạm hết vẫn hiển thị nhưng không có liên kết đặt hàng.

Các danh mục cố định: cà phê, kem, ăn vặt. Admin quản lý sản phẩm và thông tin shop, không sửa cấu trúc giao diện. Đặt hàng qua điện thoại; chưa có giỏ hàng/thanh toán.

## Triển khai

Triển khai Next.js trên Vercel hoặc máy chủ Node.js, cấu hình hai biến trong `.env.example`. Trong Supabase Auth, đặt Site URL thành domain triển khai. Cho phép truy cập domain Supabase dự án, images.unsplash.com (ảnh minh họa), font được đóng gói cục bộ qua Fontsource, không phụ thuộc Google Fonts. Có thể dùng ảnh riêng qua Supabase Storage thay ảnh minh họa. Cấu hình cloud draft không tự triển khai website.

## Chat với nhân viên qua Facebook Page

Nút chat nổi mở khung lời chào và liên kết Messenger của Page HarveyJettt (`https://m.me/HarveyJettt`). Khách gửi và nhận tin trong Messenger; nhân viên trả lời qua hộp thư Page/Meta Business Suite. Website không nhúng hội thoại, không nhận/lưu tin nhắn và không hiển thị trạng thái trực tuyến giả. Không cần Facebook App ID hoặc access token. Page cần bật tính năng nhắn tin và nhân viên phải có quyền truy cập hộp thư.

Với database đã tạo trước bản cập nhật này, chạy `supabase/migrations/20261108_messenger.sql` trong Supabase SQL Editor một lần. Với dự án mới, `schema.sql` đã bao gồm cột này. Sau đó, tại `/admin` → **Thông tin shop** → **Facebook Page / Messenger**, nhập link Page hoặc `https://m.me/tenpage` và lưu; để trống để ẩn nút chat. Các thay đổi áp dụng khi tải lại trang chủ. Trước khi chạy migration, website vẫn dùng Page mặc định và các trường thông tin cũ vẫn lưu được.
