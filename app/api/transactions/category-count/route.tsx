import { NextResponse, NextRequest } from "next/server";
import sql from "@/Database/db";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        const results = await sql`
            SELECT category, COUNT(*) count
            FROM Transaction
            WHERE date BETWEEN ${start} AND ${end}
            GROUP BY category;
        `

        return NextResponse.json({data:results, success: true, message: 'Form submitted successfully' });
    }
    catch (error:any) {
        return NextResponse.json({ success: false, message: 'Error processing form submission request', error: error.message }, { status: 500 });
    }
};