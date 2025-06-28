CREATE SEQUENCE transactions_id_seq
    START WITH 100000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE Transaction (
    "id" INTEGER PRIMARY KEY DEFAULT nextval('transactions_id_seq'),
    "userId" INTEGER NOT NULL REFERENCES User(id),
    "date" DATE NOT NULL,
    "amount" FLOAT(4) NOT NULL,
    "payee" TEXT NOT NULL,
    "category" TEXT NOT NULL REFERENCES TransactionCategory(id)
    "accountId" TEXT NOT NULL REFERENCES Account(id)
    "type" SMALLINT NOT NULL
);
