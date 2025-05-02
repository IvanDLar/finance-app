import { NextResponse, NextRequest } from "next/server";
import sql from "@/Database/db";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        const results = await sql`
            SELECT SUM(amount) AS "TransactionsSum"
            FROM Transaction
            WHERE date BETWEEN ${start} AND ${end};
        `
        // '2025-01-01' AND '2025-01-31'
        return NextResponse.json({ data: results, success: true, message: 'Form submitted successfully' });
    }
    catch (error:any) {
        return NextResponse.json({ success: false, message: 'Error processing form submission request', error: error.message }, { status: 500 });
    }
};