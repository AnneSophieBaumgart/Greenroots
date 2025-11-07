import dotenv from "dotenv";
dotenv.config();

const token = process.env.PERENUAL_TOKEN;

const testPerenual = async () => {
    try {
        const response = await fetch(`https://perenual.com/api/species-list?key=${token}&q=oak`);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error("Erreur :", err);
    }
};

testPerenual();

