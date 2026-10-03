import { Question, TopicInfo } from '../types';

export const TOPICS: TopicInfo[] = [
  // HỌC KỲ 1
  {
    id: 'can-bac-hai-can-bac-ba',
    title: 'Căn bậc hai và Căn bậc ba',
    semester: 'HK1',
    category: 'Đại số',
    description: 'Điều kiện xác định, hằng đẳng thức √(A²) = |A|, trục căn thức ở mẫu và rút gọn biểu thức chứa căn.',
    estimatedTime: '15 phút',
  },
  {
    id: 'ham-so-bac-nhat',
    title: 'Hàm số bậc nhất',
    semester: 'HK1',
    category: 'Đại số',
    description: 'Hàm số y = ax + b (a ≠ 0), tính đồng biến/nghịch biến, đồ thị, vị trí tương đối hai đường thẳng.',
    estimatedTime: '15 phút',
  },
  {
    id: 'he-hai-phuong-trinh-bac-nhat',
    title: 'Hệ hai phương trình bậc nhất hai ẩn',
    semester: 'HK1',
    category: 'Đại số',
    description: 'Phương pháp thế, phương pháp cộng đại số, giải bài toán thực tế bằng cách lập hệ phương trình.',
    estimatedTime: '20 phút',
  },
  {
    id: 'he-thuc-luong-tam-giac-vuong',
    title: 'Hệ thức lượng trong tam giác vuông',
    semester: 'HK1',
    category: 'Hình học',
    description: 'Hệ thức cạnh và đường cao, tỉ số lượng giác góc nhọn (sin, cos, tan, cot), giải tam giác vuông.',
    estimatedTime: '15 phút',
  },
  {
    id: 'duong-tron-va-day-cung',
    title: 'Đường tròn và Dây cung',
    semester: 'HK1',
    category: 'Hình học',
    description: 'Sự xác định đường tròn, đường kính và dây cung, tiếp tuyến đường tròn, tính chất hai tiếp tuyến cắt nhau.',
    estimatedTime: '15 phút',
  },

  // HỌC KỲ 2
  {
    id: 'phuong-trinh-bac-hai-viet',
    title: 'Phương trình bậc hai và Hệ thức Vi-ét',
    semester: 'HK2',
    category: 'Đại số',
    description: 'Hàm số y = ax², công thức nghiệm phương trình bậc hai ax² + bx + c = 0, ứng dụng hệ thức Vi-ét.',
    estimatedTime: '20 phút',
  },
  {
    id: 'goc-voi-duong-tron',
    title: 'Góc với đường tròn và Tứ giác nội tiếp',
    semester: 'HK2',
    category: 'Hình học',
    description: 'Góc ở tâm, góc nội tiếp, góc tạo bởi tiếp tuyến và dây cung, dấu hiệu nhận biết tứ giác nội tiếp.',
    estimatedTime: '20 phút',
  },
  {
    id: 'hinh-tru-non-cau',
    title: 'Hình trụ - Hình nón - Hình cầu',
    semester: 'HK2',
    category: 'Hình học',
    description: 'Công thức diện tích xung quanh, diện tích toàn phần và thể tích của hình trụ, hình nón, hình cầu.',
    estimatedTime: '15 phút',
  },
  {
    id: 'de-thi-thu-vao-10',
    title: 'Đề thi thử tổng hợp ôn thi vào lớp 10',
    semester: 'HK2',
    category: 'Tổng hợp',
    description: 'Bộ câu hỏi trắc nghiệm trọng tâm bao quát toàn bộ kiến thức Toán 9 chuẩn bị thi chuyển cấp vào lớp 10.',
    estimatedTime: '25 phút',
  },
];

export const INITIAL_QUESTIONS: Question[] = [
  // --- CHUYÊN ĐỀ 1: CĂN BẬC HAI VÀ CĂN BẬC BA ---
  {
    grade: 9,
    topic: 'Căn bậc hai và Căn bậc ba',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Biểu thức √(2x - 6) xác định (có nghĩa) khi và chỉ khi:',
      options: [
        'A. x ≥ 3',
        'B. x ≤ 3',
        'C. x > 3',
        'D. x ≥ -3'
      ],
      answer: 'A',
      explanation: 'Biểu thức √(A) xác định khi A ≥ 0. Do đó 2x - 6 ≥ 0 ⇔ 2x ≥ 6 ⇔ x ≥ 3.'
    }
  },
  {
    grade: 9,
    topic: 'Căn bậc hai và Căn bậc ba',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Căn bậc hai số học của 81 là:',
      options: [
        'A. 9 và -9',
        'B. 9',
        'C. -9',
        'D. 81'
      ],
      answer: 'B',
      explanation: 'Với số dương a, căn bậc hai số học của a là số dương x thỏa mãn x² = a, kí hiệu là √a. Do 9 > 0 và 9² = 81 nên căn bậc hai số học của 81 là 9. (Lưu ý: số 81 có 2 căn bậc hai là 9 và -9, nhưng căn bậc hai số học chỉ lấy giá trị không âm là 9).'
    }
  },
  {
    grade: 9,
    topic: 'Căn bậc hai và Căn bậc ba',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Giá trị của biểu thức A = √((2 - √5)²) - √5 là:',
      options: [
        'A. 2',
        'B. -2',
        'C. 2 - 2√5',
        'D. 2√5 - 2'
      ],
      answer: 'B',
      explanation: 'Áp dụng hằng đẳng thức √(A²) = |A|:\n√((2 - √5)²) = |2 - √5|.\nVì 2 = √4 < √5 nên 2 - √5 < 0, do đó |2 - √5| = -(2 - √5) = √5 - 2.\nSuy ra: A = (√5 - 2) - √5 = -2.'
    }
  },
  {
    grade: 9,
    topic: 'Căn bậc hai và Căn bậc ba',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Rút gọn biểu thức P = √(8a) - √(18a) + √(32a) với a ≥ 0 ta được kết quả là:',
      options: [
        'A. 3√(2a)',
        'B. 5√(2a)',
        'C. 9√(2a)',
        'D. √(2a)'
      ],
      answer: 'A',
      explanation: 'Đưa thừa số ra ngoài dấu căn:\n√(8a) = √(4 · 2a) = 2√(2a)\n√(18a) = √(9 · 2a) = 3√(2a)\n√(32a) = √(16 · 2a) = 4√(2a)\nVậy P = 2√(2a) - 3√(2a) + 4√(2a) = (2 - 3 + 4)√(2a) = 3√(2a).'
    }
  },
  {
    grade: 9,
    topic: 'Căn bậc hai và Căn bậc ba',
    difficulty: 'Vận dụng',
    type: 'trắc nghiệm',
    content: {
      text: 'Trục căn thức ở mẫu của biểu thức M = 4 / (√5 - 1) ta được kết quả:',
      options: [
        'A. √5 + 1',
        'B. 2(√5 + 1)',
        'C. 4(√5 + 1)',
        'D. √5 - 1'
      ],
      answer: 'A',
      explanation: 'Nhân cả tử và mẫu với lượng liên hợp (√5 + 1):\nM = [4(√5 + 1)] / [(√5 - 1)(√5 + 1)] = [4(√5 + 1)] / (5 - 1) = [4(√5 + 1)] / 4 = √5 + 1.'
    }
  },

  // --- CHUYÊN ĐỀ 2: HÀM SỐ BẬC NHẤT ---
  {
    grade: 9,
    topic: 'Hàm số bậc nhất',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Trong các hàm số sau, hàm số nào là hàm số bậc nhất đồng biến trên R?',
      options: [
        'A. y = 3 - 2x',
        'B. y = (√3 - 2)x + 1',
        'C. y = (2 - √3)x + 5',
        'D. y = 2/x + 3'
      ],
      answer: 'C',
      explanation: 'Hàm số bậc nhất y = ax + b đồng biến trên R khi và chỉ khi hệ số a > 0.\nXét câu C: hệ số a = 2 - √3 = √4 - √3 > 0, do đó hàm số y = (2 - √3)x + 5 đồng biến trên R.'
    }
  },
  {
    grade: 9,
    topic: 'Hàm số bậc nhất',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Đồ thị hàm số y = 2x - 4 cắt trục hoành tại điểm có tọa độ là:',
      options: [
        'A. (0; -4)',
        'B. (2; 0)',
        'C. (-4; 0)',
        'D. (0; 2)'
      ],
      answer: 'B',
      explanation: 'Giao điểm của đồ thị với trục hoành Ox có tung độ y = 0.\nThay y = 0 vào phương trình: 0 = 2x - 4 ⇔ 2x = 4 ⇔ x = 2.\nVậy tọa độ giao điểm là (2; 0).'
    }
  },
  {
    grade: 9,
    topic: 'Hàm số bậc nhất',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Hai đường thẳng (d₁): y = (2m + 1)x + 3 và (d₂): y = 5x - 1 song song với nhau khi giá trị của m bằng:',
      options: [
        'A. m = 2',
        'B. m = -2',
        'C. m = 3',
        'D. m = 1'
      ],
      answer: 'A',
      explanation: 'Hai đường thẳng y = a₁x + b₁ và y = a₂x + b₂ song song khi a₁ = a₂ và b₁ ≠ b₂.\nỞ đây b₁ = 3 ≠ -1 = b₂ (thỏa mãn).\nĐiều kiện: 2m + 1 = 5 ⇔ 2m = 4 ⇔ m = 2.'
    }
  },
  {
    grade: 9,
    topic: 'Hàm số bậc nhất',
    difficulty: 'Vận dụng',
    type: 'trắc nghiệm',
    content: {
      text: 'Góc tạo bởi đường thẳng y = x + 3 với chiều dương trục Ox có số đo là:',
      options: [
        'A. 30°',
        'B. 45°',
        'C. 60°',
        'D. 135°'
      ],
      answer: 'B',
      explanation: 'Hệ số góc của đường thẳng y = ax + b là a = 1 > 0.\nGọi α là góc tạo bởi đường thẳng với chiều dương trục Ox, ta có tan(α) = a = 1 ⇒ α = 45°.'
    }
  },

  // --- CHUYÊN ĐỀ 3: HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN ---
  {
    grade: 9,
    topic: 'Hệ hai phương trình bậc nhất hai ẩn',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Cặp số (x; y) nào sau đây là nghiệm của phương trình 2x - y = 5?',
      options: [
        'A. (2; 1)',
        'B. (3; 1)',
        'C. (1; 3)',
        'D. (2; -1)'
      ],
      answer: 'B',
      explanation: 'Thay từng cặp số vào vế trái của phương trình:\nVới (3; 1): 2(3) - 1 = 6 - 1 = 5 (thỏa mãn vế phải). Vậy cặp (3; 1) là nghiệm.'
    }
  },
  {
    grade: 9,
    topic: 'Hệ hai phương trình bậc nhất hai ẩn',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Nghiệm (x; y) của hệ phương trình { 2x + y = 7 ; x - y = 2 } là:',
      options: [
        'A. (3; 1)',
        'B. (1; 3)',
        'C. (4; -1)',
        'D. (2; 3)'
      ],
      answer: 'A',
      explanation: 'Cộng hai phương trình vế theo vế: (2x + y) + (x - y) = 7 + 2 ⇔ 3x = 9 ⇔ x = 3.\nThay x = 3 vào phương trình thứ hai: 3 - y = 2 ⇔ y = 1.\nVậy hệ có nghiệm duy nhất (x; y) = (3; 1).'
    }
  },
  {
    grade: 9,
    topic: 'Hệ hai phương trình bậc nhất hai ẩn',
    difficulty: 'Vận dụng',
    type: 'trắc nghiệm',
    content: {
      text: 'Một thửa ruộng hình chữ nhật có chu vi là 100m. Biết chiều dài hơn chiều rộng 10m. Diện tích của thửa ruộng đó là:',
      options: [
        'A. 600 m²',
        'B. 576 m²',
        'C. 625 m²',
        'D. 500 m²'
      ],
      answer: 'A',
      explanation: 'Nửa chu vi của thửa ruộng là: 100 : 2 = 50 m.\nGọi chiều dài là x (m), chiều rộng là y (m) (0 < y < x < 50).\nTa có hệ phương trình:\n{ x + y = 50\n{ x - y = 10\nCộng vế theo vế: 2x = 60 ⇒ x = 30 (m).\nSuy ra y = 50 - 30 = 20 (m).\nDiện tích thửa ruộng: S = x · y = 30 · 20 = 600 m².'
    }
  },

  // --- CHUYÊN ĐỀ 4: HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG ---
  {
    grade: 9,
    topic: 'Hệ thức lượng trong tam giác vuông',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Cho tam giác ABC vuông tại A, đường cao AH. Hệ thức nào sau đây là ĐÚNG?',
      options: [
        'A. AH² = HB · HC',
        'B. AH² = AB · AC',
        'C. AB² = BC · HC',
        'D. AH = HB + HC'
      ],
      answer: 'A',
      explanation: 'Trong một tam giác vuông, bình phương đường cao ứng với cạnh huyền bằng tích của hai hình chiếu của hai cạnh góc vuông trên cạnh huyền: AH² = HB · HC (Hệ thức lượng cơ bản).'
    }
  },
  {
    grade: 9,
    topic: 'Hệ thức lượng trong tam giác vuông',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Cho tam giác ABC vuông tại A, có AB = 6cm, AC = 8cm. Độ dài đường cao AH là:',
      options: [
        'A. 5 cm',
        'B. 4,8 cm',
        'C. 4 cm',
        'D. 10 cm'
      ],
      answer: 'B',
      explanation: 'Áp dụng định lý Pytago trong tam giác vuông ABC:\nBC = √(AB² + AC²) = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.\nÁp dụng hệ thức: AB · AC = BC · AH\n⇒ AH = (AB · AC) / BC = (6 · 8) / 10 = 48 / 10 = 4,8 cm.'
    }
  },
  {
    grade: 9,
    topic: 'Hệ thức lượng trong tam giác vuông',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Cho góc nhọn α, biết sin(α) = 3/5. Giá trị của cos(α) là:',
      options: [
        'A. 4/5',
        'B. 2/5',
        'C. 3/4',
        'D. 1/5'
      ],
      answer: 'A',
      explanation: 'Áp dụng công thức lượng giác cơ bản: sin²(α) + cos²(α) = 1.\nVì α là góc nhọn nên cos(α) > 0:\ncos(α) = √(1 - sin²(α)) = √(1 - (3/5)²) = √(1 - 9/25) = √(16/25) = 4/5.'
    }
  },
  {
    grade: 9,
    topic: 'Hệ thức lượng trong tam giác vuông',
    difficulty: 'Vận dụng',
    type: 'trắc nghiệm',
    content: {
      text: 'Một chiếc thang dài 4m dựng vào tường tạo với mặt đất một góc 60°. Chiều cao chân thang đạt tới trên tường xấp xỉ bằng:',
      options: [
        'A. 2 m',
        'B. 3,46 m',
        'C. 3,85 m',
        'D. 2,31 m'
      ],
      answer: 'B',
      explanation: 'Gọi chiều cao trên tường là h, chiều dài thang là L = 4m.\nTa có: sin(60°) = h / L ⇒ h = L · sin(60°) = 4 · (√3 / 2) = 2√3 ≈ 2 · 1,732 = 3,464 m.'
    }
  },

  // --- CHUYÊN ĐỀ 5: ĐƯỜNG TRÒN VÀ DÂY CUNG ---
  {
    grade: 9,
    topic: 'Đường tròn và Dây cung',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Tâm đối xứng của đường tròn (O; R) là:',
      options: [
        'A. Một điểm bất kì nằm trên đường tròn',
        'B. Tâm O của đường tròn',
        'C. Một điểm bất kì nằm ngoài đường tròn',
        'D. Đường tròn không có tâm đối xứng'
      ],
      answer: 'B',
      explanation: 'Đường tròn là hình có tâm đối xứng. Tâm của đường tròn (điểm O) chính là tâm đối xứng của đường tròn đó.'
    }
  },
  {
    grade: 9,
    topic: 'Đường tròn và Dây cung',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Cho đường tròn (O; 5cm) và dây AB có độ dài bằng 8cm. Khoảng cách từ tâm O đến dây AB là:',
      options: [
        'A. 3 cm',
        'B. 4 cm',
        'C. 2 cm',
        'D. 1 cm'
      ],
      answer: 'A',
      explanation: 'Kẻ OH vuông góc với AB tại H. Đường kính vuông góc với một dây thì đi qua trung điểm của dây đó, do đó H là trung điểm của AB.\nSuy ra AH = AB / 2 = 8 / 2 = 4 cm.\nTrong tam giác vuông OAH vuông tại H, theo Pytago:\nOH = √(OA² - AH²) = √(5² - 4²) = √(25 - 16) = √9 = 3 cm.'
    }
  },
  {
    grade: 9,
    topic: 'Đường tròn và Dây cung',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Đường thẳng d và đường tròn (O; R) tiếp xúc nhau khi và chỉ khi khoảng cách d từ O đến đường thẳng thỏa mãn:',
      options: [
        'A. d < R',
        'B. d = R',
        'C. d > R',
        'D. d = 2R'
      ],
      answer: 'B',
      explanation: 'Vị trí tương đối của đường thẳng và đường tròn:\n- Cắt nhau: d < R (2 điểm chung)\n- Tiếp xúc nhau: d = R (1 điểm chung)\n- Không giao nhau: d > R (không có điểm chung).'
    }
  },

  // --- CHUYÊN ĐỀ 6: PHƯƠNG TRÌNH BẬC HAI VÀ HỆ THỨC VI-ÉT ---
  {
    grade: 9,
    topic: 'Phương trình bậc hai và Hệ thức Vi-ét',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Biệt thức Δ (delta) của phương trình bậc hai 2x² - 5x + 1 = 0 có giá trị là:',
      options: [
        'A. 17',
        'B. 33',
        'C. -17',
        'D. 9'
      ],
      answer: 'A',
      explanation: 'Phương trình có các hệ số a = 2, b = -5, c = 1.\nΔ = b² - 4ac = (-5)² - 4 · 2 · 1 = 25 - 8 = 17.'
    }
  },
  {
    grade: 9,
    topic: 'Phương trình bậc hai và Hệ thức Vi-ét',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Gọi x₁, x₂ là hai nghiệm của phương trình x² - 7x + 10 = 0. Tổng và tích của hai nghiệm (S, P) là:',
      options: [
        'A. S = -7, P = 10',
        'B. S = 7, P = 10',
        'C. S = 7, P = -10',
        'D. S = -7, P = -10'
      ],
      answer: 'B',
      explanation: 'Theo hệ thức Vi-ét đối với phương trình ax² + bx + c = 0:\nTổng hai nghiệm: S = x₁ + x₂ = -b/a = -(-7)/1 = 7.\nTích hai nghiệm: P = x₁ · x₂ = c/a = 10/1 = 10.'
    }
  },
  {
    grade: 9,
    topic: 'Phương trình bậc hai và Hệ thức Vi-ét',
    difficulty: 'Vận dụng',
    type: 'trắc nghiệm',
    content: {
      text: 'Phương trình x² - 2(m + 1)x + m² + 3 = 0 có nghiệm kép khi m bằng:',
      options: [
        'A. m = 1',
        'B. m = -1',
        'C. m = 2',
        'D. m = -2'
      ],
      answer: 'A',
      explanation: 'Hệ số a = 1, b\' = -(m + 1), c = m² + 3.\nΔ\' = (b\')² - ac = [-(m + 1)]² - 1 · (m² + 3) = m² + 2m + 1 - m² - 3 = 2m - 2.\nPhương trình có nghiệm kép khi Δ\' = 0 ⇔ 2m - 2 = 0 ⇔ m = 1.'
    }
  },

  // --- CHUYÊN ĐỀ 7: GÓC VỚI ĐƯỜNG TRÒN VÀ TỨ GIÁC NỘI TIẾP ---
  {
    grade: 9,
    topic: 'Góc với đường tròn và Tứ giác nội tiếp',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Trong một đường tròn, số đo của góc nội tiếp chắn nửa đường tròn bằng:',
      options: [
        'A. 60°',
        'B. 90°',
        'C. 180°',
        'D. 45°'
      ],
      answer: 'B',
      explanation: 'Định lý: Góc nội tiếp chắn nửa đường tròn là góc vuông (số đo bằng 90°).'
    }
  },
  {
    grade: 9,
    topic: 'Góc với đường tròn và Tứ giác nội tiếp',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Tứ giác ABCD nội tiếp đường tròn. Biết góc ∠A = 70°, số đo của góc đối diện ∠C là:',
      options: [
        'A. 70°',
        'B. 110°',
        'C. 20°',
        'D. 120°'
      ],
      answer: 'B',
      explanation: 'Tính chất tứ giác nội tiếp: Trong một tứ giác nội tiếp, tổng số đo hai góc đối nhau luôn bằng 180°.\nDo đó: ∠A + ∠C = 180° ⇒ ∠C = 180° - 70° = 110°.'
    }
  },
  {
    grade: 9,
    topic: 'Góc với đường tròn và Tứ giác nội tiếp',
    difficulty: 'Vận dụng',
    type: 'trắc nghiệm',
    content: {
      text: 'Hình nào sau đây LUÔN LUÔN nội tiếp được trong một đường tròn?',
      options: [
        'A. Hình thoi',
        'B. Hình bình hành',
        'C. Hình chữ nhật',
        'D. Hình thang thông thường'
      ],
      answer: 'C',
      explanation: 'Hình chữ nhật có 4 góc vuông (mỗi góc 90°), do đó tổng hai góc đối nhau luôn bằng 90° + 90° = 180°. Vì vậy hình chữ nhật luôn là tứ giác nội tiếp đường tròn.'
    }
  },

  // --- CHUYÊN ĐỀ 8: HÌNH TRỤ - HÌNH NÓN - HÌNH CẦU ---
  {
    grade: 9,
    topic: 'Hình trụ - Hình nón - Hình cầu',
    difficulty: 'Nhận biết',
    type: 'trắc nghiệm',
    content: {
      text: 'Công thức tính diện tích xung quanh của hình trụ có bán kính đáy r và chiều cao h là:',
      options: [
        'A. Sxq = πrh',
        'B. Sxq = 2πrh',
        'C. Sxq = 2πr²h',
        'D. Sxq = 4πr²'
      ],
      answer: 'B',
      explanation: 'Diện tích xung quanh của hình trụ là Sxq = 2πrh (chu vi đáy nhân với chiều cao).'
    }
  },
  {
    grade: 9,
    topic: 'Hình trụ - Hình nón - Hình cầu',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Một hình nón có bán kính đáy r = 3cm, chiều cao h = 4cm. Thể tích của hình nón đó bằng:',
      options: [
        'A. 12π cm³',
        'B. 36π cm³',
        'C. 24π cm³',
        'D. 48π cm³'
      ],
      answer: 'A',
      explanation: 'Thể tích hình nón được tính bằng công thức:\nV = (1/3)πr²h = (1/3) · π · 3² · 4 = (1/3) · π · 9 · 4 = 12π cm³.'
    }
  },
  {
    grade: 9,
    topic: 'Hình trụ - Hình nón - Hình cầu',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Một quả bóng hình cầu có đường kính 6 cm. Thể tích của quả bóng là:',
      options: [
        'A. 36π cm³',
        'B. 288π cm³',
        'C. 72π cm³',
        'D. 18π cm³'
      ],
      answer: 'A',
      explanation: 'Đường kính 2R = 6 cm ⇒ Bán kính R = 3 cm.\nThể tích hình cầu: V = (4/3)πR³ = (4/3) · π · 3³ = (4/3) · π · 27 = 36π cm³.'
    }
  },

  // --- CHUYÊN ĐỀ 9: ĐỀ THI THỬ TỔNG HỢP ÔN THI VÀO LỚP 10 ---
  {
    grade: 9,
    topic: 'Đề thi thử tổng hợp ôn thi vào lớp 10',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Giá trị của biểu thức P = √(20) - 3√(45) + 2√(80) là:',
      options: [
        'A. 0',
        'B. √(5)',
        'C. 2√(5)',
        'D. -√(5)'
      ],
      answer: 'B',
      explanation: 'Đưa thừa số ra ngoài căn:\n√(20) = 2√5\n3√(45) = 3 · 3√5 = 9√5\n2√(80) = 2 · 4√5 = 8√5\nTa có: P = 2√5 - 9√5 + 8√5 = (2 - 9 + 8)√5 = 1√5 = √5.'
    }
  },
  {
    grade: 9,
    topic: 'Đề thi thử tổng hợp ôn thi vào lớp 10',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Phương trình x² - 3x - 4 = 0 có tập nghiệm S là:',
      options: [
        'A. S = {-1; 4}',
        'B. S = {1; -4}',
        'C. S = {-1; -4}',
        'D. S = {1; 4}'
      ],
      answer: 'A',
      explanation: 'Phương trình có các hệ số a = 1, b = -3, c = -4.\nNhận xét: a - b + c = 1 - (-3) + (-4) = 1 + 3 - 4 = 0.\nTheo tính chất nghiệm nhanh, phương trình có 2 nghiệm: x₁ = -1 và x₂ = -c/a = 4.\nTập nghiệm S = {-1; 4}.'
    }
  },
  {
    grade: 9,
    topic: 'Đề thi thử tổng hợp ôn thi vào lớp 10',
    difficulty: 'Thông hiểu',
    type: 'trắc nghiệm',
    content: {
      text: 'Cho hàm số y = ax² đi qua điểm M(-2; 8). Giá trị của hệ số a là:',
      options: [
        'A. a = 2',
        'B. a = -2',
        'C. a = 1/2',
        'D. a = 4'
      ],
      answer: 'A',
      explanation: 'Đồ thị đi qua điểm M(-2; 8), thay x = -2 và y = 8 vào công thức hàm số:\n8 = a · (-2)² ⇔ 8 = 4a ⇔ a = 2.'
    }
  },
  {
    grade: 9,
    topic: 'Đề thi thử tổng hợp ôn thi vào lớp 10',
    difficulty: 'Vận dụng',
    type: 'trắc nghiệm',
    content: {
      text: 'Cho đường tròn (O; 10cm) và dây cung AB cách tâm O một khoảng bằng 6cm. Độ dài dây cung AB là:',
      options: [
        'A. 8 cm',
        'B. 16 cm',
        'C. 12 cm',
        'D. 14 cm'
      ],
      answer: 'B',
      explanation: 'Gọi H là hình chiếu của O lên AB, suy ra OH ⊥ AB và OH = 6cm. H là trung điểm của AB.\nTrong tam giác vuông OHA (vuông tại H), OA = R = 10cm:\nAH = √(OA² - OH²) = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.\nĐộ dài dây cung AB = 2 · AH = 2 · 8 = 16 cm.'
    }
  },
  {
    grade: 9,
    topic: 'Đề thi thử tổng hợp ôn thi vào lớp 10',
    difficulty: 'Vận dụng cao',
    type: 'trắc nghiệm',
    content: {
      text: 'Cho phương trình x² - 2x + m - 1 = 0. Giá trị của m để phương trình có hai nghiệm x₁, x₂ thỏa mãn x₁² + x₂² = 10 là:',
      options: [
        'A. m = -2',
        'B. m = 2',
        'C. m = -4',
        'D. m = 3'
      ],
      answer: 'A',
      explanation: 'Δ\' = (-1)² - 1 · (m - 1) = 1 - m + 1 = 2 - m.\nPhương trình có 2 nghiệm khi Δ\' ≥ 0 ⇔ m ≤ 2.\nTheo hệ thức Vi-ét: x₁ + x₂ = 2 và x₁ · x₂ = m - 1.\nTa có: x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ = 2² - 2(m - 1) = 4 - 2m + 2 = 6 - 2m.\nTheo đề bài: 6 - 2m = 10 ⇔ 2m = -4 ⇔ m = -2 (thỏa mãn điều kiện m ≤ 2).'
    }
  }
];
