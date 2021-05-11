<!-- TODO
          format each file
          add tests or remove module note
          validation messages (pre-load/cache keys/values) for no results and number of results
          fuzzy search
-->

## Zendesk Coding Challenge (Software Engineer - Answer Bot)

#### By Ross Lillis

#### Submitted to Khanita Westhoff on 11th May 2021

---

## Description

This is a command line application built as part of the Zendesk Coding Challenge following the overview and selection criteria provided. It uses non-case sensitive, full value matching for a narrower search but partial search strings will also work.

##### At a glance

<img src="https://github.com/roscolil/zendesk-coding-challenge/blob/master/assets/app.jpg" width="800" height="400">

## Environment & Technologies Used

- **Language used:**
  - Javascript/Node (Local Version 12.17.0)
- **Local Environment:**

  - Macbook Pro with MacOS Catalina (Version 10.15.7).
  - Visual Studio Code
  - Tested in VSCode terminal

- **Dependencies/Node modules**
  - `fs` File System Module to read local .json files
  - `minimist` to support the menu interface and load cli via terminal command
  - `chalk` for menu colors and grid styling
  - `cli-table3` to style the results tables
  - `esm` to enable the ES6 standard
  - testing???

---

## Demo

See a demo [here](https://vimeo.com/547309000)

---

## Assumptions & Tradeoffs

- Tried to use built-in node system modules where possible i.e. `fs`, `readline`, `path`
- Use the program entry point to load the cli via a terminal command (`$ zendesk`)
- Program exits after initial menu command. You then have the option of quitting or continuing.
- Note: Some documents have suggested that `cli-table3` is not supported on all terminals in which there'll be no grid or colors. I noticed this in iTerm configured with zsh. The data is still correct just without some of the styling
- Curently iterating through object if multiple results exist and displaying all
- Wanted to add much more (see Version 2.0 below), but also conscious of getting the task to you promptly.

---

## Installation/How to use

1. Navigate to application directory using your terminal
2. [Optional] Run `$ npm link` to create a symlink in the global folder that links to this package
3. Run `$ npm install` to install dependencies
4. Type `$ zendesk` to start application

- **In application:**

  - Enter `$ zendesk fields` to view a list of searchable fields
  - Enter `$ zendesk search` to search JSON data
  - Enter `$ zendesk version` or `$ zendesk -v` to show app version
  - Entering `$ zendesk help` or `$ zendesk -h` is the same as the starting command

  - Use `CTRL-C` anytime or follow prompts to quit application

---

### Version 2.0

- Better UX/UI
- Build as a web app
- Validate each of the search criteria against chosen file
- Option to view fields at any point in the program
- Type checking with Typescript
- Paginate/Scroll multiple results or 'Press any key to see more..'
- Broarder search across all files

---

Hey, if you want to see a picture of me gazing thoughtfully into the distance, go to my [portfolio site](http://www.rosslillis.com/). \*The sites/apps here are not commercial projects, but make up personal project work that I submitted as part of the Bootcamp at General Assembly.
