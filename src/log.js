export default function(body){
    if(global.__log){
        global.__log.info(body)
      }else{
        console.log('未接入日志')
      }
}