let newsData=[];

function loadCategory(cat){

document.getElementById("news").innerHTML="Loading news...";

newsData=[];

sources[cat].forEach(feed=>{

fetch("https://api.rss2json.com/v1/api.json?rss_url="+feed)

.then(r=>r.json())

.then(data=>{

data.items.forEach(n=>{

n.summary = summarize(n.content || n.description);

newsData.push(n);

});

displayNews(newsData);

});

});

}

function displayNews(list){

let html="";

list.forEach(n=>{

html+=`
<div class="card">
<a href="${n.link}" target="_blank">${n.title}</a>
<div class="summary">${n.summary}</div>
</div>
`;

});

document.getElementById("news").innerHTML=html;

}

function searchNews(q){

let r=newsData.filter(n=>
n.title.toLowerCase().includes(q.toLowerCase())
);

displayNews(r);

}

function summarize(text){

let div=document.createElement("div");
div.innerHTML=text;

let t=div.innerText;

return t.substring(0,120)+"...";

}

loadCategory("myanmar");
