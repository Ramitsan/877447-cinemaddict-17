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

const server = http.createServer(async(req, res) => {
  const parsedUrl= url.parse(req.url); 
  console.log(parsedUrl);

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
  console.log(params);

  res.writeHead(200, cors);

  switch(endpointKey) {
    case 'movies': {
      const movies = await loadMovies();
      res.end(JSON.stringify(movies));
      break;
    }
    case 'comments': {
      const comments = await loadComments();
      const id = keys[1];
      const filmComments = comments[id];
      res.end(JSON.stringify(filmComments));
      break;
    }
    default: {
      res.end('ok');
    }
  }
})

server.listen(4005);



