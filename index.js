

$("#searchButton").click(()=>{
    search();
});

$("#searchInput").keyup((event)=>{
    if(event.key=='Enter')
    {
        search();
    }
});

function search(){
    const inputValue=$("#searchInput").val().trim();

    if(inputValue==="")
    {
        alert("please enter the text!!!");
    }
     fetchDataFromApi(inputValue);
}
 async function fetchDataFromApi(inputValue)
 {
    try{
     const responce =await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
     if(!responce.ok)
     {
     throw new  Error("failed to fetch!!");
     }

     const data=await responce.json();

    displayResult(data);
    }catch(error){
   console.log(Error);
   alert("an error is occured");
    }
 }
 function displayResult(data)
    {
        $(".resultContainer").css("display","block");
       const wordData=data[0];
     $("#wordTitle").text(wordData.word);
     $("#wordDescription").html(`
         <ul>
         ${wordData.meanings.map(meaning=>`
            <li><strong>Part of speach:</strong>${meaning.partOfSpeech}</li>
            <li><strong>Definition:</strong>${meaning.definitions[0].definition}</li>
            `).join('\n')}
         </ul?
        `);
    }

    $("#audioButton").click(()=>{
        const inputValue=$("#searchInput").val().trim();

    if(inputValue==="")
    {
        alert("please enter the text!!!");
    }
     speak(inputValue);
    });
 function speak(inputValue)
 {
  const speech = new SpeechSynthesisUtterance(inputValue);
  speech.lang='en-US';
  speech.pitch=1;
  speech.volume=2;
  speech.rate=1;
  window.speechSynthesis.speak(speech);
 }