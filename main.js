fetch('https://api.github.com/users/jrawsthorne/repos')
  .then(res => res.json())
  .then(repos => Promise.all(repos.map(repo => 
    fetch(`https://api.github.com/repos/jrawsthorne/${repo.name}/commits`)
      .then(res => res.json())
      .then(commits => { 
        const mycommits = commits.filter(commit => commit.author.login === 'jrawsthorne' || commit.name === 'Jake Rawsthorne')
        return {
          ...repo,
          commits: mycommits
        }
      }))).then(repos => {
        repos.forEach(repo => {
          let div = document.createElement('div');
          div.innerHTML = `
          <h3>
            <a href="${repo.html_url}">${repo.name}</a> 
            <small><a href="${repo.homepage && repo.homepage}">Visit site</a></small>
          </h3>
          <p class="description">${repo.description}</p>
          `;
          div.className = 'repo'
          let ul = document.createElement('ul');
          repo.commits.forEach(commit => {
            let li = document.createElement('li');
            li.innerHTML = `<a href="${commit.html_url}">${commit.commit.message}</a>`
            ul.append(li);
          })
          div.append(ul)
          document.getElementById('github').appendChild(div)
        })
      }))