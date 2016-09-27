layout: true
class: center, vertical-center

<!--

Set up:

desktop #1 ...
- Atom open on ttt project
- Terminal, 'npm start'
- Terminal, 'npm run remotedev'
- Terminal, ready to run 'npm run openfin-mac'
- Chrome open on 'localhost:3000' at login page
- Code on 'hack' commit
- Check with dev tools that there are no issues
- Remote dev tools open on monitor view (minimise)

desktop #2 ...
- Atom open on MeetupApp Project
- Xcode open, build and run to open simulator (then minimise)
- or ... 'react-native run-ios'
- Terminal, 'npm start'

-->

---

class: middle, chapter

# Time Travel And The Future Of HTML5 Productivity

Colin Eberhardt, Scott Logic Ltd. - @ColinEberhardt

FinJS, June 2016

---
class: middle

> any application that **can** be written in JavaScript, **will** eventually be written in JavaScript

Atwood's Law, 2007

---
class: middle

# My app can be written in JavaScript - but why should I write it in JavaScript?

---
class: middle, chapter

# Developer Productivity

---
class:  image

![](assets/man-month.jpg)

---
class:  image

![](assets/dev-cycle.png)

---
class: image

![](assets/msbuild.png)

compile, link, generate executable, start process ...

---
class:  image

![](assets/smile.png)

#F5  / ctrl + R / ⌘ + R

<!-- illustrate this example a bit better -->

---
class:  image

![](assets/neutral.png)

# Single Page Applications

---
class:  image

![](assets/saddish.png)

# minification

---
class:  image

![](assets/sad.png)

# minification, modules, transpilers

---
class:  image

![](assets/grimace.png)

# ..., linting, polyfills, metrics, ...

---
class:  image

![](assets/crying.png)

# bootstrapping

---
class: middle

# web builds now rival desktop and mobile in their complexity and duration

---

(demo time)

---

# Hot Module Reload

 - Refactor UI into new components
 - Update presentation logic
 - Change formatting logic
 - Update business logic
 - Fix issues with wiring up state to the view

---

# But what about state changes?

(desktop demo time)

---

# Hot Module Reload + Time Travel

- Refactor UI into new components
- Update presentation logic
- Change formatting logic
- Update business logic
- Fix issues with wiring up state to the view
- ...
- If your app reaches an invalid state, back-up
- Replay actions after fixing issues
- Store a log of actions
- And much more ...

---
class:  middle

# And it works on mobile too!

(mobile demo time)

---

# What has made this possible?

React, Redux, Webpack, TypeScript, Atom, OpenFin, ReactNative, Bootstrap, Chrome

---

class: top-left

--
React **(Facebook)**
--
, heavily influenced Angular 2 **(Google)**
--
, Redux **(Community)**
--
, adopted by **(Facebook)**
--
, Chrome **(Google)**
--
, a foundation for HTML5 containers **(OpenFin)**
--
, set the bar for developer tooling
--
, TypeScript **(Microsoft)**
--
, adopted by Angular 2 **(Google)**
--
, Atom **(GitHub)**
--
, foundation of Nuclide (**Facebook**)
--
, built on electron **(GitHub)**
--
, (foundation for Visual Studio Code **(Microsoft)**)
--
, built on Chromium **(Google)**
--
, ReactNative **(Facebook)**
--
, adopted by **(Microsoft)**
--
, Webpack **(Community)**, and so much more ...

---
class: middle

# My app can be written in JavaScript - but why should I write it in JavaScript?

---
class: middle

## HTML5 is being pushed forwards by 100s of enterprises, 1,000s of startups, and 10,000s of individuals

---

class: middle, chapter

# Time Travel And The Future Of HTML5 Productivity

Colin Eberhardt, Scott Logic Ltd. - @ColinEberhardt

FinJS, June 2016
