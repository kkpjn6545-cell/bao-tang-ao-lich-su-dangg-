import { 
  Artifact, 
  ExhibitionRoom, 
  TimelineNode, 
  HistoricalLocation, 
  QuizQuestion, 
  Achievement, 
  ProjectInfo 
} from '../types';

/**
 * 15 Authentic Exhibition Artifacts from the reference museum (baotangaolichsuvietnam.netlify.app)
 */
export const INITIAL_ARTIFACTS: Artifact[] = [
  // ---- Phòng 1: Đất nước sau 30/4/1975 ----
  {
    id: 'p1-01',
    title: 'Xe tăng tiến vào Dinh Độc Lập',
    year: '1975',
    period: '30/04/1975',
    dateStr: 'Trưa 30/04/1975',
    event: 'Giải phóng hoàn toàn miền Nam',
    roomId: 'room1',
    description: 'Hình ảnh xe tăng quân giải phóng tiến vào Dinh Độc Lập trưa ngày 30/4/1975, đánh dấu thời khắc miền Nam hoàn toàn giải phóng.',
    source: 'thinhvuongvietnam.com',
    category: 'Bối cảnh 1975',
    imageUrl: '/assets/images/01_xe_tang_dinh_doc_lap.jpeg',
    tags: ['30/4/1975', 'Xe tăng', 'Dinh Độc Lập', 'Toàn thắng'],
    details: 'Đúng 11 giờ 30 phút ngày 30/4/1975, xe tăng của quân Giải phóng húc đổ cổng Dinh Độc Lập, cắm cờ Mặt trận Dân tộc Giải phóng miền Nam trên nóc Dinh, báo hiệu chiến dịch Hồ Chí Minh toàn thắng, giải phóng hoàn toàn miền Nam, thống nhất non sông về mặt địa lý.',
    verified: true,
  },
  {
    id: 'p1-02',
    title: 'Bản đồ Việt Nam',
    year: '1975',
    period: 'Sau ngày 30/4/1975',
    dateStr: 'Năm 1975',
    event: 'Non sông nối liền một dải về mặt lãnh thổ',
    roomId: 'room1',
    description: 'Bản đồ thể hiện đất nước đã liền một dải về mặt lãnh thổ sau ngày 30/4/1975.',
    source: 'bandohanhchinh.com',
    category: 'Bối cảnh 1975',
    imageUrl: '/assets/images/02_ban_do_viet_nam.jpeg',
    tags: ['Bản đồ', 'Lãnh thổ', 'Việt Nam', 'Thống nhất địa lý'],
    details: 'Sau hơn 20 năm bị chiến tranh và vĩ tuyến 17 chia cắt đau thương, lãnh thổ Việt Nam từ địa đầu Móng Cái đến mũi Cà Mau đã hoàn toàn độc lập, sạch bóng quân xâm lược.',
    verified: true,
  },
  {
    id: 'p1-03',
    title: 'Nhân dân đón mừng ngày giải phóng',
    year: '1975',
    period: 'Sau ngày 30/4/1975',
    dateStr: 'Tháng 5/1975',
    event: 'Không khí hân hoan chào mừng ngày non sông thống nhất',
    roomId: 'room1',
    description: 'Không khí hân hoan của nhân dân trong ngày đất nước thống nhất.',
    source: 'dienthoaivui.com.vn',
    category: 'Bối cảnh 1975',
    imageUrl: '/assets/images/03_nhan_dan_ngay_30_4.jpg',
    tags: ['Nhân dân', 'Mít tinh', 'Sài Gòn', 'Độc lập'],
    details: 'Đông đảo các tầng lớp nhân dân miền Nam xuống đường tuần hành hân hoan, phất cao cờ Tổ quốc trong ngày vui toàn thắng.',
    verified: true,
  },
  {
    id: 'p1-04',
    title: 'Dinh Độc Lập',
    year: '1975',
    period: 'Sau ngày 30/4/1975',
    dateStr: 'Năm 1975',
    event: 'Chứng tích thời khắc lịch sử trưa ngày 30/4/1975',
    roomId: 'room1',
    description: 'Công trình chứng kiến thời khắc lịch sử trưa ngày 30/4/1975.',
    source: 'dinhdoclap.gov.vn',
    category: 'Bối cảnh 1975',
    imageUrl: '/assets/images/00_dinh_doc_lap.jpg',
    tags: ['Dinh Độc Lập', 'Di tích', 'Sài Gòn', 'Chứng tích'],
    details: 'Công trình biểu tượng nơi diễn ra sự kiện đầu hàng vô điều kiện của chính quyền Sài Gòn và sau đó trở thành nơi diễn ra Hội nghị Hiệp thương chính trị tháng 11/1975.',
    verified: true,
  },
  {
    id: 'p1-soldier-01',
    title: 'Chiến sĩ cắm cờ Giải phóng - Bùi Quang Thận',
    year: '1975',
    period: '30/04/1975',
    dateStr: '11h30 ngày 30/04/1975',
    event: 'Cắm cờ Giải phóng trên nóc Dinh Độc Lập',
    roomId: 'room1',
    description: 'Trung úy Bùi Quang Thận cùng đồng đội cắm lá cờ Giải phóng trên nóc Dinh Độc Lập lúc 11h30 ngày 30/4/1975, báo hiệu Chiến dịch Hồ Chí Minh toàn thắng.',
    source: 'Ảnh tư liệu TTXVN / Bảo tàng Lịch sử Quân sự Việt Nam',
    category: 'Chiến sĩ Việt Nam',
    imageUrl: '/assets/images/bui_quang_than.jpg',
    tags: ['Chiến sĩ', 'Bùi Quang Thận', 'Cắm cờ', 'Lữ đoàn 203', 'Toàn thắng'],
    details: 'Đồng chí Bùi Quang Thận (1948 - 2012), Đại đội trưởng Đại đội 4, Tiểu đoàn 1, Lữ đoàn Tăng thiết giáp 203, Quân đoàn 2. Trưa ngày 30/4/1975, ông chỉ huy xe tăng mang số hiệu 843 tiến thẳng vào Dinh Độc Lập. Ngay khi xe dừng lại ở cổng phụ, ông đã mang lá cờ Mặt trận Dân tộc Giải phóng miền Nam Việt Nam chạy thẳng lên nóc Dinh, hạ cờ đối phương và giương cao lá cờ chiến thắng lúc 11 giờ 30 phút. Bức chân dung người chiến sĩ với nụ cười kiên nghị và ánh mắt rực lửa là biểu tượng bất diệt của chủ nghĩa anh hùng cách mạng Việt Nam.',
    verified: true,
  },
  {
    id: 'p1-soldier-02',
    title: 'Xe tăng 390 và các chiến sĩ húc đổ cổng Dinh Độc Lập',
    year: '1975',
    period: '30/04/1975',
    dateStr: 'Trưa 30/04/1975',
    event: 'Thời khắc lịch sử húc đổ cánh cổng Dinh Độc Lập',
    roomId: 'room1',
    description: 'Xe tăng 390 do các chiến sĩ Lữ đoàn 203 điều khiển dũng mãnh húc tung cổng chính Dinh Độc Lập trưa ngày 30/4/1975.',
    source: 'Ảnh tư liệu của nữ phóng viên Françoise Demulder',
    category: 'Chiến sĩ Việt Nam',
    imageUrl: '/assets/images/xe_tang_390_va_chien_si.jpg',
    tags: ['Xe tăng 390', 'Chiến sĩ', 'Vũ Đăng Toàn', 'Nguyễn Văn Tập', 'Cổng Dinh'],
    details: 'Kíp xe tăng 390 gồm 4 chiến sĩ kiên cường: Trung úy Vũ Đăng Toàn (Trung đội trưởng, Trưởng xe), Trung sĩ Ngô Sĩ Nguyên (Pháo thủ số 1), Trung sĩ Nguyễn Văn Tập (Lái xe) và Trung sĩ Lê Văn Phượng (Pháo thủ số 2). Dưới làn đạn, chiếc xe tăng 390 lao thẳng húc tung cánh cổng sắt chính diện, mở đường cho lực lượng cách mạng tiến vào tiếp quản toàn bộ Dinh Độc Lập. Bức ảnh do phóng viên chiến trường Pháp Françoise Demulder chụp lại đã trở thành bức ảnh biểu tượng thế kỷ của lịch sử Việt Nam.',
    verified: true,
  },
  {
    id: 'p1-soldier-03',
    title: 'Chiến sĩ Giải phóng quân trước tiền sảnh Dinh Độc Lập',
    year: '1975',
    period: '30/04/1975',
    dateStr: 'Trưa ngày 30/04/1975',
    event: 'Lực lượng vũ trang làm chủ sào huyệt cuối cùng của đối phương',
    roomId: 'room1',
    description: 'Các chiến sĩ Quân Giải phóng miền Nam hiên ngang tiến vào bảo vệ và làm chủ Dinh Độc Lập trưa ngày 30/4/1975.',
    source: 'Ảnh tư liệu TTXVN',
    category: 'Chiến sĩ Việt Nam',
    imageUrl: '/assets/images/chien_si_truoc_dinh_doc_lap.jpg',
    tags: ['Chiến sĩ', 'Bộ đội Giải phóng', 'Dinh Độc Lập', 'Lịch sử 1975'],
    details: 'Hình ảnh những người chiến sĩ giải phóng quân với chiếc mũ cối, mũ tai bèo, súng khoác trên vai, gương mặt sáng ngời niềm vui chiến thắng đứng gác và bảo vệ sự bình yên cho thành phố ngay trong trưa 30/4. Các anh đã mang lại hòa bình, chấm dứt hơn 30 năm khói lửa đau thương trên mảnh đất chữ S.',
    verified: true,
  },

  // ---- Phòng 2: Hội nghị Trung ương 24 ----
  {
    id: 'p2-01',
    title: 'Hội nghị Trung ương 24',
    year: '1975',
    period: 'Tháng 9/1975',
    dateStr: 'Tháng 9/1975 (Họp tại Đà Lạt)',
    event: 'Đề ra chủ trương hoàn thành thống nhất đất nước về mặt Nhà nước',
    roomId: 'room2',
    description: 'Hội nghị đề ra chủ trương hoàn thành thống nhất đất nước về mặt Nhà nước, tháng 10/1975.',
    source: 'nvsk.vnanet.vn',
    category: 'Hội nghị Trung ương 24',
    imageUrl: '/assets/images/04_hoi_nghi_trung_uong_24.jpg',
    tags: ['Hội nghị TW 24', 'Đà Lạt', 'Đảng lãnh đạo', 'Nghị quyết'],
    details: 'Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (khóa III) khẳng định: Thống nhất đất nước vừa là nguyện vọng tha thiết của nhân dân, vừa là quy luật khách quan của lịch sử.',
    verified: true,
  },
  {
    id: 'p2-soldier-01',
    title: 'Đại tướng Võ Nguyên Giáp và Bộ Chỉ huy Quân sự',
    year: '1975',
    period: 'Tháng 4/1975',
    dateStr: 'Mùa Xuân 1975',
    event: 'Tổng hành dinh chỉ huy Chiến dịch Hồ Chí Minh lịch sử',
    roomId: 'room2',
    description: 'Đại tướng Võ Nguyên Giáp cùng các tướng lĩnh Bộ Tổng Tư lệnh theo dõi và trực tiếp chỉ đạo các cánh quân thần tốc tiến về giải phóng Sài Gòn.',
    source: 'Bảo tàng Lịch sử Quân sự Việt Nam',
    category: 'Chiến sĩ Việt Nam',
    imageUrl: '/assets/images/dai_tuong_vo_nguyen_giap_bo_tong_tu_lenh.jpg',
    tags: ['Võ Nguyên Giáp', 'Bộ Tổng tư lệnh', 'Chỉ huy', 'Chiến dịch Hồ Chí Minh'],
    details: 'Bức điện lịch sử nổi tiếng của Đại tướng Võ Nguyên Giáp gửi các mặt trận: "Thần tốc, thần tốc hơn nữa; táo bạo, táo bạo hơn nữa; tranh thủ từng phút, từng giờ; xốc tới mặt trận, giải phóng miền Nam; quyết chiến và toàn thắng!". Sự lãnh đạo tài tình của Quân ủy Trung ương và lòng quả cảm của hàng triệu cán bộ, chiến sĩ đã tạo nên kỳ tích non sông thu về một mối.',
    verified: true,
  },
  {
    id: 'p2-02',
    title: 'Văn kiện Hội nghị Trung ương 24',
    year: '1975',
    period: 'Tháng 9/1975',
    dateStr: '09/1975',
    event: 'Nghị quyết số 24-NQ/TW',
    roomId: 'room2',
    description: 'Văn kiện xác định chủ trương, định hướng cho quá trình hiệp thương chính trị và tổng tuyển cử.',
    source: 'nvsk.vnanet.vn',
    category: 'Văn kiện',
    imageUrl: '/assets/images/05_van_kien_trung_uong_24.jpg',
    tags: ['Văn kiện Đảng', 'Nghị quyết 24', 'Chỉ đạo', 'Lịch sử'],
    details: 'Văn kiện xác định hoàn thành thống nhất đất nước về mặt Nhà nước là nhiệm vụ cấp bách hàng đầu, định hướng triệu tập hiệp thương và chuẩn bị Tổng tuyển cử.',
    verified: true,
  },

  // ---- Phòng 3: Hội nghị Hiệp thương chính trị ----
  {
    id: 'p3-01',
    title: 'Toàn cảnh Hội nghị Hiệp thương',
    year: '1975',
    period: '15 – 21/11/1975',
    dateStr: '15 – 21/11/1975',
    event: 'Hội nghị Hiệp thương chính trị thống nhất Tổ quốc tại Sài Gòn',
    roomId: 'room3',
    description: 'Hội nghị Hiệp thương chính trị thống nhất Tổ quốc, tổ chức tại Sài Gòn từ 15–21/11/1975.',
    source: 'ordi.vn',
    category: 'Hội nghị Hiệp thương',
    imageUrl: '/assets/images/06_hoi_nghi_hiep_thuong.jpg',
    tags: ['Hiệp thương', 'Sài Gòn', 'Hội trường Thống Nhất', 'Bắc - Nam'],
    details: 'Hội nghị diễn ra tại Dinh Độc Lập, quy tụ đại biểu nhân dân hai miền Bắc – Nam, cùng bàn bạc và đi đến thống nhất toàn diện việc tổ chức Tổng tuyển cử bầu Quốc hội chung.',
    verified: true,
  },
  {
    id: 'p3-02',
    title: 'Các đại biểu tham dự hội nghị',
    year: '1975',
    period: '15 – 21/11/1975',
    dateStr: '15 – 21/11/1975',
    event: 'Hai đoàn đại biểu đại diện cho nhân dân hai miền',
    roomId: 'room3',
    description: 'Đại biểu đại diện các tầng lớp nhân dân hai miền tham gia hiệp thương chính trị.',
    source: 'nvsk.vnanet.vn',
    category: 'Hội nghị Hiệp thương',
    imageUrl: '/assets/images/07_dai_bieu_hiep_thuong.jpg',
    tags: ['Đại biểu', 'Trường Chinh', 'Phạm Hùng', 'Đoàn kết'],
    details: 'Đoàn đại biểu miền Bắc do đồng chí Trường Chinh dẫn đầu và đoàn đại biểu miền Nam do đồng chí Phạm Hùng dẫn đầu cùng ký Thông cáo chung lịch sử ngày 21/11/1975.',
    verified: true,
  },
  {
    id: 'p3-soldier-01',
    title: 'Nữ tướng Nguyễn Thị Định - Tấm gương sáng của người chiến sĩ',
    year: '1975',
    period: '1975 – 1976',
    dateStr: 'Giai đoạn 1975 – 1976',
    event: 'Nữ Phó Tư lệnh Quân Giải phóng tham gia hiệp thương và thống nhất non sông',
    roomId: 'room3',
    description: 'Thiếu tướng Nguyễn Thị Định - Phó Tư lệnh Quân Giải phóng miền Nam Việt Nam, hình tượng tiêu biểu cho khí phách anh hùng của phụ nữ và chiến sĩ Việt Nam.',
    source: 'Bảo tàng Phụ nữ Nam Bộ',
    category: 'Chiến sĩ Việt Nam',
    imageUrl: '/assets/images/nguyen_thi_dinh.jpg',
    tags: ['Nguyễn Thị Định', 'Nữ tướng', 'Quân Giải phóng', 'Hiệp thương', 'Anh hùng'],
    details: 'Đồng chí Nguyễn Thị Định (1920 – 1992), người nữ tướng huyền thoại của đội quân tóc dài Bến Tre, Phó Tư lệnh Quân Giải phóng miền Nam Việt Nam. Trong giai đoạn lịch sử 1975 – 1976, bà đã tích cực vận động, chỉ đạo công tác hòa hợp dân tộc, tham gia hiệp thương chính trị và đóng góp to lớn vào việc bầu cử Quốc hội khóa VI của nước Việt Nam thống nhất.',
    verified: true,
  },

  // ---- Phòng 4: Tổng tuyển cử 25/4/1976 ----
  {
    id: 'p4-01',
    title: 'Cử tri đi bỏ phiếu',
    year: '1976',
    period: '25/04/1976',
    dateStr: '25/04/1976',
    event: 'Ngày hội non sông – Tổng tuyển cử bầu Quốc hội chung',
    roomId: 'room4',
    description: 'Nhân dân cả nước nô nức đi bầu cử Quốc hội chung ngày 25/4/1976.',
    source: 'baohaiphong.vn',
    category: 'Tổng tuyển cử 25/4/1976',
    imageUrl: '/assets/images/08_cu_tri_bo_phieu.jpg',
    tags: ['Tổng tuyển cử', '25/4/1976', 'Lá phiếu', 'Cử tri'],
    details: 'Hơn 23 triệu cử tri (98,77%) cả nước tham gia bỏ phiếu bầu ra 492 đại biểu Quốc hội thống nhất, thể hiện quyền làm chủ thiêng liêng của nhân dân.',
    verified: true,
  },
  {
    id: 'p4-02',
    title: 'Hòm phiếu Tổng tuyển cử',
    year: '1976',
    period: '25/04/1976',
    dateStr: '25/04/1976',
    event: 'Hiện vật lịch sử hòm phiếu bầu cử',
    roomId: 'room4',
    description: 'Hòm phiếu sử dụng trong cuộc Tổng tuyển cử bầu Quốc hội chung của cả nước.',
    source: 'daklakmuseum.vn',
    category: 'Tổng tuyển cử 25/4/1976',
    imageUrl: '/assets/images/09_hom_phieu.jpg',
    tags: ['Hòm phiếu', 'Hiện vật gốc', 'Quốc hội khóa VI', 'Kỷ vật'],
    details: 'Hòm phiếu mang biểu tượng Quốc huy thiêng liêng, nơi gửi gắm niềm tin và ý chí sắt son của đồng bào cả nước.',
    verified: true,
  },

  // ---- Phòng 5: Quốc hội khóa VI (Năm quyết định lịch sử) ----
  {
    id: 'p5-01',
    title: 'Quốc hiệu',
    year: '1976',
    period: '02/07/1976',
    dateStr: '02/07/1976',
    event: 'Nghị quyết đặt tên nước: Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    roomId: 'room5',
    description: 'Quốc hội khóa VI quyết định quốc hiệu nước ta là Cộng hòa xã hội chủ nghĩa Việt Nam.',
    source: 'thuvienphapluan.vn',
    category: 'Tư liệu Nhà nước',
    imageUrl: '/assets/images/quoc-hieu.png',
    tags: ['Quốc hiệu', 'CHXHCN Việt Nam', 'Nghị quyết', 'Quốc hội khóa VI'],
    details: 'Nước Việt Nam là một nước thống nhất, độc lập và xã hội chủ nghĩa, lấy tên là nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
    verified: true,
  },
  {
    id: 'p5-02',
    title: 'Quốc kỳ',
    year: '1976',
    period: '02/07/1976',
    dateStr: '02/07/1976',
    event: 'Xác lập Quốc kỳ: Cờ đỏ sao vàng năm cánh',
    roomId: 'room5',
    description: 'Lá cờ đỏ sao vàng được xác lập là Quốc kỳ của nước Việt Nam thống nhất.',
    source: 'thuvienphapluan.vn',
    category: 'Tư liệu Nhà nước',
    imageUrl: '/assets/images/11_quoc_ky.jpg',
    tags: ['Quốc kỳ', 'Cờ đỏ sao vàng', 'Biểu tượng quốc gia'],
    details: 'Quốc kỳ của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là cờ đỏ sao vàng năm cánh, tỷ lệ chiều rộng bằng hai phần ba chiều dài, ngôi sao vàng đặt ở chính giữa.',
    verified: true,
  },
  {
    id: 'p5-03',
    title: 'Quốc huy',
    year: '1976',
    period: '02/07/1976',
    dateStr: '02/07/1976',
    event: 'Xác lập Quốc huy nước CHXHCN Việt Nam',
    roomId: 'room5',
    description: 'Quốc huy nước Cộng hòa xã hội chủ nghĩa Việt Nam được xác lập tại kỳ họp này.',
    source: 'thuvienphapluan.vn',
    category: 'Tư liệu Nhà nước',
    imageUrl: '/assets/images/12_quoc_huy.jpg',
    tags: ['Quốc huy', 'Biểu tượng', 'Nhà nước'],
    details: 'Quốc huy hình tròn, nền đỏ, ở giữa có ngôi sao vàng năm cánh, xung quanh có bông lúa, ở dưới có nửa bánh xe răng cưa và dải lụa đỏ có chữ "Cộng hòa Xã hội Chủ nghĩa Việt Nam".',
    verified: true,
  },
  {
    id: 'p5-04',
    title: 'Quốc ca',
    year: '1976',
    period: '02/07/1976',
    dateStr: '02/07/1976',
    event: 'Xác lập Quốc ca: Bài Tiến quân ca (nhạc sĩ Văn Cao)',
    roomId: 'room5',
    description: 'Bài Tiến quân ca tiếp tục được chọn là Quốc ca của nước Việt Nam thống nhất.',
    source: 'chinhphu.vn',
    category: 'Tư liệu Nhà nước',
    imageUrl: '/assets/images/quoc-ca.jpg',
    audioUrl: '/assets/audio/quoc_ca.mp3',
    tags: ['Quốc ca', 'Tiến quân ca', 'Văn Cao', 'Giai điệu thiêng liêng'],
    details: 'Giai điệu hùng tráng của Tiến quân ca đã đồng hành cùng dân tộc từ Cách mạng Tháng Tám 1945, tiếp tục vang lên như bản anh hùng ca của nước Việt Nam thống nhất.',
    verified: true,
  },
  {
    id: 'p5-05',
    title: 'Thủ đô Hà Nội',
    year: '1976',
    period: '02/07/1976',
    dateStr: '02/07/1976',
    event: 'Quyết định Hà Nội là Thủ đô của nước Việt Nam thống nhất',
    roomId: 'room5',
    description: 'Hà Nội được chọn là thủ đô của nước Việt Nam thống nhất.',
    source: 'vietmytravel.com',
    category: 'Tư liệu Nhà nước',
    imageUrl: '/assets/images/13_ha_noi.jpg',
    tags: ['Thủ đô', 'Hà Nội', 'Trái tim cả nước', 'Ba Đình'],
    details: 'Hà Nội nghìn năm văn hiến chính thức là Thủ đô của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
    verified: true,
  },
  {
    id: 'p6-soldier-01',
    title: 'Ý chí quật cường của Bộ đội Cụ Hồ',
    year: '1975',
    period: '1975 – 1976',
    dateStr: 'Năm 1975 – 1976',
    event: 'Biểu tượng sáng ngời của người chiến sĩ Quân đội Nhân dân Việt Nam',
    roomId: 'room6',
    description: 'Hình tượng người lính Cụ Hồ - từ mũi tiến công thần tốc giải phóng non sông đến nhiệm vụ bảo vệ biển đảo, biên cương và cùng nhân dân kiến thiết đất nước thống nhất.',
    source: 'Lưu trữ Quốc gia Việt Nam',
    category: 'Chiến sĩ Việt Nam',
    imageUrl: '/assets/images/chien_si_quan_doi_tien_cong.jpg',
    tags: ['Bộ đội Cụ Hồ', 'Quân đội Nhân dân', 'Chiến sĩ', 'Bảo vệ Tổ quốc'],
    details: 'Trong suốt chiều dài lịch sử, đặc biệt là giai đoạn 1975 - 1976, người chiến sĩ Quân đội nhân dân Việt Nam luôn là lực lượng tiên phong, trung kiên với Đảng, hiếu nghĩa với dân. Các anh vừa giữ vững chủ quyền thiêng liêng ở Trường Sa, Hoàng Sa và biên cương Tổ quốc, vừa bắt tay giúp dân ổn định cuộc sống, bảo đảm trật tự trị an và tham gia ngày hội non sông Tổng tuyển cử 25/4/1976.',
    verified: true,
  }
];

export const EXHIBITION_ROOMS: ExhibitionRoom[] = [
  {
    id: 'room1',
    roomNumber: 1,
    title: 'Bối cảnh sau 30/4/1975',
    subtitle: 'Nước nhà độc lập nhưng thể chế Nhà nước còn tạm thời phân định',
    period: 'Tháng 5/1975 – Tháng 8/1975',
    overview: 'Đại thắng mùa Xuân 1975 đã giải phóng hoàn toàn miền Nam, giang sơn thu về một mối về mặt địa lý và lãnh thổ. Tuy nhiên, sau hơn 20 năm bị chiến tranh chia cắt, đất nước tạm thời tồn tại hai chính quyền với hai hệ thống pháp luật, cơ chế quản lý và thể chế nhà nước khác nhau ở hai miền.',
    heroHeading: 'MỐC SON 30/4/1975 VÀ ĐÒI HỎI LỊCH SỬ',
    heroSubheading: 'Non sông đã liền một dải – vì sao vẫn phải tiến hành thống nhất về mặt Nhà nước?',
    keyQuestion: 'Vì sao sau ngày 30/4/1975, Việt Nam vẫn phải tiến hành thống nhất về mặt Nhà nước?',
    keyQuestionAnswer: 'Sau 30/4/1975, Tổ quốc đã thống nhất về lãnh thổ, nhưng ở miền Bắc tồn tại Nhà nước Việt Nam Dân chủ Cộng hòa (với Quốc hội khóa V và Chính phủ), còn ở miền Nam tồn tại Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam (và Hội đồng Cố vấn). Tình trạng "một quốc gia, hai thể chế nhà nước" tạo ra sự phân tán trong điều hành vĩ mô, cản trở giao lưu kinh tế - văn hóa, gây khó khăn cho việc hoạch định chiến lược phát triển chung và vị thế đối ngoại của Việt Nam trên trường quốc tế. Do đó, thống nhất đất nước về mặt Nhà nước là đòi hỏi tất yếu khách quan.',
    keyAspects: [
      {
        id: 'asp-chinh-tri',
        title: 'Về Chính trị',
        iconName: 'landmark',
        summary: 'Hai hệ thống chính quyền cách mạng cùng hoạt động song song ở hai miền.',
        content: 'Miền Bắc dưới sự quản lý của Nhà nước Việt Nam Dân chủ Cộng hòa với Hiến pháp 1959. Miền Nam do Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam quản lý. Cần có một cơ quan quyền lực nhà nước tối cao duy nhất đại diện cho ý chí, nguyện vọng của toàn dân tộc.',
        historicalQuotes: 'Một nước không thể có hai cơ quan quyền lực nhà nước tối cao, hai chính phủ cùng tồn tại lâu dài.'
      },
      {
        id: 'asp-kinh-te',
        title: 'Về Kinh tế',
        iconName: 'trending-up',
        summary: 'Hai nền kinh tế có cơ cấu, tính chất và hậu quả chiến tranh khác biệt.',
        content: 'Miền Bắc cơ bản xây dựng nền kinh tế xã hội chủ nghĩa theo kế hoạch hóa nhưng bị chiến tranh phá hoại nặng nề; miền Nam kinh tế tư bản phát triển mang tính chất phụ thuộc ngoại viện, giao thông và chuỗi cung ứng bị đứt gãy. Yêu cầu cấp bách là phân công lại lao động, thống nhất tiền tệ, thông thương và quy hoạch kinh tế toàn quốc.',
      },
      {
        id: 'asp-xa-hoi',
        title: 'Về Xã hội & Đời sống',
        iconName: 'users',
        summary: 'Tàn dư chiến tranh, hàng triệu gia đình ly tán khao khát đoàn tụ trọn vẹn.',
        content: 'Sau hơn hai thập kỷ xa cách vì vĩ tuyến 17 chia cắt, đồng bào hai miền tha thiết muốn nối lại tình thân, đi lại tự do, thống nhất hệ thống giáo dục, y tế và giải quyết dứt điểm các tàn dư xã hội do chế độ cũ để lại.',
      },
      {
        id: 'asp-nha-nuoc',
        title: 'Về Thể chế Nhà nước',
        iconName: 'shield',
        summary: 'Yêu cầu có Hiến pháp mới, bộ máy chính quyền thống nhất từ Trung ương đến địa phương.',
        content: 'Cần có một Quốc hội thống nhất làm cơ quan lập hiến, lập pháp cao nhất để ban hành Hiến pháp mới, bầu ra các cơ quan nhà nước tối cao và thiết lập hệ thống pháp luật chuẩn mực cho toàn vẹn lãnh thổ.',
      },
      {
        id: 'asp-thong-nhat',
        title: 'Về Thống nhất Đất nước',
        iconName: 'flag',
        summary: 'Quy luật phát triển khách quan của lịch sử cách mạng Việt Nam.',
        content: 'Thống nhất về mặt Nhà nước là bước đi quyết định để hoàn tất quá trình thống nhất trọn vẹn của Tổ quốc, tạo cơ sở pháp lý vững chắc nâng cao uy tín quốc tế của Việt Nam.',
      }
    ],
    primaryArtifactIds: ['p1-01', 'p1-soldier-01', 'p1-soldier-02', 'p1-soldier-03', 'p1-02', 'p1-03', 'p1-04'],
    nextRoomId: 'room2',
    nextRoomActionText: 'Bước vào Phòng 2: Hội nghị Trung ương 24',
    quote: {
      text: 'Nước Việt Nam là một, dân tộc Việt Nam là một. Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi.',
      author: 'Chủ tịch Hồ Chí Minh',
      context: 'Chân lý thiêng liêng soi đường cho hành trình thống nhất đất nước'
    }
  },
  {
    id: 'room2',
    roomNumber: 2,
    title: 'Hội nghị Trung ương 24',
    subtitle: 'Nghị quyết lịch sử đề ra chủ trương hoàn thành thống nhất về mặt Nhà nước',
    period: 'Tháng 9/1975',
    overview: 'Tháng 9/1975, tại Đà Lạt (Lâm Đồng), Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (khóa III) đã họp và ra Nghị quyết lịch sử về nhiệm vụ chiến lược của cách mạng Việt Nam trong giai đoạn mới.',
    heroHeading: 'HỘI NGHỊ BAN CHẤP HÀNH TRUNG ƯƠNG ĐẢNG LẦN THỨ 24',
    heroSubheading: 'Quyết sách chiến lược mở đường cho sự ra đời của một Nhà nước Việt Nam thống nhất',
    keyAspects: [
      {
        id: 'asp-chu-truong',
        title: 'Chủ trương chiến lược của Đảng',
        iconName: 'file-text',
        summary: 'Xác định hoàn thành thống nhất đất nước về mặt Nhà nước là nhiệm vụ hàng đầu.',
        content: 'Hội nghị khẳng định: Thống nhất đất nước vừa là nguyện vọng tha thiết bậc nhất của nhân dân cả nước, vừa là quy luật khách quan của sự phát triển cách mạng Việt Nam, của lịch sử dân tộc Việt Nam.',
      },
      {
        id: 'asp-vai-tro',
        title: 'Vai trò đối với tiến trình cách mạng',
        iconName: 'compass',
        summary: 'Vạch rõ lộ trình, nguyên tắc và bước đi cụ thể cho hiệp thương Bắc – Nam.',
        content: 'Nghị quyết TW 24 nêu rõ: Không thể chậm trễ việc hoàn thành thống nhất đất nước về mặt Nhà nước. Cần sớm tổ chức một cuộc Tổng tuyển cử bầu ra Quốc hội chung cho cả nước, làm cơ sở hợp nhất các cơ quan nhà nước.',
      },
      {
        id: 'asp-hiep-thuong-dinh-huong',
        title: 'Định hướng cho Hiệp thương chính trị',
        iconName: 'git-merge',
        summary: 'Giao nhiệm vụ tiến hành Hội nghị hiệp thương giữa hai đoàn đại biểu miền Bắc và miền Nam.',
        content: 'Chỉ đạo hai miền chuẩn bị chu đáo để sớm tổ chức Hội nghị hiệp thương chính trị nhằm bàn bạc dân chủ, đi đến nhất trí về các biện pháp thực hiện Tổng tuyển cử trên cả nước.',
      }
    ],
    primaryArtifactIds: ['p2-01', 'p2-soldier-01', 'p2-02'],
    nextRoomId: 'room3',
    nextRoomActionText: 'Điều gì xảy ra tiếp theo? Bước sang Hội nghị Hiệp thương',
    quote: {
      text: 'Hoàn thành thống nhất nước nhà là nhiệm vụ cấp bách số một của toàn Đảng, toàn quân, toàn dân ta lúc này.',
      author: 'Nghị quyết Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (9/1975)',
      context: 'Quyết định mở đường cho kỷ nguyên thống nhất toàn vẹn'
    }
  },
  {
    id: 'room3',
    roomNumber: 3,
    title: 'Hội nghị Hiệp thương',
    subtitle: 'Sự đồng thuận lịch sử giữa đại biểu nhân dân hai miền Bắc – Nam',
    period: '15/11/1975 – 21/11/1975',
    overview: 'Từ ngày 15 đến 21/11/1975, tại Hội trường Dinh Độc Lập (Sài Gòn), Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc đã diễn ra trong không khí tràn ngập tinh thần đoàn kết máu thịt Bắc – Nam một nhà.',
    heroHeading: 'HỘI NGHỊ HIỆP THƯƠNG CHÍNH TRỊ THỐNG NHẤT TỔ QUỐC',
    heroSubheading: 'Tiếng nói đồng thuận sắt son của hơn 45 triệu đồng bào cả nước',
    visualStory: [
      {
        step: 1,
        title: 'Trước Hiệp thương',
        time: 'Tháng 10 – 11/1975',
        description: 'Ủy ban Thường vụ Quốc hội nước Việt Nam Dân chủ Cộng hòa và Ủy ban Trung ương Mặt trận Dân tộc Giải phóng miền Nam Việt Nam họp chuẩn bị nhân sự và nội dung.',
        highlight: 'Hai đoàn đại biểu đại diện cho nhân dân hai miền được thành lập với đầy đủ thẩm quyền pháp lý và chính trị.'
      },
      {
        step: 2,
        title: 'Khai mạc Hiệp thương tại Sài Gòn',
        time: '15/11/1975',
        description: 'Đoàn đại biểu miền Bắc do đồng chí Trường Chinh dẫn đầu; đoàn đại biểu miền Nam do đồng chí Phạm Hùng dẫn đầu tiến hành hội nghị tại Dinh Độc Lập.',
        highlight: 'Không khí trang nghiêm, ấm áp tình đồng chí, khẳng định non sông Việt Nam là một thể thống nhất không thể chia cắt.'
      },
      {
        step: 3,
        title: 'Những nội dung được thống nhất tuyệt đối',
        time: '21/11/1975',
        description: 'Ký Thông cáo chung nhất trí: cần tổ chức sớm Tổng tuyển cử trên toàn quốc theo nguyên tắc phổ thông, bình đẳng, trực tiếp và bỏ phiếu kín.',
        highlight: 'Xác định thời gian Tổng tuyển cử vào nửa đầu năm 1976 để thành lập Quốc hội thống nhất.'
      },
      {
        step: 4,
        title: 'Chuẩn bị cho Tổng tuyển cử toàn quốc',
        time: 'Tháng 12/1975 – 4/1976',
        description: 'Hai miền phối hợp thành lập Hội đồng bầu cử toàn quốc, lập danh sách cử tri, hiệp thương lập danh sách người ứng cử và tuyên truyền sâu rộng.',
        highlight: 'Khí thế chuẩn bị sôi nổi khắp mọi thôn xóm, phường phố, công trường, cơ quan xí nghiệp từ Bắc chí Nam.'
      }
    ],
    keyAspects: [
      {
        id: 'asp-doan-bieu',
        title: 'Thành phần hai đoàn đại biểu',
        iconName: 'users',
        summary: 'Quy tụ các đồng chí lãnh đạo kiệt xuất và nhân sĩ, trí thức uy tín của hai miền.',
        content: 'Đoàn đại biểu miền Bắc gồm 25 đại biểu; đoàn đại biểu miền Nam gồm 25 đại biểu, đại diện cho mọi giai cấp, dân tộc, tôn giáo và các lực lượng yêu nước.',
      },
      {
        id: 'asp-thong-cao',
        title: 'Thông cáo chung lịch sử',
        iconName: 'file-check',
        summary: 'Văn kiện kết tinh ý chí nguyện vọng của toàn dân tộc Việt Nam.',
        content: 'Thông cáo khẳng định: Tổ chức bầu cử Quốc hội chung trong cả nước là biện pháp căn bản và dân chủ nhất để hoàn thành thống nhất đất nước về mặt Nhà nước.',
      }
    ],
    primaryArtifactIds: ['p3-01', 'p3-soldier-01', 'p3-02'],
    nextRoomId: 'room4',
    nextRoomActionText: 'Tiến tới Phòng 4: Tổng tuyển cử 25/4/1976',
    quote: {
      text: 'Hội nghị Hiệp thương chính trị là một sự kiện lịch sử trọng đại, thể hiện ý chí sắt đá và nguyện vọng thiết tha của toàn dân tộc ta muốn hoàn thành thống nhất Tổ quốc.',
      author: 'Thông cáo chung Hội nghị Hiệp thương Chính trị (21/11/1975)',
      context: 'Văn kiện nền tảng pháp lý cho Tổng tuyển cử toàn quốc'
    }
  },
  {
    id: 'room4',
    roomNumber: 4,
    title: 'Tổng tuyển cử 25/4/1976',
    subtitle: 'Ngày hội non sông – Hơn 23 triệu cử tri cả nước đi bỏ phiếu',
    period: '25/4/1976',
    overview: 'Ngày 25/4/1976 đi vào lịch sử dân tộc như một trong những ngày hội lớn nhất: Cuộc Tổng tuyển cử bầu Quốc hội chung được tiến hành trên phạm vi cả nước. Hơn 23 triệu cử tri (đạt 98,77%) đã nô nức đi bỏ phiếu với niềm tự hào sâu sắc của công dân một nước độc lập, thống nhất.',
    heroHeading: '25/4/1976 – NGÀY HỘI TỔNG TUYỂN CỬ TRONG CẢ NƯỚC',
    heroSubheading: 'Lá phiếu dân chủ thống nhất non sông, quy tụ ý chí của mọi tầng lớp đồng bào',
    keyAspects: [
      {
        id: 'asp-quy-mo',
        title: 'Quy mô và Tỷ lệ cử tri',
        iconName: 'bar-chart-2',
        summary: '23.118.599 cử tri (đạt 98,77% cử tri cả nước) đi bỏ phiếu.',
        content: 'Ở miền Bắc có 99,36% cử tri đi bầu; ở miền Nam có 98,59% cử tri đi bầu. Nhiều khu vực vùng sâu, vùng xa, hải đảo có tỷ lệ tham gia 100%.',
      },
      {
        id: 'asp-ket-qua',
        title: 'Kết quả bầu cử Quốc hội khóa VI',
        iconName: 'check-circle-2',
        summary: 'Bầu ra 492 đại biểu tiêu biểu cho khối đại đoàn kết toàn dân tộc.',
        content: 'Gồm 249 đại biểu ở miền Bắc và 243 đại biểu ở miền Nam. Trong đó có 80 công nhân, 100 nông dân, 98 trí thức văn nghệ sĩ, 67 đại biểu dân tộc thiểu số, 132 phụ nữ, 127 thanh niên và đại diện các tôn giáo.',
      },
      {
        id: 'asp-y-nghia-bau-cu',
        title: 'Ý nghĩa của cuộc Tổng tuyển cử',
        iconName: 'award',
        summary: 'Thắng lợi rực rỡ của quyền làm chủ tập thể và tinh thần yêu nước nồng nàn.',
        content: 'Cuộc Tổng tuyển cử đã hợp thức hóa và khẳng định tính chính danh của Nhà nước thống nhất trên bình diện quốc gia và quốc tế, chứng minh sức mạnh của khối đại đoàn kết dân tộc.',
      }
    ],
    primaryArtifactIds: ['p4-01', 'p4-02'],
    nextRoomId: 'room5',
    nextRoomActionText: 'Khám phá Kỳ họp Quốc hội đầu tiên (Phòng 5)',
    quote: {
      text: 'Ngày 25 tháng 4 năm 1976 là một ngày hội tưng bừng của nhân dân ta trên khắp dải đất hình chữ S, ngày mà lần đầu tiên sau hơn ba mươi năm, nhân dân cả nước cùng nhau cầm lá phiếu bầu ra Quốc hội thống nhất.',
      author: 'Lưu trữ Lịch sử Quốc hội Việt Nam',
      context: 'Ghi nhận về ngày bầu cử lịch sử 25/4/1976'
    }
  },
  {
    id: 'room5',
    roomNumber: 5,
    title: 'Kỳ họp Quốc hội đầu tiên',
    subtitle: 'Kỳ họp thứ nhất Quốc hội khóa VI (24/6 – 3/7/1976 tại Hà Nội)',
    period: '24/6/1976 – 3/7/1976',
    overview: 'Từ ngày 24/6 đến ngày 3/7/1976, tại Hội trường Ba Đình (Hà Nội), Kỳ họp thứ nhất của Quốc hội thống nhất (Quốc hội khóa VI) đã họp và đưa ra những quyết sách lịch sử mang tính lập quốc, hoàn thành thắng lợi trọn vẹn quá trình thống nhất đất nước về mặt Nhà nước.',
    heroHeading: 'KỲ HỌP THỨ NHẤT QUỐC HỘI KHÓA VI',
    heroSubheading: 'Bàn thảo và thông qua các quyết định lịch sử khai sinh thể chế Nhà nước Cộng hòa XHCN Việt Nam',
    documents: [
      {
        id: 'doc-ten-nuoc',
        title: 'Nghị quyết về Tên nước',
        decisionNumber: 'Nghị quyết ngày 02/07/1976',
        date: '02/07/1976',
        significance: 'Quyết định đặt tên nước là: NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM.',
        content: 'Chính thức đổi tên nước thành Cộng hòa Xã hội Chủ nghĩa Việt Nam, khẳng định mục tiêu độc lập dân tộc gắn liền với chủ nghĩa xã hội.',
        officialTextQuote: 'Nước Việt Nam là một nước thống nhất, độc lập và xã hội chủ nghĩa, lấy tên là nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.'
      },
      {
        id: 'doc-bieu-tuong',
        title: 'Nghị quyết về Quốc kỳ, Quốc huy, Quốc ca, Thủ đô',
        decisionNumber: 'Nghị quyết ngày 02/07/1976',
        date: '02/07/1976',
        significance: 'Thống nhất toàn diện các biểu tượng thiêng liêng của quốc gia.',
        content: 'Quốc kỳ: Cờ đỏ sao vàng năm cánh; Quốc huy: Nền đỏ, ngôi sao vàng ở giữa, xung quanh là bông lúa và bánh xe răng cưa; Quốc ca: Bài "Tiến quân ca" của nhạc sĩ Văn Cao; Thủ đô của nước Việt Nam thống nhất là Hà Nội.',
        officialTextQuote: 'Quốc kỳ của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là cờ đỏ sao vàng năm cánh; Thủ đô nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là Hà Nội.'
      },
      {
        id: 'doc-sai-gon',
        title: 'Nghị quyết đổi tên thành phố Sài Gòn – Gia Định',
        decisionNumber: 'Nghị quyết ngày 02/07/1976',
        date: '02/07/1976',
        significance: 'Chính thức đổi tên thành phố Sài Gòn – Gia Định thành THÀNH PHỐ HỒ CHÍ MINH.',
        content: 'Thể hiện lòng biết ơn vô hạn của nhân dân miền Nam và cả nước đối với công lao trời biển của Chủ tịch Hồ Chí Minh vĩ đại.',
        officialTextQuote: 'Thành phố Sài Gòn - Gia Định từ nay mang tên Thành phố Hồ Chí Minh.'
      },
      {
        id: 'doc-lanh-dao',
        title: 'Nghị quyết bầu các cơ quan lãnh đạo cao nhất của Nhà nước',
        decisionNumber: 'Kỳ họp thứ nhất Quốc hội khóa VI',
        date: '02 – 03/07/1976',
        significance: 'Thiết lập bộ máy chính quyền thống nhất từ Trung ương.',
        content: 'Chủ tịch nước: Đồng chí Tôn Đức Thắng; Phó Chủ tịch nước: Đồng chí Nguyễn Lương Bằng và đồng chí Nguyễn Hữu Thọ; Chủ tịch Ủy ban Thường vụ Quốc hội: Đồng chí Trường Chinh; Thủ tướng Chính phủ: Đồng chí Phạm Văn Đồng.',
        officialTextQuote: 'Bầu ra các đồng chí lãnh đạo ưu tú của Đảng và Nhà nước gánh vác sứ mệnh chèo lái non sông thống nhất.'
      },
      {
        id: 'doc-lap-hien',
        title: 'Nghị quyết thành lập Ủy ban Dự thảo Hiến pháp',
        decisionNumber: 'Nghị quyết ngày 02/07/1976',
        date: '02/07/1976',
        significance: 'Chuẩn bị Hiến pháp mới của nước Việt Nam thống nhất (Hiến pháp 1980).',
        content: 'Ủy ban Dự thảo Hiến pháp gồm 36 thành viên do đồng chí Trường Chinh làm Chủ tịch, đặt nền móng pháp lý cho Hiến pháp năm 1980.',
        officialTextQuote: 'Trong khi chưa có Hiến pháp mới, Nhà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam hoạt động theo Hiến pháp năm 1959.'
      }
    ],
    primaryArtifactIds: ['p5-01', 'p5-02', 'p5-03', 'p5-04', 'p5-05'],
    nextRoomId: 'room6',
    nextRoomActionText: 'Tổng kết: Phòng 6 – Đánh giá sự kiện hợp nhất',
    quote: {
      text: 'Quốc hội này là Quốc hội của một nước Việt Nam hoàn toàn độc lập, thống nhất và đang tiến bước vững chắc lên chủ nghĩa xã hội.',
      author: 'Chủ tịch Quốc hội Trường Chinh phát biểu bế mạc Kỳ họp (3/7/1976)',
      context: 'Dấu mốc hoàn thành thắng lợi trọn vẹn quá trình thống nhất Nhà nước'
    }
  },
  {
    id: 'room6',
    roomNumber: 6,
    title: 'Đánh giá sự kiện hợp nhất',
    subtitle: 'Ý nghĩa lịch sử vĩ đại và bài học kinh nghiệm sâu sắc',
    period: 'Tổng kết lịch sử',
    overview: 'Việc hoàn thành thống nhất đất nước về mặt Nhà nước (1975–1976) là một thắng lợi có ý nghĩa lịch sử to lớn, mở ra kỷ nguyên mới của dân tộc: kỷ nguyên độc lập, tự do, thống nhất và cả nước cùng tiến lên xây dựng chủ nghĩa xã hội.',
    heroHeading: 'HOÀN THÀNH THẮNG LỢI HÀNH TRÌNH THỐNG NHẤT NHÀ NƯỚC',
    heroSubheading: 'Tầm vóc lịch sử trên các phương diện Chính trị, Nhà nước, Pháp lý, Xã hội và Dân tộc',
    keyAspects: [
      {
        id: 'eval-chinh-tri',
        title: 'Phương diện Chính trị',
        iconName: 'flag',
        summary: 'Chấm dứt hoàn toàn tình trạng chia cắt thể chế, thống nhất ý chí lãnh đạo toàn dân tộc.',
        content: 'Tạo nên sức mạnh tổng hợp của toàn dân tộc dưới sự lãnh đạo thống nhất của Đảng Cộng sản Việt Nam; củng cố vững chắc nền chuyên chính vô sản và quyền làm chủ của nhân dân từ Bắc chí Nam.',
      },
      {
        id: 'eval-nha-nuoc',
        title: 'Phương diện Nhà nước',
        iconName: 'landmark',
        summary: 'Thiết lập một bộ máy chính quyền thống nhất, đồng bộ từ Trung ương đến cơ sở.',
        content: 'Chấm dứt sự tồn tại của hai chính phủ và hai thể chế tạm thời; xây dựng Nhà nước của dân, do dân, vì dân có đủ năng lực quản lý toàn bộ lãnh thổ, lãnh hải và vùng trời Tổ quốc.',
      },
      {
        id: 'eval-phap-ly',
        title: 'Phương diện Pháp lý & Quốc tế',
        iconName: 'scale',
        summary: 'Hoàn thiện tính pháp lý chính danh tối cao của nước Việt Nam trên trường quốc tế.',
        content: 'Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam trở thành chủ thể pháp lý quốc tế duy nhất đại diện cho toàn vẹn lãnh thổ Việt Nam; tạo điều kiện thuận lợi để gia nhập Liên Hợp Quốc (tháng 9/1977) và mở rộng quan hệ đối ngoại.',
      },
      {
        id: 'eval-xa-hoi',
        title: 'Phương diện Xã hội & Nhân văn',
        iconName: 'heart',
        summary: 'Thỏa mãn khát vọng cháy bỏng ngàn đời về non sông liền một dải, gia đình sum họp.',
        content: 'Hàn gắn vết thương chiến tranh, xóa bỏ mặc cảm chia cắt, củng cố khối đại đoàn kết toàn dân tộc; tạo điều kiện thuận lợi cho nhân dân hai miền giao lưu, học tập, công tác và phát triển văn hóa - xã hội.',
      },
      {
        id: 'eval-lich-su',
        title: 'Phương diện Lịch sử & Tương lai',
        iconName: 'award',
        summary: 'Tạo tiền đề chính trị - vật chất cơ bản để đất nước bước vào công cuộc đổi mới.',
        content: 'Là mốc son chói lọi khép lại giai đoạn kháng chiến gian khổ chống ngoại xâm, mở ra kỷ nguyên xây dựng đất nước đàng hoàng hơn, to đẹp hơn theo di chúc thiêng liêng của Chủ tịch Hồ Chí Minh.',
      }
    ],
    primaryArtifactIds: ['p6-soldier-01', 'p1-01', 'p2-01', 'p3-01', 'p4-01', 'p5-01'],
    quote: {
      text: 'Thắng lợi của việc hoàn thành thống nhất đất nước về mặt Nhà nước là thắng lợi của tinh thần yêu nước nồng nàn, ý chí độc lập tự chủ và truyền thống đoàn kết quật cường của dân tộc Việt Nam.',
      author: 'Văn kiện Đảng Toàn tập (Tập 37)',
      context: 'Đánh giá tổng kết của Đảng về sự kiện hợp nhất non sông'
    }
  }
];

export const TIMELINE_NODES: TimelineNode[] = [
  {
    id: 'time-1',
    date: '30/04/1975',
    year: 1975,
    title: 'Đại thắng mùa Xuân – Giải phóng hoàn toàn miền Nam',
    shortDesc: 'Chiến dịch Hồ Chí Minh toàn thắng, giải phóng hoàn toàn miền Nam, thống nhất non sông về mặt lãnh thổ.',
    fullDesc: 'Lúc 11 giờ 30 phút ngày 30/4/1975, lá cờ cách mạng tung bay trên nóc Dinh Độc Lập, đánh dấu sự sụp đổ hoàn toàn của chính quyền Sài Gòn. Đất nước chấm dứt hơn 20 năm chiến tranh chia cắt, non sông thu về một mối về mặt địa lý.',
    roomId: 'room1',
    artifactId: 'art-01',
    significance: 'Tiền đề căn bản và quyết định để bước vào quá trình thống nhất đất nước về mặt Nhà nước.',
    iconType: 'flag'
  },
  {
    id: 'time-2',
    date: '05/1975 – 08/1975',
    year: 1975,
    title: 'Bối cảnh sau chiến tranh & Đòi hỏi thống nhất thể chế',
    shortDesc: 'Đất nước độc lập nhưng tạm thời còn tồn tại hai thể chế nhà nước và hai chính quyền song song.',
    fullDesc: 'Miền Bắc là Nhà nước Việt Nam Dân chủ Cộng hòa; miền Nam là Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam. Đòi hỏi khách quan cấp bách là phải thống nhất bộ máy nhà nước để quy tụ sức mạnh tái thiết quốc gia.',
    roomId: 'room1',
    artifactId: 'art-01',
    significance: 'Làm sáng tỏ căn nguyên vì sao cần sớm thống nhất đất nước về mặt Nhà nước.',
    iconType: 'users'
  },
  {
    id: 'time-3',
    date: '09/1975',
    year: 1975,
    title: 'Hội nghị Ban Chấp hành Trung ương Đảng lần thứ 24',
    shortDesc: 'Đề ra chủ trương hoàn thành thống nhất đất nước về mặt Nhà nước là nhiệm vụ cấp bách hàng đầu.',
    fullDesc: 'Hội nghị Trung ương 24 (khóa III) họp tại Đà Lạt, khẳng định thống nhất đất nước vừa là nguyện vọng tha thiết của nhân dân cả nước, vừa là quy luật khách quan của sự phát triển cách mạng Việt Nam.',
    roomId: 'room2',
    artifactId: 'art-04',
    significance: 'Đường lối lãnh đạo chiến lược mở đường cho giai đoạn hiệp thương và chuẩn bị bầu cử.',
    iconType: 'landmark'
  },
  {
    id: 'time-4',
    date: '15/11 – 21/11/1975',
    year: 1975,
    title: 'Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc',
    shortDesc: 'Đại biểu hai miền Bắc – Nam họp tại Sài Gòn, nhất trí tuyệt đối việc tổ chức Tổng tuyển cử sớm.',
    fullDesc: 'Diễn ra tại Hội trường Dinh Độc Lập (Sài Gòn), đoàn đại biểu miền Bắc do đồng chí Trường Chinh dẫn đầu và đoàn miền Nam do đồng chí Phạm Hùng dẫn đầu đã ký kết Thông cáo chung quyết định tổ chức Tổng tuyển cử bầu Quốc hội chung vào nửa đầu năm 1976.',
    roomId: 'room3',
    artifactId: 'art-02',
    significance: 'Sự đồng thuận lịch sử tạo cơ sở pháp lý và chính trị chuẩn bị cho cuộc Tổng tuyển cử toàn quốc.',
    iconType: 'users'
  },
  {
    id: 'time-5',
    date: '25/04/1976',
    year: 1976,
    title: 'Tổng tuyển cử bầu Quốc hội chung trong cả nước',
    shortDesc: 'Hơn 23 triệu cử tri (98,77%) cả nước nô nức đi bỏ phiếu bầu ra 492 đại biểu Quốc hội thống nhất.',
    fullDesc: 'Ngày hội lớn của non sông khi đồng bào cả nước từ các công nhân, nông dân, trí thức đến linh mục, hòa thượng, phụ nữ áo dài cầm lá phiếu bầu cử Quốc hội khóa VI – cơ quan quyền lực nhà nước tối cao của nước Việt Nam thống nhất.',
    roomId: 'room4',
    artifactId: 'art-05',
    significance: 'Biểu hiện rực rỡ của quyền làm chủ tập thể và tinh thần đại đoàn kết toàn dân tộc.',
    iconType: 'vote'
  },
  {
    id: 'time-6',
    date: '24/06 – 03/07/1976',
    year: 1976,
    title: 'Kỳ họp thứ nhất Quốc hội khóa VI (Hà Nội)',
    shortDesc: 'Thông qua các nghị quyết lập quốc: Đặt tên nước là CHXHCN Việt Nam, Quốc kỳ, Quốc huy, Quốc ca, Thủ đô, đổi tên TP.HCM.',
    fullDesc: 'Quốc hội họp tại Hội trường Ba Đình (Hà Nội), chính thức tuyên bố nước Việt Nam thống nhất với tên gọi Cộng hòa Xã hội Chủ nghĩa Việt Nam; bầu các chức danh lãnh đạo cao nhất của Nhà nước (Chủ tịch nước Tôn Đức Thắng, Thủ tướng Phạm Văn Đồng, Chủ tịch Quốc hội Trường Chinh).',
    roomId: 'room5',
    artifactId: 'art-02',
    significance: 'Hoàn thành thắng lợi trọn vẹn toàn bộ quá trình thống nhất đất nước về mặt Nhà nước.',
    iconType: 'award'
  },
  {
    id: 'time-7',
    date: '02/07/1976',
    year: 1976,
    title: 'Hoàn thành thống nhất Nhà nước – Mở ra kỷ nguyên mới',
    shortDesc: 'Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam chính thức bước vào kỷ nguyên độc lập, thống nhất và phát triển.',
    fullDesc: 'Chấm dứt hoàn toàn tình trạng chia cắt thể chế, đất nước bước vào thời kỳ khôi phục và phát triển kinh tế, tạo thế và lực mới để gia nhập Liên Hợp Quốc (1977) và tiến hành công cuộc đổi mới toàn diện.',
    roomId: 'room6',
    artifactId: 'art-06',
    significance: 'Thắng lợi mang tầm vóc thời đại của cách mạng Việt Nam.',
    iconType: 'landmark'
  }
];

export const HISTORICAL_LOCATIONS: HistoricalLocation[] = [
  {
    id: 'loc-hanoi',
    name: 'Hà Nội – Hội trường Ba Đình',
    historicName: 'Thủ đô Hà Nội',
    coordinates: { x: 48, y: 16 },
    city: 'Hà Nội',
    role: 'Trung tâm chính trị của cả nước, nơi diễn ra Kỳ họp thứ nhất Quốc hội khóa VI',
    description: 'Tại Hội trường Ba Đình lịch sử từ 24/6 đến 3/7/1976, Quốc hội khóa VI đã họp kỳ họp đầu tiên, thông qua Nghị quyết đặt tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam, bầu lãnh đạo Nhà nước và quy định Quốc kỳ, Quốc huy, Quốc ca.',
    roomId: 'room5',
    relatedArtifactId: 'art-05',
    events: [
      'Kỳ họp thứ nhất Quốc hội khóa VI (24/6 – 3/7/1976)',
      'Nghị quyết xác định Hà Nội là Thủ đô của nước Việt Nam thống nhất',
      'Đại hội IV của Đảng (12/1976)'
    ]
  },
  {
    id: 'loc-haiphong',
    name: 'Hải Phòng – Cảng Hải Phòng',
    historicName: 'Thành phố Cảng Hải Phòng',
    coordinates: { x: 55, y: 18 },
    city: 'Hải Phòng',
    role: 'Điểm bầu cử sôi nổi của giai cấp công nhân trong ngày Tổng tuyển cử 25/4/1976',
    description: 'Nơi công nhân cảng, thợ máy, kỹ sư tập trung bỏ phiếu bầu cử Quốc hội trên các thùng phiếu đặt bên bến tàu, xe máy kéo, thể hiện tinh thần lao động sản xuất và quyền làm chủ đất nước.',
    roomId: 'room4',
    relatedArtifactId: 'art-05',
    events: [
      'Công nhân Cảng Hải Phòng bỏ phiếu Tổng tuyển cử 25/4/1976',
      'Đóng góp sức người sức của phục vụ chi viện và tái thiết giao thông biển'
    ]
  },
  {
    id: 'loc-dalat',
    name: 'Đà Lạt – Lâm Đồng',
    historicName: 'Đà Lạt',
    coordinates: { x: 56, y: 72 },
    city: 'Lâm Đồng',
    role: 'Địa điểm tổ chức Hội nghị Ban Chấp hành Trung ương Đảng lần thứ 24',
    description: 'Tháng 9/1975, Trung ương Đảng họp tại Đà Lạt để thông qua Nghị quyết số 24 đề ra chủ trương và lộ trình hoàn thành thống nhất đất nước về mặt Nhà nước.',
    roomId: 'room2',
    relatedArtifactId: 'art-04',
    events: [
      'Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng khóa III (9/1975)',
      'Quyết sách hoàn thành thống nhất đất nước về mặt Nhà nước'
    ]
  },
  {
    id: 'loc-saigon',
    name: 'Thành phố Hồ Chí Minh – Dinh Độc Lập',
    historicName: 'Sài Gòn – Gia Định (Hội trường Thống Nhất)',
    coordinates: { x: 46, y: 82 },
    city: 'TP. Hồ Chí Minh',
    role: 'Nơi diễn ra Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc (11/1975)',
    description: 'Tại Dinh Độc Lập, từ 15 đến 21/11/1975, hai đoàn đại biểu miền Bắc và miền Nam đã họp Hội nghị Hiệp thương lịch sử, mở đường cho ngày Tổng tuyển cử 25/4/1976. Ngày 2/7/1976, thành phố vinh dự được Quốc hội đổi tên thành Thành phố Hồ Chí Minh.',
    roomId: 'room3',
    relatedArtifactId: 'art-02',
    events: [
      'Giải phóng hoàn toàn thành phố (30/4/1975)',
      'Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc (15 – 21/11/1975)',
      'Nghị quyết Quốc hội chính thức đổi tên thành Thành phố Hồ Chí Minh (2/7/1976)'
    ]
  },
  {
    id: 'loc-benhai',
    name: 'Quảng Trị – Vĩ tuyến 17 Bến Hải',
    historicName: 'Cầu Hiền Lương – Sông Bến Hải',
    coordinates: { x: 50, y: 44 },
    city: 'Quảng Trị',
    role: 'Biểu tượng xóa bỏ ranh giới chia cắt đau thương hơn 20 năm',
    description: 'Nơi từng là giới tuyến quân sự tạm thời chia cắt hai miền suốt hơn hai mươi năm. Thắng lợi thống nhất Nhà nước đã chính thức xóa bỏ vĩnh viễn ranh giới chia cắt, nối liền dòng sông Bến Hải và nhịp cầu Hiền Lương.',
    roomId: 'room1',
    relatedArtifactId: 'art-01',
    events: [
      'Xóa bỏ vĩ tuyến 17 giới tuyến quân sự tạm thời',
      'Đoàn tụ nhân dân hai bờ Nam – Bắc sau chiến tranh'
    ]
  }
];

export const ROOM_QUIZZES: Record<string, QuizQuestion[]> = {
  room1: [
    {
      id: 'q1-1',
      roomId: 'room1',
      question: 'Sau ngày 30/4/1975, tình hình thể chế nhà nước ở hai miền Việt Nam như thế nào?',
      options: [
        'Đã ngay lập tức thống nhất thành một Chính phủ duy nhất ở Hà Nội',
        'Tồn tại hai chính quyền riêng biệt ở miền Bắc và miền Nam',
        'Miền Nam do Liên Hợp Quốc tạm thời ủy trị quản lý',
        'Miền Bắc sáp nhập chính quyền vào Chính phủ Cách mạng lâm thời'
      ],
      correctIndex: 1,
      explanation: 'Sau 30/4/1975, dù non sông đã thống nhất về mặt lãnh thổ, ở miền Bắc vẫn là Nhà nước Việt Nam Dân chủ Cộng hòa, còn ở miền Nam là Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam. Do đó vẫn tồn tại 2 chính quyền.',
      sourceRef: 'Giáo trình Lịch sử Đảng Cộng sản Việt Nam & Bối cảnh sau 30/4/1975'
    },
    {
      id: 'q1-2',
      roomId: 'room1',
      question: 'Vì sao sau ngày 30/4/1975, Việt Nam vẫn phải tiến hành thống nhất về mặt Nhà nước?',
      options: [
        'Để thỏa mãn yêu cầu của các nước tư bản phương Tây',
        'Để có một cơ quan quyền lực tối cao duy nhất lãnh đạo toàn diện và đại diện pháp lý quốc tế',
        'Để giải tán toàn bộ các tổ chức chính trị ở miền Bắc',
        'Để phân chia ngân sách riêng biệt cho từng vùng miền'
      ],
      correctIndex: 1,
      explanation: 'Một quốc gia độc lập không thể tồn tại song song hai cơ quan quyền lực nhà nước tối cao và hai chính phủ. Thống nhất về mặt Nhà nước là đòi hỏi tất yếu khách quan để hoạch định chiến lược kinh tế - xã hội chung và khẳng định vị thế pháp lý quốc tế duy nhất.',
      sourceRef: 'Tài liệu dự án Lịch sử Đảng - Câu hỏi định hướng số 1'
    },
    {
      id: 'q1-3',
      roomId: 'room1',
      question: 'Cơ quan quyền lực nhà nước cao nhất ở miền Bắc trước khi thống nhất là cơ quan nào?',
      options: [
        'Hội đồng Cố vấn Chính phủ',
        'Quốc hội nước Việt Nam Dân chủ Cộng hòa',
        'Ủy ban Quân quản Thành phố',
        'Mặt trận Dân tộc Giải phóng'
      ],
      correctIndex: 1,
      explanation: 'Ở miền Bắc, Quốc hội nước Việt Nam Dân chủ Cộng hòa (đang ở khóa V) là cơ quan lập pháp và quyền lực nhà nước cao nhất theo Hiến pháp năm 1959.',
      sourceRef: 'Hiến pháp năm 1959 nước Việt Nam Dân chủ Cộng hòa'
    }
  ],
  room2: [
    {
      id: 'q2-1',
      roomId: 'room2',
      question: 'Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (khóa III) họp vào thời gian và địa điểm nào?',
      options: [
        'Tháng 5/1975 tại Hà Nội',
        'Tháng 9/1975 tại Đà Lạt',
        'Tháng 11/1975 tại Sài Gòn',
        'Tháng 4/1976 tại Huế'
      ],
      correctIndex: 1,
      explanation: 'Tháng 9/1975, Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (khóa III) đã họp tại thành phố Đà Lạt (Lâm Đồng).',
      sourceRef: 'Văn kiện Đảng Toàn tập (Tập 36) – Hội nghị Trung ương 24'
    },
    {
      id: 'q2-2',
      roomId: 'room2',
      question: 'Nghị quyết Hội nghị Trung ương 24 xác định nhiệm vụ cấp bách hàng đầu của cách mạng lúc bấy giờ là gì?',
      options: [
        'Tập trung phát triển công nghiệp nặng ngay lập tức',
        'Hoàn thành thống nhất đất nước về mặt Nhà nước',
        'Mở rộng ký kết hiệp định viện trợ với phương Tây',
        'Tiến hành đổi tiền trên toàn quốc ngay trong tháng 9/1975'
      ],
      correctIndex: 1,
      explanation: 'Nghị quyết Trung ương 24 khẳng định: Hoàn thành thống nhất đất nước về mặt Nhà nước là nhiệm vụ chiến lược cấp bách số một, vừa là nguyện vọng của nhân dân vừa là quy luật khách quan.',
      sourceRef: 'Nghị quyết số 24 Ban Chấp hành Trung ương Đảng'
    },
    {
      id: 'q2-3',
      roomId: 'room2',
      question: 'Bước đi cụ thể tiếp theo được Hội nghị TW 24 chỉ đạo thực hiện là gì?',
      options: [
        'Tổ chức Hội nghị Hiệp thương chính trị giữa hai miền Bắc – Nam',
        'Ngay lập tức công bố bản Hiến pháp mới',
        'Giải tán ngay các lực lượng vũ trang địa phương',
        'Hủy bỏ toàn bộ hệ thống hành chính cũ ở miền Nam'
      ],
      correctIndex: 0,
      explanation: 'Nghị quyết chỉ đạo khẩn trương tiến hành Hội nghị hiệp thương chính trị giữa đại biểu miền Bắc và miền Nam để bàn bạc và thống nhất việc tổ chức Tổng tuyển cử.',
      sourceRef: 'Lịch sử Đảng Cộng sản Việt Nam (Tập 2)'
    }
  ],
  room3: [
    {
      id: 'q3-1',
      roomId: 'room3',
      question: 'Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc diễn ra trong khoảng thời gian nào?',
      options: [
        'Từ ngày 30/4 đến 5/5/1975',
        'Từ ngày 15/11 đến 21/11/1975',
        'Từ ngày 25/4 đến 30/4/1976',
        'Từ ngày 24/6 đến 3/7/1976'
      ],
      correctIndex: 1,
      explanation: 'Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc diễn ra từ ngày 15 đến 21/11/1975 tại Dinh Độc Lập (Sài Gòn).',
      sourceRef: 'Thông cáo chung Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc'
    },
    {
      id: 'q3-2',
      roomId: 'room3',
      question: 'Ai là Trưởng đoàn đại biểu miền Bắc và Trưởng đoàn đại biểu miền Nam tại Hội nghị Hiệp thương?',
      options: [
        'Đồng chí Lê Duẩn và đồng chí Nguyễn Hữu Thọ',
        'Đồng chí Trường Chinh và đồng chí Phạm Hùng',
        'Đồng chí Phạm Văn Đồng và đồng chí Huỳnh Tấn Phát',
        'Đồng chí Tôn Đức Thắng và đồng chí Võ Chí Công'
      ],
      correctIndex: 1,
      explanation: 'Đoàn đại biểu miền Bắc do đồng chí Trường Chinh dẫn đầu; đoàn đại biểu miền Nam do đồng chí Phạm Hùng dẫn đầu.',
      sourceRef: 'Tư liệu lưu trữ Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc (11/1975)'
    },
    {
      id: 'q3-3',
      roomId: 'room3',
      question: 'Hội nghị Hiệp thương đã đạt được sự nhất trí căn bản về vấn đề gì?',
      options: [
        'Tổ chức Tổng tuyển cử bầu Quốc hội chung trên phạm vi cả nước theo nguyên tắc dân chủ',
        'Giữ nguyên hai hệ thống pháp luật riêng biệt trong 10 năm tiếp theo',
        'Chỉ tổ chức bầu cử bổ sung đại biểu Quốc hội tại miền Bắc',
        'Đình hoãn việc thống nhất các cơ quan quản lý nhà nước'
      ],
      correctIndex: 0,
      explanation: 'Hội nghị nhất trí cao việc tổ chức sớm cuộc Tổng tuyển cử trên toàn quốc theo nguyên tắc phổ thông, bình đẳng, trực tiếp và bỏ phiếu kín để bầu Quốc hội chung.',
      sourceRef: 'Thông cáo chung Hội nghị Hiệp thương'
    }
  ],
  room4: [
    {
      id: 'q4-1',
      roomId: 'room4',
      question: 'Cuộc Tổng tuyển cử bầu Quốc hội chung trong cả nước diễn ra vào ngày nào?',
      options: [
        'Ngày 30 tháng 4 năm 1975',
        'Ngày 25 tháng 4 năm 1976',
        'Ngày 2 tháng 7 năm 1976',
        'Ngày 19 tháng 5 năm 1976'
      ],
      correctIndex: 1,
      explanation: 'Cuộc Tổng tuyển cử bầu Quốc hội chung của nước Việt Nam thống nhất diễn ra vào ngày 25/4/1976.',
      sourceRef: 'Lịch sử Quốc hội Việt Nam & Ngày hội non sông 25/4/1976'
    },
    {
      id: 'q4-2',
      roomId: 'room4',
      question: 'Tỷ lệ cử tri trong cả nước tham gia bỏ phiếu trong ngày 25/4/1976 đạt bao nhiêu?',
      options: [
        'Đạt khoảng 75,5%',
        'Đạt 85,2%',
        'Đạt 98,77% (hơn 23 triệu cử tri)',
        'Đạt khoảng 90,0%'
      ],
      correctIndex: 2,
      explanation: 'Toàn quốc có 23.118.599 cử tri đi bỏ phiếu, đạt tỷ lệ 98,77% cử tri cả nước – con số kỷ lục thể hiện ý chí quật cường của nhân dân.',
      sourceRef: 'Báo cáo kết quả bầu cử Quốc hội khóa VI (1976)'
    },
    {
      id: 'q4-3',
      roomId: 'room4',
      question: 'Tổng số đại biểu được bầu vào Quốc hội thống nhất (Quốc hội khóa VI) là bao nhiêu?',
      options: [
        '300 đại biểu',
        '492 đại biểu (249 miền Bắc, 243 miền Nam)',
        '550 đại biểu',
        '400 đại biểu'
      ],
      correctIndex: 1,
      explanation: 'Cuộc bầu cử đã bầu ra 492 đại biểu Quốc hội, trong đó miền Bắc có 249 đại biểu và miền Nam có 243 đại biểu.',
      sourceRef: 'Biên bản tổng kết của Hội đồng Bầu cử Toàn quốc'
    }
  ],
  room5: [
    {
      id: 'q5-1',
      roomId: 'room5',
      question: 'Kỳ họp thứ nhất của Quốc hội thống nhất (Quốc hội khóa VI) diễn ra tại đâu và thời gian nào?',
      options: [
        'Tại Sài Gòn từ 15 đến 21/11/1975',
        'Tại Hội trường Ba Đình (Hà Nội) từ 24/6 đến 3/7/1976',
        'Tại Đà Lạt từ 1 đến 10/9/1975',
        'Tại Huế từ 20 đến 28/4/1976'
      ],
      correctIndex: 1,
      explanation: 'Kỳ họp thứ nhất Quốc hội khóa VI diễn ra từ ngày 24/6 đến 3/7/1976 tại Hội trường Ba Đình, Thủ đô Hà Nội.',
      sourceRef: 'Kỷ yếu Kỳ họp thứ nhất Quốc hội khóa VI'
    },
    {
      id: 'q5-2',
      roomId: 'room5',
      question: 'Nghị quyết ngày 2/7/1976 của Quốc hội đã quyết định đặt tên nước là gì?',
      options: [
        'Việt Nam Dân chủ Cộng hòa',
        'Cộng hòa Miền Nam Việt Nam',
        'Cộng hòa Xã hội Chủ nghĩa Việt Nam',
        'Liên bang Việt Nam Thống nhất'
      ],
      correctIndex: 2,
      explanation: 'Ngày 2/7/1976, Quốc hội nhất trí quyết định đặt tên nước là: CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM.',
      sourceRef: 'Nghị quyết Quốc hội khóa VI ngày 02/07/1976'
    },
    {
      id: 'q5-3',
      roomId: 'room5',
      question: 'Tại kỳ họp đầu tiên, Quốc hội đã quyết định đổi tên thành phố Sài Gòn – Gia Định thành tên gì?',
      options: [
        'Thành phố Giải Phóng',
        'Thành phố Hồ Chí Minh',
        'Thành phố Nam Bộ',
        'Thành phố Thống Nhất'
      ],
      correctIndex: 1,
      explanation: 'Quốc hội đã quyết nghị chính thức đổi tên thành phố Sài Gòn – Gia Định thành Thành phố Hồ Chí Minh để tri ân công đức trời biển của Người.',
      sourceRef: 'Nghị quyết Quốc hội ngày 02/07/1976 về việc đổi tên thành phố Sài Gòn - Gia Định'
    },
    {
      id: 'q5-4',
      roomId: 'room5',
      question: 'Ai được Quốc hội khóa VI bầu làm Chủ tịch nước và Thủ tướng Chính phủ của nước Việt Nam thống nhất?',
      options: [
        'Chủ tịch nước Tôn Đức Thắng, Thủ tướng Phạm Văn Đồng',
        'Chủ tịch nước Trường Chinh, Thủ tướng Võ Văn Kiệt',
        'Chủ tịch nước Lê Duẩn, Thủ tướng Nguyễn Văn Linh',
        'Chủ tịch nước Nguyễn Hữu Thọ, Thủ tướng Huỳnh Tấn Phát'
      ],
      correctIndex: 0,
      explanation: 'Quốc hội bầu đồng chí Tôn Đức Thắng làm Chủ tịch nước và đồng chí Phạm Văn Đồng làm Thủ tướng Chính phủ nước Cộng hòa XHCN Việt Nam.',
      sourceRef: 'Biên bản bầu các cơ quan lãnh đạo Nhà nước tại Kỳ họp thứ nhất Quốc hội khóa VI'
    }
  ],
  room6: [
    {
      id: 'q6-1',
      roomId: 'room6',
      question: 'Về mặt pháp lý, việc hoàn thành thống nhất Nhà nước có ý nghĩa như thế nào trên trường quốc tế?',
      options: [
        'Tạo cơ sở pháp lý duy nhất đại diện cho toàn vẹn lãnh thổ Việt Nam trên trường quốc tế',
        'Làm phát sinh tranh chấp ủy trị ở các diễn đàn quốc tế',
        'Chỉ có giá trị hiệu lực nội bộ trong biên giới đất liền',
        'Yêu cầu phải thương lượng lại toàn bộ các hiệp định thời kỳ chống Pháp'
      ],
      correctIndex: 0,
      explanation: 'Tạo cơ sở pháp lý vững chắc, xác lập quyền chủ quyền duy nhất trên toàn bộ lãnh thổ, lãnh hải và vùng trời, mở đường cho việc Việt Nam chính thức gia nhập Liên Hợp Quốc (9/1977).',
      sourceRef: 'Giáo trình Lịch sử Đảng Cộng sản Việt Nam – Đánh giá sự kiện hợp nhất'
    },
    {
      id: 'q6-2',
      roomId: 'room6',
      question: 'Thứ tự diễn tiến đúng của hành trình thống nhất đất nước về mặt Nhà nước (1975–1976) là gì?',
      options: [
        'Tổng tuyển cử 25/4/1976 → Hội nghị TW 24 → Hội nghị Hiệp thương → Quốc hội khóa VI',
        'Hội nghị Hiệp thương → Bối cảnh 30/4/1975 → Hội nghị TW 24 → Tổng tuyển cử → Quốc hội khóa VI',
        'Bối cảnh sau 30/4/1975 → Hội nghị TW 24 (9/1975) → Hội nghị Hiệp thương (11/1975) → Tổng tuyển cử (25/4/1976) → Kỳ họp Quốc hội đầu tiên (6-7/1976)',
        'Quốc hội khóa VI → Hội nghị TW 24 → Hội nghị Hiệp thương → Tổng tuyển cử 25/4/1976'
      ],
      correctIndex: 2,
      explanation: 'Trục thời gian chuẩn mực: 30/4/1975 giải phóng → Bối cảnh sau chiến tranh → Tháng 9/1975 Hội nghị TW 24 → Tháng 11/1975 Hội nghị Hiệp thương → 25/4/1976 Tổng tuyển cử → 24/6-3/7/1976 Kỳ họp Quốc hội đầu tiên.',
      sourceRef: 'Trục timeline chuẩn mực tài liệu Lịch sử Đảng'
    }
  ]
};

export const FINAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'fq-1',
    question: 'Sau ngày 30/4/1975, tuy Tổ quốc đã thống nhất về mặt lãnh thổ nhưng điều gì vẫn chưa hoàn thành?',
    options: [
      'Chưa giải phóng hoàn toàn quần đảo Trường Sa',
      'Chưa thống nhất về mặt thể chế Nhà nước và chính quyền',
      'Chưa khôi phục được tuyến đường sắt Bắc - Nam',
      'Chưa thành lập được quân đội chính quy'
    ],
    correctIndex: 1,
    explanation: 'Sau 30/4/1975, lãnh thổ đất nước đã thống nhất nhưng về thể chế Nhà nước vẫn tồn tại hai chính quyền cách mạng ở hai miền (VNDCCH ở miền Bắc và CHMNVN ở miền Nam).',
    sourceRef: 'Bối cảnh lịch sử sau 30/4/1975'
  },
  {
    id: 'fq-2',
    question: 'Hội nghị Trung ương 24 (tháng 9/1975) họp tại địa phương nào?',
    options: [
      'Hà Nội',
      'Đà Lạt (Lâm Đồng)',
      'Sài Gòn',
      'Cần Thơ'
    ],
    correctIndex: 1,
    explanation: 'Hội nghị Ban Chấp hành Trung ương Đảng lần thứ 24 khóa III họp vào tháng 9/1975 tại thành phố Đà Lạt.',
    sourceRef: 'Văn kiện Hội nghị TW 24'
  },
  {
    id: 'fq-3',
    question: 'Địa điểm lịch sử diễn ra Hội nghị Hiệp thương Chính trị Thống nhất Tổ quốc (11/1975) là nơi nào?',
    options: [
      'Nhà hát Lớn Hà Nội',
      'Hội trường Dinh Độc Lập (Sài Gòn)',
      'Cung An Định (Huế)',
      'Căn cứ Tân Trào (Tuyên Quang)'
    ],
    correctIndex: 1,
    explanation: 'Hội nghị diễn ra từ 15 đến 21/11/1975 tại Dinh Độc Lập (nay là Hội trường Thống Nhất, TP. Hồ Chí Minh).',
    sourceRef: 'Thông cáo chung Hội nghị Hiệp thương'
  },
  {
    id: 'fq-4',
    question: 'Văn kiện quan trọng nhất được ký kết tại Hội nghị Hiệp thương tháng 11/1975 là gì?',
    options: [
      'Hiệp định Paris về Việt Nam',
      'Thông cáo chung khẳng định quyết tâm tổ chức Tổng tuyển cử trên toàn quốc',
      'Bản Hiến pháp lâm thời của nước Việt Nam',
      'Tuyên ngôn Độc lập lần thứ hai'
    ],
    correctIndex: 1,
    explanation: 'Thông cáo chung Hội nghị Hiệp thương chính trị đã thống nhất toàn diện chủ trương tổ chức Tổng tuyển cử bầu Quốc hội chung trong cả nước vào đầu năm 1976.',
    sourceRef: 'Văn kiện Hội nghị Hiệp thương'
  },
  {
    id: 'fq-5',
    question: 'Cuộc Tổng tuyển cử bầu Quốc hội khóa VI được tiến hành theo những nguyên tắc bầu cử nào?',
    options: [
      'Chỉ định theo cơ cấu và hiệp thương giới hạn',
      'Phổ thông, bình đẳng, trực tiếp và bỏ phiếu kín',
      'Cử tri gián tiếp thông qua đại biểu Hội đồng nhân dân',
      'Ưu tiên đặc cách theo vùng kinh tế'
    ],
    correctIndex: 1,
    explanation: 'Cuộc Tổng tuyển cử ngày 25/4/1976 được tổ chức theo 4 nguyên tắc dân chủ phổ quát: phổ thông, bình đẳng, trực tiếp và bỏ phiếu kín.',
    sourceRef: 'Luật Bầu cử Quốc hội năm 1976'
  },
  {
    id: 'fq-6',
    question: 'Số lượng cử tri cả nước đã tham gia bỏ phiếu trong ngày 25/4/1976 là bao nhiêu?',
    options: [
      'Khoảng 10 triệu cử tri (tỷ lệ 65%)',
      'Hơn 23 triệu cử tri (đạt tỷ lệ 98,77%)',
      'Khoảng 15 triệu cử tri (tỷ lệ 80%)',
      'Khoảng 18 triệu cử tri (tỷ lệ 88%)'
    ],
    correctIndex: 1,
    explanation: 'Có 23.118.599 cử tri (đạt 98,77% tổng số cử tri toàn quốc) đã tham gia bỏ phiếu trong ngày hội non sông.',
    sourceRef: 'Lưu trữ Lịch sử Quốc hội'
  },
  {
    id: 'fq-7',
    question: 'Kỳ họp thứ nhất Quốc hội khóa VI đã chính thức quyết định tên gọi mới của đất nước là gì?',
    options: [
      'Việt Nam Dân chủ Cộng hòa',
      'Cộng hòa Xã hội Chủ nghĩa Việt Nam',
      'Cộng hòa Miền Nam Việt Nam',
      'Đại Nam Dân quốc'
    ],
    correctIndex: 1,
    explanation: 'Ngày 2/7/1976, Quốc hội thông qua nghị quyết đặt tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
    sourceRef: 'Nghị quyết ngày 02/07/1976 của Quốc hội'
  },
  {
    id: 'fq-8',
    question: 'Tác giả của bài Quốc ca "Tiến quân ca" được Quốc hội khóa VI tiếp tục khẳng định là ai?',
    options: [
      'Nhạc sĩ Lưu Hữu Phước',
      'Nhạc sĩ Văn Cao',
      'Nhạc sĩ Hoàng Vân',
      'Nhạc sĩ Đỗ Nhuận'
    ],
    correctIndex: 1,
    explanation: 'Bài "Tiến quân ca" do nhạc sĩ Văn Cao sáng tác được Quốc hội khóa VI quyết định là Quốc ca của nước Cộng hòa XHCN Việt Nam.',
    sourceRef: 'Nghị quyết Quốc hội khóa VI'
  },
  {
    id: 'fq-9',
    question: 'Ý nghĩa to lớn nhất của việc hoàn thành thống nhất đất nước về mặt Nhà nước (1975–1976) là gì?',
    options: [
      'Tạo nên sức mạnh tổng hợp của toàn dân tộc, mở ra kỷ nguyên độc lập, thống nhất và đi lên chủ nghĩa xã hội',
      'Giúp mở cửa nhập khẩu hàng hóa nước ngoài miễn thuế',
      'Xóa bỏ hoàn toàn chế độ sở hữu tư nhân trong một đêm',
      'Giải thể quân đội để chuyển sang làm kinh tế thuần túy'
    ],
    correctIndex: 0,
    explanation: 'Tạo nên sức mạnh toàn diện về chính trị, kinh tế, quân sự và ngoại giao; chấm dứt tình trạng chia cắt thể chế, đưa cả nước bước vào kỷ nguyên phát triển mới.',
    sourceRef: 'Đánh giá lịch sử của Đảng Cộng sản Việt Nam'
  },
  {
    id: 'fq-10',
    question: 'Năm 1977, thành quả thống nhất Nhà nước đã tạo điều kiện trực tiếp để Việt Nam gia nhập tổ chức quốc tế lớn nhất nào?',
    options: [
      'Hiệp hội các quốc gia Đông Nam Á (ASEAN)',
      'Tổ chức Thương mại Thế giới (WTO)',
      'Tổ chức Liên Hợp Quốc (UN)',
      'Diễn đàn Hợp tác Kinh tế châu Á - Thái Bình Dương (APEC)'
    ],
    correctIndex: 2,
    explanation: 'Ngày 20/9/1977, nước Cộng hòa XHCN Việt Nam chính thức trở thành thành viên thứ 149 của Liên Hợp Quốc.',
    sourceRef: 'Lịch sử Ngoại giao Việt Nam hiện đại'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-explorer',
    title: 'Nhà khám phá',
    icon: '🏛',
    description: 'Đã tham quan và tìm hiểu đầy đủ tất cả 6 phòng trưng bày của bảo tàng.',
    criterion: 'Xem đủ 6/6 phòng triển lãm'
  },
  {
    id: 'ach-reader',
    title: 'Người đọc tư liệu',
    icon: '📜',
    description: 'Đã mở xem chi tiết và nghiên cứu sâu các hiện vật tư liệu quý giá.',
    criterion: 'Mở xem ít nhất 5 hiện vật trong kho tư liệu'
  },
  {
    id: 'ach-conqueror',
    title: 'Người chinh phục timeline',
    icon: '⏳',
    description: 'Đã khám phá toàn diện từng mốc lịch sử từ 30/4/1975 đến ngày thống nhất Nhà nước.',
    criterion: 'Click và đọc toàn bộ các mốc trên Interactive Timeline'
  },
  {
    id: 'ach-scholar',
    title: 'Nhà nghiên cứu trẻ',
    icon: '🎓',
    description: 'Đạt kết quả xuất sắc trong Thử thách cuối hành trình (Final Quiz).',
    criterion: 'Hoàn thành Final Quiz đạt từ 80% điểm trở lên'
  }
];

export const DEFAULT_PROJECT_INFO: ProjectInfo = {
  projectName: 'BẢO TÀNG ẢO LỊCH SỬ ĐẢNG',
  course: 'Lịch sử Đảng Cộng sản Việt Nam',
  instructor: 'TS. Giảng viên phụ trách bộ môn',
  topic: 'Hành trình thống nhất đất nước về mặt Nhà nước (1975–1976)',
  groupName: 'Ban Biên tập Bảo tàng Lịch sử Số',
  members: [
    { name: 'Nguyễn Văn A', role: 'Trưởng nhóm / Nội dung Lịch sử', studentId: 'HIST2026-01' },
    { name: 'Trần Thị B', role: 'Khai thác & Xử lý tư liệu', studentId: 'HIST2026-02' },
    { name: 'Lê Hoàng C', role: 'Thiết kế bảo tàng ảo & Trải nghiệm', studentId: 'HIST2026-03' },
    { name: 'Phạm Minh D', role: 'Âm thanh & Kỹ thuật tương tác', studentId: 'HIST2026-04' }
  ],
  objective: 'Xây dựng một bảo tàng ảo lịch sử số hiện đại, trang trọng, trực quan và có tính tương tác cao giúp người học phân tích hoàn cảnh sau 30/4/1975, lý giải nguyên nhân phải thống nhất Nhà nước, tái hiện chân thực diễn biến và đánh giá sâu sắc ý nghĩa lịch sử của sự kiện hợp nhất non sông.',
  sources: [
    'Tài liệu hướng dẫn: "Gợi ý dự án môn Lịch sử Đảng - LQC.pdf"',
    'Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Nhà xuất bản Chính trị Quốc gia Sự thật)',
    'Văn kiện Đảng Toàn tập (Tập 36, 37)',
    'Kho tư liệu ảnh lịch sử: Thông tấn xã Việt Nam & Bảo tàng Lịch sử Quốc gia',
    'Kỷ yếu Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam'
  ],
  evaluationRubric: [
    { criterion: '1. Đúng kiến thức lịch sử', maxPoints: 30, description: 'Chính xác về mốc thời gian, tên hội nghị, diễn biến, nhân vật, số liệu cử tri và các quyết định lịch sử của Quốc hội.' },
    { criterion: '2. Kỹ năng khai thác tư liệu', maxPoints: 20, description: 'Sử dụng hình ảnh tư liệu gốc, trích dẫn chuẩn xác văn kiện, chú thích minh bạch nguồn gốc và phân loại khoa học.' },
    { criterion: '3. Tính sáng tạo', maxPoints: 30, description: 'Không gian bảo tàng số 3D/depth, timeline tương tác, guided tour, âm thanh ambient lịch sử, quiz giải thích sâu sắc.' },
    { criterion: '4. Tính ứng dụng thực tiễn', maxPoints: 20, description: 'Responsive đa thiết bị, dễ mở rộng thêm chuyên đề lịch sử khác, phục vụ đắc lực cho công tác giáo dục truyền thống.' }
  ]
};

// Convenient exports and aliases for view components
export const ALL_ARTIFACTS = INITIAL_ARTIFACTS;
export const TIMELINE_EVENTS = TIMELINE_NODES;
export const QUIZ_COLLECTION = ROOM_QUIZZES;
export const ACHIEVEMENTS_LIST = ACHIEVEMENTS;
