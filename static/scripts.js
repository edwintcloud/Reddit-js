function voteUp(e){
  const postId = e.getAttribute('postId');
  const upEl = e.parentElement.children.upCount;
  const totalEl = e.parentElement.children.totalCount.children.total;
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `/posts/${postId}/upvote`);
  xhr.send();
  upEl.innerHTML = Number(upEl.innerHTML) + 1;
  totalEl.innerHTML = Number(totalEl.innerHTML) + 1;
}

function voteDown(e){
  const postId = e.getAttribute('postId');
  const downEl = e.parentElement.children.downCount;
  const totalEl = e.parentElement.children.totalCount.children.total;
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `/posts/${postId}/downvote`);
  xhr.send();
  downEl.innerHTML = Number(downEl.innerHTML) + 1;
  totalEl.innerHTML = Number(totalEl.innerHTML) - 1;
}