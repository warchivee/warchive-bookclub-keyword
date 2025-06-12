
const categories = {
    "feministAlliance": "여성 연대",
    "talCorset": "탈코르셋",
    "talOtaku": "탈오타쿠",
    "talIdol": "탈아이돌",
    "talReligion": "탈종교",
    "selfThinking": "주체성",
    "socialIssue": "사회문제"
};
const keywords = {
    "feministAlliance": [
        "집단의 이익",
        "여성해방",
        "비돕비",
        "비소비",
        "각자도생",
        "불매 운동",
        "정치적 레즈비어니즘"
    ],
    "talCorset": [
        "사회적 여성성",
        "꾸밈노동",
        "건강",
        "자기 파괴",
        "성상품화",
        "코르셋의 대물림",
        "비소비",
        "경제력"
    ],
    "talOtaku": [
        "대상화",
        "서브컬처",
        "코르셋",
        "과몰입",
        "과소비",
        "팬덤 문화",
        "자아의탁",
        "성애 중심",
        "전시의 중요성",
        "경제력"
    ],
    "talIdol": [
        "코르셋",
        "과몰입",
        "과소비",
        "팬덤 문화",
        "시장 페미니즘",
        "성착취",
        "우상화",
        "자아의탁",
        "전시의 중요성",
        "경제력"
    ],
    "talReligion": [
        "가부장제",
        "순종 강요",
        "여성혐오 교리",
        "자기 검열",
        "여성 노동 착취"
    ],
    "selfThinking": [
        "발화의 중요성",
        "의견 외주 주기",
        "독립적 사고",
        "페미 스피커",
        "자아의탁",
        "여성주의 실천",
        "백래시"
    ],
    "socialIssue": [
        "미러링",
        "루키즘",
        "도덕 코르셋",
        "쿠션어",
        "나이 강박",
        "임금차별",
        "돌봄노동",
        "여성혐오적 비속어",
        "페이강간",
        "젠더론",
        "여성 서사",
        "여성 카르텔",
        "기혼 의제"
    ]
};

let lastDrawnCategory = '';

function drawKeyword() {
    const select = document.getElementById('categorySelect');
    const keywordEl = document.getElementById('keyword');
    const titleEl = document.getElementById('cardTitle');
    const card = document.getElementById('keywordCard');
    const drawBtn = document.getElementById('drawBtn');

    let allKeywords = [];
    if (select.value === 'all') {
        for (const [cat, list] of Object.entries(keywords)) {
            allKeywords.push(...list.map(k => ({ text: k, category: cat })));
        }
    } else {
        allKeywords = keywords[select.value].map(k => ({ text: k, category: select.value }));
    }

    const random = allKeywords[Math.floor(Math.random() * allKeywords.length)];
    keywordEl.textContent = random.text;
    titleEl.textContent = `${categories[random.category]}`;
    card.className = `card ${random.category}`;
    lastDrawnCategory = random.category;
    drawBtn.textContent = "키워드 다시 뽑기";
}

function saveKeyword() {
    const category = document.getElementById('cardTitle').textContent;
    const keyword = document.getElementById('keyword').textContent;
    if (keyword === '키워드를 뽑아주세요') return;

    const saved = JSON.parse(localStorage.getItem('savedKeywords') || '[]');
    const toast = document.getElementById('toast');

    const saveFormattedKeyword = category + '-' + keyword;

    if (!saved.includes(saveFormattedKeyword)) {
        saved.push(saveFormattedKeyword);
        localStorage.setItem('savedKeywords', JSON.stringify(saved));
        showToast("저장되었습니다!");
    } else {
        showToast("이미 저장된 키워드입니다.");
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// select가 바뀔 때 카드 색상과 텍스트 초기화
document.getElementById('categorySelect').addEventListener('change', function () {
    const select = this;
    const card = document.getElementById('keywordCard');
    const keywordEl = document.getElementById('keyword');
    const titleEl = document.getElementById('cardTitle');

    const selectedCategory = select.value;

    // 카드의 class 를 변경하여 스타일 초기화
    if (selectedCategory === 'all') {
        card.className = 'card';
        titleEl.textContent = '';
        keywordEl.textContent = '키워드를 뽑아주세요';
    } else {
        card.className = `card ${selectedCategory}`;
        titleEl.textContent = categories[selectedCategory];
        keywordEl.textContent = '키워드를 뽑아주세요';
    }

    // 버튼 텍스트 초기화
    document.getElementById('drawBtn').textContent = '키워드 뽑기';
});

// 키워드 전체 보기 팝업 내용 render
function renderAllKeywords() {
    const container = document.getElementById('keywordList');
    container.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('savedKeywords') || '[]');

    for (const [category, list] of Object.entries(keywords)) {
        const section = document.createElement('div');
        const heading = document.createElement('h4');
        heading.textContent = categories[category];
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'keyword-grid';

        list.forEach(word => {
            const box = document.createElement('div');
            box.className = 'keyword-box';
            if (saved.includes(categories[category] + '-' + word)) {
                box.classList.add('saved');
            }
            box.textContent = word;
            grid.appendChild(box);
        });

        section.appendChild(grid);
        container.appendChild(section);
    }
}
