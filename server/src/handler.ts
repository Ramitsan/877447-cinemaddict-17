export class Handler {
  movies: any[];
  comments: any[];

  constructor(movies, comments) {
    this.movies = movies;
    this.comments = comments;
  }
  getMovies() {
    return this.movies;
  }
  getComments(id: number) {
    const filmComments = this.comments[id];
    return filmComments;
  }
  deleteComment(id: number) {
    const deleted = this.comments.find(film => {
      const commentIndex = film.findIndex(comment => comment.id == id);
      if (commentIndex != -1) {
        film.splice(commentIndex, 1);
        return true;
      }
      return false;
    });
    if (deleted) {
      console.log('deleted', id);
    } else {
      console.log('wrong id', id);
    }
    return {};
  }
  postComment(filmId: number, comment: string) {
    const filmComments = this.comments[filmId];
    filmComments.push({
      ...JSON.parse(comment),
      date: new Date().toISOString(),
      author: 'guest',
      id: (Date.now() * 1000 + Math.floor(Math.random() * 1000)).toString()
    })
    return { movie: {}, comments: filmComments };
  }
}
