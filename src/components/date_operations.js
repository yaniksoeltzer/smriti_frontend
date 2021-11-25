export function isSameDay(dateA, dateB){
  return dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
}
export function AisBeforeBDay(dateA, dateB){
    dateA.setHours(0,0,0,0);
    dateB.setHours(0,0,0,0);
    return dateA > dateB
}