import { YouTubeVideo } from '@/types';

export const allVideos: YouTubeVideo[] = [
  // Lab 1 - Độ ẩm tự nhiên
  { id: 'v1-1', labId: 'lab1', title: 'Thí nghiệm xác định độ ẩm tự nhiên của đất (1)', url: 'https://youtu.be/I1DaWYDtg0Y?si=OaDthGAQN8zIhAbg', sourceType: 'provided' },
  { id: 'v1-2', labId: 'lab1', title: 'Thí nghiệm xác định độ ẩm tự nhiên của đất (2)', url: 'https://youtu.be/oo99XAzL1LA?si=vyX-VxC7SHVczNd8', sourceType: 'provided' },
  // Lab 2+3 - Giới hạn chảy, dẻo
  { id: 'v2-1', labId: 'lab2', title: 'Thí nghiệm giới hạn chảy (Casagrande)', url: 'https://youtu.be/RbgMK1FqtBU?si=Xzbhfz6XP8uP6ON4', sourceType: 'provided' },
  { id: 'v2-2', labId: 'lab2', title: 'Thí nghiệm giới hạn chảy và dẻo', url: 'https://youtu.be/VL7SqcRpbH8?si=2DeHVCvcoa0EzmEI', sourceType: 'provided' },
  { id: 'v2-3', labId: 'lab2', title: 'Xác định giới hạn dẻo của đất', url: 'https://youtu.be/Ng4EJC7SpmE?si=Q1saUVM5LFrD8TJN', sourceType: 'provided' },
  // Lab 4 - Tỷ trọng
  { id: 'v4-1', labId: 'lab4', title: 'Thí nghiệm xác định tỷ trọng hạt đất (1)', url: 'https://youtu.be/zyRO8LOiifc?si=f0i2PiLTDiUY-9Ir', sourceType: 'provided' },
  { id: 'v4-2', labId: 'lab4', title: 'Thí nghiệm xác định tỷ trọng hạt đất (2)', url: 'https://youtu.be/OR50Zos-xRY?si=8VSHiis6mG-6Vq0_', sourceType: 'provided' },
  // Lab 5 - Khối lượng thể tích
  { id: 'v5-1', labId: 'lab5', title: 'Thí nghiệm khối lượng thể tích (dao vòng)', url: 'https://youtu.be/mW7m4IsjLhQ?si=7l3mg0q19wjteUHh', sourceType: 'provided' },
  // Lab 6 - Sức chống cắt
  { id: 'v6-1', labId: 'lab6', title: 'Thí nghiệm cắt trực tiếp (1)', url: 'https://youtu.be/YDHeNHfa8Mo?si=dDOK3U864_otVHPY', sourceType: 'provided' },
  { id: 'v6-2', labId: 'lab6', title: 'Thí nghiệm cắt trực tiếp (2)', url: 'https://youtu.be/e0SKR5pXfBM?si=XCwHwtnnBM4iuJXT', sourceType: 'provided' },
  // Lab 7 - Nén lún
  { id: 'v7-1', labId: 'lab7', title: 'Thí nghiệm nén cố kết (1)', url: 'https://youtu.be/ocF_UNTMTEI?si=BRISGIYSXOrdcWEa', sourceType: 'provided' },
  { id: 'v7-2', labId: 'lab7', title: 'Thí nghiệm nén cố kết (2)', url: 'https://youtu.be/HEzVLTQdlTU?si=CJSGZZlIj0Q-H3dp', sourceType: 'provided' },
];

export function getVideosByLab(labId: string): YouTubeVideo[] {
  return allVideos.filter(v => v.labId === labId);
}
