import { NextResponse, NextRequest } from "next/server";
import sql from "@/Database/db";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        const results = await sql`
            SELECT * FROM Transaction
            WHERE date BETWEEN ${start} AND ${end}
            ORDER BY date;
        `

        return NextResponse.json({ transactions: results, success: true, message: 'Form submitted successfully' });
    }
    catch (error:any) {
        return NextResponse.json({ success: false, message: 'Error processing form submission request', error: error.message }, { status: 500 });
    }
};