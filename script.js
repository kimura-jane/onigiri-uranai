
// ---------- データ ----------
const TYPES = [
  {name:"小松菜と炙り鮭チーズ",img:"images/01_komatsuna_aburishake_cheese.jpg",tag:"ヘルシーだけど攻める！"},
  {name:"山わさびとクリームチーズ",img:"images/02_yamawasabi_creamcheese.jpg",tag:"ツンと来て、とろける。"},
  {name:"ダブル昆布",img:"images/03_double_konbu.jpg",tag:"旨み、二段重ね。"},
  {name:"梅きんぴらごぼう",img:"images/04_umekin_gobo.jpg",tag:"シャキッと爽やか。"},
  {name:"大葉みそ",img:"images/05_ohba_miso.jpg",tag:"和の心、香り立つ。"},
  {name:"じゃがいもとカレーそぼろ",img:"images/06_jagaimo_curry_soboro.jpg",tag:"ボリューム満点、元気全開！"}
];

const QUESTIONS = [
  {
    q:"いまの気分に一番近いのは？",
    opts:[
      {text:"のんびり落ち着きたい",[1]:1,[3]:2,[4]:1,[6]:1},
      {text:"ガツンと挑戦したい",[2]:3,[5]:2,[6]:2},
      {text:"体にやさしくいきたい",[1]:2,[3]:1,[5]:3}
    ]
  },
  {
    q:"おにぎりで重視するポイントは？",
    opts:[
      {text:"具がゴロッと贅沢",[1]:1,[2]:3,[6]:2,[5]:1},
      {text:"ご飯と具の一体感",[1]:2,[3]:1,[4]:2,[5]:2},
      {text:"片手でサクッと食べやすい",[2]:1,[3]:2,[6]:3}
    ]
  },
  {
    q:"理想の “海苔 × ご飯” の食感は？",
    opts:[
      {text:"海苔パリッ × ご飯ほかほか",[3]:3,[5]:1,[2]:2},
      {text:"海苔しっとり × ご飯もちもち",[1]:2,[2]:3,[5]:1},
      {text:"海苔控えめで具をがっつり",[6]:3,[1]:1,[5]:2,[3]:1}
    ]
  },
  {
    q:"今いちばん食べたいおにぎりの具は？",
    opts:[
      {text:"魚介系（鮭・ツナ・昆布）",[3]:3,[1]:2},
      {text:"肉系（焼き鳥・そぼろ）",[6]:3,[4]:2,[5]:1},
      {text:"変わり種（クリームチーズ系・梅きんぴら）",[4]:3,[2]:2,[5]:2}
    ]
  },
  {
    q:"おにぎりと一緒に飲むなら？",
    opts:[
      {text:"コーヒー・カフェラテ",[2]:2,[4]:2,[6]:2},
      {text:"緑茶・麦茶",[1]:3,[3]:2,[5]:2},
      {text:"炭酸やレモンソーダ",[4]:3,[6]:3,[3]:1}
    ]
  }
];

const luckyTastes = ["しょうゆ","塩こんぶ","柚子こしょう","七味","ゆかり","ごま塩","バターしょうゆ","ガーリック","バジル","わさび"];
const luckyActions = ["深呼吸してリセット","新しい音楽を聴く","散歩でリフレッシュ","部屋を片付ける","お気に入りの香りを楽しむ","ちょい辛フードを試す","水を多めに飲む","10分ストレッチ","笑える動画を見る","早めに就寝"];

// ---------- 画面構築 ----------
const quizContainer = document.getElementById("quizContainer");
QUESTIONS.forEach((q,qi)=>{
  const div=document.createElement("div");div.className="question";
  div.innerHTML=`<p>${qi+1}. ${q.q}</p>`;
  q.opts.forEach((opt,oi)=>{
    const id=`q${qi}_${oi}`;
    div.innerHTML+=`<label><input type="radio" name="q${qi}" value="${oi}" id="${id}"> ${opt.text}</label>`;
  });
  quizContainer.appendChild(div);
});

// ---------- イベント ----------
document.getElementById("startBtn").onclick=()=>{toggle("hero",false);toggle("quizSection",true);}
document.getElementById("submitBtn").onclick=showResult;
document.getElementById("restartBtn").onclick=()=>location.reload();

function toggle(id,show){document.getElementById(id).classList.toggle("hidden",!show);}

function showResult(){
  // スコア集計
  const scores=Array(TYPES.length).fill(0);
  for(let qi=0;qi<QUESTIONS.length;qi++){
    const sel=document.querySelector(`input[name="q${qi}"]:checked`);
    if(!sel){alert("全ての質問に答えてね！");return;}
    const opt=QUESTIONS[qi].opts[+sel.value];
    Object.keys(opt).forEach(k=>{
      if(k!=="text"){scores[k-1]+=opt[k];}
    });
  }
  // 一番スコアが高いタイプ
  let best=0;for(let i=1;i<scores.length;i++){if(scores[i]>scores[best])best=i;}
  const type=TYPES[best];

  // 日替わり運勢
  const today=new Date().toISOString().slice(0,10); // YYYY-MM-DD
  const seed=hash(`${today}-${best}`);
  const stars=(seed%5)+1;
  const taste=luckyTastes[seed % luckyTastes.length];
  const action=luckyActions[(seed>>1) % luckyActions.length];

  // 表示
  document.getElementById("resultTitle").innerText=`あなたは「${type.name}」タイプ！`;
  document.getElementById("resultImg").src=type.img;
  document.getElementById("resultImg").alt=type.name;
  document.getElementById("resultTagline").innerText=type.tag;
  document.getElementById("dailyLuck").innerText=`今日の運勢：${"★".repeat(stars)}`;
  document.getElementById("luckyTaste").innerText=`ラッキー味：${taste}`;
  document.getElementById("luckyAction").innerText=`ラッキー行動：${action}`;
  document.getElementById("advice").innerText=`一日一膳！${type.tag}気分で乗り切ろう。`;

  toggle("quizSection",false);toggle("resultSection",true);
}

function hash(str){
  let h=0;for(let i=0;i<str.length;i++){h=(h<<5)-h+str.charCodeAt(i);h|=0;}
  return Math.abs(h);
}
