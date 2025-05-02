import { NextResponse, NextRequest } from "next/server";
import { Transaction } from "@/app/Types/Transactions";
import sql from "@/Database/db";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const insertTransaction = async(data: Transaction) => {
            try {
                if (!data.date || !data.amount || !data.payee || !data.category) {
                    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
                }
                const result = await sql`
                    INSERT INTO Transaction (date, amount, payee, category)
                    VALUES (
                        ${data.date},
                        ${data.amount},
                        ${data.payee},
                        ${data.category}
                    )
                    RETURNING *;
                `;
                return result;
            } catch(error:any) {
                console.log("Error: ", error)
            }

        };

        await insertTransaction(data);

        return NextResponse.json({ success: true, message: 'Form submitted successfully' });
    }
    catch (error:any) {
        return NextResponse.json({ success: false, message: 'Error processing form submission request', error: error.message }, { status: 500 });
    }
};