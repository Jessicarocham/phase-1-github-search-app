const form = document.getElementById("github-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //   event.target[0].value;
  fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const userList = document.querySelector("#user-list");
      const reposList = document.getElementById("repos-list");
      userList.innerHTML = "";
      userList.innerHTML = "";
      resp.items.map((item) => {
        const li = document.createElement("li");
        const h2 = document.createElement("h2");
        h2.textContent = item.login;

        h2.addEventListener("click", (e) => showUserRepos(item.login, e));
        const img = document.createElement("img");
        img.src = item.avatar_url;

        li.append(h2, img);
        userList.append(li);
      });
    });
  form.reset();
});

function showUserRepos(username, e) {
  const repoList = document.getElementById("repos-list");
  repoList.innerHTML = "";
  e.preventDefault();
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((resp) => resp.json())
    .then((resp) =>
      resp.map((repo) => {
        const li = document.createElement("li");
        const h1 = document.createElement("h1");
        h1.textContent = repo.name;

        li.append(h1);
        repoList.append(li);
      })
    );
}
