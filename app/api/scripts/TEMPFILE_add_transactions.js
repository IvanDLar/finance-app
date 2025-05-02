import { join } from 'path';
import { readFileSync } from 'fs';
import sql from "../../../Database/db.js";

const filePath = join(process.cwd(), 'Database', 'transactions.json');


const  addAllTransactions = async () => {
    let existingData = [];
        try {
            const fileContent = readFileSync(filePath, 'utf8');
            existingData = fileContent ? JSON.parse(fileContent) : [];
        } catch (error) {
            console.log(error);
            return error;
        }

    for (let transaction of existingData) {
        const insertTransaction = async(transaction) => {
            try {
                const result = await sql`
                    INSERT INTO Transaction (date, amount, payee, category)
                    VALUES (
                        ${transaction.date},
                        ${transaction.amount},
                        ${transaction.payee},
                        ${transaction.category}
                    )
                    RETURNING *;
                `;
                return result;
            } catch(error) {
                console.log("Error: ", error)
            }

        };

        await insertTransaction(transaction);
    }
}

await addAllTransactions();
