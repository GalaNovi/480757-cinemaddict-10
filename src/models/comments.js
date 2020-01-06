export default class Comments {
  constructor() {
    this._comments = null;
  }

  set comments(comments) {
    this._comments = comments;
  }

  get comments() {
    return this._comments;
  }

  delete(commentId) {
    this._comments = this._comments.filter((comment) => comment.id !== commentId);
  }
}
