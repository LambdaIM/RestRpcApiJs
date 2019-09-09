
export default function(url,options){
    console.log('net=============================')
    var netoptions={
        url:url,
        method:options!=undefined?options.method:'get'
    }
    return  new Promise(function(resolve, reject) {
        
        const request = global.__net.request(netoptions)
    let body = ''
    request.on('response', (response) => {
      console.log(`STATUS: ${response.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
      response.on('data', (chunk) => {
        body += chunk.toString()
      })
      response.on('end', () => {
        console.log('No more data in response.')
        console.log(`BODY: ${body}`)
        
        resolve({
            status:response.statusCode,
            json(){
               return  new Promise(function(resolve, reject){
                   try {
                    resolve(JSON.parse(body))
                   } catch (error) {
                    reject(error)
                   }
                })
                
            },
            text(){
                return  new Promise(function(resolve, reject){
                    try {
                     resolve(body)
                    } catch (error) {
                     reject(error)
                    }
                 })

            }
        })
      })
      response.on('error', (error) => {
        reject(error)
      })
      response.on('abort', (error) => {
        reject(error)
      })
    })
    if(options){
        if(options.headers){
            Object.keys(options.headers).forEach(function(key){
                console.log(key,options.headers[key]);
                request.setHeader(key,options.headers[key])
           
           });
            
        }
        if(options.body){
            request.write(options.body);
        }

    }
    
    
    request.end()
    console.log('net=============================')
        
      });
    

    

}