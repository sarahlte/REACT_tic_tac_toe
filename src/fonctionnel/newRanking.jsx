

export default function newRanking(player1, p1Victory){
    const ranking = localStorage.getItem('ranking')? localStorage.getItem('ranking') : JSON.stringify([{username: 'Kappa', score: 12}, {username: 'Pierre', score: 9},{username: 'Paul', score: 7}, {username: 'Marie', score: 6}, {username: 'Sarah', score: 3}, {username: 'Tom', score: 1}]);

    const rankingParse = JSON.parse(ranking);
    let newRanking = [];
    let isExist = false;
    for(let i = 0; i < rankingParse.length; i++){
      if (parseInt(p1Victory) == parseInt(rankingParse[i].score) && player1 == rankingParse[i].username){
        isExist = true;
      }
    }
    for(let i = 0; i < rankingParse.length; i++){
      if(!isExist){
        if(parseInt(p1Victory) < rankingParse[i].score && parseInt(p1Victory) > rankingParse[i+1].score){
          newRanking.push(rankingParse[i]);
          newRanking.push({username: player1, score: parseInt(p1Victory)});
        }
        else if (parseInt(p1Victory) == parseInt(rankingParse[i].score) && player1 != rankingParse[i].username) {
          newRanking.push(rankingParse[i]);
          newRanking.push({username: player1, score: parseInt(p1Victory)});
        } 
        else if (i == 0 && parseInt(p1Victory) > rankingParse[i].score){
          newRanking.push({username: player1, score: parseInt(p1Victory)});
          newRanking.push(rankingParse[i]);
        } 
        else if (i == rankingParse.length-1 && parseInt(p1Victory) < rankingParse[i].score) {
          newRanking.push(rankingParse[i]);
          newRanking.push({username: player1, score: parseInt(p1Victory)});
        }
        else {
          newRanking.push(rankingParse[i]);
        }
      }      
      else {
        newRanking.push(rankingParse[i]);
      }
    }
    newRanking = JSON.stringify(newRanking);
    console.log(newRanking);
    localStorage.setItem('ranking', newRanking);
}