import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');

        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: 'Missing Authorization header' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            )
        }
        const searchParams = req.nextUrl.searchParams;
        const start = searchParams.get('start');
        const end = searchParams.get('end');

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
        // Query transactions for this specific user
        // Assuming your Transaction table has a user_id column
        const { data, error } = await supabaseClient
        .from('Transaction')
        .select('*')
        .gte('date', `${start}T00:00:00Z`)
        .lte('date', `${end}T23:59:59Z`)
        .eq('user_id', user.id);

        return NextResponse.json({ transactions: data, success: true, message: 'Form submitted successfully' });
    }
    catch (error:any) {
        return NextResponse.json({ success: false, message: 'Error processing form submission request', error: error.message }, { status: 500 });
    }
};