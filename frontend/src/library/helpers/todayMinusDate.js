function todayMinusDate(date) {
  let today = new Date();
  const oneDay = 24*60*60*1000;
  if (today-date< oneDay*5 && today-date>oneDay*4){
    return 5;
  }
  if (today-date< oneDay*4 && today-date>oneDay*3){
    return 4;
  }
  if (today-date< oneDay*3 && today-date>oneDay*2){
    return 3;
  }
  if (today-date< oneDay*2 && today-date>oneDay*1){
    return 1;
  }
  if (today-date< oneDay*1 && today-date>oneDay*0){
    return 0;
  }
  return false;
}

export default todayMinusDate;
