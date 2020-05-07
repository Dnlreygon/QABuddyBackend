# QABuddyBackend

# The proyect needs the secrets below:
- SLACK_WEBHOOK
- VIRTUAL_TOKEN

# Setup
- Clone the repository
- Execute npm install

# Run Project Tests & Task Test
- Execute: ``` npm test ```

# Allure Reporter
- Once our backend finish, use the following command: ```allure generate ./allure-results && allure open```

# CI

- It runs in GitHub Actions once we do a ```commit``` & ```push```to our branch.

# POSTMAN
- Create your collections and use the same config to monitor your actions.

# INFO.

This framework uses an .env file to read the test data you need to create an .env file and fill it with your data, you can find a .env-info as an example. Please add secrets to avoid use sensitive information as public like users or tokens.
