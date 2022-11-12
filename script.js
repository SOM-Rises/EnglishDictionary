const wraper = document.querySelector(".wraper"),
input = wraper.querySelector("input"),
synonyms = wraper.querySelector(".synonyms .list"),
volumnIcon = wraper.querySelector(".word i"),
removeIcon = wraper.querySelector(".search span"),
Textinfo = wraper.querySelector(".text-info");

let audio;
const data = (result,word) =>{

    // console.log(result);
    if(result.title){ 
        Textinfo.innerHTML = `Searching the meaning of <span>'${word}'<span/> please try to search another word`;
    }else{
        console.log(result);
        let Defination = result[0].meanings[0].definitions[0],
        Example = result[0].meanings[0].definitions[0];
        console.log(Example);
        if(!('example' in Example)){
            for(let i = 0;i<4;i++){
                Example = result[0].meanings[i].definitions[i];
                if(('example' in Example)){
                    Example = result[0].meanings[i].definitions[i];
                    console.log(Example);
                    break;
                }
                
            }
        }


        let phonetics = `${result[0].meanings[0].partOfSpeech}${result[0].phonetic}`;
       
        // console.log(result);
        wraper.classList.add("active");
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".meaning span").innerText = Defination.definition;
        document.querySelector(".example span").innerText = Example.example;
        document.querySelector(".word span").innerText = phonetics;
        audio = new Audio(result[0].phonetics[0].audio);

        if(result[0].phonetics[0].audio == ''){
            for(let i = 0;i<3;i++){
                audio = new Audio(result[0].phonetics[i].audio);
                console.log(audio);
            }
        }

        synonyms.innerHTML = "";

        if(result[0].meanings[0].synonyms[0] == undefined){
            synonyms.parentElement.style.display = 'none';
        }else{
            synonyms.parentElement.style.display = 'block';
            for(let i = 0;i<5;i++){
                let tag = `<span onclick=search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]},<span/>`;
                console.log(tag);
                synonyms.insertAdjacentHTML("beforeend",tag);
            }
        }
       
    }
}



const FetchApi = (word) =>{
    wraper.classList.remove("active");
    Textinfo.style.color = "#000";
    

    Textinfo.innerHTML = `Searching the meaning of <span>'${word}'<span/>`
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    //fetching api response and returning it with parsing into js obj and in another then
    //method calling data function with passing api response and search word as an argument
    fetch(url).then(res => res.json()).then(result => data(result,word));

}

function search(word){
    input.value = word;
    FetchApi(word);
}

input.addEventListener("keyup",event =>{
    if(event.key==='Enter' && event.target.value){
        FetchApi(event.target.value);
    }
})

volumnIcon.addEventListener('click',() =>{
    audio.play();
})

removeIcon.addEventListener("click",() =>{
    input.value = "";
    input.focus();
    wraper.classList.remove("active");
    Textinfo.style.color = '#9a9a9a';
    Textinfo.innerHTML = `Type a word and press enter to get meaning,example,pronunciation,and sysnonyms of thet typed word.`;
})