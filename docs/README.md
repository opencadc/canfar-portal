# Modifying documentation for CANFAR

## If you are part of the CANFAR GitHub organization

Just clone this repo, edit and push.

## If you have a GitHub account but not part of the CANFAR GitHub

1. Ask an [admin](https://github.com/orgs/canfar/people) to be part of CANFAR
2. Do your edit and push your commit.

## If you know nothing about GitHub and not really part of CANFAR:

Preliminaries (to do only once):

1. Get a [GitHub account](https://github.com/signup)

2. Learn how to [fork a repository](https://help.github.com/articles/fork-a-repo/)

3. Learn to do a GitHub [pull request](https://help.github.com/articles/using-pull-requests/)

The documentation for CANFAR uses the [markdown format](https://help.github.com/articles/markdown-basics/)


## Modifying an existing documentation

1. Fork the canfar/canfar.github.io repository on GitHub

2. Find which file you want to modify. Most of them are on the docs directory. See docs/index.md or includes/menu-en.txt to find the reference.

3. In your local git clone of canfar/canfar.github.io (or directly on the web interface of your fork), edit the file

4. Commit and push to your GitHub fork

5. Iterate between 2-4, then when ready, submit your pull request


## Adding new documentation

1. Fork the canfar/canfar.github.io repository on GitHub

2. In the docs directory, copy a file (such as tutorial.md) to your <new_file>.md

   - Edit the "title": it will become the main title
   - Edit the "permalink": the url will become www.canfar.net/<permalink>
   - Edit your content

3. If you want your content to appear on the "Documentation Main Page", edit index.md and add a link to your new page like the other links.

4. Commit and push to your GitHub fork

5. Iterate between 2-4, then when ready, submit your pull request

