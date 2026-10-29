new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadComments();
    }
  });
}).observe(document.getElementById(`comments_thread`));

let loadComments = async () => {
  loadComments = () => {};
  console.log(`loading comments...`);
  const html = await fetch(`./js/site/comments.html`).then((r) => r.text());
  document.dispatchEvent(new CustomEvent(`comments:ready`, { detail: { html } }));
};
