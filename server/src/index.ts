import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs/promises';
import * as path from 'path';

const cors = {
  'Content-Type': 'text/plain',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, PUT, GET, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
}

async function loadComments() {
  const comments = JSON.parse(await fs.readFile(path.join(__dirname, '../../src/data-comments.json'), {
    encoding: 'utf8',
  }))
  return comments;
}

async function loadMovies() {
  const movies = JSON.parse(await fs.readFile(path.join(__dirname, '../../src/data-cards.json'), {
    encoding: 'utf8',
  }))
  return movies;
}
let comments: Array<Array<any>>;
loadComments().then(res => comments = res);

export const handleRequest = async(req: http.IncomingMessage, res: http.ServerResponse) => {
  const parsedUrl= url.parse(req.url); 
  // console.log(parsedUrl);

  const keys = parsedUrl.pathname.split('/').filter(it => it);
  const endpointKey = keys[0]; 

  // const endpointKey = parsedUrl.pathname.slice(1);
  console.log(endpointKey);
  // const endpoint = this.endpoints[endpointKey];
  // console.log(endpoint);

  const params: Record<string, string> = {};
  parsedUrl.query?.split('&')?.forEach(it=>{
    const [key, value] = it.split('=');
    params[key] = value;
  });

  res.writeHead(200, cors);

  switch(endpointKey) {
    case 'movies': {
      const movies = await loadMovies();
      res.end(JSON.stringify(movies));
      break;
    }
    case 'comments': {
      console.log(req.method);
      switch(req.method) {
        case 'GET': {
          const id = Number(keys[1]);
          const filmComments = comments[id];
          res.end(JSON.stringify(filmComments));
          break;
        }
        case 'DELETE': {
          const id = Number(keys[1]);
          const deleted = comments.find(film => {
            const commentIndex = film.findIndex(comment => comment.id == id);
            if(commentIndex != -1) {
              film.splice(commentIndex, 1);
              return true;
            }
            return false;
          });
          if(deleted) {
            console.log('deleted', id);
          } else {
            console.log('wrong id', id);
          }
          res.end(JSON.stringify({}));
          break;
        }
        case 'POST': {
          console.log('post');
          let comment = '';
          req.on('data', (chunk) => {
            comment += chunk.toString('utf8');
          })
          req.on('end', () => {
            console.log(comment);
            const filmId = Number(keys[1]);
            const filmComments = comments[filmId];
            filmComments.push({
              ...JSON.parse(comment), 
              date: new Date().toISOString(),              
              author: 'guest', 
              id: (Date.now() * 1000 + Math.floor(Math.random() * 1000)).toString()
            }) 
            res.end(JSON.stringify({movie: {}, comments: filmComments}));
          })         
          break;
        }
        default: {
          res.end('default');
        }
      }
     
      break;
    }
    default: {
      res.end('ok');
    }
  }
}

const server = http.createServer(handleRequest)

server.listen(4005);



