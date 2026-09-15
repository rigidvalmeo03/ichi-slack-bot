require("dotenv").config();

console.log("Bot token starts with:", process.env.SLACK_BOT_TOKEN?.substring(0,5));
console.log("App token starts with:", process.env.SLACK_APP_TOKEN?.substring(0,5));

const { App } = require("@slack/bolt");
const axios = require("axios");
const cron = require("node-cron");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

app.command("/ichi-slack-bot-ping",async({ command, ack, respond}) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms`});
});

app.command("/ichi-slack-bot-help", async ({ ack, respond}) => {
    await ack();
    await respond({
        text:
        `Available Commands:
        /ichi-slack-bot-ping Check bot latency
        /ichi-slack-bot-catchem - Learn about chemistry related to cats
        /ichi-slack-bot-dogchem - Learn about chemistry related to dogs
        /ichi-slack-bot-dogbreed - Get information about dog breeds
        /ichi-slack-bot-catbreed - Get information about cat breeds
        /ichi-slack-bot-dogscanteat - See foods dogs should avoid
        /ichi-slack-bot-feeding - Set a feeding reminder`
    });
});

app.command("/ichi-slack-bot-catchem", async ({ ack, respond}) => {
    await ack();

    const catChemicals = ["taurine", "calcium", "glucose", "arachidonic acid", "retinol","arginine", "phosphorus", "magnesium"];
    const chemical = catChemicals[Math.floor(Math.random() * catChemicals.length)];

    try {
        const response = await axios.get(
            `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chemical}/property/MolecularFormula,MolecularWeight,SMILES/JSON`
        );

        const data = response.data.PropertyTable.Properties[0];
        await respond ({
            text:
           `*Cat Chemistry*
            
            Chemical: ${chemical}
        Molecular Formula: ${data.MolecularFormula}
        Molecular Weight: ${data.MolecularWeight} g/mol 
        SMILES: ${data.SMILES}

        Source: PubChem`
    });
} catch (error) { console.error(error);

    await respond ({
        text: "Sorry, I could not get the cat chemistry data from PubChem."
    });
    }
});

app.command("/ichi-slack-bot-dogchem", async ({ ack, respond }) => {
    await ack();
    const dogChemicals = [ "calcium", "glucose", "phosphorus", "cholecalciferol", "linoleic acid", "arginine", "zinc"];
    const chemical = 
    dogChemicals[Math.floor(Math.random() * dogChemicals.length)];

    try {
        const response = await axios.get(
            `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(chemical)}/property/MolecularFormula,MolecularWeight,SMILES/JSON` );
        
        const data = response.data.PropertyTable.Properties[0];
        
        await respond({
            text:
            `*Dog Chemistry*

            Chemical: ${chemical}
            Molecular Formula: ${data.MolecularFormula}
            Molecular Weight: ${data.MolecularWeight} g/mol
            SMILES: ${data.SMILES}

            Source: PubChem`
        });
    } catch (error) {
        console.error(error);

        await respond ({
            text: "Sorry, I could not get the dog chemistry data from Pubchem."
        });
    }
});

app.command("/ichi-slack-bot-dogbreed", async ({ ack, respond}) => {
    await ack();

    try { 
        const response = await axios.get(
            "https://dogapi.dog/api/v2/breeds");
        const breeds = response.data.data;
        const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
        const breed = randomBreed.attributes;
        
        await respond({
            text:
           ` *Dog Breed*

            *Breed:* ${breed.name}
            *Description:* ${breed.description}
            *Life Span:* ${breed.life.min} - ${breed.life.max} years
            *Male Weight:* ${breed.male_weight.min} - ${breed.male_weight.max} kg
            *Female Weight:* ${breed.female_weight.min} - ${breed.female_weight.max} kg 
            *Hypoallergenic:* ${breed.hypoallergenic ? "Yes" : "No"}

            Source: Dog API`
        });
    } catch (error) {
        console.error(error);

        await respond({
            text: "Sorry, I could not get the dog breed data."
        });
    }
});

app.command("/ichi-slack-bot-catbreed", async  ({ack, respond}) => {
    await ack();

    try{
        const response = await axios.get(
            "https://api.thecatapi.com/v1/breeds" );

        const breeds = response.data;
        const randomBreed = breeds [Math.floor(Math.random() * breeds.length)];

        await respond({
            text:
            `*Cat Breed*

            *Breed:* ${randomBreed.name}
            *Description:* ${randomBreed.description}
            *Life Span:* ${randomBreed.life_span} years
            *Origin:* ${randomBreed.origin}
            *Temperament:* ${randomBreed.temperament}
            *Weight:* ${randomBreed.weight.metric} kg

            Source: The Cat API`
        });
    } catch (error) {
        console.error(error);

        await respond ({
            text: "Sorry, I could not get the cat breed data."
        });
    }
});

app.command("/ichi-slack-bot-dogscanteat", async ({ ack, respond}) => {
    await ack();

    const foods = [ "chocolate", "grapes", "raisins", "onion", "garlic", "xylitol", "macadamia-nuts", "coffee" ]; 
    const randomFood =
    foods[Math.floor(Math.random() * foods.length)];

    try {
        const response = await axios.get(
            `https://dog-food-api.onrender.com/api/${encodeURIComponent(randomFood)}` );
        const data = response.data;
        
        await respond({
            text:
            `*Dog Food Safety*

            *Food:* ${data.name}
            *Toxic:* ${data.toxic}
            *Safe:* ${data.safe}

            *Information:* ${data.obs}

            Source: Dog Food API`
        });
    } catch (error) {
        console.error(error);

        await respond({
            text: "Sorry, I could not get the dog food safety information."
        });
    }
});

app.command("/ichi-slack-bot-feeding", async ({ ack, respond, command, client}) => {
    await ack();
    const time = command.text.trim();

    if (!/^\d{2}:\d{2}$/.test(time)) {
        await respond ({
            text:"Please enter the time in 24-hour format. \nExample: `/ichi-slack-bot-feeding 18:00`"
        });
        return; }

    const [hour, minute] = time.split(":").map(Number);
    if (hour > 23 || minute > 59) {
        await respond({
            text: "That does not look like valid time. Please use a time between 00:00 and 23:59."
        });
        return;
    }
    await respond({
        text: `Feeding reminder set for *${time}* every day!` });
    cron.schedule(`${minute} ${hour} * * *`, async () => {
        try {
            await client.chat.postMessage({
                channel: command.channel_id,
                text: "Feeding Time! \nDon't forget to feed your pets!" });
        } catch (error) {
            console.error("Could not send feeding reminder:", error);
        }
 });
});


(async () => {
    await app.start();
    console.log("bot is running!");
})();
