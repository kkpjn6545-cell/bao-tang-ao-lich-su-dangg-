import React from 'react';
import { 
  Info, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  Compass, 
  Volume2, 
  ExternalLink, 
  Layers 
} from 'lucide-react';

export const ProjectInfoView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="museum-frame rounded-2xl p-6 sm:p-8 border border-amber-600/30">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            <span>Thông Tin Học Thuật Dự Án</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif-historic text-amber-100">
            Hồ Sơ Dự Án Bảo Tàng Ảo Lịch Sử Đảng
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Dự án nghiên cứu và chuyển đổi số nội dung học tập môn Lịch sử Đảng Cộng sản Việt Nam 
            chủ đề: "Hành trình thống nhất đất nước về mặt Nhà nước (1975–1976)".
          </p>
        </div>
      </div>

      {/* Grid of Key Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Project Profile */}
        <div className="museum-frame rounded-xl p-6 border border-slate-800 bg-slate-900/90 space-y-4">
          <h3 className="text-base font-bold font-serif-historic text-amber-200 border-b border-slate-800 pb-2">
            Mục Tiêu & Ý Nghĩa Dự Án
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Trực quan hóa lịch sử:</strong> Thay thế các bài giảng tĩnh hoặc slide PowerPoint bằng không gian bảo tàng số tương tác 3 chiều, giàu tính trải nghiệm và thẩm mỹ trang trọng.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Làm sáng tỏ mạch logic khoa học:</strong> Giúp người học hiểu rõ vì sao sau chiến thắng 30/4/1975, đất nước tuy đã độc lập về lãnh thổ nhưng vẫn cấp thiết phải thống nhất về mặt thể chế Nhà nước.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Tôn vinh nguồn tư liệu gốc:</strong> Giới thiệu những hình ảnh, hiện vật, văn kiện và số liệu lịch sử chính xác, minh bạch.</span>
            </li>
          </ul>
        </div>

        {/* Academic References */}
        <div className="museum-frame rounded-xl p-6 border border-slate-800 bg-slate-900/90 space-y-4">
          <h3 className="text-base font-bold font-serif-historic text-amber-200 border-b border-slate-800 pb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Tài Liệu Nguồn & Trích Dẫn Chuẩn Mực</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
            <li className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <strong className="text-amber-300 block">Tài liệu chỉ dẫn đề tài:</strong>
              "Gợi ý dự án môn Lịch sử Đảng - LQC.pdf"
            </li>
            <li className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <strong className="text-amber-300 block">Văn kiện Đảng:</strong>
              Văn kiện Đảng Toàn tập (Tập 36: Nghị quyết Hội nghị TW 24 khóa III, 9/1975).
            </li>
            <li className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <strong className="text-amber-300 block">Lịch sử Quốc hội:</strong>
              Lịch sử Quốc hội Việt Nam (1960–1976), Biên bản Hội nghị Hiệp thương chính trị (11/1975).
            </li>
            <li className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <strong className="text-amber-300 block">Kho lưu trữ báo chí & hình ảnh:</strong>
              Thông tấn xã Việt Nam (TTXVN), Báo Nhân Dân, Bảo tàng Lịch sử Quốc gia.
            </li>
          </ul>
        </div>

      </div>

      {/* Guide on How to Explore */}
      <div className="museum-frame rounded-2xl p-6 sm:p-8 border border-amber-600/30 bg-slate-900/90 space-y-6">
        <h3 className="text-lg font-bold font-serif-historic text-amber-200 flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <span>Hướng Dẫn Khám Phá Bảo Tàng Ảo</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold font-mono text-base">01. Guided Tour</span>
            <h4 className="font-semibold text-slate-100">Tham quan có hướng dẫn</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bật chế độ Guided Tour từ thanh điều hướng để được dẫn dắt tuần tự qua 6 phòng theo trình tự thời gian chuẩn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold font-mono text-base">02. Tương tác Hiện vật</span>
            <h4 className="font-semibold text-slate-100">Thu phóng & Sưu tập</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bấm vào bất kỳ ảnh tư liệu nào để phóng to (Zoom in), đọc chú thích lưu trữ và nhấn "Lưu vào bộ sưu tập" cá nhân.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold font-mono text-base">03. Âm thanh Tinh tế</span>
            <h4 className="font-semibold text-slate-100">Không gian trầm lắng</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bộ tổng hợp âm thanh Web Audio API tạo nhạc nền ngũ cung truyền thống êm dịu, hoặc bạn có thể tải lên tệp MP3 riêng.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
