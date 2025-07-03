Job connect tracker

USERS
- general user


Functions
General user
- Register
- Log in 
- Log out
- Dashboard as per user

Add connect functionality
- Add connect button on Navbar
- On click of add connect button open form

Add connect form
- Has basic details
- Connect name
- Connect no
- Connect email
- Connect company name
- City
- Job profile 
- Private or public
- Auto email after a time period
- Time period to trigger auto mail in days
- Description textbox to add brief info about the connect


Dashboard
- Private Dashboard 
- Show all public private connects as list

- Public dashboard
- Show only public connects as list

Show dashboard
- list as one after another like iphone notification banner

It should have 
- name of connect 
- company name 
- Job profile

-——————————————————————-

Node js
Apis

User
- register user - save password using JWT
- Login user
- Logout user
- Get all users
- Get specific user

Connect
- add connect
- Remove connect
- Get all connect
- Get private connect specific to user


React js

User page
- dashboard 

Home page


Mongo db -

USERS
- name
- No
- Password
- Username
- Email
- Age
- Current company

CONNECT
- 



Connect apis

| Method | Route                      | Description                          |
| ------ | -------------------------- | ------------------------------------ |
| POST   | `/api/connects`            | Add a new connect                    |
| GET    | `/api/connects/my`         | Get all of user's connects           |
| GET    | `/api/connects/my/private` | Get only private connects of user    |
| GET    | `/api/connects/public`     | Get all public connects              |
| PUT    | `/api/connects/:id`        | 🔧 **Update** a connect (owner only) |
| DELETE | `/api/connects/:id`        | Delete a connect (owner only)        |
| GET    | `/api/admin/connects`      | Admin: get all connects              |
| DELETE | `/api/admin/connects/:id`  | Admin: delete any connect            |

