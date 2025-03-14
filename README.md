
### Yêu cầu hệ thống
- Java Development Kit (JDK) 17 trở lên
- Node.js 16 trở lên
- MySQL 8.0 trở lên
- Maven 3.8 trở lên

### Backend (Spring Boot)
1. Clone repository:
```bash
git clone <repository-url>
cd pta-backend
```

2. Cấu hình database trong `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pta_qldvcc
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

3. Build và chạy ứng dụng:
- Di chuyển đến `pta-backend/src/main/java/net/javaspring/pta_backend/PtaBackendApplication.java` và chạy
```

### Frontend (React)
1. Di chuyển vào thư mục frontend:
```bash
cd pta-frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cấu hình API endpoint trong `src/utils/axios.js`:
```javascript
baseURL: 'http://localhost:8080/api'
```

4. Chạy ứng dụng:
```bash
npm start
```

### Tạo Database Mẫu

1. Tạo database và tables:
```sql
CREATE DATABASE pta_qldvcc;
USE pta_qldvcc;

-- Các câu lệnh CREATE TABLE như đã cung cấp
```

2. Thêm dữ liệu mẫu cho bảng Users:
```sql
INSERT INTO PTA_USERS (name, email, password, role, created_at) VALUES
('Admin User', 'admin@pta.com', '$2a$10$3Mj3VQ3UyGrBvyRLYDiRKOWRQL7mcd2GAn7ONiQ0wxBD7GUqDZGOK', 'admin', NOW()),
('John Doe', 'user@pta.com', '$2a$10$3Mj3VQ3UyGrBvyRLYDiRKOWRQL7mcd2GAn7ONiQ0wxBD7GUqDZGOK', 'customer', NOW());
```

3. Thêm dữ liệu mẫu cho bảng Plants:
```sql
INSERT INTO PTA_PLANTS (name, description, care_guide, price, image_url, category) VALUES
('Peace Lily', 'Beautiful indoor plant with white flowers', 'Water weekly, indirect light', 29.99, '/images/peace-lily.jpg', 'indoor'),
('Snake Plant', 'Low maintenance air purifying plant', 'Water monthly, tolerates low light', 24.99, '/images/snake-plant.jpg', 'indoor'),
('Bamboo Palm', 'Perfect desk plant for office', 'Keep soil moist, moderate light', 34.99, '/images/bamboo-palm.jpg', 'desk'),
('Rose Bush', 'Fragrant outdoor flowering plant', 'Regular pruning, full sun', 39.99, '/images/rose-bush.jpg', 'outdoor'),
('Succulent Set', 'Decorative mini succulents', 'Minimal water, bright light', 19.99, '/images/succulent.jpg', 'decorative');
```

4. Thêm dữ liệu mẫu cho bảng Suggestion:
```sql
INSERT INTO PTA_SUGGESTION (plant_id, light, space_type, air_quality, humidity) VALUES
(1, 'medium', 'home', 'medium', 'high'),
(2, 'low', 'office', 'high', 'low'),
(3, 'medium', 'office', 'medium', 'medium'),
(4, 'high', 'garden', 'high', 'medium'),
(5, 'high', 'home', 'low', 'low');
```

5. Thêm dữ liệu mẫu cho bảng Orders:
```sql
INSERT INTO PTA_ORDERS (user_id, status, total_price, created_at) VALUES
(2, 'completed', 59.98, NOW() - INTERVAL 7 DAY),
(2, 'pending', 29.99, NOW() - INTERVAL 3 DAY),
(3, 'confirmed', 89.97, NOW() - INTERVAL 1 DAY),
(2, 'shipped', 44.98, NOW()),
(3, 'cancelled', 19.99, NOW() - INTERVAL 5 DAY);
```

6. Thêm dữ liệu mẫu cho bảng Order Detail:
```sql
INSERT INTO PTA_ORDER_DETAIL (order_id, plant_id, quantity, price) VALUES
(1, 1, 2, 29.99),
(2, 3, 1, 29.99),
(3, 4, 1, 39.99),
(3, 5, 2, 24.99),
(4, 2, 2, 22.49),
(5, 5, 1, 19.99);
```

7. Thêm dữ liệu mẫu cho bảng Maintenance Schedule:
```sql
INSERT INTO PTA_MAINTENANCE_SCHEDULE (user_id, plant_id, schedule_date, status) VALUES
(2, 1, CURDATE(), 'scheduled'),
(2, 2, CURDATE() + INTERVAL 1 DAY, 'scheduled'),
(3, 3, CURDATE() - INTERVAL 1 DAY, 'completed'),
(2, 4, CURDATE() + INTERVAL 3 DAY, 'scheduled'),
(3, 5, CURDATE() - INTERVAL 2 DAY, 'cancelled');
```

8. Thêm dữ liệu mẫu cho bảng Articles:
```sql
INSERT INTO PTA_ARTICLES (title, content, image_url, created_at) VALUES
('Cách chăm sóc cây trong nhà', 'Hướng dẫn chi tiết về cách chăm sóc cây trồng trong nhà...', '/images/indoor-care.jpg', NOW() - INTERVAL 10 DAY),
('Top 5 cây cảnh văn phòng', 'Những loại cây phù hợp nhất cho không gian văn phòng...', '/images/office-plants.jpg', NOW() - INTERVAL 7 DAY),
('Hướng dẫn tưới nước', 'Các bí quyết tưới nước đúng cách cho từng loại cây...', '/images/watering-guide.jpg', NOW() - INTERVAL 3 DAY),
('Cách chọn chậu phù hợp', 'Hướng dẫn chọn chậu phù hợp với từng loại cây...', '/images/pot-guide.jpg', NOW() - INTERVAL 1 DAY);
```

### Tài khoản mặc định
- Admin:
  - Email: admin@pta.com
  - Password: 123456
- Customer:
  - Email: user@pta.com
  - Password: 123456

### Khắc phục sự cố

1. **Lỗi kết nối database**
   - Kiểm tra MySQL đang chạy
   - Xác nhận thông tin kết nối trong application.properties
   - Đảm bảo database đã được tạo

2. **Lỗi port đã được sử dụng**
   - Backend mặc định chạy trên port 8080
   - Frontend mặc định chạy trên port 3000
   - Kiểm tra và đóng các ứng dụng đang sử dụng các port này

3. **Lỗi CORS**
   - Đảm bảo đã cấu hình CORS trong backend
   - Kiểm tra baseURL trong frontend có đúng không 