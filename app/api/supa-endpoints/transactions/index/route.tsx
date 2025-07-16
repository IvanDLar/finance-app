import { NextResponse, NextRequest } from "next/server";
import { Transaction } from "@/app/Types/Transactions";
import { createClient } from "@supabase/supabase-js";

import sql from "@/Database/db";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');

        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: 'Missing Authorization header' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            )
        };

        const supabaseClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                headers: { Authorization: authHeader }
                }
            }
        )
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()

        if (userError || !user) {
            return new Response(
                JSON.stringify({ error: 'User not authenticated' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            )
        }

        const requestData = await req.json();

        if (!requestData.title || !requestData.date || !requestData.amount || !requestData.payee || !requestData.category || !requestData.isIncome) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        console.log(requestData);
        const { data, error } = await supabaseClient
            .from('Transaction')
            .insert([
                { date: requestData.date, amount: requestData.amount, payee:requestData.payee, is_income: requestData.isIncome, name: requestData.title, category: requestData.category},
            ]);

        return NextResponse.json({ success: true, message: 'Form submitted successfully' });
    }
    catch (error:any) {
        return NextResponse.json({ success: false, message: 'Error processing form submission request', error: error.message }, { status: 500 });
    }
};