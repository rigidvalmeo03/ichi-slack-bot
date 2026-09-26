Hi! Welcome to “Ichi Slack Bot.” It's ameowzing mwhehehe.

>About the Project
-Ichi Slack Bot is an animal-themed Slack bot created as part of the NASA Stardance Challenge.
-This is my first coding project outside of school. I created it while learning the basics of JavaScript, APIs, Slack bot development, and programming through Stardance.
-The bot is designed around my interest in animals and chemistry. It provides information about cats and dogs, including animal-related chemistry, breeds, foods that dogs should avoid, and feeding reminders.

>Features
1. Ping - The ping command checks if the bot is running and responds with "Pong!" along with the bot's response latency.
Command: /ichi-slack-bot-ping

2. Help - The help command displays a list of the available commands and explains what each command does.
Command: /ichi-slack-bot-help

3. Cat Chemistry - The Cat Chemistry command randomly selects a chemical related to cats and retrieves information about it from PubChem API.
The information includes:
Chemical name
Molecular formula
Molecular weight
SMILES

Command: /ichi-slack-bot-catchem

4. Dog Chemistry - The Dog Chemistry command randomly selects a chemical related to dogs and retrieves information about it from PubChem API.
The information includes:

Chemical name
Molecular formula
Molecular weight
SMILES

Command: /ichi-slack-bot-dogchem

5. Dog Breed - The Dog Breed command randomly selects a dog breed from the Dog API.
The information includes:
Breed name
Description
Life span
Male weight
Female weight
Whether the breed is hypoallergenic

Command: /ichi-slack-bot-dogbreed

6. Cat Breed - The Cat Breed command randomly selects a cat breed from The Cat API.
The information includes:
Breed name
Description
Life span
Origin
Temperament
Weight

Command: /ichi-slack-bot-catbreed

7. Dog Food Safety - The Dog Food Safety command randomly selects a food and retrieves information about whether it is safe or toxic for dogs. The data is retrieved using the Dog Food API.
The information includes:
Food name
Whether it is toxic
Whether it is safe
Additional information

Command: /ichi-slack-bot-dogscanteat

8. Feeding Reminders - The Feeding Reminder command allows users to set a daily feeding reminder for their pets. The user enters a time using the 24-hour format. The bot then sends a message in the same Slack channel every day at that time.
Example: /ichi-slack-bot-feeding 18:00
The bot will respond that the feeding reminder has been set and will send a reminder saying:
"Feeding Time!
Don't forget to feed your pets!"

>Technologies Used

1. JavaScript - Used to create the bot's commands, logic, API requests, random selections, and feeding reminder system.
2. Node.js - Used to run the JavaScript code.
3. Slack Bolt - Used to connect the JavaScript program to Slack and create Slack commands.
4. Axios - Used to send requests to external APIs and retrieve information.
5. Node-cron - Used to schedule the daily feeding reminders.
6. dotenv - Used to load the Slack bot and app tokens from the .env file.
7. APIs:
a. PubChem - Used for the chemistry information in the Cat Chemistry and Dog Chemistry commands.
b. Dog API - Used to retrieve dog breed information.
c. The Cat API - Used to retrieve cat breed information.
d. Dog Food API - Used to retrieve dog food safety information.

>Project Files
1. index.js
-This is the main JavaScript file of the bot. It contains the Slack bot setup, commands, API requests, error handling, and feeding reminder system.
2. .env
-This file contains the private Slack bot and app tokens needed to connect the bot to Slack.
3. node_modules
-This folder contains the packages installed for the project.
4. package.json
-This file contains the project's Node.js dependencies and project information.

>How to Set Up the Bot
1. Download or clone this GitHub repository.
2. Make sure Node.js and npm are installed on your computer.
3. Open the project folder in a terminal.
4. Install the required packages using: npm install
5. Create a .env file in the project folder.
6. Add the required Slack tokens to the .env file:
SLACK_BOT_TOKEN=your_bot_token
SLACK_APP_TOKEN=your_app_token
7. Make sure Socket Mode is enabled for the Slack app.
8. Run the bot using: node index.js
-If the bot starts successfully, the terminal will display “bot is running!”

>How to Use the Bot
-After the bot is running and connected to Slack, the commands can be used in a Slack workspace.
Use “/ichi-slack-bot-help“ to see the available commands.

-The chemistry and breed commands automatically retrieve information from their respective APIs.

-The feeding command requires a time in 24-hour format.
Example: /ichi-slack-bot-feeding 18:00
The bot will then send a feeding reminder every day at 18:00 in the Slack channel where the reminder was created.

>What I Learned
-Through this project, I learned how to create a Slack bot using JavaScript and Slack Bolt.
-I also learned how to use APIs to retrieve information instead of storing all of the information directly in the code.
-This project helped me practice JavaScript, asynchronous functions, API requests, random selections, error handling, environment variables, Slack commands, and scheduled tasks.
-I also learned how different APIs can be combined to create one project with multiple features.

>About Me
-Hi! I'm Ichi, also known as Rigid Valmeo.
-I am a Grade 12 STEM student who enjoys drawing, coding, studying, science, research, chemistry, engineering, electronics, and animals.
-I created this project because I wanted to combine my interests in animals, chemistry, and programming.

>Credits
-This project was created as part of the NASA Stardance Challenge.
-The programming concepts used in this project were learned through Stardance.
-The bot also uses external APIs to retrieve information about chemistry, dog breeds, cat breeds, and dog food safety.
