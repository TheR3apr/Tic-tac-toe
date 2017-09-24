var mode, xOrO, xOrOt, pos, sc1 = 0, sc2 = 0, moves = 0, turns = false, targetT;
var combos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var check = [];
var cur = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
  rValue: true,
};
var modes = {
  mode: undefined,
  xOrO: undefined
}
function compMove(){
  var cur = Math.floor(Math.random() * (9)) + 1;
  if(!check.find(function(x){return x == 'f'+cur})) {
    return 'f'+cur;
  }
  else {
    return compMove();
  }
}
function makeAMove(target){
  if(!check.find(function(x){return x == target})) {
          check.push(target);
          if (xOrOt) pos = 'X';
          else pos = 'O';
          document.getElementById(target+'p').innerHTML = pos;
          xOrOt = !xOrOt;
          moves+=1;
          checkResult(target); //AAAAAAAAAAAAAAAAAAAA
          if(cur.rValue){
            
            gameEngine();
          }
          else
            cur.rValue = true;
        }
}
function check2 (y) {
  //debugger;
  return y.every(function(x) {
    return cur[x] === pos;
  });
}
function checkResult(target){
  //debugger;

  cur[target.substring(target.length - 1)] = pos;
  if(combos.find(function(yy){
    return yy.every(function(xx) {
    return cur[xx] === pos;
  });})) {
    cur.rValue = false;
    $('.fields').fadeOut();
    
    if (xOrOt !== modes.xOrO){
      sc1+=1; 
      document.getElementById('sc1').innerHTML = sc1;
      $('#win').show();
    }
    else {
      sc2+=1; 
      document.getElementById('sc2').innerHTML = sc2;
      if (modes.mode) $('#loss').show();
      else $('#win').show();
    } 
  }
  else if (moves == 9){
    $('.fields').fadeOut();
    $('#tie').show();
  }
  $('.message').on('click', function(){
    debugger;
    moves = 0;
    if (xOrOt === modes.xOrO)
      xOrOt = !xOrOt;
    for(var i = 1; i<=9; i++){
      cur[i]='';
      document.getElementById('f'+i+'p').innerHTML = '';
    }
    check = [];
    $('.fields').show();
    $('.xOrO').hide();
    $('#win').hide();
    $('#loss').hide();
    $('#tie').hide();
    $('.sOrM').hide();
    gameEngine();
    return;
  });
}
function gameEngine(){
  if(modes.mode){
    if(modes.xOrO === xOrOt) {
      $('.fields').on('click', function(event){
        //debugger;
        targetT = event.target.id;
        makeAMove(targetT);
      });
      
    }
    else {
      targetT = compMove();
      makeAMove(targetT);
      
    }
  }
  else {
    $('.fields').on('click', function(event){
        //debugger;
        targetT = event.target.id;
        makeAMove(targetT);
      });
  }
}
function setTheStage(){
  //debugger;
  $('.fields').hide();
  $('.xOrO').hide();
  $('#win').hide();
  $('#loss').hide();
  $('#tie').hide();
  $('.sOrM').show();
  $('.aa').on('click', function(event){
    //debugger;
    var target = event.target.id;
    if (target.match('alone')) modes.mode = true;
    else modes.mode = false;
    $('.fields').hide();
    $('.sOrM').hide();
    $('#win').hide();
    $('#loss').hide();
    $('#tie').hide();
    $('.xOrO').show();
  });
  $('.bb').on('click', function(event2){
      //debugger;
      var target2 = event2.target.id;
      if (target2.match('x')) modes.xOrO = true;
      else modes.xOrO = false;
      xOrOt = modes.xOrO;
      $('.xOrO').hide();
      $('.fields').show();
      turns = false;
      gameEngine();
      return;
    });
  
  
}
$(document).ready(function(){
 setTheStage();
})