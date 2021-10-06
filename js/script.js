//constant variables
var userTeam='';
let team;
// let pageTeamName = document.getElementById('pageTeamName');
// state variables-data that changes
let arrFacts;
var exactTeam;
var newTeam;
let stadName;
let pageTeamName;
// var teamInput;
let searches;
var searchArr = [];
console.log(searchArr)
var newSearch = ''
console.log(newSearch)



var elements = document.querySelectorAll('.contents');


elements.forEach(el=> el.addEventListener('click', event => {
    console.log(event)
    // console.log(event.target.name)
   

    var newSearch = event.target.name

    
   
    // const newSearch =  if(newSearch =!! newSearch){
    //     console.log(newSearch)
    //     newdiv.classList.remove('circle')

    // } else{
    //     newdiv.classList.add('circle')

    // }
    var newdiv = event.target.parentElement
    console.log(newSearch)

    // const newObj = {
    //     newSearch: ''
    // }

    newdiv.classList.add('circle')

   


    // var chosen = document.querySelectorAll('.contents').name
    // console.log(chosen)



    $.ajax(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${newSearch}`).then(function(data){
    // if(data.teams[0].teamStr !== null) return alert('team not found');
    // console.log(inputValue)
    // document.querySelector('.form-control').value = ''
    // console.log(data.teams[0].strTeam)
    // console.log(teamInput)

    // if(data.teams === null)
    // {          
    //         const $parentElement = $('#alert');
    //     const alert = ` <div class="disclaimer"><h1 id="disclaimer">Enter a valid team name</h1></div>`
    //     $('#alert').html(alert);
    // setTimeout(function(){
    //     $('#alert').remove()
    // },3000)
// console.log(newSearch)
// newObj.watch(newSearch)
    // if(newSearch =!! newSearch){
    //     console.log(newSearch)
    //     newdiv.classList.remove('circle')

    // } else{
    //     newdiv.classList.add('circle')

    // }


    // } else 
    // {
        team = data.teams;
        

        getTeam(newSearch,team);
        

        $('.form-control').val('');

      
        

        // storeSearch(teamInput);


       

    // }
    //  validate(teamInput,team);

//   console.log(data);

    // getTeam(teamInput,team);
    

    },function(error){
        console.log(error)
    });
















    // console.log(this.classList);


}))





document.getElementById('form').addEventListener('submit',function(e){

    // var inputValue = document.querySelector('.form-control').value;


    // searchArr.push()

  
    e.preventDefault();

    // console.log(teamInput)
   
    var userTeam = document.querySelector('.form-control').value.toLowerCase();
    var teamInput = toUpperCas(userTeam);
    // searchArr.push(teamInput);
    storeSearch(teamInput);

    // storeSearch(teamInput);

    // console.log(searchArr);


    let link = 'https://thesportsdb.com/api/v1/json/1/lookupteam.php?id=133604'



    $.ajax(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${userTeam}`).then(function(data){
    // if(data.teams[0].teamStr !== null) return alert('team not found');
    // console.log(inputValue)
    // document.querySelector('.form-control').value = ''
    // console.log(data.teams[0].strTeam)
    // console.log(teamInput)

    if(data.teams === null)
    {          
            const $parentElement = $('#alert');
        const alert = ` <div class="disclaimer"><h1 id="disclaimer">Enter a valid team name</h1></div>`
        $('#alert').html(alert);
    setTimeout(function(){
        $('#alert').remove()
    },3000)

    } else 
    {
        team = data.teams;

       

        getTeam(teamInput,team);
        $('.form-control').val('');
       
        // storeSearch(teamInput);


       

    }
    //  validate(teamInput,team);

//   console.log(data);

    // getTeam(teamInput,team);
    

    },function(error){
        console.log(error)
    });


});

// function validate(teamInput,teams){


// }
function toUpperCas(str){
    return  str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1) ).join(" ");
}



function getTeam(teamInput,team){

console.log(teamInput)
        // let pageTeam = team[0];
        // console.log(team);
    let newTeam =  team.filter(team => team.strTeam === teamInput).map(team => {
          
        return [team.strTeam,team.strDescriptionEN,team.strTeamBadge,team.strStadium,team.strStadiumLocation,team.strStadiumThumb,team.strAlternate,team.strCountry,team.intFormedYear,team.strLeague,team.strWebsite]
      })
    //   console.log(newTeam)
// let pageTeam = newTeam[0];
      const exactTeam = newTeam[0][0].toString()
// <h1> and logo variables
    const stadDisc = newTeam[0][1].toString();
    const stadBadge = newTeam[0][2].toString();
    //   console.log(stadBage);
    //   the <ul> list 
    const teamFacts = newTeam[0].slice(6,11);
    //   console.log(teamFacts);

      // stade Image and name
      const stadImg = newTeam[0][5].toString();
      const stadName = newTeam[0][3].toString();
      
    //   console.log(stadName)
                render(newTeam,exactTeam,stadDisc,stadBadge,teamFacts,stadImg,stadName);

    //   console.log(stadName)
    
    }
    



    function render(newTeam, exactTeam, stadDisc, stadBadge, teamFacts, stadImg, stadName) {


        const html = `<div class="title"><h1>${exactTeam}</h1></div> `

        const html2 = `
                <div class="card" >
                <img src="${stadBadge}" class="card-img-top" alt="..."> 
                <div class="card-body">
                  <p class="card-text">${stadDisc}</p>
                </div>
                </div>
                <div id="fiveFacts">
                <div class="factscard">

                <ul id="factsList" style="display:flex, justify-content:center">
                    <li class="fiveFacts">${teamFacts[0]}</li>
                    <li class="fiveFacts">${teamFacts[1]}</li>
                    <li class="fiveFacts">${teamFacts[2]}</li>
                    <li class="fiveFacts">${teamFacts[3]}</li>
                    <li class="fiveFacts">${teamFacts[4]}</li>
                </ul>
                </div>
            </div>
            <div class="stadInfo">
             <img  src="${stadImg}" class="img-fluid" alt="..."> 
             <h2 id="stadTitle">${stadName}</h2>

            </div>`;

        const lastSearches = searchArr.map(item => `<li>${item}</li>`).join('');
        const searchList = `<ul>${lastSearches}</ul>`;
        $('#title').html(html)
        $('.dynamic').html(html2 + searchList)


    };

//         <div class="lastSearches">
//         <li class="fiveSearches">${searches[0]}</li>
//         <li class="fiveSearches">${searches[1]}</li>
//         <li class="fiveSearches">${searches[2]}</li>
//         <li class="fiveSearches">${searches[3]}</li>
//         <li class="fiveSearches">${searches[4]}</li>
    
//     // </div>


function storeSearch(teamInput){
    if(localStorage.getItem('searches') === null){
        searchArr = [teamInput];
        localStorage.setItem('searches', JSON.stringify(searchArr));
    } else {
        searchArr = [teamInput, ...JSON.parse(localStorage.getItem('searches'))]
        localStorage.setItem('searches', JSON.stringify(searchArr));
    }
}

function removeClass(newSearch){

}


// function storeSearch(teamInput){
//     console.log(teamInput)
//     console.log(searchArr)

//     let searches;
//     if(localStorage.getItem('searches') === null){
//         searches = [];
//     } else {
//         searches = JSON.parse(localStorage.getItem('searches'))
//     }
//     searches.push(teamInput);
//     localStorage.setItem('searches',JSON.stringify(searches));

// }

  






























// //constant variables
// var userTeam='';
// let team;
// // let pageTeamName = document.getElementById('pageTeamName');
// let $pageTeamName = $('#pageTeamName')
// // state variables-data that changes
// let arrFacts;


// // cached element references - parts of the dom we need to touch



// // event listeners - capture and respond to events i.e. user clicks on something

// document.getElementById('form').addEventListener('submit',function(e){
    

  
//     e.preventDefault();
//     var userTeam = document.querySelector('.form-control').value.toLowerCase();
//     var teamInput = toUpperCas(userTeam);

//     // console.log(teamInput)
   
    
//     let link = 'https://thesportsdb.com/api/v1/json/1/lookupteam.php?id=133604'


//     $.ajax(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${userTeam}`).then(function(data){
//     if(data.teams === null) return alert('team not found');
//     team = data.teams;
//   console.log(data);
//     getTeam(teamInput);

//     // console.log(team)
  

//     console.log(team);
//     // console.log(teamInput);
    
//     getFacts(teamInput);
//     getDescription(teamInput)
//     // stadiumInfo(teamInput)
//         // console.log(data)

//     },function(error){
//         console.log(error)
//     });


// });

// // function stadiumInfo(teamInput){

// //     let stadiumInfo = team.filter(team => team.strTeam===teamInput)
// //     .map(team => {
//         // return [team.strStadium,team.strStadiumLocation,team.strStadiumThumb]
// //     })
// //     console.log(stadiumInfo)


// // }

// function getDescription(teamInput){

//     let teamDisc = team.filter(team => team.strTeam===teamInput)
//     .map(team => {
//         return [team.strDescriptionEN,team.strTeamBadge,team.strStadium,team.strStadiumLocation,team.strStadiumThumb]



//     })

//     // const stadThumb = teamDisc[1].toString();;
//     // console.log(stadThumb);




//     console.log(teamDisc)

//     const neededDisc = teamDisc[0][0].toString();

//     const discription = document.querySelector('.card-text');
//     discription.textContent = `${neededDisc}`;
//     console.log( `${discription.toString().length}`)



//         const stadInfo = teamDisc[0][4].toString();
//         console.log(stadInfo)
//         // const stadImg = 
//         // const stadImg= stadInfo
//         var stadImg= document.createElement('img');
//         stadImg.src = `${stadInfo}`;
//         stadImg.className = 'img-fluid';
//         const stadParentElement = document.querySelector('.stadInfo')
//         stadParentElement.innerHTML='';

//         stadParentElement.appendChild(stadImg);

//     // console.log(neededDisc)
//     // console.log(teamDisc[0][1])
//     const imgTeam = teamDisc[0][1];
//     // console.log(img)
//     var img = document.createElement('img'); 
//     img.src=`${imgTeam}`
//     img.className = 'card-img-top'
//     const parentElement = document.querySelector('.card');
//     // parentElement.innerHTML = '';

//     parentElement.appendChild(img);






//     // const divDisc = document.getElementById('brief');
//     // const disc = document.createElement('p');
//     // package.className='para'
//     // divDisc.appendChild(document.createTextNode(`${neededDisc}`));
//     // divDisc.appendChild(disc)

//     // render();
// }


// function getFacts(teamInput){
//     // console.log(teamInput)
//     // console.log(team)
//     let teamFacts = team.filter(team => team.strTeam===teamInput).map(team => {
//         return [team.strAlternate,team.strCountry,team.intFormedYear,team.strLeague,team.strWebsite]
//     })

//     // for(i=0;i<teamFacts.length;i++){
//     //     console.log(teamFacts)
//     // }


//     // console.log(teamFacts)
//     const neededFacts = teamFacts[0];
//     // console.log(neededFacts)
//     const div=document.getElementById('fiveFacts');
//     const list = document.getElementById('factsList');
//     list.innerHTML = '';


//     for(i=0; i<neededFacts.length;i++){
//         // render(teamFacts)
//         // var arrFacts=[AKA,country,formedSince,leagueName,website]
//         const li=document.createElement('li');
//         li.className='factPoint';
    
//         li.appendChild(document.createTextNode(` ${neededFacts[i]}`))
//         // const fact = li.createTextNode(` country: ${teamFacts[0][1]}`)
//         list.appendChild(li);
    
//     // how to stop after Each team ?

//     }



// }

// function getTeam(teamInput){
// // console.log(team)

//     // for(i=0; i < data.length ; i++){
//     //     console.log(data.)
//     // }
//   let newTeam =  team.filter(team => team.strTeam === teamInput).map(team => {
//       return team.strTeam;
//   })
// // console.log(newTeam[0])
// let pageTeam = newTeam[0];
// // console.log(newTeam)
// // console.log(pageTeam)

//   render(pageTeam);
  

// }


// // function-code that represents actions taked/carried out 
// // helper function !!

// function toUpperCas(str){
//     return  str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1) ).join(" ");
// }

// function render(pageTeam){
//     $pageTeamName.text(pageTeam)

// }

// // fetch(api)
// // .then(function(response){
// //     return response.json();
// // })
// // .then(function(data){

// //     team = data.teams;
// //     getTeam(teamInput);

    
// // }).catch(function(error){
// //     console.log(error);
// // })    fetch(`link`)
// // .then(function(response){
// //     return response.json();
// // })
// // .then(function(data){

// //     team = data.teams;
// //     getTeam(teamInput);

    
// // }).catch(function(error){
// //     console.log(error);
// // })


// // $('document').ready(function(){
// //     var showChar = 50;
// //     var ellipsesText= "...";
// //     var moreText = "more";
// //     var lessText = "less";

// //     $('.more').each(function(){

// //         var content = $(this).html();
// //         if(content.length > showChar){
// //             var c = content.substr(0, showChar);
// //             var h = content.substr(showChar-1, content.length- showChar);
// //             var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
// //             $(this).html(html)
// //         }
// //     });
// // $('.morelink').click(function(){
// //     if($(this).hasClass('less')){
// //         $(this).removeClass('less');
// //         $(this).html(moreText);
// //     } else {
// //         $(this).addClass('less');
// //         $(this).html(lessText);

// //     }
// //     $(this).parent().prev().toggle();
// //     $(this).prev().toggle();
// //     return false;

// // })


// // })

