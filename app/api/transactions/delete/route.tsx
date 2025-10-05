import { NextResponse, NextRequest } from 'next/server';
import { Transaction } from '@/app/Types/Transactions';
import sql from '@/Database/db';

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id)
      return NextResponse.json(
        { success: false, error: 'Missing id to delete transaction' },
        { status: 400 },
      );

    const deleteTransaction = async (id: string) => {
      try {
        const result = await sql`
                    DELETE FROM Transaction
                    WHERE id = ${id};
                `;
        return result;
      } catch (error: any) {
        console.log('Error: ', error);
      }
    };

    await deleteTransaction(id);

    return NextResponse.json({
      success: true,
      message: 'Succesfully deleted transaction!',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error deleting the transaction!',
        error: error.message,
      },
      { status: 500 },
    );
  }
}
