import json
import requests

USERNAME = "evanpaul27"

url = f"https://api.github.com/users/{USERNAME}/repos"

repos = requests.get(url).json()

projects = []

for repo in repos:

    if repo["fork"]:
        continue

    projects.append({
        "name": repo["name"],
        "description": repo["description"] or "No description provided",
        "url": repo["html_url"]
    })

with open("projects.json", "w") as f:
    json.dump(projects, f, indent=4)

print("projects.json updated")
