# Hybrid Accunting App

Accouting App using ReactJS + Material Dashboard Angular.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Install

Before installing, download and install NodeJs from NodeJs Official Page.

- To Run Client

1. Open Terminal
2. Go to /client folder
4. Run in terminal: ```npm install```
5. Run ```npm install``` for a dev server.

- To Run Server

1. Open Terminal
2. Go to /server folder
3. Run in terminal: ```npm install```
4. Run ```node app```

### What's included

Within the download you'll find the following directories and files:

```
accounting-app-react
|   package-lock.json
|   README.md  
+---.vscode
|       launch.json
+---client
|   |   .babelrc
|   |   .env
|   |   .eslintignore
|   |   .eslintrc.js
|   |   .gitignore
|   |   bower.json
|   |   CHANGELOG.md
|   |   ISSUE_TEMPLATE.md
|   |   LICENSE.md
|   |   package-lock.json
|   |   package.json|   |   
|   +---build
|   |   |   apple-icon.png
|   |   |   asset-manifest.json
|   |   |   favicon.ico
|   |   |   hybrid.jpg
|   |   |   index.html
|   |   |   logo.png
|   |   |   manifest.json
|   |   |   service-worker.js  
|   |   \---static
|   |       +---css
|   |       |       main.ca07f166.css
|   |       |       main.ca07f166.css.map 
|   |       +---js
|   |       |       main.531fe980.js
|   |       |       main.531fe980.js.map
|   |       \---media
|   |               logoh.ca9758a6.png
|   |               sidebar-2.310509c9.jpg
|   +---documentation
|   |   |   tutorial-components.html
|   |   \---assets
|   |       +---css
|   |       |       bootstrap.min.css
|   |       |       demo-documentation.css
|   |       |       material-dashboard.css
|   |       +---img
|   |       |   |   apple-icon.png
|   |       |   |   cover.jpeg
|   |       |   |   favicon.png
|   |       |   |   mask.png
|   |       |   |   new_logo.png
|   |       |   |   reactlogo.png
|   |       |   |   sidebar-1.jpg
|   |       |   |   sidebar-2.jpg
|   |       |   |   sidebar-3.jpg
|   |       |   |   sidebar-4.jpg
|   |       |   |   tim_80x80.png  
|   |       |   \---faces
|   |       |           marc.jpg          
|   |       \---js
|   |               bootstrap.min.js
|   |               jquery-3.2.1.min.js  
|   +---public
|   |       apple-icon.png
|   |       favicon.ico
|   |       hybrid.jpg
|   |       index.html
|   |       logo.png
|   |       manifest.json
|   +---src
|   |   |   .DS_Store
|   |   |   index.js
|   |   |   logo.svg
|   |   +---assets
|   |   |   |   .DS_Store
|   |   |   +---css
|   |   |   |       material-dashboard-react.css
|   |   |   |       react-datetime.css
|   |   |   +---github
|   |   |   |       .DS_Store
|   |   |   |       angular.png
|   |   |   |       chrome.png
|   |   |   |       dashboard.jpg
|   |   |   |       edge.png
|   |   |   |       firefox.png
|   |   |   |       html.png
|   |   |   |       map.jpg
|   |   |   |       md-react.gif
|   |   |   |       notifications.jpg
|   |   |   |       opera.png
|   |   |   |       opt_mdr_thumbnail.jpg
|   |   |   |       opt_md_angular_thumbnail.jpg
|   |   |   |       opt_md_thumbnail.jpg
|   |   |   |       opt_md_vue_thumbnail.jpg
|   |   |   |       react.svg
|   |   |   |       safari.png
|   |   |   |       tables.jpg
|   |   |   |       userprofile.jpg
|   |   |   |       vuejs.png    
|   |   |   +---img
|   |   |   |   |   apple-icon.png
|   |   |   |   |   cover.jpeg
|   |   |   |   |   favicon.png
|   |   |   |   |   hybrid.jpg
|   |   |   |   |   logo.png
|   |   |   |   |   logoh.png
|   |   |   |   |   mask.png
|   |   |   |   |   new_logo.png
|   |   |   |   |   reactlogo.png
|   |   |   |   |   sidebar-1.jpg
|   |   |   |   |   sidebar-2.jpg
|   |   |   |   |   sidebar-3.jpg
|   |   |   |   |   sidebar-4.jpg
|   |   |   |   |   tim_80x80.png        
|   |   |   +---jss
|   |   |   |   |   loginPage.jsx
|   |   |   |   |   material-dashboard-react.jsx 
|   |   |   |   \---material-dashboard-react
|   |   |   |       |   cardImagesStyles.jsx
|   |   |   |       |   checkboxAdnRadioStyle.jsx
|   |   |   |       |   dropdownStyle.jsx
|   |   |   |       |   tooltipStyle.jsx
|   |   |   |       +---components
|   |   |   |       |       buttonStyle.jsx
|   |   |   |       |       cardAvatarStyle.jsx
|   |   |   |       |       cardBodyStyle.jsx
|   |   |   |       |       cardFooterStyle.jsx
|   |   |   |       |       cardHeaderStyle.jsx
|   |   |   |       |       cardIconStyle.jsx
|   |   |   |       |       cardStyle.jsx
|   |   |   |       |       customInputStyle.jsx
|   |   |   |       |       customTabsStyle.jsx
|   |   |   |       |       footerStyle.jsx
|   |   |   |       |       headerLinksStyle.jsx
|   |   |   |       |       headerStyle.jsx
|   |   |   |       |       sidebarStyle.jsx
|   |   |   |       |       snackbarContentStyle.jsx
|   |   |   |       |       tableStyle.jsx
|   |   |   |       |       tasksStyle.jsx
|   |   |   |       |       typographyStyle.jsx 
|   |   |   |       +---layouts
|   |   |   |       |       dashboardStyle.jsx 
|   |   |   |       \---views
|   |   |   |               dashboardStyle.jsx
|   |   |   |               iconsStyle.jsx
|   |   |   \---scss
|   |   |       |   material-kit-react.css
|   |   |       |   material-kit-react.scss
|   |   |       +---core
|   |   |       |   |   _misc.scss
|   |   |       |   |   _mixins.scss
|   |   |       |   |   _variables.scss
|   |   |       |   +---mixins
|   |   |       |   |       _colored-shadows.scss   
|   |   |       |   \---variables
|   |   |       |           _bootstrap-material-design-base.scss
|   |   |       |           _bootstrap-material-design.scss
|   |   |       |           _brand.scss
|   |   |       |           _colors-map.scss
|   |   |       |           _colors.scss
|   |   |       |           _functions.scss
|   |   |       |           _shadow.scss
|   |   |       |           _variables.scss   
|   |   |       \---plugins
|   |   |               _plugin-nouislider.scss
|   |   |               _plugin-react-datetime.scss   
|   |   +---components
|   |   |   +---AccountingVouchers
|   |   |   |       Voucher.jsx       
|   |   |   +---Assets
|   |   |   |   +---GeneralData
|   |   |   |   |       AssetsGeneralData.jsx
|   |   |   |   |       
|   |   |   |   \---Specifications
|   |   |   |           Specifications.jsx
|   |   |   +---Budget
|   |   |   |       Budget.jsx
|   |   |   +---Card
|   |   |   |       Card.jsx
|   |   |   |       CardAvatar.jsx
|   |   |   |       CardBody.jsx
|   |   |   |       CardFooter.jsx
|   |   |   |       CardHeader.jsx
|   |   |   |       CardIcon.jsx 
|   |   |   +---ChartOfAccounts
|   |   |   |   +---GeneralData
|   |   |   |   |       GeneralData.jsx    
|   |   |   |   +---Notes
|   |   |   |   |       Notes.jsx   
|   |   |   |   \---Rules
|   |   |   |           Rules.jsx
|   |   |   +---Company
|   |   |   |   +---AccountConfig
|   |   |   |   |       AccountConfig.jsx      
|   |   |   |   +---Accounts
|   |   |   |   |       Accounts.jsx     
|   |   |   |   +---Adjustment-Inflation
|   |   |   |   |       AdjustmentXInflation.jsx      
|   |   |   |   +---CreateCompany
|   |   |   |   |       CreateCompany.jsx     
|   |   |   |   +---GeneralData
|   |   |   |   |       GeneralData.jsx   
|   |   |   |   \---UserCompany
|   |   |   |           NewUserCompany.jsx
|   |   |   |           Sucursal.jsx
|   |   |   |           UsersCompany.jsx         
|   |   |   +---CompanyData
|   |   |   |       CompanyData.jsx  
|   |   |   +---CostCenter
|   |   |   |       CostCenter.jsx      
|   |   |   +---Currency
|   |   |   |       Currency.jsx       
|   |   |   +---CustomButtons
|   |   |   |       Button.jsx 
|   |   |   +---CustomInput
|   |   |   |       CustomInput.jsx     
|   |   |   +---CustomTabs
|   |   |   |       CustomTabs.jsx   
|   |   |   +---Dialogs
|   |   |   |   +---AccessDialog
|   |   |   |   |       AccessDialog.jsx 
|   |   |   |   +---BudgetDialog
|   |   |   |   |       BudgetCCDialog.jsx
|   |   |   |   |       BudgetDialog.jsx
|   |   |   |   |       BudgetImport.jsx  
|   |   |   |   +---ChartDialog
|   |   |   |   |       ChartDialog.jsx
|   |   |   |   +---CompanyDialog
|   |   |   |   |       CompanyDialog.jsx
|   |   |   |   |       DatabasesDialog.jsx
|   |   |   |   +---ConfirmDialog
|   |   |   |   |       ConfirmDialog.jsx
|   |   |   |   +---CostDialog
|   |   |   |   |       CostDialog.jsx
|   |   |   |   +---CurrencyDialog
|   |   |   |   |       CurrencyDialog.jsx   
|   |   |   |   \---UserDialog
|   |   |   |           UserDialog.jsx         
|   |   |   +---Footer
|   |   |   |       Footer.jsx
|   |   |   |       
|   |   |   +---Grid
|   |   |   |       GridContainer.jsx
|   |   |   |       GridItem.jsx
|   |   |   |       
|   |   |   +---Header
|   |   |   |       Header.jsx
|   |   |   |       HeaderLinks.jsx
|   |   |   |       
|   |   |   +---Options
|   |   |   |       Options.jsx
|   |   |   |       
|   |   |   +---Sidebar
|   |   |   |       Sidebar.jsx
|   |   |   |       
|   |   |   +---Snackbar
|   |   |   |       Snackbar.jsx
|   |   |   |       SnackbarContent.jsx
|   |   |   |       
|   |   |   +---Table
|   |   |   |       Table.jsx
|   |   |   |       
|   |   |   +---Tasks
|   |   |   |       Tasks.jsx
|   |   |   |       
|   |   |   +---Third
|   |   |   |       Third.jsx
|   |   |   |       
|   |   |   +---Typography
|   |   |   |       Danger.jsx
|   |   |   |       Info.jsx
|   |   |   |       Muted.jsx
|   |   |   |       Primary.jsx
|   |   |   |       Quote.jsx
|   |   |   |       Success.jsx
|   |   |   |       Warning.jsx
|   |   |   |       
|   |   |   \---Users
|   |   |       |   AssignUser.jsx
|   |   |       |   NewUserCompany.jsx
|   |   |       |   UserAcc.jsx
|   |   |       |   UserAssigned.jsx
|   |   |       |   UserCompany.jsx
|   |   |       |   Users.jsx
|   |   |       |   
|   |   |       \---AllowUser
|   |   |               NewUser.jsx
|   |   |               Policies.jsx
|   |   |               
|   |   +---layouts
|   |   |   \---Dashboard
|   |   |           Dashboard.jsx
|   |   |           
|   |   +---routes
|   |   |       dashboard.jsx
|   |   |       index.jsx
|   |   |       
|   |   +---services
|   |   |   +---budget
|   |   |   |       budget.js
|   |   |   |       
|   |   |   +---chartOfAccounts
|   |   |   |       chartOfAccounts.js
|   |   |   |       
|   |   |   +---company
|   |   |   |       company.js
|   |   |   |       usercompany.js
|   |   |   |       
|   |   |   +---costCenters
|   |   |   |       costCenters.js
|   |   |   |       
|   |   |   +---currency
|   |   |   |       currency.js
|   |   |   |       
|   |   |   +---token
|   |   |   |       token.js
|   |   |   |       
|   |   |   \---user
|   |   |           login.js
|   |   |           user.js
|   |   |           useracc.js
|   |   |           usercompany.js
|   |   |           
|   |   +---variables
|   |   |       general.jsx
|   |   |       
|   |   \---views
|   |       +---AccountingVouchers
|   |       |       AccountingVouchers.jsx
|   |       |       
|   |       +---Assets
|   |       |       Assets.jsx
|   |       |       
|   |       +---Budgets
|   |       |       Budgets.jsx
|   |       |       
|   |       +---ChartOfAccounts
|   |       |       ChartOfAccounts.jsx
|   |       |       
|   |       +---Company
|   |       |       allCompanies.jsx
|   |       |       Company.jsx
|   |       |       UserCompany.jsx
|   |       |       
|   |       +---CostCenters
|   |       |       CostCenters.jsx
|   |       |       
|   |       +---Currency
|   |       |       Currencies.jsx
|   |       |       
|   |       +---Dashboard
|   |       |       Dashboard.jsx
|   |       |       
|   |       +---Icons
|   |       |       Icons.jsx
|   |       |       
|   |       +---Login
|   |       |       Login.jsx
|   |       |       
|   |       +---Maps
|   |       |       Maps.jsx
|   |       |       
|   |       +---Notifications
|   |       |       Notifications.jsx
|   |       |       
|   |       +---Register
|   |       |       Register.jsx
|   |       |       
|   |       +---TableList
|   |       |       TableList.jsx
|   |       |       
|   |       +---ThirdParty
|   |       |       ThirdParty.jsx
|   |       |       
|   |       +---Typography
|   |       |       Typography.jsx
|   |       |       
|   |       +---UpgradeToPro
|   |       |       UpgradeToPro.jsx
|   |       |       
|   |       \---User
|   |               Assign.jsx
|   |               User.jsx
|   |               UserAcc.jsx
|   |               Users.jsx
|   |               
|   \---__MACOSX
|       |   ._.env
|       |   
|       \---src
|           |   ._.DS_Store
|           |   
|           \---assets
|               |   ._.DS_Store
|               |   
|               \---github
|                       ._.DS_Store
|                       
\---server
    |   app.js
    |   model.mwb
    |   package-lock.json
    |   package.json
    |   test.js
    |   
    +---bin
    |       www
    |       
    +---controllers
    |       AccountingVouchers.js
    |       Assets.js
    |       Budget.js
    |       ChartsOfAccounts.js
    |       Companies.js
    |       CostCenters.js
    |       Currency.js
    |       session.js
    |       ThirdParty.js
    |       UserAcc.js
    |       UserCompany.js
    |       Users.js
    |       
    +---helpers
    |   |   localStrategy.js
    |   |   
    |   +---config
    |   |       config.js
    |   |       database.js
    |   |       
    |   +---models
    |   |       budget.js
    |   |       chartsOfAccounts.js
    |   |       companies.js
    |   |       costCenters.js
    |   |       currency.js
    |   |       thirdParties.js
    |   |       user.js
    |   |       userAcc.js
    |   |       userCompany.js
    |   |       
    |   \---props
    |           properties.js
    |           
    +---middlewares
    |       isAuth.js
    |       
    +---public
    |       index.html
    |       
    \---routes
            index.js
          

```

## Resources
- Demo: <https://demos.creative-tim.com/material-dashboard-angular2/#/dashboard>
- Download Page: <https://www.creative-tim.com/product/material-dashboard-angular2>
- Documentation: <https://demos.creative-tim.com/material-dashboard-angular2/#/documentation/tutorial>
- License Agreement: <https://www.creative-tim.com/license>
- Support: <https://www.creative-tim.com/contact-us>
- Issues: [Github Issues Page](https://github.com/creativetimofficial/material-dashboard-angular2/issues)
- [Material Kit](https://www.creative-tim.com/product/material-kit?ref=github-mda-free) - For Front End Development
