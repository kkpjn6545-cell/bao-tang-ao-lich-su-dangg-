import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Columns, 
  Award, 
  Eye, 
  CheckCircle2, 
  X, 
  BookOpen, 
  ShieldCheck,
  Star
} from 'lucide-react';
import { Artifact, ArtifactCategory } from '../types';
import { EXHIBITION_ROOMS } from '../data/museumData';
import { museumAudio } from '../services/audioSynthesizer';

interface DigitalArchiveViewProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  collectedArtifacts: string[];
  onToggleCollect: (artifactId: string) => void;
}

const CATEGORIES: { id: string; label: string; isPatriotic?: boolean }[] = [
  { id: 'all', label: 'Tất cả danh mục' },
  { id: 'Chiến sĩ Việt Nam', label: '★ Chiến sĩ Việt Nam', isPatriotic: true },
  { id: 'Hội nghị', label: 'Hội nghị' },
  { id: 'Văn kiện', label: 'Văn kiện' },
  { id: 'Bầu cử', label: 'Bầu cử' },
  { id: 'Quốc hội', label: 'Quốc hội' },
  { id: 'Nhân vật', label: 'Nhân vật' },
  { id: 'Nhiếp ảnh', label: 'Nhiếp ảnh' },
];

export const DigitalArchiveView: React.FC<DigitalArchiveViewProps> = ({
  artifacts,
  onSelectArtifact,
  collectedArtifacts,
  onToggleCollect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  
  // Compare Mode State (Selecting 2 artifacts to view side by side)
  const [compareMode, setCompareMode] = useState(false);
  const [compareItem1, setCompareItem1] = useState<Artifact | null>(null);
  const [compareItem2, setCompareItem2] = useState<Artifact | null>(null);

  const filteredArtifacts = artifacts.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRoom = selectedRoomFilter === 'all' || art.roomId === selectedRoomFilter;
    const matchesCategory = selectedCategoryFilter === 'all' || art.category === selectedCategoryFilter;
    const matchesType = selectedTypeFilter === 'all' || art.type === selectedTypeFilter;

    return matchesSearch && matchesRoom && matchesCategory && matchesType;
  });

  const handleArtifactClick = (art: Artifact) => {
    if (compareMode) {
      if (!compareItem1) {
        setCompareItem1(art);
      } else if (!compareItem2 && compareItem1.id !== art.id) {
        setCompareItem2(art);
      }
    } else {
      museumAudio.playArtifactClickSound();
      onSelectArtifact(art);
    }
  };

  const soldierCount = artifacts.filter(a => a.category === 'Chiến sĩ Việt Nam').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header with Waving Flag Banner in Museum Parchment Style */}
      <div className="relative bg-[#FAF4E8]/95 backdrop-blur rounded-2xl p-6 sm:p-8 border-2 border-[#C9A227]/50 shadow-xl overflow-hidden">
        {/* Background Flag Layer */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 pointer-events-none overflow-hidden opacity-25">
          <div className="absolute -right-10 -top-6 w-[360px] sm:w-[420px] h-full flex items-center justify-end">
            <img
              src="/assets/images/la-co.gif"
              alt="Cờ đỏ sao vàng"
              className="w-full h-auto object-contain filter drop-shadow-xl"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E7D8B8] border border-[#C9A227] text-[#A5202A] text-xs font-bold uppercase tracking-wider shadow-sm">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Kho Lưu Trữ Tư Liệu Lịch Sử Số Hóa</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display text-[#241A12]">
            Tường Ảnh & Hiện Vật Tư Liệu Quý Giá
          </h1>
          <p className="text-xs sm:text-sm text-[#35241A] leading-relaxed">
            Kho lưu trữ số tập hợp toàn bộ các hình ảnh, tư liệu gốc, hiện vật và hình ảnh người chiến sĩ Việt Nam 
            được số hóa với độ phân giải cao phục vụ công tác học tập và nghiên cứu môn Lịch sử Đảng.
          </p>

          {/* Action Bar: Compare Mode Switcher & Stats */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="archive-compare-mode-toggle"
              onClick={() => {
                setCompareMode(!compareMode);
                setCompareItem1(null);
                setCompareItem2(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer shadow-sm ${
                compareMode
                  ? 'btn-museum-primary'
                  : 'bg-[#E7D8B8] hover:bg-[#DBC9A2] text-[#241A12] border-[#C9A227]'
              }`}
            >
              <Columns className="w-4 h-4 text-[#A5202A]" />
              <span>{compareMode ? 'Đang bật chế độ so sánh (Nhấn để tắt)' : 'Chế độ so sánh 2 tư liệu'}</span>
            </button>

            <button
              onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === 'Chiến sĩ Việt Nam' ? 'all' : 'Chiến sĩ Việt Nam')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer shadow-sm ${
                selectedCategoryFilter === 'Chiến sĩ Việt Nam'
                  ? 'bg-[#A5202A] text-[#FFD700] border-[#FFD700]'
                  : 'bg-[#FAF4E8] text-[#A5202A] border-[#A5202A]/40 hover:bg-[#E7D8B8]'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
              <span>Ảnh Người Chiến Sĩ ({soldierCount})</span>
            </button>

            <span className="text-xs text-[#55483A]">
              Tổng số: <strong className="text-[#A5202A] font-mono">{artifacts.length}</strong> tư liệu | Đã lưu: <strong className="text-[#A5202A] font-mono">{collectedArtifacts.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Compare Drawer when Compare Mode is Active */}
      {compareMode && (
        <div className="rounded-xl p-5 border-2 border-[#C9A227] bg-[#FAF4E8] space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between border-b border-[#C9A227]/40 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A5202A] uppercase tracking-wider">
              <Columns className="w-4 h-4" />
              <span>So Sánh Tư Liệu Song Song (Chọn 2 tư liệu từ danh sách bên dưới)</span>
            </div>
            <button
              onClick={() => {
                setCompareItem1(null);
                setCompareItem2(null);
              }}
              className="text-xs text-[#55483A] hover:text-[#241A12] cursor-pointer"
            >
              Xóa chọn
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slot 1 */}
            <div className="p-3 rounded-lg bg-[#F1E7D0] border border-[#C9A227]/50 min-h-[200px] flex flex-col justify-between">
              {compareItem1 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#A5202A]">{compareItem1.dateStr || compareItem1.year}</span>
                    <button onClick={() => setCompareItem1(null)} className="text-[#55483A] hover:text-[#241A12] cursor-pointer">✕</button>
                  </div>
                  <img src={compareItem1.imageUrl} alt={compareItem1.title} className="w-full h-40 object-cover rounded border border-[#C9A227]/40" />
                  <h4 className="text-xs font-bold text-[#241A12] font-display">{compareItem1.title}</h4>
                  <p className="text-[11px] text-[#35241A] leading-relaxed">{compareItem1.description}</p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-[#55483A] py-12 italic">
                  Nhấn vào tư liệu bất kỳ để đặt vào vị trí 1
                </div>
              )}
            </div>

            {/* Slot 2 */}
            <div className="p-3 rounded-lg bg-[#F1E7D0] border border-[#C9A227]/50 min-h-[200px] flex flex-col justify-between">
              {compareItem2 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#A5202A]">{compareItem2.dateStr || compareItem2.year}</span>
                    <button onClick={() => setCompareItem2(null)} className="text-[#55483A] hover:text-[#241A12] cursor-pointer">✕</button>
                  </div>
                  <img src={compareItem2.imageUrl} alt={compareItem2.title} className="w-full h-40 object-cover rounded border border-[#C9A227]/40" />
                  <h4 className="text-xs font-bold text-[#241A12] font-display">{compareItem2.title}</h4>
                  <p className="text-[11px] text-[#35241A] leading-relaxed">{compareItem2.description}</p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-[#55483A] py-12 italic">
                  Nhấn vào tư liệu thứ hai để so sánh song song
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#FAF4E8] border-2 border-[#C9A227]/40 shadow-md">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#55483A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="archive-search-input"
              type="text"
              placeholder="Tìm kiếm theo từ khóa (Chiến sĩ, Bùi Quang Thận, Võ Nguyên Giáp, Hiệp thương, Tổng tuyển cử...)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F1E7D0] border border-[#C9A227]/60 rounded-lg text-xs text-[#241A12] placeholder-[#55483A] focus:outline-none focus:border-[#A5202A]"
            />
          </div>

          {/* Room Filter */}
          <select
            id="archive-room-filter"
            value={selectedRoomFilter}
            onChange={(e) => setSelectedRoomFilter(e.target.value)}
            className="bg-[#F1E7D0] border border-[#C9A227]/60 rounded-lg px-3 py-2 text-xs text-[#241A12] focus:outline-none focus:border-[#A5202A] cursor-pointer"
          >
            <option value="all">Tất cả các phòng (Phòng 1 – 6)</option>
            {EXHIBITION_ROOMS.map(r => (
              <option key={r.id} value={r.id}>
                Phòng 0{r.roomNumber}: {r.title}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            id="archive-type-filter"
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="bg-[#F1E7D0] border border-[#C9A227]/60 rounded-lg px-3 py-2 text-xs text-[#241A12] focus:outline-none focus:border-[#A5202A] cursor-pointer"
          >
            <option value="all">Tất cả thể loại</option>
            <option value="image">Hình ảnh tư liệu</option>
            <option value="document">Văn kiện / Bút tích</option>
            <option value="relic">Hiện vật lịch sử</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#C9A227]/20">
          <span className="text-xs font-semibold text-[#55483A] mr-1">Chủ đề:</span>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? cat.isPatriotic
                      ? 'bg-[#A5202A] text-[#FFD700] border-[#FFD700] font-bold shadow'
                      : 'btn-museum-primary shadow-sm'
                    : cat.isPatriotic
                    ? 'bg-[#E7D8B8] text-[#A5202A] border-[#A5202A]/40 font-semibold hover:bg-[#DBC9A2]'
                    : 'bg-[#E7D8B8]/60 text-[#241A12] border-[#C9A227]/40 hover:bg-[#E7D8B8]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Artifact Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredArtifacts.map(art => {
          const isCollected = collectedArtifacts.includes(art.id);
          const isSoldier = art.category === 'Chiến sĩ Việt Nam';

          return (
            <div
              key={art.id}
              id={`archive-card-${art.id}`}
              onClick={() => handleArtifactClick(art)}
              className="bg-[#FAF4E8] rounded-xl overflow-hidden border-2 border-[#C9A227]/50 hover:border-[#A5202A] shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative aspect-4/3 bg-[#241A12] overflow-hidden">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#241A12]/80 text-[#E4C97A] border border-[#C9A227]/40">
                    {art.dateStr || art.year}
                  </span>
                </div>

                {/* Soldier Hero Badge */}
                {isSoldier && (
                  <div className="absolute top-2 right-10 z-10">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#A5202A] text-[#FFD700] border border-[#FFD700]/80 shadow flex items-center gap-1 font-display">
                      <span>★</span> Chiến sĩ
                    </span>
                  </div>
                )}

                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCollect(art.id);
                    }}
                    className={`p-1.5 rounded-full border transition-all cursor-pointer shadow-sm ${
                      isCollected
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-500'
                        : 'bg-[#FAF4E8]/90 text-[#55483A] border-[#C9A227] hover:text-[#A5202A]'
                    }`}
                    title={isCollected ? "Đã lưu vào bộ sưu tập" : "Lưu vào bộ sưu tập"}
                  >
                    <Award className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-[#A5202A] text-[#F1E7D0] font-bold shadow">
                    <Eye className="w-3 h-3" /> Phóng to
                  </span>
                </div>
              </div>

              <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-[#35241A] line-clamp-2 mt-1 leading-relaxed">
                    {art.description}
                  </p>
                </div>
                <div className="text-[10px] text-[#55483A] border-t border-[#C9A227]/30 pt-1.5 truncate">
                  Nguồn: {art.source}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredArtifacts.length === 0 && (
        <div className="text-center py-12 text-[#55483A] text-xs bg-[#FAF4E8] rounded-xl border border-[#C9A227]/30">
          Không tìm thấy tư liệu nào phù hợp với bộ lọc hiện tại.
        </div>
      )}

    </div>
  );
};
