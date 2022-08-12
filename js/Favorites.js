class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    return fetch(endpoint)
      .then((data) => data.json())
      .then(({ login, name, public_repos, followers }) => ({
        login,
        name,
        public_repos,
        followers,
      }));
  }
}

class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();

    GithubUser.search("diego3g").then((user) => console.log(user));
  }

  save() {
    localStorage.setItem("@github-favs:", JSON.stringify(this.entries));
  }

  async add(username) {
    try {
      const userExists = this.entries.find((entry) => entry.login === username);

      if (userExists) {
        throw new Error("usuário ja cadastrado");
      }

      const user = await GithubUser.search(username);
      console.log(user);

      if (user.login === undefined) {
        throw new Error("Usuário não encontrado");
      }

      this.entries = [...this.entries, user];
      this.update();
      this.save();
    } catch (err) {
      alert(err.message);
    }
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favs:")) || [];
  }
  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );

    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = this.root.querySelector(".search button");
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");
      console.log(value);
      this.add(value);
    };
  }

  update() {
    this.removeAllTr();
    this.emptyView();

    this.entries.forEach((user) => {
      const row = this.createRow();
      console.log(row);
      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = `imagem de ${user.name}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;
      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("tem certeza que deseja deletar essa linha?");
        if (isOk) {
          this.delete(user);
        }
      };

      this.tbody.append(row);
    });
  }
  emptyView() {
    const emptyState = this.entries.length === 0;
    console.log(document.querySelector(".empty-users"));
    if (!emptyState) {
      document.querySelector(".empty-users").classList.add("display-none");
    } else {
      document.querySelector(".empty-users").classList.remove("display-none");
    }
  }
  createRow() {
    const tr = document.createElement("tr");
    console.log(tr);
    tr.innerHTML = ` <td>
    <div class="user">
      <img
        src="https://github.com/wicarpessoa.png"
        alt="Foto do usuário"
      />
      <a href="https://github.com/wicarpessoa">
        <p>wicarpessoa</p>
        <span>wicarpessoa</span>
      </a>
    </div>
  </td>
  <td class="repositories">76</td>
  <td class="followers">1000</td>
  <td><button class="remove">Remover</button></td>`;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
