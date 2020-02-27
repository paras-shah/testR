##### Welcome to Velocity, the front-end framework for Rubrik Cloud Fabric

### View a Preview

1.  Install Docker
2.  Clone the repository
3.  Move to the velocity folder
4.  Go to the dev box by running - `./bin/dev-box`
4.  run `./bin/dev-web` to build
5.  Preview will be available on `dev.<hostname>`

### Deploy into production

1. Install Docker
2. Clone the repository
3. Set any environment variables in `env_template_override.yaml` any changes will not be commited.
4. Run `./bin/deploy`
5. Navigate to `web.{}hostname.nip.io`

### Want to rebuild and launch a production image

1. Run `./bin/deploy --rebuild`

#### House Rules

1. Code sharing with between projects should be done via artifacts
2. Something very useful in multiple project move it out and create project and
   share via artifacts.
3. All projects should follow similar coding styles within this repo.
    1. For Django based projects follow Django guidelines
    2. [GIT COMMIT](https://chris.beams.io/posts/git-commit/)
4. Tests are important so don't shy away.
    1. Best to have automated test, its ok if we have to run them manually for now.
    2. Document testcases which can't be automated today using text based testplans
5. We use [GIT LFS](https://git-lfs.github.com/) to track large files and binaries used by this repo
    1. Install `curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash && sudo apt-get install -y git-lfs`
