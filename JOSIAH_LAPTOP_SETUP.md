# Josiah Laptop Setup

This file is for Josiah to open in ChatGPT and use as a guided setup checklist for Pinchy Slab Face on a Mac laptop.

The goal is to get him into the correct account, into Codex, and synced with the repo even if he is not a developer.

## Mike's Current Working Setup

Based on the verified setup on Mike's Mac as of April 14, 2026, these are the main tools currently in use.

Use this as the default target setup for Josiah unless there is a good reason to simplify further.

### Core Apps To Match

- Codex app
  - This appears to be the main active terminal-style AI workspace Mike is using right now.
- Visual Studio Code
  - This is installed and is the default app for Markdown and plain-text files on Mike's Mac.
- Apple Terminal
  - Mike has Terminal support files and a Bash login shell. Even when Codex is the main work surface, Terminal is still part of the setup.
- Claude
  - Installed and active on Mike's Mac. Useful as a secondary AI workspace, but not essential for the first-pass Josiah setup.

### Command-Line Tools And Package Setup

- Bash as the login shell
  - Mike's configured login shell is `/bin/bash`.
- Homebrew
  - Installed at `/opt/homebrew/bin/brew`.
- Git
  - Available from the Apple developer tools path.
- Vim
  - Mike's shell history shows regular direct editing with `/usr/bin/vim`, including Markdown files.
- Python 3
  - Available from `/usr/bin/python3`.
- pyenv
  - Installed via Homebrew.
- pipx
  - Installed via Homebrew.

### Extra Brew Packages Seen On Mike's Machine

- `cmux`
- `duti`
- `claude-code`

These are present on Mike's machine, but they are probably not all required for Josiah on day one.

### What This Suggests For Josiah

For the easiest like-for-like setup, prefer this stack:

- Codex
- Visual Studio Code
- Apple Terminal
- Homebrew
- Git / Apple Command Line Tools

Optional second wave:

- Claude
- pyenv
- pipx
- `cmux`

### Important Practical Note

Mike's machine shows both VS Code and Vim in real use:

- VS Code looks like the default app for opening `.md` files.
- Vim is being used directly from the terminal for quick edits.

For Josiah, the simplest matching setup is:

- use VS Code to open and read Markdown files
- use Codex as the main working environment
- keep Terminal available for commands
- only use Vim if he becomes comfortable with it later

## What This Is

You are helping Josiah Wilson get set up to work on the Pinchy Slab Face project on his Mac laptop.

Guide him one step at a time.

Do not give him a huge wall of instructions all at once.

Wait for him to confirm each step before moving to the next one.

Assume he is not a developer and may be new to most of these tools.

If a step fails, help him diagnose it simply and continue.

Explain unfamiliar words in plain English as they come up.

## Project Context

Pinchy Slab Face is a small project shared by Mike and Josiah.

Relevant shared accounts currently include:

- 1Password family vault access
- Cloudflare
- Pumble
- GitHub
- Fastmail
- Beehiiv
- Pinchy Slab Face Gmail
- ChatGPT Home

Prefer Josiah using his own personal login where appropriate, and use shared passwords from 1Password only where the account is intentionally shared.

One of the main early goals is getting Josiah into the correct ChatGPT account so he can use Codex on his Mac.

## How To Run This Setup

Please walk me through this setup in order, one step at a time, and wait for my confirmation before continuing.

Use very plain language.

If you want me to run a Terminal command, explain what it does first.

If I need to install something, give me the exact link or exact command.

If there is a choice, recommend the simplest option.

## Setup Order

### 1. Get into 1Password

Start by helping me:

- find the 1Password invitation email
- accept the invitation
- install 1Password on my Mac if needed
- sign in to the PSF-related vault
- confirm I can see the shared logins

If browser extension setup is helpful, suggest that too.

### 2. Confirm account access

After 1Password is working, help me confirm which accounts I should access now versus later.

For now, the most relevant accounts are likely:

- ChatGPT Home
- GitHub
- Pumble

Potentially useful but probably not required immediately:

- Cloudflare
- Fastmail
- Beehiiv
- Pinchy Slab Face Gmail

Please help me log into what I need first and avoid unnecessary setup.

For ChatGPT specifically:

- help me log into the correct ChatGPT Plus account or shared ChatGPT account that PSF uses
- explain in simple terms that ChatGPT is the account and Codex is the tool I will use for project work
- help me confirm whether I should first sign into ChatGPT in the browser, then in the desktop app, then in Codex
- if Codex requires a separate install or separate sign-in flow, explain that clearly
- once I am signed in, help me open Codex and confirm it is ready to use

### 3. Install core Mac dev tools

Help me check whether these are already installed:

- Apple Command Line Tools
- Homebrew
- Git

If they are not installed, help me install them.

Then help me install:

- GitHub Desktop

If helpful later, also suggest:

- 1Password browser extension
- ChatGPT desktop app
- VS Code

Only install extra tools if they are genuinely useful for this workflow.

Important:

- On a Mac, Git may depend on Apple Command Line Tools being installed correctly.
- If Git appears broken or Terminal mentions `xcrun` or Command Line Tools, help me fix that before doing anything more advanced.

### 4. Set up Git and GitHub

Help me:

- sign into GitHub in the browser
- sign into GitHub Desktop
- make sure Git is available in Terminal
- set my Git name and email correctly if needed

Use the identity that makes the most sense for PSF, but explain the choice before changing anything.

### 5. Get the project repo onto the laptop

Help me clone the Pinchy Slab Face repo using GitHub Desktop if possible.

If Terminal is easier, explain both options and recommend the simpler one.

Once the repo is cloned, help me open the local folder.

Then help me understand, in simple language, what "syncing the repo from Git" means:

- getting the latest project files onto my laptop
- making sure my local copy matches the shared project
- using GitHub Desktop as the easiest way to pull updates and later push changes

### 6. Understand the repo

Once the repo is local, help me find these files and explain very briefly what they are:

- `README.md`
- `MASTER_PLAN.md`
- `THREAD_HANDOFF.md`
- `PBO_PLAN.md`
- `PROJECT_INDEX.md`
- `WORKFLOW.md`

Do not over-explain. Just orient me so I know where things live.

Please explain terms like `repo`, `markdown`, `Terminal`, `branch`, and `pull` in plain English if they come up.

### 7. Run the local planning app

This repo includes a lightweight local planning app.

Help me run it from Terminal inside the repo with:

```bash
./run_pbo
```

Explain that this launcher:

- creates or reuses the local Python environment
- installs the light dependencies if needed
- starts the local server

If this fails, help me troubleshoot step by step.

If Python is missing, help me install the simplest correct version for this repo.

When finished, also show me how to stop it with:

```bash
./stop_pbo
```

### 8. Final check

At the end, help me confirm I can do these things:

- access the shared PSF passwords in 1Password
- log into the key PSF accounts I need right now
- log into the correct ChatGPT account for PSF work
- open Codex and use it for PSF work
- open GitHub Desktop
- open the local repo
- sync the repo from GitHub
- run `./run_pbo`
- stop it with `./stop_pbo`

Then give me a short summary of what is complete, what still needs Mike, and what the next best step is.

### 9. Hand off into Codex

Once I am inside Codex and the repo is open, help me keep going from there instead of repeating setup.

Please tell me to start a fresh Codex chat and paste this exact message:

```text
I’m Josiah. Let’s get going on Pinchy Slab Face.

Please look at these files in the repo first and use them to guide me step by step:
- JOSIAH_CODEX_CONTINUE.md
- JOSIAH_BEEHIIV_CODEX.md
- BEEHIIV_FOR_JOSIAH.md
- README.md
- PROJECT_INDEX.md
- WORKFLOW.md

Assume I’m not a developer.
Explain things simply, one step at a time, and help me keep moving.
```

Explain to me that this gives Codex a clean starting point inside the repo and tells it which helper files to use.

Also explain that:

- `JOSIAH_CODEX_CONTINUE.md` is the general "keep going" guide
- `JOSIAH_BEEHIIV_CODEX.md` is the Beehiiv learning and working guide
- `BEEHIIV_FOR_JOSIAH.md` is the simple Beehiiv background note

If I want to focus mainly on Beehiiv once setup is done, suggest that I start with the Beehiiv-specific path.

## Notes For ChatGPT

- Assume this is a Mac laptop.
- Prefer the simplest path over the most advanced path.
- Assume the user is not a developer.
- Avoid telling me to install a long list of developer tools unless they are immediately needed.
- Use GitHub Desktop where it reduces friction.
- Prefer Codex as the actual working tool once I am signed in.
- Once I am in Codex, help me use the repo's Josiah-specific markdown files as the next source of guidance.
- Keep security sane: prefer 1Password over sending passwords around in chat.
- If an account should stay shared, say that clearly.
- If an account should be personal, say that clearly.
- If a command looks risky, explain it before suggesting it.
- Define technical words in simple language when they first appear.

## Likely Defaults

If you need to make assumptions, use these defaults:

- This is a Mac laptop.
- Josiah is not a developer and is new to some of the tooling.
- We want the quickest path to being able to collaborate.
- The first success condition is not "perfect dev environment."
- The first success condition is "Josiah can access the passwords, log into the key tools, open Codex, sync the repo, and run the local PSF app."
