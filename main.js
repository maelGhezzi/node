let http=require("http");   //require == import
http.createServer(function(request,response){   //creazione server web con funzione con richiesta e risposta request contiene HTTPrequest e response contiene HTTPresponse 
    response.writeHead(200,{'Content-type':"text/plain"});
    response.end("Hello world\n");
}).listen(8080);
console.log("Server running on port 8080");