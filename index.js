function fetchProfile() {
  // Fetch the username from the input field
  const username = document.getElementById("username").value;

  // Fetch the userdata from Github API
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      // Displays user profile info
      const profileDiv = document.getElementById("profile");
      profileDiv.innerHTML = `
        <h2>${data.login}</h2>
        <img src="${data.avatar_url}" alt = "Avatar" style="width:100px">
        <p>Name: ${data.name}</p>
        <p>Bio: ${data.bio}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Public Repositories: ${data.public_repos}</p>
        `;
    });

  // Fetch user repositories from Github API
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((data) => {
      // Display user Respositories
      const repoDiv = document.getElementById("repositories");
      repoDiv.innerHTML = "<h2>Repositories</h2>";
      data.forEach((repo) => {
        // Create a link for each repository
        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = repo.name;
        repoLink.target = "_blank"; // opens link in a new tab
        repoDiv.appendChild(repoLink); // Appends link to repository list
        repoDiv.appendChild(document.createElement("br")); // Add a line break
      });
    });
}
