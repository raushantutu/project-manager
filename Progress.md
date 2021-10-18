<hr style="border:2px solid gray"></hr>

# **Commit 17**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. Minor

- #### Backend Changes/Edits

1. Minor

### Current errors

- [ ] When adding a user, the server sends "something". Fix with appropriate code [#Bug]()
- [ ] You can add empty projects which cant be accessed or deleted [#Bug]()
- [ ] When you create a new user, error occurs because their projects list is empty [#Bug]() [#FrontEnd]()
- [ ] Can't delete todos that have a space at the end (like "this ")[#Bug]()
- [x] Invalid users are also being added to projects collection [#Important]() [#Bug]()
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together) [#Bug]()
- [x] When marking a todo item as completed/not-completed, the page is reloading to show the changes.(Fixed. fixed for project add and user add) [#Bug]()

## Commit 17 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 16**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. None Whatsoever

- #### Backend Changes/Edits

1. A user can delete his account now
2. Users can be removed from a project now

### Current errors

- [ ] When adding a user, the server sends "something". Fix with appropriate code [#Bug]()
- [ ] You can add empty projects which cant be accessed or deleted [#Bug]()
- [ ] When you create a new user, error occurs because their projects list is empty [#Bug]() [#FrontEnd]()
- [ ] Can't delete todos that have a space at the end (like "this ")[#Bug]()
- [x] Invalid users are also being added to projects collection [#Important]() [#Bug]()
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together) [#Bug]()
- [x] When marking a todo item as completed/not-completed, the page is reloading to show the changes.(Fixed. fixed for project add and user add) [#Bug]()

## Commit 16 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 15**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. Added buttons against every project. The button deletes the projects from every users project list and removes project itself

- #### Backend Changes/Edits

1. Can delete Projects now

### Current errors

- [ ] When adding a user, the server sends "something". Fix with appropriate code [#Bug]()
- [ ] You can add empty projects which cant be accessed or deleted [#Bug]()
- [ ] When you create a new user, error occurs because their projects list is empty [#Bug]() [#FrontEnd]()
- [ ] Can't delete todos that have a space at the end (like "this ")[#Bug]()
- [x] Invalid users are also being added to projects collection [#Important]() [#Bug]()
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together) [#Bug]()
- [x] When marking a todo item as completed/not-completed, the page is reloading to show the changes.(Fixed. fixed for project add and user add) [#Bug]()

## Commit 15 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 14**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. Can delete todos now

- #### Backend Changes/Edits

1. Added a delete button against every todo that deletes the todo when clicked

### Current errors

- [ ] When adding a user, the server sends "something". Fix with appropriate code [#Bug]()
- [ ] You can add empty projects which cant be accessed or deleted [#Bug]()
- [ ] When you create a new user, error occurs because their projects list is empty [#Bug]() [#FrontEnd]()
- [ ] Can't delete todos that have a space at the end (like "this ")[#Bug]()
- [x] Invalid users are also being added to projects collection [#Important]() [#Bug]()
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together) [#Bug]()
- [x] When marking a todo item as completed/not-completed, the page is reloading to show the changes.(Fixed. fixed for project add and user add) [#Bug]()

## Commit 14 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 13**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. None whatsoever

- #### Backend Changes/Edits

1. Fixed a bug. You can only add an existing (in DB) user to a project.
2. You can sign up now

### Current errors

- [x] Invalid users are also being added to projects collection [#Important]() [#Bug]()
- [ ] When adding a user, the server sends "something". Fix with appropriate code [#Bug]()
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together) [#Bug]()
- [x] When marking a todo item as completed/not-completed, the page is reloading to show the changes.(Fixed. fixed for project add and user add) [#Bug]()

## Commit 13 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 12**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. Added a navbar that shows the username of the person logged in and a log out button

- #### Backend Changes/Edits

1. When going to `/isLoggedIn`, if you are logged in you get id and username as res and if you are not logged in then you get 0 as res.

### Current errors

- [x] Invalid users are also being added to projects collection [#Important]() [#Bug]()
- [ ] When adding a user, the server sends "something". Fix with appropriate code [#Bug]()
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together) [#Bug]()
- [x] When marking a todo item as completed/not-completed, the page is reloading to show the changes.(Fixed. fixed for project add and user add) [#Bug]()

## Commit 12 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 11**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. Fixed a reloading error
2. Now you can add users too (typing a username that is not in the database still adds that username to the project users list [#Bug]())

- #### Backend Changes/Edits

1. None whatsoever

### Current errors

- [ ] Invalid users are also being added to projects collection [#Important]() [#Bug]()
- [ ] When adding a user, the server sends "something". Fix with appropriate code [#Bug]()
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together) [#Bug]()
- [x] When marking a todo item as completed/not-completed, the page is reloading to show the changes.(Fixed. fixed for project add and user add) [#Bug]()

## Commit 11 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 10**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. You can now add projects to your account
2. You can now add todos to the project
3. Adding projects doesn't reload the webpage. Niether does adding a new todo.

- #### Backend Changes/Edits

1. None whatsoever

### Current errors

- [ ] Invalid users are also being added to projects collection
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together)
- [ ] When marking a todo item as completed/not-completed, the page is reloading to show the changes.

## Commit 10 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 9**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. Each todo shows up as a button
2. If the text in the button is striked, it means that the todo is marked as completed
3. On clicking the button, the completed status of the specific todo changes. But this reloads the page.

- #### Backend Changes/Edits

1. None whatsoever

### Current errors

- [ ] Invalid users are also being added to projects collection
- [x] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together)

## Commit 9 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 8**

### Non-Functional Changes

- [ ] Most of the files have been properly formatted

### Changes/Edits

- #### FrontEnd Changes/Edits

1. Each Project shows up as a link to the project specific page
2. Each individual project page now shows all the users who are working on the project and all the todos regarding the project

- #### Backend Changes/Edits

1. None whatsoever

### Current errors

- [ ] Invalid users are also being added to projects collection
- [ ] When opening a project specific page, the users list of the project is not properly being shown (all are clubbed together)

## Commit 8 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 7**

### Changes/Edits

- #### FrontEnd Changes/Edits

1. Started working on frontend.
2. Added login page which opens when you are not logged in.
3. When logged in, Projects page is opened on the homepage. This page shows a list of projects that the user is currenly a part of.

- #### Backend Changes/Edits

1. GET on '/projects' returns an array of all the projects you are part of.
2. GET on '/isLoggedIn' returns 1 if you are logged in and 0 if you are not.

### Current errors

- [ ] Invalid users are also being added to projects collection

## Commit 7 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Added FRONTEND**

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 6**

### Changes

1. Can edit the completed status of any todo now (that u r authorised to)

### Current errors

- [ ] Invalid users are also being added to projects collection

## Commit 6 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 5**

### Changes

1. Some collapsible tags added that are to be used with region folding extension in vs code
2. You can add todos to the projects now

### Current errors

- [ ] Invalid users are also being added to projects collection

## Commit 5 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 4**

### Changes

1. Handling of users that are not valid while adding users in
   project
   - When a username is passed in users array that is not registered, a log is printed in console that tells which user addition is invalid
   - Progress.txt changed to markdown file Progress.md

### Current errors

- [ ] Invalid users are also being added to projects collection

## Commit 4 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 3**

### Changes

1. Add users to the project
   - Now u can add usesrs to the project by posting to "/projects/prjNm/addusers' an array of users to be added.

## Commit 3 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 2**

### Changes

1. Add a new project
   - When u add a project, it gets added in projects collection as well as in the entry of the user who added the project

## Commit 2 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>

# **Commit 1**

### Changes

1. Just the boilerplate for passport local authentication

## Commit 1 end

<br/>
<hr style="border:2px solid gray"></hr>
<br/>
