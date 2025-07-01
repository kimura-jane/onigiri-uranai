
const quizData = [
  {
    question: "今の気分は？",
    options: [
      { text: "冒険したい", type: "じゃがいもとカレーそぼろ" },
      { text: "のんびりしたい", type: "大葉みそ" },
      { text: "頑張りたい", type: "小松菜と炙り鮭チーズ" },
      { text: "誰かと話したい", type: "じゃがいもとカレーそぼろ" }
    ]
  },
  {
    question: "今日の予定は？",
    options: [
      { text: "家でゆっくり", type: "大葉みそ" },
      { text: "仕事・勉強メイン", type: "梅きんぴらごぼう" },
      { text: "おでかけ・デート", type: "山わさびとクリームチーズ" },
      { text: "予定は未定（ノープラン）", type: "ダブル昆布" }
    ]
  },
  {
    question: "いま食べたいのは？",
    options: [
      { text: "甘いもの", type: "大葉みそ" },
      { text: "ガッツリ系", type: "小松菜と炙り鮭チーズ" },
      { text: "さっぱり系", type: "梅きんぴらごぼう" },
      { text: "ごはんそのもの", type: "ダブル昆布" }
    ]
  },
  {
    question: "おにぎりを選ぶとき重視するのは？",
    options: [
      { text: "中身の具", type: "山わさびとクリームチーズ" },
      { text: "海苔のパリパリ感", type: "ダブル昆布" },
      { text: "見た目とバランス", type: "小松菜と炙り鮭チーズ" },
      { text: "その日の気分", type: "じゃがいもとカレーそぼろ" }
    ]
  },
  {
    question: "あなたの“ノリ（海苔）”は？",
    options: [
      { text: "パリッと芯のある性格", type: "梅きんぴらごぼう" },
      { text: "ふわっと受け流す性格", type: "大葉みそ" },
      { text: "静かだけど味わい深い", type: "ダブル昆布" },
      { text: "気分屋でムラがある", type: "山わさびとクリームチーズ" }
    ]
  },
  {
    question: "今日の“味付け”は？",
    options: [
      { text: "しっかり味（主張したい日）", type: "じゃがいもとカレーそぼろ" },
      { text: "薄味でいい（控えめ気分）", type: "大葉みそ" },
      { text: "甘じょっぱい感じ", type: "小松菜と炙り鮭チーズ" },
      { text: "味噌っぽい（個性派）", type: "山わさびとクリームチーズ" }
    ]
  },
  {
    question: "あなたはどっち？",
    options: [
      { text: "自分からいく", type: "山わさびとクリームチーズ" },
      { text: "相手を待つ", type: "ダブル昆布" }
    ]
  }
];

const resultText = {
  "小松菜と炙り鮭チーズ": "品がありつつ攻めもできる、バランス型の策士タイプ。",
  "山わさびとクリームチーズ": "刺激とやさしさのギャップが魅力。個性派で一目置かれる存在。",
  "ダブル昆布": "落ち着いた雰囲気と深みのある思考。慎重で信頼されるタイプ。",
  "梅きんぴらごぼう": "真面目でしっかり者。縁の下の力持ち的存在です。",
  "大葉みそ": "優しくて芯がある、大人な安心感を与えるタイプ。",
  "じゃがいもとカレーそぼろ": "明るく前向きなムードメーカー！その場の空気を盛り上げます。"
};

function startQuiz() {
  document.querySelector("button").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

let currentQuestion = 0;
let scores = {};

function showQuestion() {
  const quizEl = document.getElementById("quiz");
  quizEl.innerHTML = "";
  if (currentQuestion >= quizData.length) {
    showResult();
    return;
  }

  const q = quizData[currentQuestion];
  const title = document.createElement("h2");
  title.textContent = q.question;
  quizEl.appendChild(title);

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      scores[opt.type] = (scores[opt.type] || 0) + 1;
      currentQuestion++;
      showQuestion();
    };
    quizEl.appendChild(btn);
  });
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  const resultEl = document.getElementById("result");
  const shareEl = document.getElementById("share");
  resultEl.style.display = "block";
  shareEl.style.display = "block";

  let topType = null;
  let max = 0;
  for (const type in scores) {
    if (scores[type] > max) {
      max = scores[type];
      topType = type;
    }
  }

  const imagePath = topType.replace(/ /g, "_") + ".jpg";
  resultEl.innerHTML = `<h2>あなたは【${topType}】タイプ！</h2>
                        <img src="${imagePath}" alt="${topType}">
                        <p>${resultText[topType]}</p>`;

  const shareText = encodeURIComponent(`私は『${topType}』タイプでした！ #おにぎり占い`);
  document.getElementById("x-share").href = `https://twitter.com/intent/tweet?text=${shareText}`;
  document.getElementById("line-share").href = `https://social-plugins.line.me/lineit/share?text=${shareText}`;
}
